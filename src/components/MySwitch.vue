<script setup>
import {useAttrs, computed} from 'vue'

function ramdomId() {
  const mapping = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ]

  let id = ''
  for (let i = 0; i < 8; i++) {
    id += mapping[Math.floor(Math.random() * mapping.length)]
  }
  return id
}

const id = ramdomId()

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

defineOptions({
  inheritAttrs: false,
})

function input(e) {
  emit('update:modelValue', e.target.checked ? '1' : '0')
}

const isChecked = computed(() => (props.modelValue === '1' ? true : false))
</script>

<template>
  <div>
    <input
      v-bind="$attrs"
      type="checkbox"
      hidden="hidden"
      :id="id"
      :checked="isChecked"
      @input="input"
      :true-value="'1'"
      :false-value="'0'"
    />
    <label class="switch" :for="id"></label>
  </div>
</template>

<style scoped lang="scss">
/**
 * Simple HTML/CSS switch
 */
.switch {
  display: inline-block;
  position: relative;
  width: 50px;
  height: 25px;
  border-radius: 20px;
  background: #dfd9ea;
  transition: background 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  vertical-align: middle;
  cursor: pointer;
}
.switch::before {
  content: '';
  position: absolute;
  top: 1px;
  left: 2px;
  width: 22px;
  height: 22px;
  background: #fafafa;
  border-radius: 50%;
  transition: left 0.28s cubic-bezier(0.4, 0, 0.2, 1), background 0.28s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
input:not([disabled]) + .switch:active::before {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.28), 0 0 0 20px rgba(128, 128, 128, 0.1);
}

input:checked + .switch {
  background: #72da67;
}
input:checked + .switch::before {
  left: 27px;
  background: #fff;
}
input:checked + .switch:active::before {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.28), 0 0 0 20px rgba(0, 150, 136, 0.2);
}

input[disabled] + .switch {
  cursor: not-allowed !important;
}
</style>
