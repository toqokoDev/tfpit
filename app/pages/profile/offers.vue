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
        likes_count,
        views_count,
        created_at,
        shooting_date,
        shooting_date_type,
        location_name,
        references_urls,
        role,
        shooting_genre_id
      `)
      .eq('user', authUserData.user.id)
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
      <offer-announcement-card
        v-for="i in 6"
        :key="i"
        skeleton
      />
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
      <div
        v-for="announcement in announcements"
        :key="announcement.id"
        class="relative"
      >
        <offer-announcement-card :announcement="announcement" />

        <div class="absolute right-3 top-3 z-20 flex gap-1 rounded-full bg-background/90 p-1 shadow-sm backdrop-blur">
          <ui-button
            variant="ghost"
            size="icon"
            class="h-8 w-8"
            @click.stop="router.push(`/offer/${announcement.id}`)"
          >
            <Eye class="w-4 h-4" />
            <span class="sr-only">Открыть объявление</span>
          </ui-button>
          <ui-button
            variant="ghost"
            size="icon"
            class="h-8 w-8"
            @click.stop="router.push(`/offer/edit/${announcement.id}`)"
          >
            <Pencil class="w-4 h-4" />
            <span class="sr-only">Редактировать объявление</span>
          </ui-button>
          <ui-button
            variant="ghost"
            size="icon"
            class="h-8 w-8 text-destructive hover:text-destructive"
            @click.stop="openDeleteDialog(announcement.id)"
          >
            <Trash2 class="w-4 h-4" />
            <span class="sr-only">Удалить объявление</span>
          </ui-button>
        </div>
      </div>
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
