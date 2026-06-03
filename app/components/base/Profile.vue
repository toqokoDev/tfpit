<script setup lang="ts">
import { BriefcaseBusiness, LogOut, Megaphone, MessageCircle, UserCircle2 } from 'lucide-vue-next';

interface User {
  id?: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url?: string | null;
}

const props = defineProps<{
  user: User;
}>();

const client = useSupabaseClient<Database>();
const currentUserStore = useCurrentUserStore();
const notificationCount = ref(0);
const notificationChats = ref<Array<{
  id: string;
  owner_id: string;
  applicant_id: string;
  status: string;
  created_at: string;
  last_message_at: string | null;
  last_message_sender_id: string | null;
  owner_last_read_at: string | null;
  applicant_last_read_at: string | null;
}>>([]);
const notificationsChannel = shallowRef<ReturnType<typeof client.channel> | null>(null);

const initials = computed(() => {
  const first = props.user.first_name[0] || '';
  const last = props.user.last_name[0] || '';
  return (first + last).toUpperCase() || '?';
});

const badgeText = computed(() => notificationCount.value > 99 ? '99+' : String(notificationCount.value));

async function resolveUserId() {
  if (props.user.id) return props.user.id;
  const { data } = await client.auth.getUser();
  return data.user?.id || null;
}

async function loadNotificationCount() {
  const userId = await resolveUserId();
  if (!userId) return;

  const { data, error } = await client
    .from('announcement_chats')
    .select('id, owner_id, applicant_id, status, created_at, last_message_at, last_message_sender_id, owner_last_read_at, applicant_last_read_at')
    .or(`owner_id.eq.${userId},applicant_id.eq.${userId}`);

  if (error) {
    console.error('Ошибка загрузки уведомлений чатов:', error);
    return;
  }

  notificationChats.value = data || [];
  updateNotificationCount(userId);
}

function updateNotificationCount(userId: string) {
  notificationCount.value = notificationChats.value.filter((chat) => {
    if (chat.status === 'rejected' || chat.status === 'archived') return false;

    const latestAt = chat.last_message_at || chat.created_at;
    const latestSenderId = chat.last_message_sender_id || chat.applicant_id;
    const lastReadAt = chat.owner_id === userId ? chat.owner_last_read_at : chat.applicant_last_read_at;

    if (latestSenderId === userId) return false;
    return !lastReadAt || new Date(latestAt).getTime() > new Date(lastReadAt).getTime();
  }).length;
}

async function loadNotificationChat(chatId: string, userId: string) {
  const { data, error } = await client
    .from('announcement_chats')
    .select('id, owner_id, applicant_id, status, created_at, last_message_at, last_message_sender_id, owner_last_read_at, applicant_last_read_at')
    .eq('id', chatId)
    .maybeSingle();

  if (error || !data) return;
  if (data.owner_id !== userId && data.applicant_id !== userId) return;

  const exists = notificationChats.value.some(chat => chat.id === data.id);
  notificationChats.value = exists
    ? notificationChats.value.map(chat => chat.id === data.id ? data : chat)
    : [data, ...notificationChats.value];
  updateNotificationCount(userId);
}

async function subscribeToNotificationChats() {
  const userId = await resolveUserId();
  if (!userId) return;

  if (notificationsChannel.value) {
    await client.removeChannel(notificationsChannel.value);
    notificationsChannel.value = null;
  }

  notificationsChannel.value = client
    .channel(`profile-chat-notifications:${userId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'announcement_chats',
      },
      async (payload) => {
        const changedChat = payload.new as { id?: string; owner_id?: string; applicant_id?: string } | null;
        const oldChat = payload.old as { id?: string; owner_id?: string; applicant_id?: string } | null;
        const chat = changedChat?.id ? changedChat : oldChat;

        if (!chat?.id) return;

        if (payload.eventType === 'DELETE') {
          notificationChats.value = notificationChats.value.filter(existingChat => existingChat.id !== chat.id);
          updateNotificationCount(userId);
          return;
        }

        await loadNotificationChat(chat.id, userId);
      },
    )
    .subscribe();
}

async function unsubscribeNotificationChats() {
  if (!notificationsChannel.value) return;

  await client.removeChannel(notificationsChannel.value);
  notificationsChannel.value = null;
}

async function handleLogout() {
  await client.auth.signOut();
  currentUserStore.clearUser();
  clearNuxtData('init-user');
  navigateTo('/auth/login');
}

onMounted(() => {
  loadNotificationCount();
  subscribeToNotificationChats();
  window.addEventListener('announcement-chat-read-state-changed', loadNotificationCount);
});

onUnmounted(() => {
  window.removeEventListener('announcement-chat-read-state-changed', loadNotificationCount);
  unsubscribeNotificationChats();
});
</script>

<template>
  <ui-dropdown-menu>
    <ui-dropdown-menu-trigger as-child>
      <div class="flex items-center gap-2 p-1 rounded-lg hover:bg-accent cursor-pointer transition-colors duration-200 select-none">
        <div class="relative">
          <ui-avatar class="h-8 w-8 rounded-full">
            <ui-avatar-image :src="user.avatar_url || ''" />
            <ui-avatar-fallback class="text-xs">{{ initials }}</ui-avatar-fallback>
          </ui-avatar>
          <span
            v-if="notificationCount > 0"
            class="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-none text-white ring-2 ring-background"
          >
            {{ badgeText }}
          </span>
        </div>
        
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
            Моё портфолио
          </NuxtLink>
        </ui-dropdown-menu-item>
        <ui-dropdown-menu-item as-child>
          <NuxtLink to="/profile/offers">
            <megaphone />
            Мои объявления
          </NuxtLink>
        </ui-dropdown-menu-item>
        <ui-dropdown-menu-item as-child>
          <NuxtLink to="/profile/chats" class="flex w-full items-center gap-2">
            <message-circle class="h-4 w-4" />
            <span class="flex-1">Чаты</span>
            <span
              v-if="notificationCount > 0"
              class="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold leading-none text-white"
            >
              {{ badgeText }}
            </span>
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
