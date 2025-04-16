<template>
    <Wrapper title="Create Data">
        <div class="row justify-content-center">
            <div class="col-md-7">
                <form @submit.prevent="mutate(form)">
                    <div class="card card-body">
                        <FormGroup label="Name" :error="errors?.name">
                            <input type="text" class="form-control" v-model="form.name" />
                        </FormGroup>
                        <FormGroup label="Email" :error="errors?.email">
                            <input type="text" class="form-control" v-model="form.email" />
                        </FormGroup>
                        <FormGroup label="Role" :error="errors?.role">
                            <FormSelect :options="roles" labelKey="name" valueKey="name" v-model="form.role" />
                        </FormGroup>
                        <FormGroup label="Password" :error="errors?.password">
                            <input type="text" class="form-control" v-model="form.password" />
                        </FormGroup>
                    </div>
                    <div class="mt-3">
                        <Button type="submit" class="btn btn-primary" :isLoading="isPending">Save Changes</Button>
                        <Button type="button" @click="$router.go(-1)" class="btn btn-soft-primary  ms-3">Cancel</Button>
                    </div>
                </form>
            </div>
        </div>
    </Wrapper>
</template>

<script setup>
import { reactive } from 'vue';
import useStore from '@/composables/useStore';
import userService from '@/services/userService';
import useFetch from '@/composables/useFetch';
import roleService from '@/services/roleService';

const form = reactive({
    name: '',
    email: '',
    password: '',
    role: ''
});

const { mutate, isPending, errors } = useStore(userService.store, {
    withBack: true,
});

const { data: roles } = useFetch(roleService.getAll);

</script>
