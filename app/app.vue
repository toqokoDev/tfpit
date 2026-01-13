<script setup lang="ts">

// ----------------
// ----- Page -----
// ----------------

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: '#ffffff' },
  ],
  htmlAttrs: {
    lang: 'ru',
    class: 'system',
  },
  bodyAttrs: {
    class: 'color-white theme-system',
  },
});
</script>

<template>
  <Body class="overscroll-none antialiased bg-background text-foreground">
    <div class="h-screen">
      <nuxt-layout>
        <nuxt-page />
      </nuxt-layout>

      <ui-sonner
        position="bottom-right"
        close-button-position="top-right"
        close-button
      />
    </div>
  </Body>
</template>
