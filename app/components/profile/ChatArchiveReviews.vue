<script setup lang="ts">
import { Star } from 'lucide-vue-next';
import type { UserReview } from '../../types/announcementChats';

const props = defineProps<{
  reviews: UserReview[];
  isLoading: boolean;
  currentUserId: string | null;
  companionName: string;
}>();

const myReview = computed(() => {
  if (!props.currentUserId) return null;
  return props.reviews.find(review => review.reviewer_id === props.currentUserId) || null;
});

const receivedReview = computed(() => {
  if (!props.currentUserId) return null;
  return props.reviews.find(review => review.reviewed_user_id === props.currentUserId) || null;
});

function formatReviewDate(value: string) {
  return new Date(value).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
</script>

<template>
  <div class="space-y-3 pt-2">
    <h3 class="text-sm font-semibold">Отзывы</h3>

    <div v-if="isLoading" class="space-y-3">
      <ui-skeleton class="h-24 w-full rounded-xl" />
      <ui-skeleton class="h-24 w-full rounded-xl" />
    </div>

    <div v-else class="space-y-3">
      <article class="rounded-xl border bg-card p-4">
        <p class="text-sm font-medium">Ваш отзыв</p>
        <template v-if="myReview">
          <div class="mt-2 flex items-center gap-0.5">
            <Star
              v-for="star in 5"
              :key="`my-${star}`"
              class="h-4 w-4"
              :class="star <= myReview.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'"
            />
          </div>
          <p v-if="myReview.comment" class="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">
            {{ myReview.comment }}
          </p>
          <p v-else class="mt-2 text-sm text-muted-foreground">Без комментария</p>
          <p class="mt-2 text-xs text-muted-foreground">{{ formatReviewDate(myReview.created_at) }}</p>
        </template>
        <p v-else class="mt-2 text-sm text-muted-foreground">Вы не оставили отзыв</p>
      </article>

      <article class="rounded-xl border bg-card p-4">
        <p class="text-sm font-medium">Отзыв от {{ companionName }}</p>
        <template v-if="receivedReview">
          <div class="mt-2 flex items-center gap-0.5">
            <Star
              v-for="star in 5"
              :key="`received-${star}`"
              class="h-4 w-4"
              :class="star <= receivedReview.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'"
            />
          </div>
          <p v-if="receivedReview.comment" class="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">
            {{ receivedReview.comment }}
          </p>
          <p v-else class="mt-2 text-sm text-muted-foreground">Без комментария</p>
          <p class="mt-2 text-xs text-muted-foreground">{{ formatReviewDate(receivedReview.created_at) }}</p>
        </template>
        <p v-else class="mt-2 text-sm text-muted-foreground">Отзыв не оставлен</p>
      </article>
    </div>
  </div>
</template>
