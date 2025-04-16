<template>
    <div class="dropdown mt-sm-0">
        <a href="#" class="btn btn-soft-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bx bx-dots-horizontal-rounded"></i>
        </a>

        <div class="dropdown-menu pt-1">
            <slot name="top" />
            <router-link :to="editTo" v-if="editTo" class="dropdown-item  mb-1">
                <i class="bx bx-edit-alt align-middle me-1"></i>
                Edit</router-link>
            <a class="dropdown-item mb-1" @click="handleDelete" href="javascript:void(0);">
                <i class="bx bx-trash align-middle me-1"></i>
                Delete</a>
            <slot name="bottom" />
        </div>
    </div>
</template>

<script setup>
import useSwall from "@/composables/useSwall";

const emit = defineEmits(['onDelete']);
defineProps({
    editTo: {
        type: String,
        required: false
    }
})

const swall = useSwall();
const handleDelete = () => {
    swall.confirmation(
        "Are you sure?",
        "You won't be able to revert this!",
        function () {
            emit('onDelete');
        })
}

</script>
