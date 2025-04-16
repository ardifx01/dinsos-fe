<template>
    <div :class="['form-group mb-3', customClass, { 'is-invalid': error }]">
        <label v-if="label">{{ label }}</label>
        <slot />
        <span v-if="error" class="invalid-feedback">{{ error }}</span>
    </div>
</template>

<script setup>
const props = defineProps({
    label: {
        type: String,
        required: false
    },
    customClass: {
        type: String,
        required: false
    },
    error: {
        type: String,
        required: false
    }
})

</script>

<style scoped>
label {
    font-weight: normal;
}
</style>
