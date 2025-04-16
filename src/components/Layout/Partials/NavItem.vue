<template>
    <li :class="{ 'mm-active': isActive }">
        <a v-if="item.children" href="javascript:void(0);" @click="toggleMenu" class="has-arrow cursor-pointer">
            <i :data-feather="item.icon"></i>
            <span data-key="t-dashboard">{{ item.name }}</span>
        </a>

        <router-link v-else :to="item.link">
            <i :data-feather="item.icon"></i>
            <span data-key="t-dashboard">{{ item.name }}</span>
        </router-link>

        <ul v-if="item.children" :class="['sub-menu', { 'mm-collapse': !isOpen }]">
            <li v-for="child in item.children" :key="child.id">
                <router-link :to="child.link">
                    <span data-key="t-calendar">{{ child.name }}</span>
                </router-link>
            </li>
        </ul>
    </li>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});

const route = useRoute();
const isOpen = ref(false);

const toggleMenu = (e) => {
    e.stopPropagation();
    isOpen.value = !isOpen.value;
};

const isActive = computed(() => {
    return route.path === props.item.link || props.item.children?.some(child => route.path === child.link);
});
</script>
