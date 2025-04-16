<template>
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18">{{ title }}</h4>
                <div class="page-title-right">
                    <slot name="action" />
                </div>
            </div>
            <slot />
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    }
})
</script>
