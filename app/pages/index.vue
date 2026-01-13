<script setup lang="ts">

const TAG_LIST = ['Fashion', 'Portrait', 'Street', 'Studio', 'Nude', 'Cosplay'];

useHead({ title: 'Главная' });
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <section class="container mx-auto px-4 py-24 text-center lg:py-32">
      <ui-badge variant="outline" class="mb-6 rounded-full px-4 py-1 text-sm font-normal">
        ✨ Новые съемки каждый час
      </ui-badge>
      <h1 class="mb-6 text-5xl font-extrabold tracking-tight lg:text-7xl">
        Твоё идеальное <br />
        <span class="text-primary">портфолио</span> начинается здесь
      </h1>
      <p class="mx-auto mb-10 max-w-[700px] text-lg text-muted-foreground md:text-xl">
        Найдите фотографов, моделей и визажистов для совместных творческих проектов на условиях Time for Print.
      </p>
      <div class="flex flex-col justify-center gap-4 sm:flex-row">
        <NuxtLink to="/auth/register?type=creator" as-child>
          <ui-button size="lg" class="h-12 px-8 text-base">Найти проект</ui-button>
        </NuxtLink>
        <NuxtLink to="/auth/register?type=model" as-child>
          <ui-button size="lg" variant="outline" class="h-12 px-8 text-base">Стать моделью</ui-button>
        </NuxtLink>
      </div>
    </section>

    <section class="container mx-auto px-4 pb-16">
      <div class="flex flex-wrap justify-center gap-2">
        <ui-button v-for="tag in TAG_LIST" 
          :key="tag" 
          variant="secondary" 
          size="sm" 
          class="rounded-full"
        >
        #{{ tag }}
        </ui-button>
      </div>
    </section>

    <section class="bg-slate-50/50 py-20 dark:bg-slate-900/10">
      <div class="container mx-auto px-4">
        <div class="mb-12 flex items-end justify-between">
          <div>
            <h2 class="text-3xl font-bold tracking-tight">Актуальные предложения</h2>
            <p class="text-muted-foreground">Люди, которые ищут команду прямо сейчас</p>
          </div>
          <ui-button variant="link" class="hidden sm:flex">Показать все</ui-button>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ui-card v-for="i in 3" :key="i" class="pt-0 group overflow-hidden transition-all hover:shadow-lg">
            <div class="relative aspect-[4/5] overflow-hidden bg-muted">
              <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop" 
                alt="Preview"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <ui-badge class="absolute left-4 top-4 backdrop-blur">Модель</ui-badge>
            </div>
            <ui-card-header>
              <div class="flex items-center justify-between">
                <ui-card-title class="text-xl">Съемка в стиле Vogue</ui-card-title>
              </div>
              <ui-card-description class="flex items-center gap-2">
                <span>📍 Москва</span>
                <span>•</span>
                <span>Завтра, 14:00</span>
              </ui-card-description>
            </ui-card-header>
            <ui-card-content>
              <p class="line-clamp-2 text-sm text-muted-foreground">
                Ищу профессионального фотографа для реализации минималистичного образа. Студия оплачена, макияж мой.
              </p>
            </ui-card-content>
            <ui-card-footer class="flex gap-2">
              <ui-button class="w-full">Откликнуться</ui-button>
            </ui-card-footer>
          </ui-card>
        </div>
      </div>
    </section>
  </div>
</template>
