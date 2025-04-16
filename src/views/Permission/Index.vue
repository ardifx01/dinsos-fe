<template>
    <Wrapper title="Permission">
        <template #action>
            <router-link to="/app/permission/create" class="btn btn-primary">
                <i class="bx  bx bx-paper-plane me-3" />
                Create Data</router-link>
        </template>
        <DataGrid ref="table" :query-fn="permissionService.getAll" :columns="columns">
            <template #action="{ id }">
                <Action @onDelete="destroy.mutate(id)" :editTo="`/app/permission/${id}/edit`" />
            </template>
        </DataGrid>
    </Wrapper>
</template>

<script setup>
import { ref } from 'vue';
// import permissionService from '@/services/permission-service';
import useStore from '@/composables/useStore';
import permissionService from '@/services/permission-service';

const table = ref(null);
const columns = [
    { data: "_index", title: "No", search: false, },
    { data: 'name', title: "Name" },
    { data: 'guard_name', title: "Guard" },
    { title: "Actions", data: 'id', render: "action", sort: false, search: false },
];

const destroy = useStore(permissionService.destroy, {
    onSuccess: () => table.value.refetch(),
})
</script>