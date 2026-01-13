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
   * The type of the input field.
   */
  type: string;

  /**
   * The label text of the input field.
   */
  label: string;

  /**
   * The placeholder text of the input field.
   */
  placeholder: string;

  /**
   * The autocomplete attribute of the input field.
   *
   * @default 'off'
   */
  autocomplete?: string;

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
  autocomplete: 'off',
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
    v-slot="{ field, errors }"
  >
    <ui-field :data-invalid="!!errors.length">
      <ui-field-label :for="name">
        {{ label }}
      </ui-field-label>

      <ui-input
        :id="name"
        :type="type"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :aria-invalid="!!errors.length"
        v-bind="field"
      />

      <ui-field-error
        v-if="errors.length"
        :errors="getErrors(errors)"
      />
    </ui-field>
  </vee-field>
</template>
