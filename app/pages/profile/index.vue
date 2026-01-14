<script lang="ts" setup>
import { parseDate } from '@internationalized/date';
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { Camera, AlertCircleIcon } from 'lucide-vue-next';
import { toast } from "vue-sonner";

const gender = [
  {
    value: 'none',
    label: 'Не указан'
  },
  {
    value: 'men',
    label: 'Мужской'
  },
  {
    value: 'women',
    label: 'Женский'
  }
];

const supabase = useSupabaseClient<Database>();
const currentUserStore = useCurrentUserStore();
const currentUser = computed(() => currentUserStore.getUser());

const avatarInput = ref<HTMLInputElement | null>(null);
const coverInput = ref<HTMLInputElement | null>(null);

const isAvatarUploading = ref(false);
const isCoverUploading = ref(false);

const handleAvatarClick = () => {
  avatarInput.value?.click();
};

const handleCoverButtonClick = () => {
  coverInput.value?.click();
};

const activeTab = ref('profile');
const isLoading = ref(false);
const isUpdateProcessing = ref<boolean>(false);
const updateErrorMessage = ref<string | null>(null);

const birthDate = ref(currentUser.value.birth_date ? parseDate(currentUser.value.birth_date) : null);

const { handleSubmit, setValues } = useForm({
  validationSchema: toTypedSchema(userUpdateSchema),
  keepValuesOnUnmount: true,
  initialValues: {
    email: currentUser.value.email,
    first_name: currentUser.value.first_name,
    last_name: currentUser.value.last_name,
    phone: currentUser.value.phone,
    city: currentUser.value.city,
    gender: currentUser.value.gender || 'none',
  },
});

const loadData = async () => {
  isLoading.value = true;
  
  await new Promise(resolve => setTimeout(resolve, 600)); 
  
  refreshFormData();
  isLoading.value = false;
};

onMounted(() => {
  loadData();
});

watch(activeTab, (newTab) => {
  if (newTab === 'profile') {
    loadData();
  }
});

// ---------------------
// ----- Functions -----
// ---------------------

const refreshFormData = () => {
  const user = currentUserStore.getUser();
  if (user) {
    setValues({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      city: user.city,
      gender: user.gender || 'none',
    });
    birthDate.value = user.birth_date ? parseDate(user.birth_date) : null;
  }
};

const userUpdate = handleSubmit(async (values) => {
  try {
    updateErrorMessage.value = null;
    isUpdateProcessing.value = true;

    const payload = {
      ...values,
      birth_date: birthDate.value ? birthDate.value.toString() : null,
    };

    const { error } = await supabase
      .from('users')
      .update(payload)
      .eq('id', currentUser.value.id)
    
    if (error) throw error;

    currentUserStore.updateUser(payload);
    toast.success('Данные успешно обновленны');
  } catch (error) {
    updateErrorMessage.value = 'Ошибка при обновлении данных';
  } finally {
    isUpdateProcessing.value = false;
  }
}, ({ errors }) => {
  console.log('Ошибки валидации:', errors);
});

const uploadAvatar = async (event: any) => {
  const file = event.target.files?.[0];
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    toast.error('Файл слишком большой (макс. 2МБ)');
    return;
  }

  try {
    isAvatarUploading.value = true;

    const fileExt = file.name.split('.').pop();
    const filePath = `${currentUser.value.id}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, {
        upsert: true,
        cacheControl: '3600'
      });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    const { error: updateError } = await supabase
      .from('users')
      .update({ avatar_url: publicUrl })
      .eq('id', currentUser.value.id);

    if (updateError) throw updateError;

    const finalUrl = `${publicUrl}?t=${Date.now()}`;
    
    currentUserStore.updateUser({ 
      ...currentUser.value, 
      avatar_url: finalUrl 
    });

    toast.success('Аватар успешно обновлен');

  } catch (error: any) {
    toast.error('Ошибка загрузки: ' + error.message);
  } finally {
    isAvatarUploading.value = false;
    if (avatarInput.value) avatarInput.value.value = '';
  }
};

const uploadCover = async (event: any) => {
  const file = event.target.files?.[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    toast.error('Файл обложки слишком большой (макс. 5МБ)');
    return;
  }

  try {
    isCoverUploading.value = true;

    const fileExt = file.name.split('.').pop();
    const filePath = `${currentUser.value.id}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('covers') 
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('covers')
      .getPublicUrl(filePath);

    const { error: updateError } = await supabase
      .from('users')
      .update({ cover_url: publicUrl })
      .eq('id', currentUser.value.id);

    if (updateError) throw updateError;

    const finalUrl = `${publicUrl}?t=${Date.now()}`;
    
    currentUserStore.updateUser({ 
      ...currentUser.value, 
      cover_url: finalUrl 
    });

    toast.success('Обложка успешно обновлена');
  } catch (error: any) {
    toast.error('Ошибка загрузки обложки');
  } finally {
    isCoverUploading.value = false;
    if (coverInput.value) coverInput.value.value = '';
  }
};

definePageMeta({
  layout: 'profile',
  middleware: 'auth',
});
useHead({ title: 'Профиль' });
</script>

<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-80px)] bg-muted/40 p-4">
    <ui-card class="w-full max-w-4xl overflow-hidden">
      <ui-tabs v-model="activeTab" class="flex flex-col md:flex-row">
        
        <aside class="w-full md:w-64 border-b md:border-b-0 md:border-r p-4">
          <div class="flex flex-col space-y-4">
            <div class="px-2 py-2 hidden md:block">
              <h2 class="text-lg font-semibold tracking-tight">Настройки</h2>
              <p class="text-sm text-muted-foreground">Управление аккаунтом</p>
            </div>
            
            <ui-tabs-list class="flex flex-row md:flex-col h-auto bg-transparent gap-1 items-stretch justify-start overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
              <ui-tabs-trigger 
                value="profile" 
                class="flex-1 md:flex-none justify-center md:justify-start px-4 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                Профиль
              </ui-tabs-trigger>
              <ui-tabs-trigger 
                value="account" 
                class="flex-1 md:flex-none justify-center md:justify-start px-4 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                Дополнительно
              </ui-tabs-trigger>
              <ui-tabs-trigger 
                value="notifications" 
                class="flex-1 md:flex-none justify-center md:justify-start px-4 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                Портфолио
              </ui-tabs-trigger>
              <ui-tabs-trigger 
                value="2" 
                class="flex-1 md:flex-none justify-center md:justify-start px-4 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                Избранное
              </ui-tabs-trigger>
            </ui-tabs-list>
          </div>
        </aside>

        <div class="flex-1 p-6 md:p-8">
          <ui-tabs-content value="profile" class="mt-0 border-none p-0 outline-none">
            <div v-if="isLoading" class="flex flex-col items-center justify-center min-h-[300px] gap-2">
              <ui-spinner size="lg" />
              <p class="text-sm text-muted-foreground">Загрузка данных...</p>
            </div>

            <div v-else class="space-y-6">
              <div class="relative mb-12"> 
                <div 
                  class="relative h-36 w-full overflow-hidden rounded-lg bg-muted transition-all"
                  :class="{ 'opacity-50': isCoverUploading }"
                >
                  <img 
                    v-if="currentUser?.cover_url" 
                    :src="currentUser.cover_url" 
                    class="h-full w-full object-cover"
                  />
                  <div v-else class="h-full w-full bg-gradient-to-r from-blue-500 to-purple-600" />

                  <div class="absolute right-4 top-4 z-10">
                    <ui-button 
                      variant="secondary" 
                      size="sm" 
                      class="backdrop-blur-sm"
                      :disabled="isCoverUploading"
                      @click="handleCoverButtonClick"
                    >
                      <ui-spinner v-if="isCoverUploading" size="sm" class="mr-2" />
                      <camera v-else class="mr-2 h-4 w-4" />
                      {{ isCoverUploading ? 'Загрузка...' : 'Изменить обложку' }}
                    </ui-button>
                  </div>

                  <input 
                    ref="coverInput"
                    type="file" 
                    accept="image/*" 
                    class="hidden" 
                    @change="uploadCover" 
                  />
                </div>

                <div class="absolute -bottom-10 left-1/2 z-20 -translate-x-1/2 transform">
                  <div class="relative cursor-pointer group" @click="handleAvatarClick">
                    </div>
                </div>

                <div class="absolute -bottom-10 left-1/2 z-20 -translate-x-1/2 transform">
                  <div class="relative cursor-pointer group" @click="handleAvatarClick">
                    <ui-avatar class="h-32 w-32 rounded-full backdrop-blur-sm transition-opacity group-hover:opacity-80">
                      <ui-avatar-image :src="currentUser.avatar_url || ''" :alt="currentUser.first_name" />
                      <ui-avatar-fallback>
                        {{ currentUser.first_name.charAt(0) + currentUser.last_name.charAt(0) }}
                      </ui-avatar-fallback>
                    </ui-avatar>
                    
                    <div 
                      v-if="isAvatarUploading" 
                      class="absolute inset-0 z-30 flex items-center justify-center bg-black/50 rounded-full"
                    >
                      <ui-spinner class="text-white" />
                    </div>
                    
                    <div v-else class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-full">
                      <camera class="text-white" />
                    </div>

                    <input 
                      ref="avatarInput"
                      type="file" 
                      accept="image/*" 
                      class="hidden" 
                      @change="uploadAvatar" 
                    />
                  </div>
                </div>
              </div>

              <form class="flex flex-col gap-4" @submit.prevent="userUpdate">
                <ui-field-group>
                  <ui-alert
                    v-if="updateErrorMessage"
                    variant="destructive"
                    class="border-destructive"
                  >
                    <alert-circle-icon />
                    <ui-alert-title class="font-normal">
                      <p>{{ updateErrorMessage }}</p>
                    </ui-alert-title>
                  </ui-alert>

                  <div class="grid grid-cols-2 gap-2">
                    <base-input 
                      name="first_name"
                      type="text"
                      label="Имя"
                      placeholder="Иван"
                    />
                    <base-input 
                      name="last_name"
                      type="text"
                      label="Фамилия"
                      placeholder="Петров"
                    />
                  </div>

                  <div class="grid grid-cols-2 gap-2">
                    <base-date-picker 
                      name="birth_date" 
                      label="Дата рождения"
                      placeholder="Выберите дату"
                      v-model="birthDate"
                    />
                    <base-select
                      name="gender"
                      label="Пол"
                      placeholder="Выберите пол"
                      :options="gender"
                    />
                  </div>

                  <div class="grid grid-cols-2 gap-2">
                    <base-input 
                      name="email"
                      type="text"
                      label="Электронная почта"
                      placeholder="email@example.com"
                      :disabled="true"
                    />
                    <base-input 
                      name="phone"
                      type="text"
                      label="Номер телефона"
                      placeholder="+375 (11) 222-33-44"
                      mask="+375 (##) ###-##-##"
                    />
                  </div>

                  <base-input 
                    name="city"
                    type="text"
                    label="Город"
                    placeholder="Минск"
                  />

                  <ui-field>
                    <base-processing-button
                      type="submit"
                      label="Сохранить"
                      :is-processing="isUpdateProcessing"
                    />
                  </ui-field>
                </ui-field-group>
              </form>
            </div>
          </ui-tabs-content>

          <ui-tabs-content value="account" class="mt-0 border-none p-0 outline-none">
            <div class="space-y-6">
              <div>
                <h3 class="text-lg font-medium">Настройки аккаунта</h3>
                <p class="text-sm text-muted-foreground">Управление почтой и безопасностью.</p>
              </div>
              <ui-separator />
              <div class="grid gap-4">
                <div class="grid gap-2">
                  <ui-label for="email">Email</ui-label>
                  <ui-input id="email" type="email" value="user@example.com" />
                </div>
                <ui-button class="w-fit">Сохранить изменения</ui-button>
              </div>
            </div>
          </ui-tabs-content>
        </div>
        
      </ui-tabs>
    </ui-card>
  </div>
</template>
