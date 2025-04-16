<template>
    <vSelect :options="options" v-bind="customProps" class="form-select" v-model="model"></vSelect>
</template>

<script setup>
import 'vue-select/dist/vue-select.css';
import vSelect from 'vue-select'
import { computed } from 'vue';

const props = defineProps({
    options: {
        type: Array,
        required: false
    },
    labelKey: {
        type: String,
        required: false
    },
    valueKey: {
        type: String,
        required: false
    }
})

const model = defineModel();

const customProps = computed(() => {
    const myProps = {};
    if (props.labelKey) myProps.label = props.labelKey;
    if (props.valueKey) {
        myProps.reduce = option => option[props.valueKey];
    }
    return myProps;
});
</script>

<style>
.vs--single {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 4px;
}

.vs__dropdown-toggle {
    flex-grow: 1;

    padding-top: 0px;
    border: none;
    padding-bottom: 0px;
}

.vs__actions {
    display: none;
}
</style>
