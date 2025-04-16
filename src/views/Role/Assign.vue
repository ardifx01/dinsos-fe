<template>
    <Wrapper title="Assign">
        <div class="row justify-content-center">
            <div class="col-md-7">
                <form @submit.prevent="handleSubmit">
                    <div class="card card-body">
                        <table class="table table-borderless">
                            <thead>
                                <tr>
                                    <th style="width: 100px;">
                                        <input type="checkbox" class="form-check-input" :value="true"
                                            v-model="checkedAll" />
                                    </th>
                                    <th>Name</th>
                                    <th>Guard Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="permission in permissions" :key="permission.id">
                                    <td>
                                        <input type="checkbox" class="form-check-input" :value="permission?.id"
                                            v-model="checkedPermissions" />
                                    </td>
                                    <td>{{ permission?.name }}</td>
                                    <td>{{ permission?.guard_name }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="mt-3">
                        <Button type="submit" class="btn btn-primary">
                            Save Changes</Button>
                        <Button type="button" @click="$router.go(-1)" class="btn btn-soft-primary  ms-3">Cancel</Button>
                    </div>
                </form>
            </div>
        </div>
    </Wrapper>
</template>

<script setup>
import useFetch from "@/composables/useFetch";
import permissionService from "@/services/permissionService";
import { ref, computed } from "vue";

const { data: permissions } = useFetch(permissionService.getAll);

const checkedPermissions = ref([]);

const checkedAll = computed({
    get() {
        return checkedPermissions.value.length == permissions.value?.length
    },
    set(value) {
        if (value) checkedPermissions.value = permissions.value?.map(permission => permission?.id)
        else checkedPermissions.value = []
    }
})

function handleSubmit() {
    console.log(checkedPermissions.value);
}
</script>