<script setup lang="ts">
// -----------------
// ----- Types -----
// -----------------

type Props = {
  /**
   * Whether to show the company name next to the logo.
   */
  showName?: boolean;
};

// ----------------
// ----- Data -----
// ----------------

withDefaults(defineProps<Props>(), {
  showName: true,
});
</script>

<template>
  <div class="flex items-center gap-2 font-medium">
    <div class="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
      T
    </div>
    <div v-if="showName">
      TFP.BY
    </div>
  </div>
</template>
