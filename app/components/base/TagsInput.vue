<script setup lang="ts">
import { Field as VeeField } from "vee-validate";

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  errorsToShow?: 'first' | 'all';
};

const props = withDefaults(defineProps<Props>(), {
  errorsToShow: 'first',
  placeholder: 'Введите значение и нажмите Enter',
});

function getErrors(errors: string[]): string[] {
  if (!errors.length) return [];
  return props.errorsToShow === 'first' ? [errors[0] || ''] : errors;
}
</script>

<template>
  <vee-field :name="name" v-slot="{ field, errors, setValue, setTouched }">
    <ui-field :data-invalid="!!errors.length">
      <ui-field-label :for="name">
        {{ label }}
      </ui-field-label>

      <ui-tags-input
        :id="name"
        :model-value="Array.isArray(field.value) ? field.value : (field.value ? [field.value] : [])"
        @update:model-value="(value) => {
          setValue(value);
          setTouched(true);
        }"
        :aria-invalid="!!errors.length"
      >
        <ui-tags-input-item
          v-for="(tag, index) in (Array.isArray(field.value) ? field.value : [])"
          :key="`${tag}-${index}`"
          :value="tag"
        >
          <ui-tags-input-item-text>{{ tag }}</ui-tags-input-item-text>
          <ui-tags-input-item-delete />
        </ui-tags-input-item>
        <ui-tags-input-input :placeholder="placeholder" />
      </ui-tags-input>

      <ui-field-error
        v-if="errors.length"
        :errors="getErrors(errors)"
      />
    </ui-field>
  </vee-field>
</template>
