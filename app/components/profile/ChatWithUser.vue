<script setup lang="ts">
import { ArrowDown, ArrowLeft, Check, Send, X } from 'lucide-vue-next';
import type { AnnouncementChat, ChatMessage, ChatStatus, ChatUser, UserReview } from '../../types/announcementChats';

const props = defineProps<{
  chat: AnnouncementChat;
  messages: ChatMessage[];
  currentUserId: string | null;
  isLoadingMessages: boolean;
  isActionLoading: boolean;
  isSending: boolean;
  isUnread: boolean;
  pendingReview: boolean;
  currentUserFinished: boolean;
  showReviews: boolean;
  reviews: UserReview[];
  isLoadingReviews: boolean;
}>();

const emit = defineEmits<{
  back: [];
  updateStatus: [status: ChatStatus];
  finishChat: [];
  leaveReview: [];
  sendMessage: [body: string];
}>();

const newMessage = ref('');
const messageInput = ref<HTMLTextAreaElement | null>(null);
const messagesContainer = ref<HTMLElement | null>(null);
const showScrollDownButton = ref(false);
const shouldScrollAfterSend = ref(false);

const isOwner = computed(() => props.chat.owner_id === props.currentUserId);
const companion = computed<ChatUser | null>(() => isOwner.value ? props.chat.applicant : props.chat.owner);
const companionName = computed(() => {
  if (!companion.value) return 'Пользователь';
  return `${companion.value.first_name} ${companion.value.last_name}`.trim() || 'Пользователь';
});
const companionFallback = computed(() => companionName.value.slice(0, 2).toUpperCase());

function updateScrollDownButton() {
  const container = messagesContainer.value;
  if (!container) {
    showScrollDownButton.value = false;
    return;
  }

  const distanceToBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
  showScrollDownButton.value = distanceToBottom > 160;
}

function isNearMessagesBottom(threshold = 80) {
  const container = messagesContainer.value;
  if (!container) return true;

  const distanceToBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
  return distanceToBottom <= threshold;
}

function scrollMessagesToBottom(behavior: ScrollBehavior = 'smooth') {
  const container = messagesContainer.value;
  if (!container) return;

  container.scrollTo({
    top: container.scrollHeight,
    behavior,
  });
}

function resizeMessageInput() {
  const input = messageInput.value;
  if (!input) return;

  input.style.height = 'auto';
  input.style.height = `${Math.min(input.scrollHeight, 112)}px`;
}

async function handleSendMessage() {
  const body = newMessage.value.trim();
  if (!body || props.chat.status !== 'accepted' || props.pendingReview || props.currentUserFinished) return;

  shouldScrollAfterSend.value = true;
  emit('sendMessage', body);
  newMessage.value = '';
  await nextTick();
  resizeMessageInput();
}

watch(() => props.messages.length, async () => {
  const shouldStickToBottom = shouldScrollAfterSend.value || isNearMessagesBottom();

  await nextTick();

  if (shouldStickToBottom) {
    scrollMessagesToBottom(shouldScrollAfterSend.value ? 'smooth' : 'auto');
    shouldScrollAfterSend.value = false;
    await nextTick();
  }

  updateScrollDownButton();
}, { flush: 'pre' });

onMounted(async () => {
  await nextTick();
  resizeMessageInput();
  scrollMessagesToBottom('auto');
  updateScrollDownButton();
});

watch(newMessage, async () => {
  await nextTick();
  resizeMessageInput();
});
</script>

<template>
  <header class="flex h-16 shrink-0 items-center justify-between gap-3 border-b bg-background/95 px-3 backdrop-blur sm:px-5">
    <div class="flex min-w-0 items-center gap-3">
      <ui-button variant="ghost" size="icon" class="rounded-full lg:hidden" @click="emit('back')">
        <ArrowLeft class="h-4 w-4" />
      </ui-button>
      <ui-avatar class="h-9 w-9">
        <ui-avatar-image :src="companion?.avatar_url || ''" />
        <ui-avatar-fallback>{{ companionFallback }}</ui-avatar-fallback>
      </ui-avatar>
      <div class="min-w-0">
        <p class="truncate text-sm font-semibold">{{ companionName }}</p>
        <NuxtLink
          v-if="chat.announcement"
          :to="`/offer/${chat.announcement.id}`"
          class="block max-w-[220px] truncate text-xs text-muted-foreground hover:underline sm:max-w-md"
        >
          {{ chat.announcement.title }}
        </NuxtLink>
      </div>
    </div>

    <div class="flex items-center gap-2">
      <span
        v-if="isUnread"
        class="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold leading-none text-white"
      >
        1
      </span>
      <ui-badge :variant="pendingReview ? 'secondary' : chat.status === 'accepted' ? 'default' : chat.status === 'pending' ? 'secondary' : 'outline'">
        {{ pendingReview ? 'Ожидает отзыв' : chat.status === 'accepted' ? 'Принят' : chat.status === 'pending' ? 'Ожидает' : 'Архив' }}
      </ui-badge>
    </div>
  </header>

  <div v-if="chat.status === 'pending' && isOwner" class="border-b bg-background px-4 py-3">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p class="text-sm text-muted-foreground">Пользователь откликнулся на ваше объявление. Примите отклик, чтобы открыть переписку.</p>
      <div class="flex gap-2">
        <ui-button size="sm" class="rounded-full" :disabled="isActionLoading" @click="emit('updateStatus', 'accepted')">
          <Check class="mr-2 h-4 w-4" />
          Принять
        </ui-button>
        <ui-button size="sm" variant="outline" class="rounded-full" :disabled="isActionLoading" @click="emit('updateStatus', 'rejected')">
          <X class="mr-2 h-4 w-4" />
          Отклонить
        </ui-button>
      </div>
    </div>
  </div>

  <div v-else-if="chat.status === 'pending'" class="border-b bg-background px-4 py-3 text-center text-sm text-muted-foreground">
    Отклик отправлен. Переписка откроется после принятия автором объявления.
  </div>

  <div v-else-if="chat.status === 'rejected'" class="border-b bg-background px-4 py-3 text-center text-sm text-muted-foreground">
    Отклик отклонен. Чат находится в архиве.
  </div>

  <div v-else-if="chat.status === 'archived' || currentUserFinished" class="border-b bg-background px-4 py-3 text-center text-sm text-muted-foreground">
    Диалог завершён и находится в архиве.
  </div>

  <div v-else-if="pendingReview" class="border-b bg-background px-4 py-3">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p class="text-sm text-muted-foreground">{{ companionName }} завершил чат. Оставьте отзыв, чтобы перенести его в архив.</p>
      <ui-button
        size="sm"
        class="rounded-full"
        :disabled="isActionLoading"
        @click="emit('leaveReview')"
      >
        Оставить отзыв
      </ui-button>
    </div>
  </div>

  <div v-else-if="chat.status === 'accepted'" class="border-b bg-background px-4 py-3">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p class="text-sm text-muted-foreground">Чат активен. При завершении можно оставить отзыв.</p>
      <ui-button
        size="sm"
        variant="outline"
        class="rounded-full"
        :disabled="isActionLoading"
        @click="emit('finishChat')"
      >
        Завершить чат
      </ui-button>
    </div>
  </div>

  <div class="relative min-h-0 flex-1">
    <div
      ref="messagesContainer"
      class="chat-scroll-area h-full space-y-3 overflow-y-auto bg-background px-3 py-5 sm:px-6"
      @scroll="updateScrollDownButton"
    >
      <div v-if="isLoadingMessages" class="flex h-full items-center justify-center">
        <ui-spinner size="lg" />
      </div>

      <template v-else>
        <div class="mb-8 flex flex-col items-center text-center">
          <ui-avatar class="h-20 w-20">
            <ui-avatar-image :src="companion?.avatar_url || ''" />
            <ui-avatar-fallback class="text-lg">{{ companionFallback }}</ui-avatar-fallback>
          </ui-avatar>
          <p class="mt-3 font-semibold">{{ companionName }}</p>
          <NuxtLink
            v-if="chat.announcement"
            :to="`/offer/${chat.announcement.id}`"
            class="mt-1 max-w-sm truncate text-sm text-muted-foreground hover:underline"
          >
            {{ chat.announcement.title }}
          </NuxtLink>
        </div>

        <profile-chat-announcement-preview
          v-if="chat.announcement"
          :announcement="chat.announcement"
          :companion="companion"
        />

        <profile-chat-message
          :body="chat.initial_message"
          :created-at="chat.created_at"
          :sender-id="chat.applicant_id"
          :current-user-id="currentUserId"
          meta="Первый отклик"
        />

        <div v-if="messages.length === 0" class="py-8 text-center text-sm text-muted-foreground">
          Сообщений пока нет.
        </div>

        <profile-chat-message
          v-for="message in messages"
          :key="message.id"
          :body="message.body"
          :created-at="message.created_at"
          :sender-id="message.sender_id"
          :current-user-id="currentUserId"
        />

        <profile-chat-archive-reviews
          v-if="showReviews"
          :reviews="reviews"
          :is-loading="isLoadingReviews"
          :current-user-id="currentUserId"
          :companion-name="companionName"
        />
      </template>
    </div>

    <button
      v-if="showScrollDownButton"
      type="button"
      class="absolute bottom-3 left-1/2 z-20 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border bg-background/95 text-foreground shadow-lg backdrop-blur transition hover:bg-muted"
      aria-label="Прокрутить вниз"
      @click="() => scrollMessagesToBottom()"
    >
      <ArrowDown class="h-4 w-4" />
    </button>
  </div>

  <form v-if="chat.status === 'accepted' && !pendingReview && !currentUserFinished" class="border-t bg-background p-3 sm:p-4" @submit.prevent="handleSendMessage">
    <div class="flex items-end gap-2 rounded-[1.75rem] border bg-transparent px-4 py-2 focus-within:border-primary/60">
      <textarea
        ref="messageInput"
        v-model="newMessage"
        placeholder="Сообщение..."
        rows="1"
        class="max-h-28 min-h-8 flex-1 resize-none overflow-y-auto border-0 bg-transparent px-0 py-1 text-sm outline-none placeholder:text-muted-foreground focus:ring-0"
        @input="resizeMessageInput"
        @keydown.enter.exact.prevent="handleSendMessage"
      />
      <ui-button
        type="submit"
        size="icon"
        class="h-8 w-8 shrink-0 rounded-full"
        :disabled="isSending || !newMessage.trim()"
      >
        <Send class="h-4 w-4" />
      </ui-button>
    </div>
  </form>
</template>

<style scoped>
.chat-scroll-area,
textarea {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--muted-foreground) / 0.35) transparent;
}

.chat-scroll-area::-webkit-scrollbar,
textarea::-webkit-scrollbar {
  width: 8px;
}

.chat-scroll-area::-webkit-scrollbar-track,
textarea::-webkit-scrollbar-track {
  background: transparent;
}

.chat-scroll-area::-webkit-scrollbar-thumb,
textarea::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.28);
  border: 2px solid transparent;
  border-radius: 999px;
  background-clip: content-box;
}

.chat-scroll-area::-webkit-scrollbar-thumb:hover,
textarea::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.45);
  background-clip: content-box;
}
</style>
