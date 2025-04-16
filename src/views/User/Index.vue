<template>
    <Wrapper title="User Access">
        <template #action>
            <Filter>
                <FormGroup label="Role">
                    <FormSelect :options="roles" labelKey="name" valueKey="name" v-model="filters.role" />
                </FormGroup>
            </Filter>
            <router-link to="/app/user/create" class="btn btn-primary ms-3">
                <i class="bx  bx bx-paper-plane me-3" />
                Create Data</router-link>
        </template>
        <DataGrid ref="table" :query-fn="userService.getAll" :columns="columns" :filters="filters">
            <template #role="{ roles }">
                <span v-if="roles.length">{{ roles[0]?.name }}</span>
                <span class="text-muted" v-else>-- Empty --</span>
            </template>
            <template #action="{ id }">
                <Action @onDelete="destroy.mutate(id)" :editTo="`/app/user/${id}/edit`" />
            </template>
        </DataGrid>
    </Wrapper>
</template>

<script setup>
import { ref } from 'vue';
import userService from '@/services/userService';
import useStore from '@/composables/useStore';
import { reactive } from 'vue';
import useFetch from '@/composables/useFetch';
import roleService from '@/services/roleService';

const table = ref(null);
const columns = [
    { data: "_index", title: "No", search: false, },
    { data: 'name', title: "Name" },
    { data: 'email', title: "Email" },
    { data: "role", title: "Role", render: "role", search: false, },
    { title: "Actions", data: 'id', render: "action", sort: false, search: false },
];

const filters = reactive({
    'role': ''
});

const destroy = useStore(userService.destroy, {
    onSuccess: () => table.value.refetch(),
})

const { data: roles } = useFetch(roleService.getAll);

</script>