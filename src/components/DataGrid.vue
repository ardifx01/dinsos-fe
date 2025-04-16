<template>
    <div class="card">
        <div class="table-responsives dt">
            <div class="card-body pb-0">
                <div class="row mb-3 justify-content-between align-items-center">
                    <div class="col-md-6">
                        <div class="d-flex align-items-center dt-rows-page gap-3">
                            <label>Show</label>
                            <select v-model="state.pageSize" class="form-select">
                                <option v-for="size in rowPerPage" :key="size" :value="size">
                                    {{ size }}
                                </option>
                            </select>
                            <label>Entries</label>
                        </div>
                    </div>
                    <div class="col-xl-6 col d-flex align-items-center">
                        <div class="search-box position-relative w-100">
                            <input type="text" class="form-control rounded border" placeholder="Search Here..."
                                v-model="state.search">
                            <i class="bx bx-search search-icon"></i>
                        </div>
                        <div class="form-control">
                            <i class=" bx bx-book-content"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th v-for="column in columns" :key="column.data" class="ps-5">
                                <div class="d-flex align-items-center gap-5 cursor-pointer"
                                    @click="handleSort(column.data)" v-if="sorting[column.data] !== undefined">
                                    <span> {{ column.title }}</span>
                                    <div class="d-flex flex-column">
                                        <i class="bx bx-chevron-up pb-0 mb-0" v-if="sorting[column.data] === 'asc'"></i>
                                        <i class="bx bx-chevron-down pb-0 mb-0"
                                            v-else-if="sorting[column.data] === 'desc'"></i>
                                    </div>
                                </div>
                                <span v-else>{{ column.title }}</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="isLoading">
                            <td :colspan="columns.length" class="text-center pt-5 pb-5">
                                <i class="bx bx-loader bx-spin"></i> Loading data...
                            </td>
                        </tr>
                        <tr v-else v-for="(item) in data?.data" :key="item.id">
                            <td v-for="column in columns" :key="column.data" class="ps-5">
                                <slot v-if="column.render" :name="column.render" v-bind="item"></slot>
                                <template v-else>{{ item[column.data] }}</template>
                            </td>
                        </tr>

                        <tr v-if="!data?.data?.length && !isLoading">
                            <td :colspan="columns.length" class="text-center pt-5 pb-5">No data found</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="card-body pt-0">
                <div class="row dt-footer align-items-center">
                    <div class="col-6">
                        <label>
                            Showing {{ data?.current_page }} to {{ data?.last_page }} of {{ data?.total }} entries
                        </label>
                    </div>
                    <div class="col-6">
                        <div class="d-flex justify-content-end align-items-center gap-3">
                            <div class="d-flex gap-2 dt-paginate">
                                <button type="button" @click="handleFirstPrev" class="btn btn-outline-light"
                                    :disabled="isFirstPage">
                                    <i class="bx bx-chevrons-left"></i>
                                </button>
                                <button type="button" @click="handlePrev" class="btn btn-outline-light"
                                    :disabled="isFirstPage">
                                    <i class="bx bx-chevron-left"></i>
                                </button>
                                <button type="button" @click="handleNext" class="btn btn-outline-light"
                                    :disabled="isLastPage">
                                    <i class="bx bx-chevron-right"></i>
                                </button>
                                <button type="button" @click="handleLastNext" class="btn btn-outline-light"
                                    :disabled="isLastPage">
                                    <i class="bx bx-chevrons-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useQuery } from "@tanstack/vue-query";
import { reactive, computed, watch } from "vue";

const props = defineProps({
    columns: { type: Object, required: true },
    queryFn: { type: Function, required: true },
    queryKey: { type: String, required: false },
    filters: { type: Object, required: false },
});

const state = reactive({
    search: '',
    page: 1,
    pageSize: 10,
});

// handle code for sorting data
const sorting = reactive(Object.fromEntries(
    Object.values(props.columns)
        .filter(col => col.data && col.sort !== false)
        .map(col => [col.data, col.sort ?? ''])
));


const handleSort = (column) => {
    for (const key in sorting) {
        sorting[key] = key === column
            ? (sorting[key] === 'asc' ? 'desc' : 'asc')
            : '';
    }
};

const columnSearch = computed(() => Object.fromEntries(
    Object.values(props.columns)
        .filter(col => col.data && col.search !== false)
        .map(col => [col.data, state.search])
));


// handle code for pagination
const rowPerPage = [10, 25, 50, 100];
const queryKey = computed(() => [props.queryKey, state.page, state.pageSize, state.search, sorting, props.filters]);

const { isLoading, data, refetch } = useQuery({
    queryKey,
    queryFn: async () => {
        const res = await props.queryFn({
            ...state,
            'sortField': sorting,
            'searchField': columnSearch.value,
            "filterField": props.filters
        });
        return res.data.data;
    },
});

const isFirstPage = computed(() => state.page === 1);
const isLastPage = computed(() => data.value && state.page >= data.value.last_page);

const handleNext = () => { if (!isLastPage.value) state.page++; };
const handlePrev = () => { if (!isFirstPage.value) state.page--; };
const handleLastNext = () => { if (!isLastPage.value) state.page = data.value.last_page; };
const handleFirstPrev = () => { if (!isFirstPage.value) state.page = 1; };

watch(() => [state.pageSize, state.search, sorting, props.filters], () => {
    state.page = 1;
}, { deep: true });

defineExpose({ refetch });

</script>
