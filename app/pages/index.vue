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
        <NuxtLink to="/auth/register?role=photographer" as-child>
          <ui-button size="lg" class="h-12 px-8 text-base">Найти проект</ui-button>
        </NuxtLink>
        <NuxtLink to="/auth/register?role=model" as-child>
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
          <base-offer v-for="i in 3" />
        </div>
      </div>
    </section>
  </div>
</template>
