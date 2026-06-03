<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});

useHead({ title: 'Чаты' });
</script>

<template>
  <profile-announcement-chats-shell />
</template>
