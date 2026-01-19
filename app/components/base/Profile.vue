<script setup lang="ts">
import { BriefcaseBusiness, LogOut, Megaphone, UserCircle2 } from 'lucide-vue-next';

interface User {
  email: string;
  first_name: string;
  last_name: string;
  avatar_url?: string | null;
}

const props = defineProps<{
  user: User;
}>();

const client = useSupabaseClient();

const initials = computed(() => {
  const first = props.user.first_name[0] || '';
  const last = props.user.last_name[0] || '';
  return (first + last).toUpperCase() || '?';
});

async function handleLogout() {
  await client.auth.signOut();
  navigateTo('/auth/login');
}
</script>

<template>
  <ui-dropdown-menu>
    <ui-dropdown-menu-trigger as-child>
      <div class="flex items-center gap-2 p-1 rounded-lg hover:bg-accent cursor-pointer transition-colors duration-200 select-none">
        <ui-avatar class="h-8 w-8 rounded-full">
          <ui-avatar-image :src="user.avatar_url || ''" />
          <ui-avatar-fallback class="text-xs">{{ initials }}</ui-avatar-fallback>
        </ui-avatar>
        
        <div class="hidden sm:flex flex-col text-left mr-1">
          <span class="text-sm font-semibold leading-none">
            {{ user.first_name || 'Профиль' }}  {{ user.last_name }}
          </span>
        </div>
      </div>
    </ui-dropdown-menu-trigger>
    <ui-dropdown-menu-content
      class="w-(--reka-dropdown-menu-trigger-width) min-w-56 rounded-lg"
      side="bottom"
      :side-offset="4"
    >
      <ui-dropdown-menu-label class="p-0 font-normal">
        <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <ui-avatar class="h-8 w-8 rounded-lg">
            <ui-avatar-image :src="user.avatar_url || ''" />
            <ui-avatar-fallback>{{ initials }}</ui-avatar-fallback>
          </ui-avatar>
          <div class="grid flex-1 text-left text-sm leading-tight">
            <span class="truncate font-medium">{{ user.first_name }} {{ user.last_name }}</span>
          </div>
        </div>
      </ui-dropdown-menu-label>
      <ui-dropdown-menu-separator />
      <ui-dropdown-menu-group>
        <ui-dropdown-menu-item as-child>
          <NuxtLink to="/profile">
            <user-circle2 />
            Профиль
          </NuxtLink>
        </ui-dropdown-menu-item>
        <ui-dropdown-menu-item as-child>
          <NuxtLink to="/profile/portfolio">
            <briefcase-business />
            Портфолио
          </NuxtLink>
        </ui-dropdown-menu-item>
        <ui-dropdown-menu-item as-child>
          <NuxtLink to="/profile/offers">
            <megaphone />
            Объявления
          </NuxtLink>
        </ui-dropdown-menu-item>
      </ui-dropdown-menu-group>
      <ui-dropdown-menu-separator />
      <ui-dropdown-menu-item @click="handleLogout()">
        <log-out />
        Выйти
      </ui-dropdown-menu-item>
    </ui-dropdown-menu-content>
  </ui-dropdown-menu>
</template>
