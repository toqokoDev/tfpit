<script lang="ts" setup>
import { parseDate } from '@internationalized/date';
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { Camera, AlertCircleIcon } from 'lucide-vue-next';
import { toast } from "vue-sonner";

type UploadType = 'avatar' | 'cover';

const props = defineProps<{
  activeTab: string;
}>();

const gender = [
  { value: 'none', label: 'Не указан' },
  { value: 'men', label: 'Мужской' },
  { value: 'women', label: 'Женский' }
];

const supabase = useSupabaseClient<Database>();
const currentUserStore = useCurrentUserStore();
const currentUser = computed(() => currentUserStore.getUser());

const avatarInput = ref<HTMLInputElement | null>(null);
const coverInput = ref<HTMLInputElement | null>(null);

const isDataloading = ref(false);
const isAvatarUploading = ref(false);
const isCoverUploading = ref(false);
const isUpdateProcessing = ref(false);
const updateErrorMessage = ref<string | null>(null);

const birthDate = ref(
  currentUser.value.birth_date 
    ? parseDate(currentUser.value.birth_date) 
    : null
);

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

const refreshFormData = () => {
  isDataloading.value = true;

  const user = currentUserStore.getUser();
  if (!user) return;

  setValues({
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    phone: user.phone,
    city: user.city,
    gender: user.gender || 'none',
  });
  birthDate.value = user.birth_date ? parseDate(user.birth_date) : null;

  isDataloading.value = false;
};

onMounted(() => {
  refreshFormData();
});

watch(() => props.activeTab, (newTab) => {
  if (newTab === 'profile') {
    refreshFormData();
  }
});

const handleAvatarClick = () => avatarInput.value?.click();
const handleCoverButtonClick = () => coverInput.value?.click();

const userUpdate = handleSubmit(async (values) => {
  try {
    updateErrorMessage.value = null;
    isUpdateProcessing.value = true;

    const payload = {
      ...values,
      birth_date: birthDate.value?.toString() ?? null,
    };

    const { error } = await supabase
      .from('users')
      .update(payload)
      .eq('id', currentUser.value.id);
    
    if (error) throw error;

    currentUserStore.updateUser(payload);
    toast.success('Данные успешно обновлены');
  } catch (error) {
    updateErrorMessage.value = 'Ошибка при обновлении данных';
    console.error('Ошибка обновления данных:', error);
  } finally {
    isUpdateProcessing.value = false;
  }
});

const uploadFile = async (
  event: Event,
  type: UploadType
) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const config: Record<UploadType, {
    bucket: string;
    maxSize: number;
    maxSizeMessage: string;
    successMessage: string;
    errorMessage: string;
    fieldName: 'avatar_url' | 'cover_url';
    isLoading: Ref<boolean>;
    inputRef: Ref<HTMLInputElement | null>;
    cacheControl?: string;
  }> = {
    avatar: {
      bucket: 'avatars',
      maxSize: 2 * 1024 * 1024,
      maxSizeMessage: 'Файл слишком большой (макс. 2МБ)',
      successMessage: 'Аватар успешно обновлен',
      errorMessage: 'Ошибка загрузки аватара',
      fieldName: 'avatar_url',
      isLoading: isAvatarUploading,
      inputRef: avatarInput,
      cacheControl: '3600',
    },
    cover: {
      bucket: 'covers',
      maxSize: 5 * 1024 * 1024,
      maxSizeMessage: 'Файл обложки слишком большой (макс. 5МБ)',
      successMessage: 'Обложка успешно обновлена',
      errorMessage: 'Ошибка загрузки обложки',
      fieldName: 'cover_url',
      isLoading: isCoverUploading,
      inputRef: coverInput,
    },
  };

  const { bucket, maxSize, maxSizeMessage, successMessage, errorMessage, fieldName, isLoading, inputRef, cacheControl } = config[type];

  if (file.size > maxSize) {
    toast.error(maxSizeMessage);
    return;
  }

  try {
    isLoading.value = true;

    const fileExt = file.name.split('.').pop();
    const filePath = `${currentUser.value.id}.${fileExt}`;

    const uploadOptions = cacheControl 
      ? { upsert: true, cacheControl } 
      : { upsert: true };

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, uploadOptions);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    const { error: updateError } = await supabase
      .from('users')
      .update({ [fieldName]: publicUrl })
      .eq('id', currentUser.value.id);

    if (updateError) throw updateError;

    const finalUrl = `${publicUrl}?t=${Date.now()}`;
    
    currentUserStore.updateUser({ 
      ...currentUser.value, 
      [fieldName]: finalUrl 
    });

    toast.success(successMessage);
  } catch (error) {
    const message = error instanceof Error ? error.message : errorMessage;
    toast.error(message);
    console.error(errorMessage, error);
  } finally {
    isLoading.value = false;
    if (inputRef.value) inputRef.value.value = '';
  }
};

const uploadAvatar = (event: Event) => uploadFile(event, 'avatar');
const uploadCover = (event: Event) => uploadFile(event, 'cover');

</script>

<template>
  <div class="space-y-6">
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
</template>
