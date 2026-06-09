<script setup lang="ts">
import { ClipboardList, Lock } from 'lucide-vue-next';
import {
  getTableNameByRole,
  getRoleDisplayFields,
  getRolePlaceholderFields,
  hasRoleProfileTable,
} from '~~/shared/utils/role-profiles';

const props = withDefaults(defineProps<{
  roleTitle?: string | null;
  roleData?: Record<string, unknown> | null;
  compact?: boolean;
}>(), {
  roleTitle: null,
  roleData: null,
  compact: false,
});

const authUser = useSupabaseUser();

const tableName = computed(() => {
  if (!props.roleTitle) return null;
  return getTableNameByRole(props.roleTitle);
});

const isAuthenticated = computed(() => !!authUser.value);

const displayFields = computed(() => {
  if (!tableName.value || !isAuthenticated.value) return [];
  return getRoleDisplayFields(tableName.value, props.roleData);
});

const placeholderFields = computed(() => {
  if (!tableName.value) return [];
  return getRolePlaceholderFields(tableName.value);
});

const shouldRender = computed(() => hasRoleProfileTable(props.roleTitle));

const showLockedState = computed(() => !isAuthenticated.value);

const visibleFields = computed(() => {
  let fields = showLockedState.value
    ? placeholderFields.value
    : (displayFields.value.length > 0
        ? displayFields.value
        : placeholderFields.value.map(field => ({ ...field, value: 'Не указано' })));

  return props.compact ? fields.slice(0, 3) : fields;
});

const totalFieldCount = computed(() => {
  if (showLockedState.value) return placeholderFields.value.length;
  return displayFields.value.length > 0
    ? displayFields.value.length
    : placeholderFields.value.length;
});
</script>

<template>
  <div
    v-if="shouldRender"
    class="space-y-2"
    @click.stop
  >
    <h3 class="flex items-center gap-2 text-sm font-semibold">
      <ClipboardList class="h-4 w-4" />
      Дополнительно
    </h3>

    <div
      v-if="showLockedState"
      class="rounded-lg border border-dashed bg-muted/40 p-3"
    >
      <div class="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
        <Lock class="h-3.5 w-3.5 shrink-0" />
        <span>Доступно только для авторизованных пользователей</span>
      </div>

      <div :class="compact ? 'space-y-1.5' : 'grid grid-cols-1 gap-3 sm:grid-cols-2'">
        <div
          v-for="field in visibleFields"
          :key="field.key"
          class="min-w-0"
        >
          <p class="mb-0.5 text-xs text-muted-foreground">{{ field.label }}</p>
          <p class="select-none font-mono text-sm tracking-wider text-muted-foreground">
            {{ field.value }}
          </p>
        </div>
      </div>

      <NuxtLink
        to="/auth/login"
        class="mt-3 inline-block text-xs text-primary hover:underline"
        @click.stop
      >
        Войти для просмотра
      </NuxtLink>
    </div>

    <div
      v-else
      class="rounded-lg border border-dashed bg-muted/40 p-3"
    >
      <div :class="compact ? 'space-y-1.5' : 'grid grid-cols-1 gap-3 sm:grid-cols-2'">
        <div
          v-for="field in visibleFields"
          :key="field.key"
          class="min-w-0"
        >
          <p class="mb-0.5 text-xs text-muted-foreground">{{ field.label }}</p>
          <p class="text-sm font-medium break-words">{{ field.value }}</p>
        </div>

        <p
          v-if="compact && totalFieldCount > 3"
          class="text-xs text-muted-foreground"
        >
          +{{ totalFieldCount - 3 }} ещё
        </p>
      </div>
    </div>
  </div>
</template>
