<script setup lang="ts">
const props = defineProps<{
  body: string;
  createdAt: string;
  senderId: string;
  currentUserId: string | null;
  meta?: string;
}>();

const isOwn = computed(() => props.senderId === props.currentUserId);

function formatMessageDate(value: string) {
  return new Date(value).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}
</script>

<template>
  <div class="group flex">
    <div
      class="flex max-w-[78%] flex-col"
      :class="isOwn ? 'ml-auto items-end' : 'items-start'"
    >
      <div
        class="rounded-[22px] px-4 py-2.5 text-sm leading-5 shadow-sm"
        :class="isOwn
          ? 'rounded-br-md bg-gradient-to-br from-fuchsia-500 via-pink-500 to-orange-400 text-white'
          : 'rounded-bl-md bg-muted text-foreground'"
      >
        <p class="whitespace-pre-wrap break-words">{{ body }}</p>
      </div>
      <p class="mt-1 px-1 text-[11px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
        <template v-if="meta">{{ meta }} · </template>{{ formatMessageDate(createdAt) }}
      </p>
    </div>
  </div>
</template>
