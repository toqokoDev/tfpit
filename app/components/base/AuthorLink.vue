<script setup lang="ts">
import { User } from 'lucide-vue-next';

interface Author {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
}

const props = withDefaults(defineProps<{
  user: Author;
  subtitle?: string | null;
  avatarClass?: string;
}>(), {
  subtitle: null,
  avatarClass: 'h-12 w-12',
});

const initials = computed(() => `${props.user.first_name?.[0] || ''}${props.user.last_name?.[0] || ''}`);
</script>

<template>
  <NuxtLink
    :to="`/profile/user/${user.id}`"
    class="flex min-w-0 items-center gap-3 transition-opacity hover:opacity-80"
  >
    <div :class="['overflow-hidden rounded-full', avatarClass]">
      <img
        v-if="user.avatar_url"
        :src="user.avatar_url"
        :alt="`${user.first_name} ${user.last_name}`"
        class="h-full w-full rounded-full object-cover"
      />
      <div v-else class="flex h-full w-full items-center justify-center rounded-full bg-muted">
        <span v-if="initials" class="text-sm font-semibold">{{ initials }}</span>
        <User v-else class="h-5 w-5" />
      </div>
    </div>

    <div class="min-w-0">
      <p class="truncate font-semibold">{{ user.first_name }} {{ user.last_name }}</p>
      <p v-if="subtitle" class="truncate text-xs text-muted-foreground">
        {{ subtitle }}
      </p>
    </div>
  </NuxtLink>
</template>
