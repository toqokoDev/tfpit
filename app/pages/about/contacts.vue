<script setup lang="ts">
useHead({ title: 'Контакты' });

const CONTACT_METHODS = [
  {
    title: 'Электронная почта',
    description: 'Для общих вопросов и предложений',
    value: 'info@tfp.by'
  },
  {
    title: 'Техническая поддержка',
    description: 'Если возникли проблемы с платформой',
    value: 'support@tfp.by'
  },
  {
    title: 'Сотрудничество',
    description: 'Для партнеров и рекламодателей',
    value: 'partners@tfp.by'
  }
];
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <section class="container mx-auto px-4 py-20 lg:py-28">
      <div class="mx-auto max-w-3xl">
        <h1 class="mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Контакты
        </h1>
        <p class="mb-12 text-lg text-muted-foreground">
          Свяжитесь с нами, если у вас есть вопросы, предложения или нужна помощь. 
          Мы всегда рады обратной связи от нашего сообщества.
        </p>

        <div class="space-y-6 mb-12">
          <div 
            v-for="(method, index) in CONTACT_METHODS" 
            :key="index"
            class="rounded-xl border bg-card p-6"
          >
            <h3 class="mb-2 text-xl font-semibold">
              {{ method.title }}
            </h3>
            <p class="mb-3 text-sm text-muted-foreground">
              {{ method.description }}
            </p>
            <a 
              :href="`mailto:${method.value}`" 
              class="text-primary hover:underline font-medium"
            >
              {{ method.value }}
            </a>
          </div>
        </div>

        <div class="rounded-xl border bg-muted/50 p-6 mb-12">
          <h2 class="mb-4 text-2xl font-bold">Время ответа</h2>
          <div class="space-y-2 text-muted-foreground">
            <p>
              Мы стремимся отвечать на все запросы в течение 24-48 часов в рабочие дни. 
              Для срочных вопросов, пожалуйста, укажите это в теме письма.
            </p>
          </div>
        </div>

        <div class="space-y-6">
          <h2 class="text-2xl font-bold">Полезные ссылки</h2>
          
          <div class="grid gap-4 sm:grid-cols-2">
            <NuxtLink 
              to="/about/help" 
              class="group rounded-xl border bg-card p-6 transition-colors hover:bg-muted"
            >
              <h3 class="mb-2 font-semibold group-hover:text-primary transition-colors">
                Помощь
              </h3>
              <p class="text-sm text-muted-foreground">
                Часто задаваемые вопросы и руководства
              </p>
            </NuxtLink>

            <NuxtLink 
              to="/about/rules" 
              class="group rounded-xl border bg-card p-6 transition-colors hover:bg-muted"
            >
              <h3 class="mb-2 font-semibold group-hover:text-primary transition-colors">
                Правила
              </h3>
              <p class="text-sm text-muted-foreground">
                Правила использования платформы
              </p>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
