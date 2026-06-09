<script setup lang="ts">
import { Star } from 'lucide-vue-next';
import type { UserReview } from '../../types/announcementChats';

defineProps<{
  reviews: UserReview[];
  isLoading: boolean;
}>();

function formatReviewDate(value: string) {
  return new Date(value).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function getReviewerName(review: UserReview) {
  if (!review.reviewer) return 'Пользователь';
  return `${review.reviewer.first_name} ${review.reviewer.last_name}`.trim() || 'Пользователь';
}

function getReviewerInitials(review: UserReview) {
  return getReviewerName(review).slice(0, 2).toUpperCase();
}
</script>

<template>
  <div class="space-y-3">
    <h3 class="text-sm font-semibold">Отзывы</h3>

    <div v-if="isLoading" class="space-y-3">
      <ui-skeleton v-for="i in 2" :key="i" class="h-24 w-full rounded-xl" />
    </div>

    <div v-else-if="reviews.length === 0" class="rounded-lg border border-dashed bg-muted/40 p-4 text-sm text-muted-foreground">
      Отзывов пока нет
    </div>

    <div v-else class="space-y-3">
      <article
        v-for="review in reviews"
        :key="review.id"
        class="rounded-xl border bg-card p-4"
      >
        <div class="flex items-start gap-3">
          <ui-avatar class="h-10 w-10 shrink-0">
            <ui-avatar-image :src="review.reviewer?.avatar_url || ''" />
            <ui-avatar-fallback>{{ getReviewerInitials(review) }}</ui-avatar-fallback>
          </ui-avatar>

          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <p class="font-medium">{{ getReviewerName(review) }}</p>
              <span class="text-xs text-muted-foreground">{{ formatReviewDate(review.created_at) }}</span>
            </div>

            <div class="mt-1 flex items-center gap-0.5">
              <Star
                v-for="star in 5"
                :key="star"
                class="h-4 w-4"
                :class="star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'"
              />
            </div>

            <p v-if="review.comment" class="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">
              {{ review.comment }}
            </p>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
