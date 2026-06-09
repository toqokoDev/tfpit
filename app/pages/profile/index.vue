<script lang="ts" setup>
import type { UserReview } from '../../types/announcementChats';

const activeTab = ref('profile');
const supabase = useSupabaseClient<Database>();
const currentUserStore = useCurrentUserStore();
const reviews = ref<UserReview[]>([]);
const isLoadingReviews = ref(false);

definePageMeta({
  middleware: 'auth',
});
useHead({ title: 'Профиль' });

const fetchReviews = async () => {
  const userId = currentUserStore.user?.id;
  if (!userId) return;

  try {
    isLoadingReviews.value = true;

    const { data, error } = await supabase
      .from('announcement_chat_reviews')
      .select(`
        id,
        chat_id,
        reviewer_id,
        reviewed_user_id,
        rating,
        comment,
        created_at,
        reviewer:users!announcement_chat_reviews_reviewer_id_fkey(id, first_name, last_name, avatar_url)
      `)
      .eq('reviewed_user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    reviews.value = (data || []) as unknown as UserReview[];
  } catch (err) {
    console.error('Ошибка загрузки отзывов:', err);
  } finally {
    isLoadingReviews.value = false;
  }
};

watch(
  () => currentUserStore.user?.id,
  (userId) => {
    if (userId) fetchReviews();
  },
  { immediate: true },
);
</script>

<template>
  <div class="flex flex-col items-center gap-4 min-h-[calc(100vh-80px)] bg-muted/40 p-4">
    <ui-card class="w-full max-w-4xl overflow-hidden">
      <ui-tabs v-model="activeTab" class="flex flex-col md:flex-row">
        
        <aside class="w-full md:w-64 border-b md:border-b-0 md:border-r p-4 order-1 md:order-none">
          <div class="flex flex-col space-y-4">
            <div class="px-2 py-2 hidden md:block">
              <h2 class="text-lg font-semibold tracking-tight">Настройки</h2>
              <p class="text-sm text-muted-foreground">Управление аккаунтом</p>
            </div>
            
            <ui-tabs-list class="flex flex-row md:flex-col flex-wrap md:flex-nowrap h-auto bg-transparent gap-1 items-stretch justify-start overflow-x-visible pb-2 md:pb-0">
              <ui-tabs-trigger 
                value="profile" 
                class="flex-1 md:flex-none justify-center md:justify-start px-2 md:px-4 py-2 text-sm md:text-base min-w-0"
              >
                Профиль
              </ui-tabs-trigger>
              <ui-tabs-trigger 
                value="information" 
                class="flex-1 md:flex-none justify-center md:justify-start px-2 md:px-4 py-2 text-sm md:text-base min-w-0"
              >
                Информация
              </ui-tabs-trigger>
              <ui-tabs-trigger 
                value="additionally" 
                class="flex-1 md:flex-none justify-center md:justify-start px-2 md:px-4 py-2 text-sm md:text-base min-w-0"
              >
                Дополнительно
              </ui-tabs-trigger>
            </ui-tabs-list>
          </div>
        </aside>

        <div class="flex-1 p-6 md:p-8 order-2 md:order-none">
          <ui-tabs-content value="profile" class="mt-0 border-none p-0 outline-none">
            <profile :active-tab="activeTab" />
          </ui-tabs-content>

          <ui-tabs-content value="information" class="mt-0 border-none p-0 outline-none">
            <profile-information />
          </ui-tabs-content>

          <ui-tabs-content value="additionally" class="mt-0 border-none p-0 outline-none">
            <profile-additionally />
          </ui-tabs-content>
        </div>
        
      </ui-tabs>
    </ui-card>

    <ui-card class="w-full max-w-4xl overflow-hidden">
      <ui-card-content class="p-6 md:p-8">
        <profile-user-reviews
          :reviews="reviews"
          :is-loading="isLoadingReviews"
        />
      </ui-card-content>
    </ui-card>
  </div>
</template>
