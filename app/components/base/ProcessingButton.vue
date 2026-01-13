<script setup lang="ts">
// -----------------
// ----- Types -----
// -----------------

type Props = {
  /**
   * The button label (translation key).
   */
  label: string;

  /**
   * Indicates if the process is ongoing.
   */
  isProcessing: boolean;
};

// ----------------
// ----- Data -----
// ----------------

defineProps<Props>();
</script>

<template>
  <ui-button :disabled="isProcessing">
    <template v-if="isProcessing">
      <ui-spinner />
      <span>Загрузка...</span>
    </template>

    <span v-else>{{ label }}</span>
  </ui-button>
</template>
