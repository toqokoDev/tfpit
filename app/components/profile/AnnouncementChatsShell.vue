<script setup lang="ts">
import { Inbox, MessageCircle } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import type { AnnouncementChat, ChatMessage, ChatStatus, ChatTab, UserReview } from '../../types/announcementChats';

const props = defineProps<{
  selectedChatId?: string | null;
}>();

const router = useRouter();
const supabase = useSupabaseClient<Database>();
const messagesChannel = shallowRef<ReturnType<typeof supabase.channel> | null>(null);
const chatsChannel = shallowRef<ReturnType<typeof supabase.channel> | null>(null);

const chatsByTab = reactive<Record<ChatTab, AnnouncementChat[]>>({
  requests: [],
  responses: [],
  archive: [],
});
const loadedTabs = reactive<Record<ChatTab, boolean>>({
  requests: false,
  responses: false,
  archive: false,
});
const loadingTabs = reactive<Record<ChatTab, boolean>>({
  requests: false,
  responses: false,
  archive: false,
});
const messages = ref<ChatMessage[]>([]);
const chatReviews = ref<UserReview[]>([]);
const currentUserId = ref<string | null>(null);
const selectedChatId = ref<string | null>(props.selectedChatId || null);
const activeTab = ref<ChatTab>('requests');
const isLoadingMessages = ref(false);
const isLoadingChatReviews = ref(false);
const isActionLoading = ref(false);
const isSending = ref(false);
const isFinishDialogOpen = ref(false);
const finishDialogMode = ref<'finish' | 'review'>('finish');

const selectedChat = computed(() => {
  if (!selectedChatId.value) return null;
  return allLoadedChats.value.find(chat => chat.id === selectedChatId.value) || null;
});

const allLoadedChats = computed(() => {
  const byId = new Map<string, AnnouncementChat>();
  [...chatsByTab.requests, ...chatsByTab.responses, ...chatsByTab.archive].forEach((chat) => {
    byId.set(chat.id, chat);
  });
  return Array.from(byId.values());
});

const visibleChats = computed(() => chatsByTab[activeTab.value]);

const unreadRequestCount = computed(() => chatsByTab.requests.filter(isChatUnread).length);
const unreadResponseCount = computed(() => chatsByTab.responses.filter(isChatUnread).length);
const unreadArchiveCount = computed(() => chatsByTab.archive.filter(isChatUnread).length);
const isActiveTabLoading = computed(() => loadingTabs[activeTab.value] || !loadedTabs[activeTab.value]);

const selectedChatPendingReview = computed(() => isPendingReview(selectedChat.value));
const selectedChatCurrentUserFinished = computed(() => hasUserFinished(selectedChat.value, currentUserId.value));

function hasUserFinished(chat: AnnouncementChat | null, userId: string | null) {
  if (!chat || !userId) return false;
  if (chat.owner_id === userId) return !!chat.owner_finished_at;
  if (chat.applicant_id === userId) return !!chat.applicant_finished_at;
  return false;
}

function hasCompanionFinished(chat: AnnouncementChat | null) {
  if (!chat || !currentUserId.value) return false;
  if (chat.owner_id === currentUserId.value) return !!chat.applicant_finished_at;
  if (chat.applicant_id === currentUserId.value) return !!chat.owner_finished_at;
  return false;
}

function isPendingReview(chat: AnnouncementChat | null) {
  if (!chat || !currentUserId.value) return false;
  return chat.status === 'accepted' && hasCompanionFinished(chat) && !hasUserFinished(chat, currentUserId.value);
}

function getCompanion(chat: AnnouncementChat | null) {
  if (!chat) return null;
  return chat.owner_id === currentUserId.value ? chat.applicant : chat.owner;
}

function getCompanionName(chat: AnnouncementChat | null) {
  const user = getCompanion(chat);
  if (!user) return 'Пользователь';
  return `${user.first_name} ${user.last_name}`.trim() || 'Пользователь';
}

function getStatusText(chat: AnnouncementChat) {
  if (isPendingReview(chat)) return 'Ожидает отзыв';

  const statuses: Record<ChatStatus, string> = {
    pending: 'Ожидает',
    accepted: 'Активный',
    rejected: 'Архив',
    archived: 'Архив',
  };
  return statuses[chat.status];
}

function getBadgeCount(count: number) {
  return count > 99 ? '99+' : String(count);
}

function isChatUnread(chat: AnnouncementChat | null) {
  if (!chat || !currentUserId.value || chat.status === 'rejected' || chat.status === 'archived') return false;
  if (isPendingReview(chat)) return true;

  const latestAt = chat.last_message_at || chat.created_at;
  const latestSenderId = chat.last_message_sender_id || chat.applicant_id;
  const lastReadAt = chat.owner_id === currentUserId.value
    ? chat.owner_last_read_at
    : chat.applicant_last_read_at;

  if (latestSenderId === currentUserId.value) return false;
  return !lastReadAt || new Date(latestAt).getTime() > new Date(lastReadAt).getTime();
}

function formatShortDate(value: string | null) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
  });
}

function getEmptyText() {
  if (activeTab.value === 'requests') return 'Запросов по вашим объявлениям пока нет.';
  if (activeTab.value === 'responses') return 'Вы пока не откликались на объявления.';
  return 'В архиве пока пусто.';
}

function syncActiveTabWithSelectedChat() {
  if (!selectedChat.value) return;
  const tab = getChatTab(selectedChat.value);
  if (tab) activeTab.value = tab;
}

function chatSelectQuery() {
  return `
    id,
    announcement_id,
    applicant_id,
    owner_id,
    status,
    initial_message,
    created_at,
    updated_at,
    last_message_at,
    last_message_sender_id,
    owner_last_read_at,
    applicant_last_read_at,
    owner_finished_at,
    applicant_finished_at,
    announcement:announcements!announcement_chats_announcement_id_fkey(id, title, city, references_urls),
    applicant:users!announcement_chats_applicant_id_fkey(id, first_name, last_name, avatar_url),
    owner:users!announcement_chats_owner_id_fkey(id, first_name, last_name, avatar_url)
  `;
}

function getChatTab(chat: AnnouncementChat): ChatTab | null {
  if (!currentUserId.value) return null;

  const userId = currentUserId.value;

  if (chat.status === 'rejected' || chat.status === 'archived') return 'archive';
  if (hasUserFinished(chat, userId)) return 'archive';
  if (chat.owner_id === userId) return 'requests';
  if (chat.applicant_id === userId) return 'responses';
  return null;
}

async function ensureCurrentUserId() {
  if (currentUserId.value) return currentUserId.value;

  const { data: authData } = await supabase.auth.getUser();
  currentUserId.value = authData.user?.id || null;
  return currentUserId.value;
}

async function loadChatsForTab(tab: ChatTab, force = false) {
  try {
    if (loadedTabs[tab] && !force) return;

    loadingTabs[tab] = true;
    const userId = await ensureCurrentUserId();

    if (!userId) return;

    let query = supabase
      .from('announcement_chats')
      .select(chatSelectQuery())
      .order('updated_at', { ascending: false });

    if (tab === 'requests') {
      query = query
        .eq('owner_id', userId)
        .not('status', 'in', '(rejected,archived)')
        .is('owner_finished_at', null);
    } else if (tab === 'responses') {
      query = query
        .eq('applicant_id', userId)
        .not('status', 'in', '(rejected,archived)')
        .is('applicant_finished_at', null);
    } else {
      query = query
        .or(`owner_id.eq.${userId},applicant_id.eq.${userId}`)
        .or(`status.in.(rejected,archived),and(owner_id.eq.${userId},owner_finished_at.not.is.null),and(applicant_id.eq.${userId},applicant_finished_at.not.is.null)`);
    }

    const { data, error } = await query;

    if (error) throw error;

    chatsByTab[tab] = (data || []) as unknown as AnnouncementChat[];
    loadedTabs[tab] = true;
  } catch (error: any) {
    toast.error(error.message || 'Не удалось загрузить чаты');
  } finally {
    loadingTabs[tab] = false;
  }
}

async function loadChats() {
  await loadChatsForTab(activeTab.value, true);
}

function removeChatFromTabs(chatId: string) {
  (Object.keys(chatsByTab) as ChatTab[]).forEach((tab) => {
    chatsByTab[tab] = chatsByTab[tab].filter(chat => chat.id !== chatId);
  });
}

function upsertChat(chat: AnnouncementChat) {
  const tab = getChatTab(chat);
  removeChatFromTabs(chat.id);

  if (!tab) return;

  chatsByTab[tab] = [chat, ...chatsByTab[tab]]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
}

function shouldShowChatReviews(chat: AnnouncementChat | null) {
  if (!chat) return false;
  return chat.status === 'archived' || hasUserFinished(chat, currentUserId.value);
}

async function loadChatReviews() {
  chatReviews.value = [];

  if (!selectedChatId.value || !shouldShowChatReviews(selectedChat.value)) return;

  try {
    isLoadingChatReviews.value = true;

    const { data, error } = await supabase
      .from('announcement_chat_reviews')
      .select(`
        id,
        chat_id,
        reviewer_id,
        reviewed_user_id,
        rating,
        comment,
        created_at,
        reviewer:users!announcement_chat_reviews_reviewer_id_fkey(id, first_name, last_name, avatar_url)
      `)
      .eq('chat_id', selectedChatId.value);

    if (error) throw error;

    chatReviews.value = (data || []) as unknown as UserReview[];
  } catch (error: any) {
    console.error('Ошибка загрузки отзывов чата:', error);
  } finally {
    isLoadingChatReviews.value = false;
  }
}

async function loadMessages() {
  if (!selectedChatId.value) {
    messages.value = [];
    return;
  }

  try {
    isLoadingMessages.value = true;

    const { data, error } = await supabase
      .from('announcement_chat_messages')
      .select(`
        id,
        chat_id,
        sender_id,
        body,
        created_at,
        sender:users!announcement_chat_messages_sender_id_fkey(id, first_name, last_name, avatar_url)
      `)
      .eq('chat_id', selectedChatId.value)
      .order('created_at', { ascending: true });

    if (error) throw error;

    messages.value = (data || []) as unknown as ChatMessage[];
  } catch (error: any) {
    toast.error(error.message || 'Не удалось загрузить сообщения');
  } finally {
    isLoadingMessages.value = false;
  }
}

async function loadChatById(chatId: string) {
  const { data, error } = await supabase
    .from('announcement_chats')
    .select(chatSelectQuery())
    .eq('id', chatId)
    .maybeSingle();

  if (error || !data) return;

  const loadedChat = data as unknown as AnnouncementChat;
  upsertChat(loadedChat);
}

async function ensureSelectedChatLoaded() {
  if (!selectedChatId.value || selectedChat.value) return;
  await loadChatById(selectedChatId.value);
  syncActiveTabWithSelectedChat();
}

async function markSelectedChatRead() {
  if (!selectedChatId.value || !selectedChat.value || !isChatUnread(selectedChat.value)) return;

  const readAt = new Date().toISOString();
  const { error } = await supabase.rpc('mark_announcement_chat_read', {
    target_chat_id: selectedChatId.value,
  });

  if (error) {
    console.error('Ошибка отметки чата прочитанным:', error);
    return;
  }

  const readChat = selectedChat.value;
  if (!readChat) return;

  upsertChat({
    ...readChat,
    owner_last_read_at: readChat.owner_id === currentUserId.value ? readAt : readChat.owner_last_read_at,
    applicant_last_read_at: readChat.applicant_id === currentUserId.value ? readAt : readChat.applicant_last_read_at,
  });
  window.dispatchEvent(new CustomEvent('announcement-chat-read-state-changed'));
}

function updateChatAfterMessage(chatId: string, createdAt: string, senderId: string) {
  const chat = allLoadedChats.value.find(item => item.id === chatId);
  if (!chat) return;

  upsertChat({
    ...chat,
    last_message_at: createdAt,
    last_message_sender_id: senderId,
    updated_at: createdAt,
  });
}

async function appendRealtimeMessage(message: ChatMessage) {
  if (messages.value.some(existingMessage => existingMessage.id === message.id)) return;

  messages.value = [...messages.value, message];
  updateChatAfterMessage(message.chat_id, message.created_at, message.sender_id);

  if (message.sender_id !== currentUserId.value) {
    await markSelectedChatRead();
  }
}

async function unsubscribeMessagesChannel() {
  if (!messagesChannel.value) return;

  await supabase.removeChannel(messagesChannel.value);
  messagesChannel.value = null;
}

async function unsubscribeChatsChannel() {
  if (!chatsChannel.value) return;

  await supabase.removeChannel(chatsChannel.value);
  chatsChannel.value = null;
}

async function subscribeToSelectedChatMessages() {
  await unsubscribeMessagesChannel();

  if (!selectedChatId.value) return;

  messagesChannel.value = supabase
    .channel(`announcement-chat-messages:${selectedChatId.value}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'announcement_chat_messages',
        filter: `chat_id=eq.${selectedChatId.value}`,
      },
      async (payload) => {
        const newMessage = payload.new as {
          id: string;
          chat_id: string;
          sender_id: string;
          body: string;
          created_at: string;
        };

        await appendRealtimeMessage({
          ...newMessage,
          sender: null,
        });
      },
    )
    .subscribe();
}

async function subscribeToUserChats() {
  await unsubscribeChatsChannel();

  if (!currentUserId.value) return;

  chatsChannel.value = supabase
    .channel(`announcement-chats:${currentUserId.value}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'announcement_chats',
      },
      async (payload) => {
        const changedChat = payload.new as Partial<AnnouncementChat> | null;
        const oldChat = payload.old as Partial<AnnouncementChat> | null;
        const chat = changedChat?.id ? changedChat : oldChat;

        if (!chat?.id) return;
        if (chat.owner_id !== currentUserId.value && chat.applicant_id !== currentUserId.value) return;

        if (payload.eventType === 'DELETE') {
          removeChatFromTabs(chat.id);
          return;
        }

        const existingChat = allLoadedChats.value.find(existing => existing.id === chat.id);

        if (!existingChat) {
          await loadChatById(chat.id);
          return;
        }

        upsertChat({ ...existingChat, ...changedChat });
      },
    )
    .subscribe();
}

async function openChat(chatId: string) {
  selectedChatId.value = chatId;
  window.history.pushState({}, '', `/profile/chats/${chatId}`);
  syncActiveTabWithSelectedChat();
  await loadMessages();
  await loadChatReviews();
  await markSelectedChatRead();
  await subscribeToSelectedChatMessages();
}

async function closeChat() {
  selectedChatId.value = null;
  messages.value = [];
  chatReviews.value = [];
  window.history.pushState({}, '', '/profile/chats');
  await unsubscribeMessagesChannel();
}

async function updateChatStatus(status: ChatStatus) {
  if (!selectedChat.value || selectedChat.value.owner_id !== currentUserId.value) return;

  try {
    isActionLoading.value = true;
    const { error } = await supabase
      .from('announcement_chats')
      .update({ status })
      .eq('id', selectedChat.value.id);

    if (error) throw error;

    upsertChat({
      ...selectedChat.value,
      status,
      updated_at: new Date().toISOString(),
    });
    toast.success(status === 'accepted' ? 'Отклик принят' : 'Отклик отклонен и отправлен в архив');
    syncActiveTabWithSelectedChat();
  } catch (error: any) {
    toast.error(error.message || 'Не удалось обновить отклик');
  } finally {
    isActionLoading.value = false;
  }
}

function openFinishDialog() {
  if (!selectedChat.value || selectedChat.value.status !== 'accepted' || hasUserFinished(selectedChat.value, currentUserId.value)) return;
  finishDialogMode.value = 'finish';
  isFinishDialogOpen.value = true;
}

function openReviewDialog() {
  if (!selectedChat.value || !isPendingReview(selectedChat.value)) return;
  finishDialogMode.value = 'review';
  isFinishDialogOpen.value = true;
}

function applyFinishToChat(chat: AnnouncementChat): AnnouncementChat {
  const userId = currentUserId.value!;
  const now = new Date().toISOString();
  const isOwner = chat.owner_id === userId;
  const ownerFinishedAt = isOwner ? (chat.owner_finished_at || now) : chat.owner_finished_at;
  const applicantFinishedAt = !isOwner ? (chat.applicant_finished_at || now) : chat.applicant_finished_at;

  return {
    ...chat,
    owner_finished_at: ownerFinishedAt,
    applicant_finished_at: applicantFinishedAt,
    status: ownerFinishedAt && applicantFinishedAt ? 'archived' : chat.status,
    updated_at: now,
  };
}

async function completeChatWithReview(payload: { rating: number | null; comment: string }) {
  if (!selectedChat.value || !currentUserId.value || selectedChat.value.status !== 'accepted') return;
  if (finishDialogMode.value === 'finish' && hasUserFinished(selectedChat.value, currentUserId.value)) return;
  if (finishDialogMode.value === 'review' && !isPendingReview(selectedChat.value)) return;

  const companion = getCompanion(selectedChat.value);
  if (!companion) return;

  try {
    isActionLoading.value = true;

    if (payload.rating !== null) {
      const { error: reviewError } = await supabase
        .from('announcement_chat_reviews')
        .insert({
          chat_id: selectedChat.value.id,
          reviewer_id: currentUserId.value,
          reviewed_user_id: companion.id,
          rating: payload.rating,
          comment: payload.comment,
        });

      if (reviewError) throw reviewError;
    }

    const { error } = await supabase.rpc('finish_announcement_chat', {
      target_chat_id: selectedChat.value.id,
    });

    if (error) throw error;

    upsertChat(applyFinishToChat(selectedChat.value));
    syncActiveTabWithSelectedChat();
    isFinishDialogOpen.value = false;
    await loadChatReviews();

    if (finishDialogMode.value === 'review') {
      toast.success(payload.rating !== null ? 'Отзыв отправлен. Чат перенесён в архив.' : 'Чат перенесён в архив');
    } else {
      toast.success(payload.rating !== null ? 'Чат завершён. Спасибо за отзыв!' : 'Чат завершён');
    }
  } catch (error: any) {
    toast.error(error.message || 'Не удалось завершить чат');
  } finally {
    isActionLoading.value = false;
  }
}

async function sendMessage(body: string) {
  if (!body || !currentUserId.value || !selectedChatId.value || selectedChat.value?.status !== 'accepted') return;
  if (hasUserFinished(selectedChat.value, currentUserId.value) || hasCompanionFinished(selectedChat.value)) return;

  try {
    isSending.value = true;
    const { data, error } = await supabase
      .from('announcement_chat_messages')
      .insert({
        chat_id: selectedChatId.value,
        sender_id: currentUserId.value,
        body,
      })
      .select('id, chat_id, sender_id, body, created_at')
      .single();

    if (error) throw error;

    if (data) {
      await appendRealtimeMessage({
        ...data,
        sender: null,
      });
    }
  } catch (error: any) {
    toast.error(error.message || 'Не удалось отправить сообщение');
  } finally {
    isSending.value = false;
  }
}

watch(() => props.selectedChatId, async (newChatId) => {
  selectedChatId.value = newChatId || null;
  await ensureSelectedChatLoaded();
  syncActiveTabWithSelectedChat();
  await loadMessages();
  await loadChatReviews();
  await markSelectedChatRead();
  await subscribeToSelectedChatMessages();
});

watch(activeTab, async (tab) => {
  await loadChatsForTab(tab);
});

watch(selectedChat, () => {
  syncActiveTabWithSelectedChat();
});

onMounted(async () => {
  await ensureCurrentUserId();
  if (selectedChatId.value) {
    await ensureSelectedChatLoaded();
  } else {
    await loadChatsForTab(activeTab.value);
  }
  await subscribeToUserChats();
  await loadMessages();
  await loadChatReviews();
  await markSelectedChatRead();
  await subscribeToSelectedChatMessages();
});

onUnmounted(() => {
  unsubscribeMessagesChannel();
  unsubscribeChatsChannel();
});
</script>

<template>
  <div class="container mx-auto h-[calc(100dvh-106px)] overflow-hidden px-0 py-0 md:h-[calc(100dvh-80px)] md:px-4 md:py-6">
    <div class="grid h-full min-h-0 overflow-hidden lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-4">
      <aside
        class="min-h-0 flex-col overflow-hidden border-r bg-background lg:flex lg:rounded-3xl lg:border"
        :class="selectedChatId ? 'hidden lg:flex' : 'flex'"
      >
        <div class="border-b p-4">
          <h1 class="text-2xl font-bold">Чаты</h1>
          <p class="mt-1 text-sm text-muted-foreground">Отклики и запросы по объявлениям</p>
        </div>

        <ui-tabs v-model="activeTab" class="flex min-h-0 flex-1 flex-col">
          <div class="border-b p-3">
            <ui-tabs-list class="grid w-full grid-cols-3">
              <ui-tabs-trigger value="requests" class="text-xs sm:text-sm">
                Запросы
                <span
                  v-if="unreadRequestCount > 0"
                  class="ml-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold leading-none text-white"
                >
                  {{ getBadgeCount(unreadRequestCount) }}
                </span>
              </ui-tabs-trigger>
              <ui-tabs-trigger value="responses" class="text-xs sm:text-sm">
                Отклики
                <span
                  v-if="unreadResponseCount > 0"
                  class="ml-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold leading-none text-white"
                >
                  {{ getBadgeCount(unreadResponseCount) }}
                </span>
              </ui-tabs-trigger>
              <ui-tabs-trigger value="archive" class="text-xs sm:text-sm">
                Архив
                <span
                  v-if="unreadArchiveCount > 0"
                  class="ml-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold leading-none text-white"
                >
                  {{ getBadgeCount(unreadArchiveCount) }}
                </span>
              </ui-tabs-trigger>
            </ui-tabs-list>
          </div>

          <div class="min-h-0 flex-1 overflow-y-auto p-3">
            <div v-if="isActiveTabLoading" class="space-y-3">
              <ui-skeleton v-for="i in 6" :key="i" class="h-24 w-full rounded-2xl" />
            </div>

            <div v-else-if="visibleChats.length === 0" class="flex h-full min-h-[360px] items-center justify-center px-4 text-center">
              <ui-empty>
                <ui-empty-header>
                  <ui-empty-media variant="icon">
                    <MessageCircle class="h-10 w-10" />
                  </ui-empty-media>
                  <ui-empty-title>{{ getEmptyText() }}</ui-empty-title>
                  <ui-empty-description>
                    Чаты этой вкладки появятся здесь после новых откликов или сообщений.
                  </ui-empty-description>
                </ui-empty-header>
              </ui-empty>
            </div>

            <div v-else class="space-y-2">
              <button
                v-for="chat in visibleChats"
                :key="chat.id"
                type="button"
                class="w-full rounded-2xl border p-3 text-left transition hover:bg-muted/60"
                :class="chat.id === selectedChatId ? 'border-primary bg-primary/5' : 'bg-card'"
                @click="openChat(chat.id)"
              >
                <div class="flex items-start gap-3">
                  <ui-avatar class="h-10 w-10">
                    <ui-avatar-image :src="getCompanion(chat)?.avatar_url || ''" />
                    <ui-avatar-fallback>{{ getCompanionName(chat).slice(0, 2).toUpperCase() }}</ui-avatar-fallback>
                  </ui-avatar>

                  <div class="min-w-0 flex-1">
                    <div class="flex items-center justify-between gap-2">
                      <p class="truncate font-semibold">{{ getCompanionName(chat) }}</p>
                      <div class="flex shrink-0 items-center gap-1.5">
                        <span
                          v-if="isChatUnread(chat)"
                          class="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold leading-none text-white"
                        >
                          1
                        </span>
                        <span class="text-xs text-muted-foreground">
                          {{ formatShortDate(chat.last_message_at || chat.updated_at || chat.created_at) }}
                        </span>
                      </div>
                    </div>
                    <p class="mt-0.5 truncate text-sm text-muted-foreground">
                      {{ chat.announcement?.title || 'Объявление удалено' }}
                    </p>
                    <div class="mt-2 flex items-center justify-between gap-2">
                      <p class="line-clamp-1 text-sm">{{ chat.initial_message }}</p>
                      <ui-badge :variant="isPendingReview(chat) ? 'secondary' : chat.status === 'accepted' ? 'default' : chat.status === 'pending' ? 'secondary' : 'outline'">
                    {{ getStatusText(chat) }}
                      </ui-badge>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </ui-tabs>
      </aside>

      <section
        class="min-h-0 flex-col overflow-hidden bg-background lg:flex lg:rounded-3xl lg:border lg:shadow-sm"
        :class="selectedChatId ? 'flex' : 'hidden lg:flex'"
      >
        <div v-if="!selectedChatId" class="flex h-full flex-col items-center justify-center p-8 text-center">
          <div class="mb-4 rounded-full bg-muted p-4">
            <Inbox class="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 class="text-xl font-semibold">Выберите чат</h2>
          <p class="mt-2 max-w-sm text-sm text-muted-foreground">
            Откройте запрос, отклик или архивный чат из списка слева.
          </p>
        </div>

        <div v-else-if="selectedChatId && !selectedChat" class="flex h-full items-center justify-center">
          <ui-spinner size="lg" />
        </div>

        <div v-else-if="!selectedChat" class="flex h-full flex-col items-center justify-center p-8 text-center">
          <p class="text-muted-foreground">Чат не найден</p>
          <ui-button variant="outline" class="mt-4" @click="router.push('/profile/chats')">
            Вернуться к списку
          </ui-button>
        </div>

        <profile-chat-with-user
          v-else
          :chat="selectedChat"
          :messages="messages"
          :current-user-id="currentUserId"
          :is-loading-messages="isLoadingMessages"
          :is-action-loading="isActionLoading"
          :is-sending="isSending"
          :is-unread="isChatUnread(selectedChat)"
          :pending-review="selectedChatPendingReview"
          :current-user-finished="selectedChatCurrentUserFinished"
          :show-reviews="shouldShowChatReviews(selectedChat)"
          :reviews="chatReviews"
          :is-loading-reviews="isLoadingChatReviews"
          @back="closeChat"
          @update-status="updateChatStatus"
          @finish-chat="openFinishDialog"
          @leave-review="openReviewDialog"
          @send-message="sendMessage"
        />
      </section>
    </div>

    <profile-chat-finish-review-dialog
      v-if="selectedChat"
      v-model:open="isFinishDialogOpen"
      :mode="finishDialogMode"
      :companion-name="getCompanionName(selectedChat)"
      :is-submitting="isActionLoading"
      @submit="completeChatWithReview"
    />
  </div>
</template>
