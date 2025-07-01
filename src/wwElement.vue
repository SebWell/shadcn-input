<template>
  <input
    v-model="inputValue"
    :type="content.type || 'text'"
    :placeholder="content.placeholder"
    :disabled="content.disabled"
    :readonly="content.readonly"
    :class="inputClasses"
    @input="handleInput"
    @change="handleChange"
    @focus="handleFocus"
    @blur="handleBlur"
  />
</template>

<script>
import { computed, ref, watch } from 'vue'

export default {
  name: 'WewebInput',
  props: {
    content: {
      type: Object,
      required: true,
      default: () => ({
        type: 'text',
        placeholder: '',
        disabled: false,
        readonly: false,
        value: '',
        size: 'default',
        variant: 'default',
        customClasses: ''
      })
    }
  },
  emits: ['update:content', 'input', 'change', 'focus', 'blur'],
  setup(props, { emit }) {
    const inputValue = ref(props.content.value || '')
    
    watch(() => props.content.value, (newValue) => {
      inputValue.value = newValue || ''
    })
    
    const inputClasses = computed(() => {
      const size = props.content.size || 'default'
      const variant = props.content.variant || 'default'
      
      const classes = [
        'input-base',
        `input-size-${size}`,
        `input-variant-${variant}`
      ]
      
      if (props.content.disabled) {
        classes.push('input-disabled')
      }
      
      if (props.content.customClasses) {
        classes.push(props.content.customClasses)
      }
      
      return classes.join(' ')
    })
    
    const handleInput = (event) => {
      inputValue.value = event.target.value
      emit('input', event)
      emit('update:content', { ...props.content, value: event.target.value })
    }
    
    const handleChange = (event) => {
      emit('change', event)
    }
    
    const handleFocus = (event) => {
      emit('focus', event)
    }
    
    const handleBlur = (event) => {
      emit('blur', event)
    }

    return {
      inputValue,
      inputClasses,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur
    }
  }
}
</script>

<style scoped>
/* Variables CSS Shadcn/UI */
:root {
  --border: hsl(214.3, 31.8%, 91.4%);
  --background: hsl(0, 0%, 100%);
  --foreground: hsl(222.2, 84%, 4.9%);
  --ring: hsl(222.2, 84%, 4.9%);
}

/* Input base styles */
.input-base {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 6px;
  background-color: var(--background);
  color: var(--foreground);
  font-size: 14px;
  transition: all 0.2s ease-in-out;
  outline: none;
  font-family: inherit;
}

.input-base:focus {
  border-color: var(--ring);
  box-shadow: 0 0 0 2px hsla(222.2, 84%, 4.9%, 0.1);
}

.input-base::placeholder {
  color: hsl(215.4, 16.3%, 46.9%);
}

/* Size variants */
.input-size-default {
  height: 40px;
  padding: 8px 12px;
}

.input-size-sm {
  height: 36px;
  padding: 6px 10px;
  font-size: 13px;
}

.input-size-lg {
  height: 44px;
  padding: 10px 14px;
  font-size: 16px;
}

/* Variant styles */
.input-variant-default {
  /* Styles par défaut déjà définis dans input-base */
}

.input-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: hsl(210, 40%, 98%);
}
</style>
