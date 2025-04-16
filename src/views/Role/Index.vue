<template>
    <Wrapper title="Role">
        <template #action>
            <router-link to="/app/role/create" class="btn btn-primary">
                <i class="bx  bx bx-paper-plane me-3" />
                Create Data</router-link>
        </template>
        <DataGrid ref="table" :query-fn="roleService.getAll" :columns="columns">
            <template #action="{ id }">
                <Action @onDelete="destroy.mutate(id)" :editTo="`/app/role/${id}/edit`">
                    <template #top>
                        <router-link :to="`/app/role/${id}/assign`" class="dropdown-item mb-1">
                            <i class=" bx bx-git-merge align-middle me-1"></i>
                            Assign </router-link>
                    </template>
                </Action>
            </template>
        </DataGrid>
    </Wrapper>
</template>

<script setup>
import { ref } from 'vue';
import roleService from '@/services/roleService';
import useStore from '@/composables/useStore';

const table = ref(null);
const columns = [
    { data: "_index", title: "No", search: false, },
    { data: 'name', title: "Name" },
    { data: 'guard_name', title: "Guard" },
    { title: "Actions", data: 'id', render: "action", sort: false, search: false },
];

const destroy = useStore(roleService.destroy, {
    onSuccess: () => table.value.refetch(),
})
</script>