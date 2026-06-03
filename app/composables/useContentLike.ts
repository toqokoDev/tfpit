import { toast } from 'vue-sonner';
import type { MaybeRefOrGetter } from 'vue';

type LikeTarget = 'announcement' | 'portfolio';

const targetColumnByType: Record<LikeTarget, 'announcement_id' | 'portfolio_id'> = {
  announcement: 'announcement_id',
  portfolio: 'portfolio_id',
};

export function useContentLike(
  targetType: LikeTarget,
  targetId: MaybeRefOrGetter<string | null | undefined>,
  initialLikesCount: MaybeRefOrGetter<number | null | undefined> = 0,
) {
  const supabase = useSupabaseClient<Database>();
  const likesCount = ref(0);
  const hasLiked = ref(false);
  const isLikeLoading = ref(false);

  const targetColumn = targetColumnByType[targetType];

  async function refreshLikeState() {
    const id = toValue(targetId);
    if (!id) return;

    const [{ count, error: countError }, { data: authData, error: authError }] = await Promise.all([
      supabase
        .from('likes')
        .select('id', { count: 'exact', head: true })
        .eq(targetColumn, id),
      supabase.auth.getUser(),
    ]);

    const nextLikesCount = countError ? (toValue(initialLikesCount) || 0) : (count || 0);
    let nextHasLiked = false;

    const userId = authData.user?.id;
    if (userId && !authError) {
      const { data: likeData } = await supabase
        .from('likes')
        .select('id')
        .eq('user_id', userId)
        .eq(targetColumn, id)
        .maybeSingle();

      nextHasLiked = !!likeData;
    }

    likesCount.value = nextLikesCount;
    hasLiked.value = nextHasLiked;
  }

  async function toggleLike() {
    const id = toValue(targetId);
    if (!id || isLikeLoading.value) return;

    const { data: authData, error: authError } = await supabase.auth.getUser();
    const userId = authData.user?.id;

    if (authError || !userId) {
      toast.error('Войдите, чтобы поставить лайк');
      return;
    }

    const wasLiked = hasLiked.value;
    const previousLikesCount = likesCount.value;
    const nextLikesCount = Math.max(previousLikesCount + (wasLiked ? -1 : 1), 0);

    hasLiked.value = !wasLiked;
    likesCount.value = nextLikesCount;
    isLikeLoading.value = true;

    const { error } = wasLiked
      ? await supabase
          .from('likes')
          .delete()
          .eq('user_id', userId)
          .eq(targetColumn, id)
      : await supabase
          .from('likes')
          .insert({
            user_id: userId,
            [targetColumn]: id,
          });

    if (error) {
      hasLiked.value = wasLiked;
      likesCount.value = previousLikesCount;
      toast.error('Не удалось обновить лайк');
    } else {
      await refreshLikeState();
    }

    isLikeLoading.value = false;
  }

  watch(
    () => [toValue(targetId), toValue(initialLikesCount)] as const,
    ([id, count]) => {
      hasLiked.value = false;

      if (id) {
        void refreshLikeState();
      } else {
        likesCount.value = count || 0;
      }
    },
    { immediate: true },
  );

  return {
    likesCount,
    hasLiked,
    isLikeLoading,
    refreshLikeState,
    toggleLike,
  };
}
