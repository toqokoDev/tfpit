<script lang="ts" setup>
import { Plus, Eye, Heart, Globe, Lock, Upload, ChevronLeft, ChevronRight, Pencil, Trash2, AlertTriangle, Share, BriefcaseBusiness } from 'lucide-vue-next';
import { toTypedSchema } from "@vee-validate/zod";
import { Form as VeeForm } from "vee-validate";
import { Field as VeeField } from "vee-validate";
import { toast } from "vue-sonner";

// ----------------
// ----- Data -----
// ----------------

const PORTFOLIO_CATEGORIES = [
  { label: 'Портрет', value: 'Портрет' },
  { label: 'Свадьба', value: 'Свадьба' },
  { label: 'Love Story', value: 'Love Story' },
  { label: 'Семейная фотосессия', value: 'Семейная фотосессия' },
  { label: 'Детская фотосессия', value: 'Детская фотосессия' },
  { label: 'Fashion', value: 'Fashion' },
  { label: 'Коммерческая съемка', value: 'Коммерческая съемка' },
  { label: 'Студийная съемка', value: 'Студийная съемка' },
  { label: 'Свадебная прогулка', value: 'Свадебная прогулка' },
  { label: 'Другое', value: 'Другое' }
];

const supabase = useSupabaseClient<Database>();
const { isMobile } = useMobileDetection();
const userStore = useCurrentUserStore();
const isAddDialogOpen = ref(false);
const isViewDialogOpen = ref(false);
const isEditDialogOpen = ref(false);
const isCreatingPortfolio = ref(false);
const isUpdatingPortfolio = ref(false);
const isDeletingPortfolio = ref(false);
const isLoadingPortfolio = ref(false);
const isUploadingImage = ref(false);
const deletedImageUrls = ref<string[]>([]);

const imageInput = ref<HTMLInputElement | null>(null);
const editImageInput = ref<HTMLInputElement | null>(null);
const selectedImageFiles = ref<File[]>([]);
const previewImageUrls = ref<Array<{ url: string; file: File }>>([]);
const editingPortfolio = ref<PortfolioSchema | null>(null);
const existingImageUrls = ref<string[]>([]);

const portfolio = computed(() => {
  const user = userStore.getUser();
  return user.portfolio || [];
});

const selectedPortfolio = ref<PortfolioSchema | null>(null);
const currentImageIndex = ref(0);

const editFormInitialValues = computed(() => {
  if (!editingPortfolio.value) {
    return {
      category: '',
      description: '',
      is_public: false,
    };
  }

  return {
    category: editingPortfolio.value.category || '',
    description: editingPortfolio.value.description || '',
    is_public: Boolean(editingPortfolio.value.is_public),
  };
});

// ---------------------
// ----- Functions -----
// ---------------------

async function loadPortfolio() {
  try {
    isLoadingPortfolio.value = true;
    
    const { data: authUserData } = await supabase.auth.getUser();
    
    if (!authUserData?.user) return;
    
    const { data: portfolioData, error } = await supabase
      .from('portfolios')
      .select(`
        id,
        image_url,
        category,
        description,
        is_public,
        likes_count,
        views_count,
        created_at,
        updated_at
      `)
      .eq('user_id', authUserData.user.id);
    
    if (error) throw error;
    
    const portfolioItems = (portfolioData || []).map(item => ({
      id: item.id,
      image_url: item.image_url ? item.image_url.split('|').filter(url => url.trim()) : [],
      category: item.category,
      description: item.description,
      is_public: item.is_public,
      likes_count: item.likes_count,
      views_count: item.views_count,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));
    
    userStore.updateUser({ portfolio: portfolioItems });
  } catch (error) {
    console.error('Ошибка загрузки портфолио:', error);
  } finally {
    isLoadingPortfolio.value = false;
  }
}

function openPortfolioDialog(item: (typeof portfolio.value)[number]) {
  selectedPortfolio.value = item;
  currentImageIndex.value = 0;
  isViewDialogOpen.value = true;
}

function nextImage() {
  if (selectedPortfolio.value && selectedPortfolio.value.image_url) {
    currentImageIndex.value = (currentImageIndex.value + 1) % selectedPortfolio.value.image_url.length;
  }
}

function prevImage() {
  if (selectedPortfolio.value && selectedPortfolio.value.image_url) {
    const length = selectedPortfolio.value.image_url.length;
    currentImageIndex.value = (currentImageIndex.value - 1 + length) % length;
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

async function sharePortfolio() {
  if (!selectedPortfolio.value) return;
  
  // Генерируем ссылку на портфолио
  const portfolioUrl = `${window.location.origin}/portfolio/${selectedPortfolio.value.id}`;
  
  // Проверяем, что портфолио публичное
  if (!selectedPortfolio.value.is_public) {
    toast.error('Поделиться можно только публичными портфолио');
    return;
  }
  
  // Сразу копируем в буфер обмена
  await copyToClipboard(portfolioUrl);
}

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success('Ссылка скопирована в буфер обмена');
  } catch (error) {
    // Fallback для старых браузеров
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      toast.success('Ссылка скопирована в буфер обмена');
    } catch (err) {
      toast.error('Не удалось скопировать ссылку');
    }
    document.body.removeChild(textArea);
  }
}

onMounted(async () => {
  await loadPortfolio();
});

const handleImageSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = Array.from(target.files || []);
  if (files.length === 0) return;

  const maxSize = 10 * 1024 * 1024;
  const validFiles: File[] = [];
  const newPreviews: Array<{ url: string; file: File }> = [];

  for (const file of files) {
    if (!file.type.startsWith('image/')) {
      toast.error(`Файл ${file.name} не является изображением`);
      continue;
    }

    if (file.size > maxSize) {
      toast.error(`Файл ${file.name} слишком большой (макс. 10МБ)`);
      continue;
    }

    validFiles.push(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      newPreviews.push({ url, file });
      
      if (newPreviews.length === validFiles.length) {
        previewImageUrls.value = [...previewImageUrls.value, ...newPreviews];
      }
    };
    reader.readAsDataURL(file);
  }

  selectedImageFiles.value = [...selectedImageFiles.value, ...validFiles];
};

const uploadImageToStorage = async (file: File, userId: string): Promise<string> => {
  try {
    isUploadingImage.value = true;

    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `portfolios/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('portfolios')
      .upload(filePath, file, {
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('portfolios')
      .getPublicUrl(filePath);

    return publicUrl;
  } finally {
    isUploadingImage.value = false;
  }
};

const deleteImageFromStorage = async (imageUrl: string): Promise<void> => {
  try {
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split('/');
    const bucketIndex = pathParts.findIndex(part => part === 'portfolios');
    
    if (bucketIndex === -1) {
      return;
    }
    
    const filePath = pathParts.slice(bucketIndex + 1).join('/');
    
    if (!filePath) {
      return;
    }
    
    const cleanPath = filePath.split('?')[0];
    
    const { error } = await supabase.storage
      .from('portfolios')
      .remove([cleanPath!]);
    
    if (error) {
      return;
    }
  } catch (error) {
    console.error('Ошибка при удалении изображения:', error);
  }
};

const createPortfolio = async (values: any) => {
  try {
    if (selectedImageFiles.value.length === 0) {
      toast.error('Выберите хотя бы одно изображение');
      return;
    }

    isCreatingPortfolio.value = true;

    const user = userStore.getUser();

    const imageUrls: string[] = [];
    for (const file of selectedImageFiles.value) {
      const imageUrl = await uploadImageToStorage(file, user.id);
      imageUrls.push(imageUrl);
    }
    
    if (imageUrls.length === 0 || !imageUrls[0]) {
      throw new Error('Не удалось загрузить изображения');
    }
  
    const imageUrlString = imageUrls.join('|');
    
    const { data: newPortfolio, error } = await supabase
      .from('portfolios')
      .insert({
        user_id: user.id,
        category: values.category,
        description: values.description,
        image_url: imageUrlString, 
        is_public: values.is_public,
        likes_count: 0,
        views_count: 0,
      })
      .select()
      .single();

    if (error) {
      throw error
    };

    const portfolioItem = {
      id: newPortfolio.id,
      category: newPortfolio.category,
      description: newPortfolio.description,
      image_url: imageUrls,
      is_public: newPortfolio.is_public,
      likes_count: newPortfolio.likes_count,
      views_count: newPortfolio.views_count,
      created_at: newPortfolio.created_at,
      updated_at: newPortfolio.updated_at,
    };

    const currentUser = userStore.getUser();
    const updatedPortfolio = [...(currentUser.portfolio || []), portfolioItem];
    userStore.updateUser({ portfolio: updatedPortfolio });

    toast.success('Портфолио успешно добавлено');

    isAddDialogOpen.value = false;
    
    selectedImageFiles.value = [];
    previewImageUrls.value = [];

    if (imageInput.value) {
      imageInput.value.value = '';
    }
    
  } catch (error: any) {
    toast.error(error.message || 'Ошибка при создании портфолио');
  } finally {
    isCreatingPortfolio.value = false;
  }
};

const handleImageInputClick = () => {
  imageInput.value?.click();
};

const handleRemoveImage = (index: number) => {
  selectedImageFiles.value.splice(index, 1);
  previewImageUrls.value.splice(index, 1);
};

const handleRemoveAllImages = () => {
  selectedImageFiles.value = [];
  previewImageUrls.value = [];
  if (imageInput.value) {
    imageInput.value.value = '';
  }
};

const handleDialogClose = (open: boolean) => {
  isAddDialogOpen.value = open;
  if (!open) {
    handleRemoveAllImages();
  }
};

function openEditDialog(item: (typeof portfolio.value)[number]) {
  editingPortfolio.value = item;
  existingImageUrls.value = [...item.image_url];
  previewImageUrls.value = [];
  selectedImageFiles.value = [];
  deletedImageUrls.value = [];
  
  isViewDialogOpen.value = false;
  isEditDialogOpen.value = true;
}

const isDeleteDialogOpen = ref(false);
const portfolioToDelete = ref<(typeof portfolio.value)[number] | null>(null);

function openDeleteDialog(item: (typeof portfolio.value)[number]) {
  portfolioToDelete.value = item;
  isDeleteDialogOpen.value = true;
}

async function deletePortfolio() {
  if (!portfolioToDelete.value) return;

  try {
    isDeletingPortfolio.value = true;

    if (portfolioToDelete.value.image_url && portfolioToDelete.value.image_url.length > 0) {
      try {
        await Promise.all(
          portfolioToDelete.value.image_url.map(url => deleteImageFromStorage(url))
        );
      } catch (error) {
        console.error('Ошибка при удалении изображений:', error);
      }
    }

    const { error } = await supabase
      .from('portfolios')
      .delete()
      .eq('id', portfolioToDelete.value.id);

    if (error) throw error;

    const currentUser = userStore.getUser();
    const updatedPortfolio = (currentUser.portfolio || []).filter(
      item => item.id !== portfolioToDelete.value!.id
    );
    userStore.updateUser({ portfolio: updatedPortfolio });

    toast.success('Портфолио успешно удалено');
    isDeleteDialogOpen.value = false;
    isViewDialogOpen.value = false;
    portfolioToDelete.value = null;
  } catch (error: any) {
    console.error('Ошибка удаления портфолио:', error);
    toast.error(error.message || 'Ошибка при удалении портфолио');
  } finally {
    isDeletingPortfolio.value = false;
  }
}

const handleEditDialogClose = (open: boolean) => {
  isEditDialogOpen.value = open;
  if (!open) {
    editingPortfolio.value = null;
    existingImageUrls.value = [];
    deletedImageUrls.value = [];
    handleRemoveAllImages();
  }
};

const handleRemoveExistingImage = async (index: number) => {
  const imageUrl = existingImageUrls.value[index];
  if (!imageUrl) return;
  
  deletedImageUrls.value.push(imageUrl);
  
  existingImageUrls.value.splice(index, 1);
};

const handleEditImageSelect = (event: Event) => {
  handleImageSelect(event);
};

const updatePortfolio = async (values: any) => {
  try {
    if (!editingPortfolio.value) return;

    if (existingImageUrls.value.length === 0 && selectedImageFiles.value.length === 0) {
      toast.error('Выберите хотя бы одно изображение');
      return;
    }

    isUpdatingPortfolio.value = true;

    const user = userStore.getUser();
    let imageUrls: string[] = [...existingImageUrls.value];

    if (selectedImageFiles.value.length > 0) {
      const newImageUrls: string[] = [];
      for (const file of selectedImageFiles.value) {
        const imageUrl = await uploadImageToStorage(file, user.id);
        newImageUrls.push(imageUrl);
      }
      imageUrls = [...imageUrls, ...newImageUrls];
    }

    if (imageUrls.length === 0 || !imageUrls[0]) {
      throw new Error('Не удалось загрузить изображения');
    }

    if (deletedImageUrls.value.length > 0) {
      try {
        await Promise.all(
          deletedImageUrls.value.map(url => deleteImageFromStorage(url))
        );
      } catch (error) {
        console.error('Ошибка при удалении старых изображений:', error);
      }
    }

    const imageUrlString = imageUrls.join('|');

    const updatePayload = {
      category: values.category,
      description: values.description,
      image_url: imageUrlString,
      is_public: Boolean(values.is_public),
      updated_at: new Date().toISOString(),
    };

    const { data: updatedPortfolio, error } = await supabase
      .from('portfolios')
      .update(updatePayload)
      .eq('id', editingPortfolio.value.id)
      .select()
      .single();

    if (error) {
      console.error('Supabase update error:', error);
      throw error;
    }

    const portfolioItem = {
      id: updatedPortfolio.id,
      category: updatedPortfolio.category,
      description: updatedPortfolio.description,
      image_url: imageUrls,
      is_public: updatedPortfolio.is_public,
      likes_count: updatedPortfolio.likes_count,
      views_count: updatedPortfolio.views_count,
      created_at: updatedPortfolio.created_at,
      updated_at: updatedPortfolio.updated_at,
    };

    const currentUser = userStore.getUser();
    const updatedPortfolioList = (currentUser.portfolio || []).map(item =>
      item.id === editingPortfolio.value!.id ? portfolioItem : item
    );
    userStore.updateUser({ portfolio: updatedPortfolioList });

    toast.success('Портфолио успешно обновлено');

    isEditDialogOpen.value = false;
    editingPortfolio.value = null;
    existingImageUrls.value = [];
    selectedImageFiles.value = [];
    previewImageUrls.value = [];
    if (editImageInput.value) editImageInput.value.value = '';
  } catch (error: any) {
    toast.error(error.message || 'Ошибка при обновлении портфолио');
  } finally {
    isUpdatingPortfolio.value = false;
  }
};

// ----------------
// ----- Page -----
// ----------------

definePageMeta({
  middleware: 'auth',
});

useHead({ title: 'Портфолио' });
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold">Моё портфолио</h1>
        <p class="text-muted-foreground mt-1 text-sm">
          Управляйте своими работами
        </p>
      </div>
      
      <ui-dialog :open="isAddDialogOpen" @update:open="handleDialogClose">
        <ui-dialog-trigger as-child>
          <ui-button>
            <Plus class="w-4 h-4" />
            Добавить работу
          </ui-button>
        </ui-dialog-trigger>
        <ui-dialog-content class="sm:max-w-2xl">
          <ui-dialog-header>
            <ui-dialog-title>Добавить работу в портфолио</ui-dialog-title>
            <ui-dialog-description>
              Заполните информацию о вашей работе
            </ui-dialog-description>
          </ui-dialog-header>
          
          <VeeForm 
            v-if="isAddDialogOpen"
            :validation-schema="toTypedSchema(portfolioCreateSchema)"
            :initial-values="{ category: '', description: '', is_public: false }"
            @submit="createPortfolio"
            v-slot="{ resetForm: resetFormFn }"
          >
            <ui-field-group class="py-4">
              <base-select
                name="category"
                label="Категория"
                placeholder="Выберите категорию"
                :options="PORTFOLIO_CATEGORIES"
                errors-to-show="all"
              />

              <vee-field name="description" v-slot="{ field, errors }">
                <ui-field :data-invalid="!!errors.length">
                  <ui-field-label for="description">
                    Описание
                  </ui-field-label>
                  <ui-textarea
                    id="description"
                    placeholder="Опишите вашу работу"
                    :aria-invalid="!!errors.length"
                    v-bind="field"
                  />
                  <ui-field-error
                    v-if="errors.length"
                    :errors="errors"
                  />
                </ui-field>
              </vee-field>

              <vee-field name="image_file" v-slot="{ errors }">
                <ui-field :data-invalid="!!errors.length">
                  <ui-field-label>
                    Изображения
                  </ui-field-label>
                  <div class="space-y-4">
                    <div v-if="previewImageUrls.length > 0" class="grid grid-cols-4 gap-2">
                      <div
                        v-for="(preview, index) in previewImageUrls"
                        :key="index"
                        class="relative aspect-square w-full overflow-hidden rounded-lg bg-muted"
                      >
                        <img
                          :src="preview.url"
                          :alt="`Превью ${index + 1}`"
                          class="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          @click="() => handleRemoveImage(index)"
                          class="absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                        >
                          <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div>
                      <input
                        ref="imageInput"
                        type="file"
                        accept="image/*"
                        multiple
                        class="hidden"
                        @change="handleImageSelect"
                      />
                      <ui-button
                        type="button"
                        variant="outline"
                        :disabled="isUploadingImage"
                        @click="handleImageInputClick"
                        class="w-full"
                      >
                        <Upload v-if="!isUploadingImage" class="mr-2 h-4 w-4" />
                        <ui-spinner v-else size="sm" class="mr-2" />
                        {{ isUploadingImage ? 'Загрузка...' : selectedImageFiles.length > 0 ? `Добавить ещё (${selectedImageFiles.length} выбрано)` : 'Выбрать изображения' }}
                      </ui-button>
                      <p class="mt-1 text-xs text-muted-foreground">
                        Поддерживаемые форматы: JPG, PNG, GIF. Максимальный размер файла: 10МБ
                      </p>
                    </div>
                  </div>
                  <ui-field-error
                    v-if="errors.length"
                    :errors="errors"
                  />
                </ui-field>
              </vee-field>

              <vee-field name="is_public" v-slot="{ field, errors, setValue }">
                <ui-field :data-invalid="!!errors.length" orientation="horizontal">
                  <ui-field-label for="is_public" class="cursor-pointer flex-1">
                    Сделать публичным
                  </ui-field-label>

                  <ui-switch
                    id="is_public"
                    :checked="Boolean(field.value)"
                    @update:model-value="setValue"
                  />
                  <ui-field-error
                    v-if="errors.length"
                    :errors="errors"
                  />
                </ui-field>
              </vee-field>
            </ui-field-group>
            
            <ui-dialog-footer>
              <ui-button 
                type="button"
                variant="outline" 
                @click="isAddDialogOpen = false"
                :disabled="isCreatingPortfolio"
              >
                Отмена
              </ui-button>
              <base-processing-button
                type="submit"
                label="Добавить"
                :is-processing="isCreatingPortfolio"
              />
            </ui-dialog-footer>
          </VeeForm>
        </ui-dialog-content>
      </ui-dialog>
    </div>

    <div v-if="isLoadingPortfolio" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <ui-skeleton class="aspect-[3/4] w-full rounded-lg" />
      <ui-skeleton class="aspect-[3/4] w-full rounded-lg" />
      <ui-skeleton class="aspect-[3/4] w-full rounded-lg" />
      <ui-skeleton class="aspect-[3/4] w-full rounded-lg" />
    </div>

    <div v-else-if="!portfolio || portfolio.length === 0" class="flex flex-col items-center justify-center py-16">
      <ui-empty>
        <ui-empty-header>
          <ui-empty-media variant="icon">
            <briefcase-business />
          </ui-empty-media>
          <ui-empty-title>Работ нет</ui-empty-title>
          <ui-empty-description>
            У вас пока нет работ в портфолио
          </ui-empty-description>
        </ui-empty-header>
        <ui-empty-content>
          <div class="flex gap-2">
            <ui-button @click="isAddDialogOpen = true">
              <Plus class="w-4 h-4" />
              Добавить первую работу
            </ui-button>
          </div>
        </ui-empty-content>
      </ui-empty>
    </div>

    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div
        v-for="item in portfolio"
        :key="item.id"
        @click="openPortfolioDialog(item)"
        class="cursor-pointer"
      >
        <base-portfolio
          :category="item.category"
          :description="item.description"
          :image_url="item.image_url"
          :is_public="item.is_public"
          :likes_count="item.likes_count"
          :views_count="item.views_count"
          :created_at="item.created_at"
          :updated_at="item.updated_at"
        />
      </div>
    </div>

    <ui-dialog :open="isViewDialogOpen" @update:open="(open) => { isViewDialogOpen = open; if (!open) currentImageIndex = 0; }">
      <ui-dialog-content class="sm:max-w-md">
        <ui-dialog-header v-if="selectedPortfolio">
          <ui-dialog-title>{{ selectedPortfolio.category }}</ui-dialog-title>
          <ui-dialog-description>
            {{ selectedPortfolio.description }}
          </ui-dialog-description>
        </ui-dialog-header>
        
        <div v-if="selectedPortfolio" class="py-4">
          <div v-if="selectedPortfolio.image_url && selectedPortfolio.image_url.length > 0" class="mb-6 flex justify-center">
            <div class="relative aspect-[3/4] w-full max-w-xs overflow-hidden rounded-lg bg-muted">
              <img
                :src="selectedPortfolio.image_url[currentImageIndex]"
                :alt="`${selectedPortfolio.category} - ${currentImageIndex + 1}`"
                class="h-full w-full object-cover transition-opacity duration-300"
                loading="lazy"
              />
              
              <ui-button
                v-if="selectedPortfolio.image_url.length > 1"
                @click="prevImage"
                type="button"
                class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm p-2 text-foreground shadow-lg transition-all hover:bg-background/90 disabled:opacity-50"
                :disabled="selectedPortfolio.image_url.length <= 1"
              >
                <ChevronLeft class="h-5 w-5" />
              </ui-button>
              
              <ui-button
                v-if="selectedPortfolio.image_url.length > 1"
                @click="nextImage"
                type="button"
                class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm p-2 text-foreground shadow-lg transition-all hover:bg-background/90 disabled:opacity-50"
                :disabled="selectedPortfolio.image_url.length <= 1"
              >
                <ChevronRight class="h-5 w-5" />
              </ui-button>
              
              <div
                v-if="selectedPortfolio.image_url.length > 1"
                class="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-background/80 backdrop-blur-sm px-3 py-1 text-xs font-medium"
              >
                {{ currentImageIndex + 1 }} / {{ selectedPortfolio.image_url.length }}
              </div>
              
              <div
                v-if="selectedPortfolio.image_url.length > 1"
                class="absolute bottom-2 right-2 flex gap-1"
              >
                <ui-button
                  v-for="(image, index) in selectedPortfolio.image_url"
                  :key="index"
                  @click="currentImageIndex = index"
                  type="button"
                  :class="[
                    'h-2 w-2 rounded-full transition-all',
                    index === currentImageIndex
                      ? 'bg-primary w-6'
                      : 'bg-background/60 hover:bg-background/80'
                  ]"
                  :aria-label="`Перейти к изображению ${index + 1}`"
                />
              </div>
            </div>
          </div>

          <div class="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div class="flex items-center gap-2">
              <eye class="w-4 h-4" />
              <span>{{ selectedPortfolio.views_count }} {{ !isMobile ? 'просмотров' : ''}}</span>
            </div>
            <div class="flex items-center gap-2">
              <heart class="w-4 h-4" />
              <span>{{ selectedPortfolio.likes_count }} {{ !isMobile ? 'лайков' : ''}}</span>
            </div>
            <div v-if="selectedPortfolio.is_public" class="flex items-center gap-2">
              <globe class="w-4 h-4" />
              <span>Публичное</span>
            </div>
            <div v-else class="flex items-center gap-2">
              <lock class="w-4 h-4" />
              <span>Приватное</span>
            </div>
          </div>

          <div class="mt-4 text-sm text-muted-foreground">
            <p>Создано: {{ formatDate(selectedPortfolio.created_at) }}</p>
            <p v-if="selectedPortfolio.updated_at !== selectedPortfolio.created_at">
              Обновлено: {{ formatDate(selectedPortfolio.updated_at) }}
            </p>
          </div>
        </div>
        
        <ui-dialog-footer class="flex justify-between">
          <div class="flex space-x-2">  
            <ui-button 
              v-if="selectedPortfolio?.is_public"
              variant="outline" 
              @click="sharePortfolio"
              size="icon"
              class="inline-flex"
            >
              <share class="w-4 h-4" />
            </ui-button>
            
            <ui-button 
              variant="destructive" 
              @click="openDeleteDialog(selectedPortfolio!)"
              size="icon"
              class="inline-flex"
            >
              <trash2 class="w-4 h-4" />
            </ui-button>
            
            <ui-button 
              @click="openEditDialog(selectedPortfolio!)"
              class="inline-flex"
            >
              <pencil class="w-4 h-4 mr-2" />
              Редактировать
            </ui-button>
          </div>
        </ui-dialog-footer>
      </ui-dialog-content>
    </ui-dialog>

    <ui-dialog :open="isEditDialogOpen" @update:open="handleEditDialogClose">
      <ui-dialog-content class="sm:max-w-2xl">
        <ui-dialog-header>
          <ui-dialog-title>Редактировать портфолио</ui-dialog-title>
          <ui-dialog-description>
            Измените информацию о вашей работе
          </ui-dialog-description>
        </ui-dialog-header>
        
        <VeeForm 
          v-if="isEditDialogOpen && editingPortfolio"
          :key="`edit-${editingPortfolio.id}`"
          :validation-schema="toTypedSchema(portfolioCreateSchema)"
          :initial-values="editFormInitialValues"
          @submit="updatePortfolio"
        >
          <ui-field-group class="py-4">
            <base-select
              name="category"
              label="Категория"
              placeholder="Выберите категорию"
              :options="PORTFOLIO_CATEGORIES"
              errors-to-show="all"
            />

            <base-textarea
              name="description"
              label="Описание"
              placeholder="Опишите вашу работу"
              errors-to-show="all"
            />

            <vee-field name="image_file" v-slot="{ errors }">
              <ui-field :data-invalid="!!errors.length">
                <ui-field-label>
                  Изображения
                </ui-field-label>
                <div class="space-y-4">
                  <!-- Existing Images -->
                  <div v-if="existingImageUrls.length > 0" class="grid grid-cols-4 gap-2">
                    <div
                      v-for="(imageUrl, index) in existingImageUrls"
                      :key="index"
                      class="relative aspect-square w-full overflow-hidden rounded-lg bg-muted"
                    >
                      <img
                        :src="imageUrl"
                        :alt="`Изображение ${index + 1}`"
                        class="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        @click="() => handleRemoveExistingImage(index)"
                        class="absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                      >
                        <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <!-- New Image Previews -->
                  <div v-if="previewImageUrls.length > 0" class="grid grid-cols-4 gap-2">
                    <div
                      v-for="(preview, index) in previewImageUrls"
                      :key="index"
                      class="relative aspect-square w-full overflow-hidden rounded-lg bg-muted"
                    >
                      <img
                        :src="preview.url"
                        :alt="`Превью ${index + 1}`"
                        class="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        @click="() => handleRemoveImage(index)"
                        class="absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                      >
                        <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div>
                    <input
                      ref="editImageInput"
                      type="file"
                      accept="image/*"
                      multiple
                      class="hidden"
                      @change="handleEditImageSelect"
                    />
                    <ui-button
                      type="button"
                      variant="outline"
                      :disabled="isUploadingImage"
                      @click="editImageInput?.click()"
                      class="w-full"
                    >
                      <Upload v-if="!isUploadingImage" class="mr-2 h-4 w-4" />
                      <ui-spinner v-else size="sm" class="mr-2" />
                      {{ isUploadingImage ? 'Загрузка...' : selectedImageFiles.length > 0 ? `Добавить ещё (${selectedImageFiles.length} выбрано)` : 'Добавить изображения' }}
                    </ui-button>
                    <p class="mt-1 text-xs text-muted-foreground">
                      Поддерживаемые форматы: JPG, PNG, GIF. Максимальный размер файла: 10МБ
                    </p>
                  </div>
                </div>
                <ui-field-error
                  v-if="errors.length"
                  :errors="errors"
                />
              </ui-field>
            </vee-field>

            <vee-field name="is_public" v-slot="{ field, errors, setValue }">
              <ui-field :data-invalid="!!errors.length" orientation="horizontal">
                <ui-field-label for="is_public" class="cursor-pointer flex-1">
                  Сделать публичным
                </ui-field-label>

                <ui-switch
                  id="is_public"
                  :model-value="field.value"
                  @update:model-value="setValue"
                  :aria-invalid="!!errors.length"
                />
                <ui-field-error
                  v-if="errors.length"
                  :errors="errors"
                />
              </ui-field>
            </vee-field>
            </ui-field-group>
            
            <ui-dialog-footer>
              <ui-button 
                type="button"
                variant="outline" 
                @click="isEditDialogOpen = false"
                :disabled="isUpdatingPortfolio"
              >
                Отмена
              </ui-button>
              <base-processing-button
                type="submit"
                label="Сохранить"
                :is-processing="isUpdatingPortfolio"
              />
            </ui-dialog-footer>
          </VeeForm>
      </ui-dialog-content>
    </ui-dialog>

    <ui-dialog :open="isDeleteDialogOpen" @update:open="isDeleteDialogOpen = $event">
      <ui-dialog-content class="sm:max-w-md">
        <ui-dialog-header>
          <ui-dialog-title class="flex items-center gap-2">
            <AlertTriangle class="h-5 w-5 text-destructive" />
            Удалить портфолио
          </ui-dialog-title>
          <ui-dialog-description>
            Вы уверены, что хотите удалить это портфолио? Это действие нельзя отменить. Все изображения также будут удалены.
          </ui-dialog-description>
        </ui-dialog-header>
        
        <ui-dialog-footer>
          <ui-button 
            variant="outline" 
            @click="isDeleteDialogOpen = false"
            :disabled="isDeletingPortfolio"
          >
            Отмена
          </ui-button>
          <ui-button 
            variant="destructive" 
            @click="deletePortfolio"
            :disabled="isDeletingPortfolio"
          >
            <Trash2 v-if="!isDeletingPortfolio" class="w-4 h-4 mr-2" />
            <ui-spinner v-else size="sm" class="mr-2" />
            {{ isDeletingPortfolio ? 'Удаление...' : 'Удалить' }}
          </ui-button>
        </ui-dialog-footer>
      </ui-dialog-content>
    </ui-dialog>
  </div>
</template>
