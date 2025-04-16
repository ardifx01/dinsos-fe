<template>
    <Wrapper title="Create Data">
        <div class="row justify-content-center">
            <div class="col-md-7">
                <form @submit.prevent="mutate(form)">
                    <div class="card card-body">
                        <FormGroup label="Name" :error="errors?.name">
                            <input type="text" class="form-control" v-model="form.name" />
                        </FormGroup>
                        <FormGroup label="Guard Name" :error="errors?.guard_name">
                            <select class="form-select" v-model="form.guard_name">
                                <option value=""></option>
                                <option value="web">web</option>
                                <option value="api">api</option>
                            </select>
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
import roleService from '@/services/roleService';

const form = reactive({
    name: '',
    guard_name: ''
});

const { mutate, isPending, errors } = useStore(roleService.store, {
    withBack: true,
});

</script>
