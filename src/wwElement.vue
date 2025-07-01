<template>
  <div :class="wrapperClasses">
    <label v-if="content.label" :for="inputId" :class="labelClasses">
      {{ content.label }}
      <span v-if="content.required" class="text-destructive ml-1">*</span>
    </label>
    
    <div :class="inputWrapperClasses">
      <component
        v-if="content.leftIcon"
        :is="content.leftIcon"
        class="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2"
      />
      
      <input
        :id="inputId"
        :type="content.type"
        :placeholder="content.placeholder"
        :disabled="content.disabled"
        :readonly="content.readonly"
        :required="content.required"
        :min="content.min"
        :max="content.max"
        :step="content.step"
        :pattern="content.pattern"
        :autocomplete="content.autocomplete"
        :class="inputClasses"
        :value="modelValue"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        v-bind="$attrs"
      />
      
      <component
        v-if="content.rightIcon"
        :is="content.rightIcon"
        class="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 transform -translate-y-1/2"
      />
      
      <button
        v-if="content.type === 'password' && content.showPasswordToggle"
        type="button"
        @click="togglePasswordVisibility"
        class="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-foreground"
      >
        <svg v-if="showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </svg>
      </button>
    </div>
    
    <div v-if="content.helpText || hasError" :class="helpTextClasses">
      <span v-if="hasError" class="text-destructive">{{ errorMessage }}</span>
      <span v-else-if="content.helpText" class="text-muted-foreground">{{ content.helpText }}</span>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { cn } from './cn.js'

export default {
  name: 'WewebInput',
  inheritAttrs: false,
  props: {
    content: {
      type: Object,
      required: true,
      default: () => ({
        type: 'text',
        placeholder: '',
        label: '',
        helpText: '',
        disabled: false,
        readonly: false,
        required: false,
        min: null,
        max: null,
        step: null,
        pattern: null,
        autocomplete: null,
        leftIcon: null,
        rightIcon: null,
        showPasswordToggle: true,
        customClasses: '',
        errorMessage: '',
        hasError: false
      })
    },
    modelValue: {
      type: [String, Number],
      default: ''
    }
  },
  emits: ['update:modelValue', 'change', 'focus', 'blur'],
  setup(props, { emit }) {
    const inputId = `input-${Math.random().toString(36).substr(2, 9)}`
    const showPassword = ref(false)

    const wrapperClasses = computed(() => cn(
      "w-full",
      props.content.customClasses
    ))

    const labelClasses = computed(() => cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block"
    ))

    const inputWrapperClasses = computed(() => cn(
      "relative"
    ))

    const inputClasses = computed(() => cn(
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      {
        "pl-10": props.content.leftIcon,
        "pr-10": props.content.rightIcon || (props.content.type === 'password' && props.content.showPasswordToggle),
        "border-destructive": hasError.value
      }
    ))

    const helpTextClasses = computed(() => cn(
      "text-sm mt-2"
    ))

    const hasError = computed(() => props.content.hasError || !!props.content.errorMessage)
    const errorMessage = computed(() => props.content.errorMessage)

    const actualInputType = computed(() => {
      if (props.content.type === 'password' && showPassword.value) {
        return 'text'
      }
      return props.content.type
    })

    const handleInput = (event) => {
      let value = event.target.value
      
      // Convert to number for numeric inputs
      if (['number', 'range'].includes(props.content.type)) {
        value = value === '' ? null : Number(value)
      }
      
      emit('update:modelValue', value)
      
      // Update Weweb variable if defined
      if (props.content.wewebVariable && typeof wwLib !== 'undefined') {
        wwLib.wwVariable.updateValue(props.content.wewebVariable, value)
      }
    }

    const handleChange = (event) => {
      emit('change', event)
      
      // Execute Weweb workflow if defined
      if (props.content.changeWorkflowId && typeof wwLib !== 'undefined') {
        wwLib.executeWorkflow(props.content.changeWorkflowId)
      }
    }

    const handleFocus = (event) => {
      emit('focus', event)
    }

    const handleBlur = (event) => {
      emit('blur', event)
    }

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value
    }

    return {
      inputId,
      showPassword,
      wrapperClasses,
      labelClasses,
      inputWrapperClasses,
      inputClasses,
      helpTextClasses,
      hasError,
      errorMessage,
      actualInputType,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur,
      togglePasswordVisibility
    }
  }
}
</script>

<style>
/* Import global shadcn/ui styles */
@import './globals.css';
</style> 