<script lang="ts" setup>
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from '@internationalized/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import type { LayoutTypes } from '../calendar'

interface Props {
  modelValue?: DateValue
  placeholder?: string
  disabled?: boolean
  layout?: LayoutTypes;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Pick a date',
  disabled: false,
  layout: 'month-and-year',
})

const emit = defineEmits<{
  'update:modelValue': [value: DateValue | undefined]
}>()

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const df = new DateFormatter('ru-RU', {
  dateStyle: 'short',
})
</script>

<template>
  <ui-popover>
    <ui-popover-trigger as-child>
      <ui-button
        variant="outline"
        :disabled="disabled"
        :class="cn(
          'justify-start text-left font-normal',
          !value && 'text-muted-foreground',
        )"
      >
        <calendar-icon class="mr-2 h-4 w-4" />
        {{ value ? df.format(value.toDate(getLocalTimeZone())) : placeholder }}
    </ui-button>
    </ui-popover-trigger>
    <ui-popover-content class="w-auto p-0">
      <ui-calendar 
        :layout="layout"
        v-model="value" 
        initial-focus
      />
    </ui-popover-content>
  </ui-popover>
</template>
