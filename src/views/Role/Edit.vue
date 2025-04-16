<template>
    <Wrapper title="Edit Data">
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
                        <Button type="submit" class="btn btn-primary" :isLoading="isPending || isLoading">
                            Save Changes</Button>
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
import useFetch from '@/composables/useFetch';

const props = defineProps(['id']);
const form = reactive({
    id: props.id,
    name: '',
    guard_name: ''
});

const { isLoading } = useFetch(() => roleService.show(props.id), {
    onSuccess: function (res) {
        Object.assign(form, res);
    }
});

const { mutate, isPending, errors } = useStore(roleService.update, {
    withBack: true,
});

</script>
