<template>
    <div
        class="
            h-screen
            w-screen
            bg-blue-400 bg-opacity-75
            flex
            justify-center
            content-center
            flex-wrap
        "
    >
        <p class="font-sans text-white error-text">404</p>
    </div>
</template>

<style scoped>
.error-text {
    font-size: 130px;
}

@media (min-width: 768px) {
    .error-text {
        font-size: 220px;
    }
}
</style>
