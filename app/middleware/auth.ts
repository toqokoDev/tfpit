export default defineNuxtRouteMiddleware(async (to) => {
  // Check if user is already exist

  const currentUserStore = useCurrentUserStore();

  if (currentUserStore.isExist()) {
    return;
  }

  // Fetch auth user

  const supabase = useSupabaseClient<Database>();
  const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

  if (authError || authUser === null) {
    await supabase.auth.signOut();

    return navigateTo('/auth/login');
  }

  // Fetch user data

  const { data: user, error: userFetchError } = await supabase
    .from('users')
    .select(`
      id,
      email,
      first_name,
      last_name,
      phone,
      city,
      bio,
      cover_url,
      avatar_url,
      gender,
      birth_date,
      role:role(id, title, description),
      created_at,
      updated_at
    `)
    .eq('id', authUser.id)
    .limit(1)
    .maybeSingle();

  if (userFetchError) {
    throw createSomethingWentWrongError();
  }

  if (user === null) {
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      throw createSomethingWentWrongError();
    }

    await navigateTo('/auth/login');

    return;
  }

  const userRole = user.role!;

  currentUserStore.setUser({
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    avatar_url: user.avatar_url || undefined,
    cover_url: user.cover_url || undefined,
    phone: user.phone || undefined,
    city: user.city || undefined,
    bio: user.bio || undefined,
    gender: user.gender || undefined,
    birth_date: user.birth_date || undefined,
    role: {
      id: userRole.id,
      title: userRole.title,
      description: userRole.description,
    },
    created_at: user.created_at,
    updated_at: user.updated_at,
  });
});
