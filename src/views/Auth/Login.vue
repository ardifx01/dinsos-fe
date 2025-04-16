<template>
    <div class="auth-content my-auto">
        <div class="text-center">
            <h5 class="mb-0">Welcome Back !</h5>
            <p class="text-muted mt-2">Sign in to continue to Minia.</p>
        </div>
        <form class="mt-4 pt-2" @submit.prevent="mutate(form)">
            <FormGroup label="Username" :error="errors?.email">
                <input type="text" class="form-control" id="username" v-model="form.email">
            </FormGroup>
            <FormGroup label="Password" :error="errors?.password">
                <div class="input-group auth-pass-inputgroup">
                    <input :type="isVisible ? 'text' : 'password'" autocomplete="off" class="form-control"
                        v-model="form.password">
                    <button class="btn btn-light shadow-none ms-0" type="button" @click="togglePassword">
                        <i v-if="!isVisible" class="mdi mdi-eye-outline"></i>
                        <i v-else class="mdi mdi-eye-off-outline"></i>
                    </button>
                </div>
            </FormGroup>
            <div class="row mb-4">
                <div class="col">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="remember-check">
                        <label class="form-check-label" for="remember-check">
                            Remember me
                        </label>
                    </div>
                </div>
            </div>
            <div class="mb-3">
                <Button class="btn btn-primary w-100" :is-pending="isPending">Login Now</Button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import useStore from '@/composables/useStore';
import authService from '@/services/authService';
import { useRouter } from 'vue-router';

const isVisible = ref(false);
const form = reactive({
    email: '',
    password: ''
});

const togglePassword = () => {
    isVisible.value = !isVisible.value
}

const router = useRouter();
const { errors, mutate, isPending } = useStore(authService.login, {
    onSuccess: function (res) {
        if (res.data.access_token) {
            localStorage.setItem('token', res.data.access_token)
            router.push("/app/dashboard");
        }
    }
});

</script>
