<template>
    <button v-bind="$attrs" :disabled="isLoading">
        <div v-if="isLoading">
            <span class="spinner-border spinner-border-sm me-3" role="status" aria-hidden="true"></span>
            Loading ...
        </div>
        <slot v-else></slot>
    </button>

</template>

<script setup>
defineProps({
    isLoading: {
        type: Boolean,
        default: false
    }
})
</script>
