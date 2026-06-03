<script setup lang="ts">
import { ExternalLink, MapPin, UserRound } from 'lucide-vue-next';
import type { ChatAnnouncement, ChatUser } from '../../types/announcementChats';

const props = defineProps<{
  announcement: ChatAnnouncement;
  companion: ChatUser | null;
}>();

const previewImage = computed(() => {
  if (!props.announcement.references_urls) return null;
  return props.announcement.references_urls.split(/[;|]/).find(url => url.trim())?.trim() || null;
});
</script>

<template>
  <div class="mx-auto mb-6 flex w-full max-w-xl gap-3 rounded-3xl border bg-card p-3 shadow-sm">
    <div class="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-fuchsia-500 via-pink-500 to-orange-400">
      <img
        v-if="previewImage"
        :src="previewImage"
        :alt="announcement.title"
        class="h-full w-full object-cover"
      />
      <div v-else class="flex h-full w-full items-center justify-center text-xs font-semibold text-white">
        TFP
      </div>
    </div>

    <div class="min-w-0 flex-1">
      <p class="line-clamp-2 text-sm font-semibold leading-5">
        {{ announcement.title }}
      </p>
      <p v-if="announcement.city" class="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
        <MapPin class="h-3.5 w-3.5" />
        {{ announcement.city }}
      </p>

      <div class="mt-3 flex flex-wrap gap-2">
        <NuxtLink :to="`/offer/${announcement.id}`">
          <ui-button size="sm" variant="outline" class="h-8 rounded-full">
            <ExternalLink class="mr-1.5 h-3.5 w-3.5" />
            Объявление
          </ui-button>
        </NuxtLink>
        <NuxtLink v-if="companion" :to="`/profile/user/${companion.id}`">
          <ui-button size="sm" variant="outline" class="h-8 rounded-full">
            <UserRound class="mr-1.5 h-3.5 w-3.5" />
            Профиль
          </ui-button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
