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
});

function getErrors(errors: string[]): string[] {
  if (!errors.length) return [];
  return props.errorsToShow === 'first' ? [errors[0] || ''] : errors;
}
</script>

<template>
  <vee-field :name="name" v-slot="{ field, errors, setValue }">
    <ui-field :data-invalid="!!errors.length">
      <ui-field-label :for="name">
        {{ label }}
      </ui-field-label>

      <ui-date-picker
        :id="name"
        :model-value="field.value"
        :placeholder="placeholder"
        @update:model-value="setValue"
      />

      <ui-field-error
        v-if="errors.length"
        :errors="getErrors(errors)"
      />
    </ui-field>
  </vee-field>
</template>
