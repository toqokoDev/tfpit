<script setup lang="ts">
useHead({ title: 'Помощь' });

const FAQ_ITEMS = [
  {
    question: 'Что такое TFP?',
    answer: 'TFP (Time for Print) — это формат сотрудничества, при котором фотограф, модель и другие участники работают бесплатно, получая в обмен готовые фотографии для портфолио.'
  },
  {
    question: 'Как создать объявление?',
    answer: 'Войдите в свой аккаунт, перейдите в раздел "Объявления" и нажмите "Создать объявление". Заполните все необходимые поля, укажите дату и требования к участникам.'
  },
  {
    question: 'Как связаться с автором объявления?',
    answer: 'На странице объявления нажмите кнопку "Связаться". Вы сможете отправить сообщение автору через внутреннюю систему платформы.'
  },
  {
    question: 'Как работает система рейтингов?',
    answer: 'После завершения проекта все участники могут оставить отзыв и оценку друг другу. Рейтинг помогает другим пользователям оценить профессионализм и надежность партнера.'
  },
  {
    question: 'Можно ли использовать фотографии для коммерческих целей?',
    answer: 'Условия использования фотографий обсуждаются между участниками проекта заранее. По умолчанию фотографии предназначены для портфолио, коммерческое использование требует отдельной договоренности.'
  },
  {
    question: 'Что делать, если партнер нарушил договоренности?',
    answer: 'Вы можете оставить отрицательный отзыв и сообщить о проблеме администрации через форму обратной связи. Мы рассмотрим ситуацию и при необходимости примем меры.'
  }
];
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <section class="container mx-auto px-4 py-20 lg:py-28">
      <div class="mx-auto max-w-3xl">
        <h1 class="mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Помощь и поддержка
        </h1>
        <p class="mb-12 text-lg text-muted-foreground">
          Здесь вы найдете ответы на самые частые вопросы и полезную информацию 
          о работе с платформой.
        </p>

        <div class="space-y-6">
          <div 
            v-for="(item, index) in FAQ_ITEMS" 
            :key="index"
            class="rounded-xl border bg-card p-6"
          >
            <h3 class="mb-3 text-xl font-semibold">
              {{ item.question }}
            </h3>
            <p class="text-muted-foreground">
              {{ item.answer }}
            </p>
          </div>
        </div>

        <div class="mt-12 space-y-6">
          <h2 class="text-2xl font-bold">Полезные разделы</h2>
          
          <div class="grid gap-4 sm:grid-cols-2">
            <NuxtLink 
              to="/about/rules" 
              class="group rounded-xl border bg-card p-6 transition-colors hover:bg-muted"
            >
              <h3 class="mb-2 font-semibold group-hover:text-primary transition-colors">
                Правила использования
              </h3>
              <p class="text-sm text-muted-foreground">
                Ознакомьтесь с правилами платформы перед началом работы
              </p>
            </NuxtLink>

            <NuxtLink 
              to="/about/contacts" 
              class="group rounded-xl border bg-card p-6 transition-colors hover:bg-muted"
            >
              <h3 class="mb-2 font-semibold group-hover:text-primary transition-colors">
                Связаться с нами
              </h3>
              <p class="text-sm text-muted-foreground">
                Есть вопросы? Свяжитесь с нашей службой поддержки
              </p>
            </NuxtLink>
          </div>
        </div>

        <div class="mt-12 rounded-xl border bg-muted/50 p-6">
          <h3 class="mb-3 font-semibold">Не нашли ответ на свой вопрос?</h3>
          <p class="mb-4 text-sm text-muted-foreground">
            Свяжитесь с нами через форму обратной связи, и мы обязательно поможем вам.
          </p>
          <NuxtLink to="/about/contacts" as-child>
            <ui-button variant="outline">
              Связаться с поддержкой
            </ui-button>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
