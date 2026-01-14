<script lang="ts" setup>
// Логика для вкладки настроек аккаунта
</script>

<template>
  <div class="space-y-6">
    <div>
      <h3 class="text-lg font-medium">Настройки аккаунта</h3>
      <p class="text-sm text-muted-foreground">Управление почтой и безопасностью.</p>
    </div>
    <ui-separator />
    <div class="grid gap-4">
      <div class="grid gap-2">
        <ui-label for="email">Email</ui-label>
        <ui-input id="email" type="email" value="user@example.com" />
      </div>
      <ui-button class="w-fit">Сохранить изменения</ui-button>
    </div>
  </div>
</template>
