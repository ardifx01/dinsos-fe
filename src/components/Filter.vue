<template>
    <div class="btn-group">
        <button type="button" class="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown"
            data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false">
            <i class="bx  bx bx-filter-alt me-3"></i>
            Filter Data <i class="mdi mdi-chevron-down"></i>
        </button>
        <div class="dropdown-menu dropdown-menu-md  py-3">
            <div class="d-flex align-items-center justify-content-between px-3 py-1">
                <h6 class="mb-0">Filters</h6>
                <button @click="handleReset" type="button" class="btn btn-link btn-sm waves-effect py-0">
                    Reset Filter</button>
            </div>
            <div class="dropdown-divider"></div>
            <div class="px-3 pt-3">
                <slot />
            </div>

        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const handleReset = () => {
    router.go(0);
}
</script>

<style scoped>
@media (min-width: 600px) {
    .dropdown-menu-md {
        width: 300px;
    }
}
</style>