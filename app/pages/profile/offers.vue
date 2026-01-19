<script lang="ts" setup>
import { Plus, Pencil, Trash2, Eye, Briefcase, AlertTriangle } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

// ----------------
// ----- Data -----
// ----------------

const supabase = useSupabaseClient<Database>();
const router = useRouter();

const announcements = ref<any[]>([]);
const isLoading = ref(false);
const isDeleting = ref(false);
const isDeleteDialogOpen = ref(false);
const announcementToDelete = ref<string | null>(null);

// ---------------------
// ----- Functions -----
// ---------------------

async function loadAnnouncements() {
  try {
    isLoading.value = true;
    
    const { data: authUserData } = await supabase.auth.getUser();
    
    if (!authUserData.user) return;
    
    const { data: announcementsData, error } = await supabase
      .from('announcements')
      .select(`
        id,
        title,
        description,
        city,
        status,
        experience_level,
        responses_count,
        views_count,
        created_at,
        shooting_date,
        shooting_date_type,
        location_name,
        references_urls,
        role_id,
        shooting_genre_id
      `)
      .eq('user_id', authUserData.user.id)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    announcements.value = announcementsData || [];
  } catch (error) {
    console.error('Ошибка загрузки объявлений:', error);
    toast.error('Ошибка при загрузке объявлений');
  } finally {
    isLoading.value = false;
  }
}

function openDeleteDialog(id: string) {
  announcementToDelete.value = id;
  isDeleteDialogOpen.value = true;
}

async function deleteAnnouncement() {
  if (!announcementToDelete.value) return;
  
  try {
    isDeleting.value = true;
    
    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', announcementToDelete.value);
    
    if (error) throw error;
    
    announcements.value = announcements.value.filter(a => a.id !== announcementToDelete.value);
    toast.success('Объявление успешно удалено');
    isDeleteDialogOpen.value = false;
    announcementToDelete.value = null;
  } catch (error) {
    console.error('Ошибка удаления объявления:', error);
    toast.error('Ошибка при удалении объявления');
  } finally {
    isDeleting.value = false;
  }
}

function formatDate(dateString: string | null) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function getImageUrl(references_urls: string | string[] | null): string {
  if (!references_urls) return '';
  if (typeof references_urls === 'string') {
    const urls = references_urls.split(';').filter(url => url.trim());
    return urls[0] || '';
  }
  return Array.isArray(references_urls) ? references_urls[0] || '' : '';
}

onMounted(() => {
  loadAnnouncements();
});

// ----------------
// ----- Page -----
// ----------------

definePageMeta({
  middleware: 'auth',
});

useHead({ title: 'Мои объявления' });
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold">Мои объявления</h1>
        <p class="text-muted-foreground mt-1 text-sm">
          Управляйте своими объявлениями
        </p>
      </div>
      
      <ui-button @click="router.push('/offer/create')">
        <Plus class="w-4 h-4" />
        <span class="hidden sm:flex">Добавить объявление</span>
      </ui-button>
    </div>

    <div v-if="isLoading" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ui-card v-for="i in 6" :key="i" class="space-y-4">
        <ui-card-header>
          <ui-skeleton class="h-6 w-3/4" />
          <ui-skeleton class="h-4 w-full mt-2" />
          <ui-skeleton class="h-4 w-2/3 mt-2" />
        </ui-card-header>
        <ui-card-content class="space-y-3">
          <div class="flex gap-2">
            <ui-skeleton class="h-5 w-20" />
            <ui-skeleton class="h-5 w-24" />
          </div>
          <ui-skeleton class="h-4 w-full" />
          <ui-skeleton class="h-4 w-2/3" />
          <div class="flex items-center gap-4 pt-2 border-t">
            <ui-skeleton class="h-4 w-12" />
            <ui-skeleton class="h-4 w-12" />
            <ui-skeleton class="h-4 w-20 ml-auto" />
          </div>
        </ui-card-content>
      </ui-card>
    </div>

    <div v-else-if="announcements.length === 0" class="flex justify-center py-12">
      <ui-empty>
        <ui-empty-header>
          <ui-empty-media variant="icon">
            <Briefcase class="w-12 h-12" />
          </ui-empty-media>
          <ui-empty-title>Объявлений нет</ui-empty-title>
          <ui-empty-description>
            У вас пока нет объявлений. Создайте первое объявление, чтобы найти работу или сотрудников.
          </ui-empty-description>
        </ui-empty-header>
      </ui-empty>
    </div>

    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ui-card
        v-for="announcement in announcements"
        :key="announcement.id"
        class="relative hover:shadow-lg transition-shadow overflow-hidden pt-0"
      >
        <div v-if="getImageUrl(announcement.references_urls)" class="relative w-full aspect-video overflow-hidden bg-muted">
          <img
            :src="getImageUrl(announcement.references_urls)"
            :alt="announcement.title"
            class="w-full h-full object-cover"
          />
        </div>
        
        <ui-card-header>
          <div class="flex items-start justify-between gap-2">
            <ui-card-title>{{ announcement.title }}</ui-card-title>
            <div class="flex gap-1 flex-shrink-0">
              <ui-button
                variant="ghost"
                size="icon"
                @click.stop="router.push(`/offer/${announcement.id}`)"
              >
                <Eye class="w-4 h-4" />
              </ui-button>
              <ui-button
                variant="ghost"
                size="icon"
                @click.stop="router.push(`/offer/edit/${announcement.id}`)"
              >
                <Pencil class="w-4 h-4" />
              </ui-button>
              <ui-button
                variant="ghost"
                size="icon"
                class="text-destructive hover:text-destructive"
                @click.stop="openDeleteDialog(announcement.id)"
              >
                <Trash2 class="w-4 h-4" />
              </ui-button>
            </div>
          </div>
          <ui-card-description class="line-clamp-2 mt-2">
            {{ announcement.description }}
          </ui-card-description>
        </ui-card-header>

        <ui-card-content class="space-y-3">
          <div class="flex gap-2 text-sm items-center text-muted-foreground">
            <div v-if="announcement.city" class="flex items-center gap-2">
              {{ announcement.city }}
            </div>
            <div v-if="announcement.role" class="flex items-center gap-2">
              <span v-if="announcement.city"> • </span>
              {{ announcement.role.title }}
            </div>
          </div>

          <div class="flex items-center gap-4 pt-2 border-t text-sm text-muted-foreground">
            <div class="flex items-center gap-1">
              <Eye class="h-4 w-4" />
              {{ announcement.views_count || 0 }}
            </div>
            <div v-if="announcement.status" class="flex items-center gap-1">
              <span :class="announcement.status === 'open' ? 'text-green-600' : 'text-muted-foreground'">
                {{ announcement.status === 'open' ? 'Открыто' : 'Закрыто' }}
              </span>
            </div>
            <div class="ml-auto text-xs">
              {{ formatDate(announcement.created_at) }}
            </div>
          </div>
        </ui-card-content>
      </ui-card>
    </div>

    <ui-dialog :open="isDeleteDialogOpen" @update:open="isDeleteDialogOpen = $event">
      <ui-dialog-content class="sm:max-w-md">
        <ui-dialog-header>
          <ui-dialog-title class="flex items-center gap-2">
            <AlertTriangle class="h-5 w-5 text-destructive" />
            Удалить объявление
          </ui-dialog-title>
          <ui-dialog-description>
            Вы уверены, что хотите удалить это объявление? Это действие нельзя отменить.
          </ui-dialog-description>
        </ui-dialog-header>
        
        <ui-dialog-footer>
          <ui-button 
            variant="outline" 
            @click="isDeleteDialogOpen = false"
            :disabled="isDeleting"
          >
            Отмена
          </ui-button>
          <ui-button 
            variant="destructive" 
            @click="deleteAnnouncement"
            :disabled="isDeleting"
          >
            <Trash2 v-if="!isDeleting" class="w-4 h-4 mr-2" />
            <ui-spinner v-else size="sm" class="mr-2" />
            {{ isDeleting ? 'Удаление...' : 'Удалить' }}
          </ui-button>
        </ui-dialog-footer>
      </ui-dialog-content>
    </ui-dialog>
  </div>
</template>
