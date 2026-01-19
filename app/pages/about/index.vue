<script setup lang="ts">
const STATS = [
  { label: 'Активных пользователей', value: '50,000+' },
  { label: 'Проектов ежемесячно', value: '12,000+' },
  { label: 'Городов присутствия', value: '150+' },
  { label: 'Успешных съемок', value: '300k+' },
];

const VALUES = [
  {
    title: 'Доступность',
    description: 'Мы верим, что отсутствие огромного бюджета не должно быть препятствием для реализации крутых идей.'
  },
  {
    title: 'Профессионализм',
    description: 'TFP — это не «бесплатно», это обмен опытом и навыками для создания качественного контента.'
  },
  {
    title: 'Безопасность',
    description: 'Мы развиваем систему рейтингов и отзывов, чтобы вы могли уверенно выбирать партнеров по съемке.'
  }
];

const user = useSupabaseUser();

useHead({ title: 'О сервисе' });
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <section class="container mx-auto px-4 py-20 text-center lg:py-28">
      <h1 class="mb-6 text-4xl font-extrabold tracking-tight lg:text-6xl">
        Мы объединяем <br />
        <span class="text-primary">творческих людей</span>
      </h1>
      <p class="mx-auto max-w-[800px] text-lg text-muted-foreground md:text-xl">
        Наша миссия - создать крупнейшую экосистему для фотографов, моделей и визуальных художников, 
        где каждый может найти команду мечты для реализации самых смелых идей.
      </p>
    </section>

    <section class="border-y bg-slate-50/50 py-16 dark:bg-slate-900/10">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div v-for="stat in STATS" :key="stat.label" class="text-center">
            <div class="text-3xl font-bold lg:text-4xl">{{ stat.value }}</div>
            <div class="mt-2 text-sm text-muted-foreground uppercase tracking-wider">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="container mx-auto px-4 py-24">
      <div class="grid items-center gap-12 lg:grid-cols-2">
        <div class="relative aspect-video overflow-hidden rounded-2xl bg-muted lg:aspect-square">
          <img 
            src="~/assets/images/work-process.png" 
            alt="Work process"
            class="h-full w-full object-cover"
          />
        </div>
        <div class="space-y-6">
          <h2 class="text-3xl font-bold">Что такое TFP сегодня?</h2>
          <p class="text-lg text-muted-foreground">
            Термин <strong>Time for Print</strong> (Время за отпечатки) давно вышел за рамки простого обмена фотографиями. 
            Сегодня это мощный инструмент нетворкинга и профессионального роста.
          </p>
          <p class="text-lg text-muted-foreground">
            Мы создали эту платформу, чтобы упростить процесс поиска единомышленников. Вам больше не нужно 
            пролистывать сотни сообщений в чатах - всё структурировано, наглядно и удобно.
          </p>
          <div class="grid gap-4 pt-4 sm:grid-cols-2">
            <div v-for="value in VALUES" :key="value.title" class="space-y-2">
              <h4 class="font-bold text-primary">{{ value.title }}</h4>
              <p class="text-sm text-muted-foreground">{{ value.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="!user" class="container mx-auto px-4 pb-24">
      <div class="rounded-3xl bg-slate-900 px-8 py-16 text-center text-white dark:bg-primary/10">
        <h2 class="mb-4 text-3xl font-bold md:text-4xl">Готовы создать что-то великое?</h2>
        <p class="mb-8 text-slate-400">Присоединяйтесь к нашему комьюнити и начните собирать портфолио мечты.</p>
        <div class="flex flex-col justify-center gap-4 sm:flex-row">
          <NuxtLink to="/auth/register" as-child>
            <ui-button size="lg" variant="default" class="bg-white text-black hover:bg-slate-200">Создать аккаунт</ui-button>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
