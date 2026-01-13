<script setup lang="ts">
import { Field as VeeField } from "vee-validate";

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  options: { label: string; value: string }[];
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

      <ui-select
        :id="name"
        :model-value="field.value"
        @update:model-value="setValue"
      >
        <ui-select-trigger :aria-invalid="!!errors.length">
          <ui-select-value :placeholder="placeholder" />
        </ui-select-trigger>
        
        <ui-select-content>
          <ui-select-item 
            v-for="opt in options" 
            :key="opt.value" 
            :value="opt.value"
          >
            {{ opt.label }}
          </ui-select-item>
        </ui-select-content>
      </ui-select>

      <ui-field-error
        v-if="errors.length"
        :errors="getErrors(errors)"
      />
    </ui-field>
  </vee-field>
</template>
