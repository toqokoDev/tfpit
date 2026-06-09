<script setup lang="ts">
import { Star } from 'lucide-vue-next';

const props = defineProps<{
  open: boolean;
  companionName: string;
  isSubmitting: boolean;
}>();

const emit = defineEmits<{
  'update:open': [value: boolean];
  submit: [payload: { rating: number | null; comment: string }];
}>();

const rating = ref(0);
const hoveredRating = ref(0);
const comment = ref('');

watch(() => props.open, (isOpen) => {
  if (!isOpen) {
    rating.value = 0;
    hoveredRating.value = 0;
    comment.value = '';
  }
});

function closeDialog() {
  if (props.isSubmitting) return;
  emit('update:open', false);
}

function handleSubmit() {
  if (props.isSubmitting) return;
  emit('submit', {
    rating: rating.value >= 1 ? rating.value : null,
    comment: comment.value.trim(),
  });
}
</script>

<template>
  <ui-dialog :open="open" @update:open="emit('update:open', $event)">
    <ui-dialog-content class="sm:max-w-md">
      <ui-dialog-header>
        <ui-dialog-title>Завершить чат</ui-dialog-title>
        <ui-dialog-description>
          При желании оцените работу с {{ companionName }}. Отзыв будет виден в профиле пользователя.
        </ui-dialog-description>
      </ui-dialog-header>

      <div class="space-y-5 py-2">
        <div class="space-y-2">
          <p class="text-sm font-medium">Оценка <span class="font-normal text-muted-foreground">(необязательно)</span></p>
          <div class="flex items-center gap-1">
            <button
              v-for="star in 5"
              :key="star"
              type="button"
              class="rounded p-0.5 transition hover:scale-110"
              :aria-label="`Оценка ${star}`"
              @click="rating = star"
              @mouseenter="hoveredRating = star"
              @mouseleave="hoveredRating = 0"
            >
              <Star
                class="h-8 w-8"
                :class="star <= (hoveredRating || rating) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/40'"
              />
            </button>
          </div>
        </div>

        <div class="space-y-2">
          <label for="chat-review-comment" class="text-sm font-medium">
            Отзыв <span class="font-normal text-muted-foreground">(необязательно)</span>
          </label>
          <ui-textarea
            id="chat-review-comment"
            v-model="comment"
            placeholder="Расскажите о сотрудничестве (необязательно)"
            rows="4"
            class="resize-none"
          />
        </div>
      </div>

      <ui-dialog-footer>
        <ui-button variant="outline" :disabled="isSubmitting" @click="closeDialog">
          Отмена
        </ui-button>
        <ui-button :disabled="isSubmitting" @click="handleSubmit">
          <ui-spinner v-if="isSubmitting" size="sm" class="mr-2" />
          Завершить чат
        </ui-button>
      </ui-dialog-footer>
    </ui-dialog-content>
  </ui-dialog>
</template>
