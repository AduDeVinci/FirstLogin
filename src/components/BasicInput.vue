<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  id: String,
  label: String,
  type: String,
  placeholder: String,
  errorMessage: String,
  validMessage: String,
  modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

const messageClass = computed(() => {
  return props.errorMessage !== '' ? 'invalid' : 'valid'
})
</script>

<template>
  <div>
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur', $event)"
    />
    </div>
    <p :class="messageClass">
      {{ errorMessage }}
      {{ validMessage }}
    </p>
</template>


<style scoped>
.invalid {
  color:crimson;
}
.valid {
  color:darkseagreen;
}
input {
  padding: 5px;
  border-radius: 5px;
  border: none;
  width: fit-content;
}
div {
  display: flex;
  flex-direction: row;
  align-self: flex-start;
}
</style>