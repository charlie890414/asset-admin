<template>
    <div class="flex">
        <litepie-datepicker
            :formatter="formatter"
            v-model="dateValue"
        ></litepie-datepicker>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'Datepicker',
    setup() {
        const dateValue = ref([]);
        const formatter = ref({
            date: 'YYYY-MM-DD',
            month: 'MMM',
        });

        return {
            dateValue,
            formatter,
        };
    },
};
</script>
