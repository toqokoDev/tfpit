<script lang="ts" setup>
import { CalendarDays, Eye, Globe, Heart, Images, Lock } from 'lucide-vue-next';

// -----------------
// ----- Types -----
// -----------------

type Props = {
  category: string;
  description: string;
  image_url: string[];

  is_public?: boolean;
  likes_count?: number;
  views_count?: number;

  created_at: string,
  updated_at: string,
};

// ----------------
// ----- Data -----
// ----------------

const props = withDefaults(defineProps<Props>(), {
  is_public: false,
  likes_count: 0,
  views_count: 0,
});

const coverImage = computed(() => props.image_url[0] || '/placeholder.svg');
const extraImagesCount = computed(() => Math.max(props.image_url.length - 1, 0));
const visibilityLabel = computed(() => props.is_public ? 'Публичное' : 'Приватное');

function formatDate(dateString: string) {
  const date = new Date(dateString);

  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
</script>

<template>
  <ui-card 
    class="group cursor-pointer overflow-hidden pt-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
  >
    <div class="relative aspect-[3/4] overflow-hidden bg-muted">
      <img 
        :src="coverImage" 
        :alt="props.category"
        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />

      <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/15 opacity-90 transition-opacity group-hover:opacity-100"></div>

      <div class="absolute left-3 right-3 top-3 flex items-start justify-between gap-2">
        <ui-badge class="max-w-[70%] border-white/15 bg-background/90 text-foreground backdrop-blur">
          <span class="truncate">{{ props.category }}</span>
        </ui-badge>

        <div class="flex items-center gap-1">
          <ui-badge
            v-if="extraImagesCount > 0"
            class="gap-1 border-white/15 bg-background/90 text-foreground backdrop-blur"
          >
            <Images class="h-3.5 w-3.5" />
            +{{ extraImagesCount }}
          </ui-badge>

          <ui-badge class="gap-1 border-white/15 bg-background/90 text-foreground backdrop-blur">
            <Globe v-if="props.is_public" class="h-3.5 w-3.5" />
            <Lock v-else class="h-3.5 w-3.5" />
            <span class="sr-only">{{ visibilityLabel }}</span>
          </ui-badge>
        </div>
      </div>

      <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
        <div class="space-y-3">
          <div>
            <h3 class="line-clamp-1 text-lg font-semibold">
              {{ props.category }}
            </h3>
            <p class="mt-1 min-h-10 text-sm text-white/75 line-clamp-2">
              {{ props.description || 'Описание не добавлено' }}
            </p>
          </div>

          <div class="flex items-center gap-3 border-t border-white/20 pt-3 text-sm text-white/80">
            <div class="flex items-center gap-1.5">
              <Eye class="h-4 w-4" />
              <span>{{ props.views_count }}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <Heart class="h-4 w-4" />
              <span>{{ props.likes_count }}</span>
            </div>
            <div class="ml-auto flex items-center gap-1.5 text-xs">
              <CalendarDays class="h-4 w-4" />
              <span>{{ formatDate(props.created_at) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ui-card>
</template>
