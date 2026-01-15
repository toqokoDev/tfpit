import { q as executeAsync } from '../_/nitro.mjs';
import { e as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
import { u as useCurrentUserStore, c as createSomethingWentWrongError } from './current-user-h5Lc7er2.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-xv77-Kdn.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'pinia';
import 'vue-router';
import '@supabase/ssr';
import 'lucide-vue-next';
import 'vue-sonner';
import 'clsx';
import 'tailwind-merge';

const auth = defineNuxtRouteMiddleware(async (to) => {
  let __temp, __restore;
  const currentUserStore = useCurrentUserStore();
  if (currentUserStore.isExist()) {
    return;
  }
  const supabase = useSupabaseClient();
  const { data: { user: authUser }, error: authError } = ([__temp, __restore] = executeAsync(() => supabase.auth.getUser()), __temp = await __temp, __restore(), __temp);
  if (authError || authUser === null) {
    [__temp, __restore] = executeAsync(() => supabase.auth.signOut()), await __temp, __restore();
    return navigateTo("/auth/login");
  }
  const { data: user, error: userFetchError } = ([__temp, __restore] = executeAsync(() => supabase.from("users").select(`
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
    `).eq("id", authUser.id).limit(1).maybeSingle()), __temp = await __temp, __restore(), __temp);
  const { data: portfolio, error: portfolioFetchError } = ([__temp, __restore] = executeAsync(() => supabase.from("portfolios").select(`
      id,
      image_url,
      category,
      description,
      is_public,
      likes_count,
      views_count,
      created_at,
      updated_at
    `).eq("user_id", authUser.id)), __temp = await __temp, __restore(), __temp);
  if (userFetchError) {
    throw createSomethingWentWrongError();
  }
  if (user === null) {
    const { error: signOutError } = ([__temp, __restore] = executeAsync(() => supabase.auth.signOut()), __temp = await __temp, __restore(), __temp);
    if (signOutError) {
      throw createSomethingWentWrongError();
    }
    [__temp, __restore] = executeAsync(() => navigateTo("/auth/login")), await __temp, __restore();
    return;
  }
  const userRole = user.role;
  const portfolioItems = (portfolio || []).map((item) => ({
    id: item.id,
    image_url: item.image_url ? item.image_url.split("|").filter((url) => url.trim()) : [],
    category: item.category,
    description: item.description,
    is_public: item.is_public,
    likes_count: item.likes_count,
    views_count: item.views_count,
    created_at: item.created_at,
    updated_at: item.updated_at
  }));
  currentUserStore.setUser({
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    avatar_url: user.avatar_url || void 0,
    cover_url: user.cover_url || void 0,
    phone: user.phone || void 0,
    city: user.city || void 0,
    bio: user.bio || void 0,
    gender: user.gender || void 0,
    birth_date: user.birth_date || void 0,
    role: {
      id: userRole.id,
      title: userRole.title,
      description: userRole.description
    },
    portfolio: portfolioItems,
    created_at: user.created_at,
    updated_at: user.updated_at
  });
});

export { auth as default };
//# sourceMappingURL=auth-BY8ZIY-d.mjs.map
