<script lang="ts" setup>
import { toast } from "vue-sonner";
import { useForm, Field as VeeField } from "vee-validate";
import { AlertCircleIcon, Star, Link as LinkIcon, Share2 } from 'lucide-vue-next';

const props = defineProps<{
  activeTab?: string;
}>();

const supabase = useSupabaseClient<Database>();
const currentUserStore = useCurrentUserStore();
const currentUser = computed(() => currentUserStore.getUser());

const isUpdateProcessing = ref(false);
const updateErrorMessage = ref<string | null>(null);
const ratingValue = computed(() => currentUser.value.rating || 0);

const shareProfile = async () => {
  const profileUrl = `/profile/user/${currentUser.value.id}`;
  const fullUrl = window.location.origin + profileUrl;
  
  await navigator.clipboard.writeText(fullUrl);
  toast.success('Ссылка скопирована в буфер обмена');
};

const { handleSubmit, setValues } = useForm({
  keepValuesOnUnmount: true,
  initialValues: {
    bio: currentUser.value.bio || '',
    experience_level: [currentUser.value.experience_level],
    social_instagram: currentUser.value.socials.instagram || '',
    social_vk: currentUser.value.socials.vk || '',
    social_telegram: currentUser.value.socials.telegram || '',
    social_website: currentUser.value.socials.website || '',
  },
});

const refreshFormData = () => {
  const user = currentUserStore.getUser();
  if (!user) return;

  setValues({
    bio: user.bio || '',
    experience_level: [user.experience_level],
    social_instagram: user.socials.instagram || '',
    social_vk: user.socials.vk || '',
    social_telegram: user.socials.telegram || '',
    social_website: user.socials.website || '',
  });
};

onMounted(() => {
  refreshFormData();
});

watch(() => props.activeTab, (newTab) => {
  if (newTab === 'information') {
    refreshFormData();
  }
});

const informationUpdate = handleSubmit(async (values) => {
  try {
    updateErrorMessage.value = null;
    isUpdateProcessing.value = true;

    const payloadUser = {
      bio: values.bio,
      experience_level: values.experience_level[0],
    };

    const payloadSocials = {
      vk: values.social_vk,
      website: values.social_website,
      telegram: values.social_telegram,
      instagram: values.social_instagram,
    };

    const { error: uppdateUserError } = await supabase
      .from('users')
      .update(payloadUser)
      .eq('id', currentUser.value.id);
    
    if (uppdateUserError) throw uppdateUserError;

    const { error: uppdateSocialsError } = await supabase
      .from('socials')
      .update(payloadSocials)
      .eq('user_id', currentUser.value.id);

    if (uppdateSocialsError) throw uppdateSocialsError;

    currentUserStore.updateUser({
      ...payloadUser,
      socials: payloadSocials,
    });
    
    toast.success('Информация успешно обновлена');
  } catch (error) {
    updateErrorMessage.value = 'Ошибка при обновлении информации';
    toast.error('Ошибка при обновлении информации');
  } finally {
    isUpdateProcessing.value = false;
  }
});
</script>

<template>
  <div class="space-y-6">
    <!-- Рейтинг -->
    <div class="flex flex-col items-center justify-center gap-2">
      <div class="flex items-center gap-2">
        <star class="h-6 w-6" />
        <span class="text-2xl font-semibold">{{ ratingValue }}</span>
      </div>
      <p class="text-sm text-muted-foreground text-center">
        Рейтинг пользователя
      </p>
    </div>

    <!-- Кнопка поделиться профилем -->
    <div class="flex justify-center">
      <ui-button
        variant="outline"
        @click="shareProfile"
        class="gap-2"
      >
        <share2 class="h-4 w-4" />
        Поделиться профилем
      </ui-button>
    </div>

    <form class="flex flex-col gap-4" @submit.prevent="informationUpdate">
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

        <base-textarea
          name="bio"
          label="Обо мне"
          placeholder="Расскажите о себе..."
          errors-to-show="all"
        />

        <vee-field name="experience_level" v-slot="{ field, errors, setValue }">
          <ui-field :data-invalid="!!errors.length">
            <ui-field-label>
              {{ field.value < 3 ? 'Не опытный' : field.value >= 3 && field.value < 10 ? 'Любитель' : 'Профессионал' }}
            </ui-field-label>
            <div class="mt-2">
              <ui-slider
                :model-value="field.value"
                :min="0"
                :max="15"
                :step="1"
                @update:model-value="setValue"
              />
            </div>
            <ui-field-description>
              Выберите ваш опыт работы от 0 до 15 лет
            </ui-field-description>
            <ui-field-error
              v-if="errors.length"
              :errors="errors"
            />
          </ui-field>
        </vee-field>

        <div class="space-y-4">
          <ui-field-label class="flex items-center gap-2">
            <link-icon class="h-4 w-4" />
            Социальные сети
          </ui-field-label>
          
          <base-input 
            name="social_instagram"
            type="url"
            label="Instagram"
            placeholder="https://instagram.com/username"
          />
          <base-input 
            name="social_vk"
            type="url"
            label="ВКонтакте"
            placeholder="https://vk.com/username"
          />
          <base-input 
            name="social_telegram"
            type="url"
            label="Telegram"
            placeholder="https://t.me/username"
          />
          <base-input 
            name="social_website"
            type="url"
            label="Веб-сайт"
            placeholder="https://example.com"
          />
        </div>

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
