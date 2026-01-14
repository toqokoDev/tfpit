<script lang="ts" setup>
import { Eye } from 'lucide-vue-next';

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
</script>

<template>
  <ui-card 
    class="pt-0 group overflow-hidden transition-all hover:shadow-lg border hover:border-primary/15 cursor-pointer"
  >
    <!-- Image Container with Overlay -->
    <div class="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-muted/40 to-muted">
      <!-- Main Image -->
      <img 
        :src="props.image_url[0] || '/placeholder.svg'" 
        :alt="props.category"
        class="h-full w-full object-cover transition-transform duration-400 group-hover:scale-[1.03]"
        loading="lazy"
      />
      
      <div 
        v-if="props.image_url.length > 1"
        class="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium"
      >
        +{{ props.image_url.length - 1 }}
      </div>
      
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-1.5">
              <eye class="w-4 h-4" />
              <span class="text-sm font-medium">{{ props.views_count }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <ui-card-header class="pb-3">
      <ui-card-description class="mt-2 line-clamp-2 text-sm">
        {{ props.description }}
      </ui-card-description>
    </ui-card-header>
  </ui-card>
</template>
