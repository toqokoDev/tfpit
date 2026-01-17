<script setup lang="ts">
import { Field as VeeField } from "vee-validate";

// -----------------
// ----- Types -----
// -----------------

type Props = {
  /**
   * The name, id and form binding of the input field.
   */
  name: string;

  /**
   * The label text of the input field.
   */
  label: string;

  /**
   * The placeholder text of the input field.
   */
  placeholder: string;

  /**
   * Defines which validation errors to show.
   * - `all`: Show all validation errors.
   * - `first`: Show only the first validation error.
   *
   * @default 'first'
   */
  errorsToShow?: 'first' | 'all';
};

// ----------------
// ----- Data -----
// ----------------

const props = withDefaults(defineProps<Props>(), {
  errorsToShow: 'first',
});

// ---------------------
// ----- Functions -----
// ---------------------

/**
 * Gets the validation errors to show.
 */
function getErrors(errors: string[]): string[] {
  if (!errors.length) {
    return [];
  }

  if (props.errorsToShow === 'first') {
    return [errors[0] || ''];
  }

  return errors;
}
</script>

<template>
  <vee-field
    :name="name"
    v-slot="{ field, errors, setValue }"
  >
    <ui-field :data-invalid="!!errors.length">
      <ui-field-label :for="name">
        {{ label }}
      </ui-field-label>

      <ui-textarea
        :id="name"
        :placeholder="placeholder"
        :aria-invalid="!!errors.length"
        :modelValue="field.value"
        @update:modelValue="setValue"
      />

      <ui-field-error
        v-if="errors.length"
        :errors="getErrors(errors)"
      />
    </ui-field>
  </vee-field>
</template>
