<template>
    <div class="flex h-screen bone">
        <div class="w-full max-w-xs m-auto">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
                <div class="mb-6">
                    <label
                        class="block text-gray-700 text-lg font-bold mb-4"
                        for="email"
                    >
                        Email
                    </label>
                    <input
                        class="
                            shadow
                            appearance-none
                            border-2
                            rounded
                            w-full
                            py-2
                            px-3
                            text-gray-700
                            leading-tight
                            focus:outline-none focus:shadow-outline
                        "
                        id="email"
                        type="text"
                        v-model="loginForm.email"
                    />
                </div>
                <div class="mb-6">
                    <label
                        class="block text-gray-700 text-lg font-bold mb-2"
                        for="password"
                    >
                        Password
                    </label>
                    <input
                        class="
                            shadow
                            appearance-none
                            border-2
                            rounded
                            w-full
                            py-2
                            px-3
                            text-gray-700
                            mb-6
                            leading-tight
                            focus:outline-none focus:shadow-outline
                        "
                        id="password"
                        type="password"
                        v-model="loginForm.password"
                        v-on:keyup.enter="handleLogin"
                    />
                    <p class="text-red-500 text-xs italic">
                        {{ loginForm.errorMsg }}
                    </p>
                </div>
                <div class="flex items-center justify-between">
                    <button
                        class="
                            bg-blue-500
                            hover:bg-blue-700
                            bg-opacity-75
                            text-white
                            font-bold
                            py-2
                            px-4
                            rounded
                            focus:outline-none focus:shadow-outline
                        "
                        type="button"
                        @click="handleLogin"
                    >
                        Sign In
                    </button>
                    <a
                        class="
                            inline-block
                            align-baseline
                            font-bold
                            text-sm text-blue-500 text-opacity-75
                            hover:text-blue-800
                        "
                        href="/signup"
                    >
                        Don't have acoount?
                    </a>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.bone {
    background-color: rgba(99, 179, 237, 0.4);
}
</style>

<script>
export default {
    name: 'Login',
    data() {
        return {
            loginForm: {
                email: '',
                password: '',
                errorMsg: '',
            },
        };
    },
    methods: {
        handleLogin() {
            let email = this.loginForm.email;
            let password = this.loginForm.password;

            if (email == '' || password == '') {
                this.loginForm.errorMsg = '帳號或密碼不能為空';
            } else {
                this.axios
                    .post('auth', {
                        email: this.loginForm.email,
                        password: this.loginForm.password,
                    })
                    .then((response) => {
                        console.log(response);
                        this.$store.commit('setauth', response['data']);
                        this.$router.push({ name: 'DashboardHome' });
                    })
                    .catch((error) => {
                        console.log(error);
                        this.loginForm.errorMsg = '登入失敗';
                    });
            }

            return false;
        },
    },
};
</script>
