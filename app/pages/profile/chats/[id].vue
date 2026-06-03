<script setup lang="ts">
const route = useRoute();
const chatId = computed(() => route.params.id as string);

definePageMeta({
  middleware: 'auth',
});

useHead({ title: 'Чат' });
</script>

<template>
  <profile-announcement-chats-shell :selected-chat-id="chatId" />
</template>
