<script lang="ts" setup>
// -----------------
// ----- Types -----
// -----------------

type Props = {
  offerType?: string;
  offerTitle?: string;
  offerDescription?: string;

  place?: string;

  date?: string;
  time?: string;
};

// ----------------
// ----- Data -----
// ----------------

const props = withDefaults(defineProps<Props>(), {
  offerType: 'Модель',
  offerTitle: 'Съемка в стиле Vogue',
  offerDescription: 'Ищу профессионального фотографа для реализации минималистичного образа. Студия оплачена, макияж мой.',
  place: 'Москва',
  date: 'Завтра',
  time: '14:00',
});
</script>

<template>
  <ui-card class="pt-0 group overflow-hidden transition-all hover:shadow-lg">
    <div class="relative aspect-[4/5] overflow-hidden bg-muted">
      <img 
        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop" 
        alt="Preview"
        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <ui-badge class="absolute left-4 top-4 backdrop-blur">{{ props.offerType }}</ui-badge>
    </div>
    <ui-card-header>
      <div class="flex items-center justify-between">
        <ui-card-title class="text-xl">{{ props.offerTitle }}</ui-card-title>
      </div>
      <ui-card-description class="flex items-center gap-2">
        <span>📍 {{ props.place }}</span>
        <span>•</span>
        <span>{{ props.date }}, {{ props.time }}</span>
      </ui-card-description>
    </ui-card-header>
    <ui-card-content>
      <p class="line-clamp-2 text-sm text-muted-foreground">
        {{ props.offerDescription }}
      </p>
    </ui-card-content>
    <ui-card-footer class="flex gap-2">
      <ui-button class="w-full">Откликнуться</ui-button>
    </ui-card-footer>
  </ui-card>
</template>
