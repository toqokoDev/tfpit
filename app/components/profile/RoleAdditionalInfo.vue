<script setup lang="ts">
import { ClipboardList } from 'lucide-vue-next';
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

const tableName = computed(() => {
  if (!props.roleTitle) return null;
  return getTableNameByRole(props.roleTitle);
});

const displayFields = computed(() => {
  if (!tableName.value) return [];
  return getRoleDisplayFields(tableName.value, props.roleData);
});

const placeholderFields = computed(() => {
  if (!tableName.value) return [];
  return getRolePlaceholderFields(tableName.value);
});

const shouldRender = computed(() => hasRoleProfileTable(props.roleTitle));

const visibleFields = computed(() => {
  const fields = displayFields.value.length > 0
    ? displayFields.value
    : placeholderFields.value.map(field => ({ ...field, value: 'Не указано' }));

  return props.compact ? fields.slice(0, 3) : fields;
});

const totalFieldCount = computed(() => {
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

    <div class="rounded-lg border border-dashed bg-muted/40 p-3">
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
