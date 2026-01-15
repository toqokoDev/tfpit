<script lang="ts" setup>
const activeTab = ref('profile');

definePageMeta({
  middleware: 'auth',
});
useHead({ title: 'Профиль' });
</script>

<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-80px)] bg-muted/40 p-4">
    <ui-card class="w-full max-w-4xl overflow-hidden">
      <ui-tabs v-model="activeTab" class="flex flex-col md:flex-row">
        
        <aside class="w-full md:w-64 border-b md:border-b-0 md:border-r p-4 order-1 md:order-none">
          <div class="flex flex-col space-y-4">
            <div class="px-2 py-2 hidden md:block">
              <h2 class="text-lg font-semibold tracking-tight">Настройки</h2>
              <p class="text-sm text-muted-foreground">Управление аккаунтом</p>
            </div>
            
            <ui-tabs-list class="flex flex-row md:flex-col flex-wrap md:flex-nowrap h-auto bg-transparent gap-1 items-stretch justify-start overflow-x-visible pb-2 md:pb-0">
              <ui-tabs-trigger 
                value="profile" 
                class="flex-1 md:flex-none justify-center md:justify-start px-2 md:px-4 py-2 text-sm md:text-base min-w-0"
              >
                Профиль
              </ui-tabs-trigger>
              <ui-tabs-trigger 
                value="account" 
                class="flex-1 md:flex-none justify-center md:justify-start px-2 md:px-4 py-2 text-sm md:text-base min-w-0"
              >
                Дополнительно
              </ui-tabs-trigger>
            </ui-tabs-list>
          </div>
        </aside>

        <div class="flex-1 p-6 md:p-8 order-2 md:order-none">
          <ui-tabs-content value="profile" class="mt-0 border-none p-0 outline-none">
            <profile :active-tab="activeTab" />
          </ui-tabs-content>

          <ui-tabs-content value="account" class="mt-0 border-none p-0 outline-none">
            <profile-account />
          </ui-tabs-content>
        </div>
        
      </ui-tabs>
    </ui-card>
  </div>
</template>
