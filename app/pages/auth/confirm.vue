<script setup lang="ts">
import { Home } from 'lucide-vue-next'

const user = useSupabaseUser();
const client = useSupabaseClient();
const route = useRoute();

watch(user, () => {
  if (user.value) {
    return navigateTo('/')
  }
}, { immediate: true });

onMounted(async () => {
  const code = route.query.code as string;

  if (code) {
    const { error } = await client.auth.exchangeCodeForSession(code);
    if (error) {
      console.error('Ошибка подтверждения:', error.message);
    }
  }
});
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[400px] space-y-6">
    <div class="flex flex-col items-center gap-3">
      <ui-spinner />
      <p class="text-muted-foreground animate-pulse">
        Подтверждаем вашу почту, пожалуйста, подождите...
      </p>
    </div>

    <ui-button variant="outline" as-child>
      <NuxtLink to="/">
        <home class="mr-2 h-4 w-4" />
        На главную
      </NuxtLink>
    </ui-button>
  </div>
</template>
