<template>
    <div id="home">
        <!-- breadcrumb -->
        <nav class="text-sm font-semibold mb-6" aria-label="Breadcrumb">
            <ol class="list-none p-0 inline-flex">
                <li class="flex items-center text-blue-500">
                    <a href="#" class="text-gray-700">Home</a>
                    <svg
                        class="fill-current w-3 h-3 mx-3"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                    >
                        <path
                            d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                        />
                    </svg>
                </li>
                <li class="flex items-center">
                    <a href="#" class="text-gray-600">Dashboard</a>
                </li>
            </ol>
        </nav>
        <!-- breadcrumb end -->

        <div class="lg:flex justify-between items-center mb-6">
            <div class="relative inline-block w-40 text-gray-700 mb-6 lg:mb-0">
                <select
                    class="
                        w-full
                        h-10
                        pl-3
                        pr-6
                        text-base
                        placeholder-gray-600
                        border
                        rounded-lg
                        appearance-none
                        focus:shadow-outline
                    "
                    id="currency"
                >
                    <option selected="selected">ALL</option>
                    <option>NTD</option>
                    <option>USD</option>
                </select>
                <div
                    class="
                        absolute
                        inset-y-0
                        right-0
                        flex
                        items-center
                        px-2
                        pointer-events-none
                    "
                >
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                        ></path>
                    </svg>
                </div>
            </div>
            <div class="lg:flex justify-end items-center w-3/5">
                <Datepicker class="w-72 mr-4 hidden lg:block" />
                <button
                    class="
                        bg-blue-500
                        hover:bg-blue-600
                        focus:outline-none
                        rounded-lg
                        px-6
                        py-2
                        text-white
                        font-semibold
                        shadow
                    "
                >
                    View Raw Data
                </button>
            </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-20">
            <div class="w-1/2 xl:w-1/4 px-3">
                <div
                    class="
                        w-full
                        bg-white
                        border
                        text-blue-400
                        rounded-lg
                        flex
                        items-center
                        p-6
                        mb-6
                        xl:mb-0
                    "
                >
                    <svg
                        class="w-16 h-16 fill-current mr-4 hidden lg:block"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M17.35,2.219h-5.934c-0.115,0-0.225,0.045-0.307,0.128l-8.762,8.762c-0.171,0.168-0.171,0.443,0,0.611l5.933,5.934c0.167,0.171,0.443,0.169,0.612,0l8.762-8.763c0.083-0.083,0.128-0.192,0.128-0.307V2.651C17.781,2.414,17.587,2.219,17.35,2.219M16.916,8.405l-8.332,8.332l-5.321-5.321l8.333-8.332h5.32V8.405z M13.891,4.367c-0.957,0-1.729,0.772-1.729,1.729c0,0.957,0.771,1.729,1.729,1.729s1.729-0.772,1.729-1.729C15.619,5.14,14.848,4.367,13.891,4.367 M14.502,6.708c-0.326,0.326-0.896,0.326-1.223,0c-0.338-0.342-0.338-0.882,0-1.224c0.342-0.337,0.881-0.337,1.223,0C14.84,5.826,14.84,6.366,14.502,6.708"
                        ></path>
                    </svg>

                    <div class="text-gray-700">
                        <p class="font-semibold text-3xl">{{ totalAsset }}</p>
                        <p>Total Assets</p>
                    </div>
                </div>
            </div>

            <div class="w-1/2 xl:w-1/4 px-3">
                <div
                    class="
                        w-full
                        bg-white
                        border
                        text-blue-400
                        rounded-lg
                        flex
                        items-center
                        p-6
                        mb-6
                        xl:mb-0
                    "
                >
                    <svg
                        class="w-16 h-16 fill-current mr-4 hidden lg:block"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M17.684,7.925l-5.131-0.67L10.329,2.57c-0.131-0.275-0.527-0.275-0.658,0L7.447,7.255l-5.131,0.67C2.014,7.964,1.892,8.333,2.113,8.54l3.76,3.568L4.924,17.21c-0.056,0.297,0.261,0.525,0.533,0.379L10,15.109l4.543,2.479c0.273,0.153,0.587-0.089,0.533-0.379l-0.949-5.103l3.76-3.568C18.108,8.333,17.986,7.964,17.684,7.925 M13.481,11.723c-0.089,0.083-0.129,0.205-0.105,0.324l0.848,4.547l-4.047-2.208c-0.055-0.03-0.116-0.045-0.176-0.045s-0.122,0.015-0.176,0.045l-4.047,2.208l0.847-4.547c0.023-0.119-0.016-0.241-0.105-0.324L3.162,8.54L7.74,7.941c0.124-0.016,0.229-0.093,0.282-0.203L10,3.568l1.978,4.17c0.053,0.11,0.158,0.187,0.282,0.203l4.578,0.598L13.481,11.723z"
                        ></path>
                    </svg>

                    <div class="text-gray-700">
                        <p
                            :class="
                                this.assetGrowth[0] != '-'
                                    ? 'text-green-500'
                                    : 'text-red-500'
                            "
                            class="font-semibold text-3xl text-green-500"
                        >
                            {{ this.assetGrowth }}
                        </p>
                        <p>Assets Growth</p>
                    </div>
                </div>
            </div>

            <div class="w-1/2 xl:w-1/4 px-3">
                <div
                    class="
                        w-full
                        bg-white
                        border
                        text-blue-400
                        rounded-lg
                        flex
                        items-center
                        p-6
                    "
                >
                    <svg
                        class="w-16 h-16 fill-current mr-4 hidden lg:block"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M14.999,8.543c0,0.229-0.188,0.417-0.416,0.417H5.417C5.187,8.959,5,8.772,5,8.543s0.188-0.417,0.417-0.417h9.167C14.812,8.126,14.999,8.314,14.999,8.543 M12.037,10.213H5.417C5.187,10.213,5,10.4,5,10.63c0,0.229,0.188,0.416,0.417,0.416h6.621c0.229,0,0.416-0.188,0.416-0.416C12.453,10.4,12.266,10.213,12.037,10.213 M14.583,6.046H5.417C5.187,6.046,5,6.233,5,6.463c0,0.229,0.188,0.417,0.417,0.417h9.167c0.229,0,0.416-0.188,0.416-0.417C14.999,6.233,14.812,6.046,14.583,6.046 M17.916,3.542v10c0,0.229-0.188,0.417-0.417,0.417H9.373l-2.829,2.796c-0.117,0.116-0.71,0.297-0.71-0.296v-2.5H2.5c-0.229,0-0.417-0.188-0.417-0.417v-10c0-0.229,0.188-0.417,0.417-0.417h15C17.729,3.126,17.916,3.313,17.916,3.542 M17.083,3.959H2.917v9.167H6.25c0.229,0,0.417,0.187,0.417,0.416v1.919l2.242-2.215c0.079-0.077,0.184-0.12,0.294-0.12h7.881V3.959z"
                        ></path>
                    </svg>

                    <div class="text-gray-700">
                        <p class="font-semibold text-3xl">
                            {{ activeCrawlernum }}
                        </p>
                        <p>Active Crawler</p>
                    </div>
                </div>
            </div>

            <div class="w-1/2 xl:w-1/4 px-3">
                <div
                    class="
                        w-full
                        bg-white
                        border
                        text-blue-400
                        rounded-lg
                        flex
                        items-center
                        p-6
                    "
                >
                    <svg
                        class="w-16 h-16 fill-current mr-4 hidden lg:block"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M17.431,2.156h-3.715c-0.228,0-0.413,0.186-0.413,0.413v6.973h-2.89V6.687c0-0.229-0.186-0.413-0.413-0.413H6.285c-0.228,0-0.413,0.184-0.413,0.413v6.388H2.569c-0.227,0-0.413,0.187-0.413,0.413v3.942c0,0.228,0.186,0.413,0.413,0.413h14.862c0.228,0,0.413-0.186,0.413-0.413V2.569C17.844,2.342,17.658,2.156,17.431,2.156 M5.872,17.019h-2.89v-3.117h2.89V17.019zM9.587,17.019h-2.89V7.1h2.89V17.019z M13.303,17.019h-2.89v-6.651h2.89V17.019z M17.019,17.019h-2.891V2.982h2.891V17.019z"
                        ></path>
                    </svg>

                    <div class="text-gray-700">
                        <p class="font-semibold text-3xl">{{ totalrecord }}</p>
                        <p>Total Record</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-10">
            <div class="w-full xl:w-1/3 px-3">
                <p class="text-xl font-semibold mb-4">Asset Overview</p>

                <div
                    class="
                        w-full
                        bg-white
                        border
                        rounded-lg
                        p-4
                        mb-8
                        xl:mb-0
                        h-[450px]
                    "
                >
                    <canvas id="history-chart"></canvas>
                </div>
            </div>

            <div class="w-full xl:w-1/3 px-3">
                <p class="text-xl font-semibold mb-4">Asset Allocation</p>

                <div
                    class="
                        w-full
                        bg-white
                        border
                        rounded-lg
                        p-4
                        mb-8
                        xl:mb-0
                        h-[450px]
                    "
                >
                    <canvas id="allocation-chart"></canvas>
                </div>
            </div>

            <div class="w-full xl:w-1/3 h-full px-3">
                <p class="text-xl font-semibold mb-4">Recent Activity</p>
                <div class="w-full bg-white border rounded-lg p-4">
                    <div
                        class="
                            w-full
                            bg-gray-100
                            border
                            rounded-lg
                            flex
                            justify-between
                            items-center
                            px-4
                            py-2
                            mb-4
                        "
                    >
                        <div>
                            <p class="font-semibold text-xl">VOO</p>
                            <p class="text-sm">Vanguard 500 Index Fund ETF</p>
                        </div>
                        <span class="text-green-500 font-semibold text-lg"
                            >11500.80 (+0.89%)</span
                        >
                    </div>

                    <div
                        class="
                            w-full
                            bg-gray-100
                            border
                            rounded-lg
                            flex
                            justify-between
                            items-center
                            px-4
                            py-2
                            mb-4
                        "
                    >
                        <div>
                            <p class="font-semibold text-xl">VTI</p>
                            <p class="text-sm">
                                Vanguard Total Stock Market Index Fund ETF
                            </p>
                        </div>
                        <span class="text-green-500 font-semibold text-lg"
                            >6441.47 (+0.97%)</span
                        >
                    </div>
                </div>
            </div>
        </div>

        <div class="text-xl font-semibold mb-4">
            <p>Active Cralwer</p>
        </div>

        <div
            class="
                w-full
                bg-white
                border
                text-blue-400
                rounded-lg
                flex
                items-center
                p-6
                mb-6
                xl:mb-0
            "
        >
            <StatusTable :crawlers='activeCrawler' />
        </div>
    </div>
</template>

<script>
import Datepicker from '../components/Datepicker.vue';
import StatusTable from '../components/StatusTable.vue';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
import numeral from 'numeral';

export default {
    name: 'DashboardHome',
    components: {
        Datepicker,
        StatusTable,
    },
    data() {
        return {
            totalAsset: 0,
            expiredtotalAsset: 0,
            assetGrowth: 0,
            activeCrawler: null,
            activeCrawlernum: 0,
            totalrecord: 0,
            historyData: {
                type: 'line',
                data: {
                    datasets: [
                        {
                            label: 'cash',
                            backgroundColor: 'rgba(99,179,237,0.4)',
                            data: [],
                            fill: true,
                        },
                        {
                            label: 'stock',
                            backgroundColor: 'rgb(79, 193, 214, 0.4)',
                            data: [],
                            fill: true,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: {
                            mode: 'index',
                        },
                    },
                    interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false,
                    },
                    scales: {
                        x: {
                            display: true,
                            type: 'time',
                            time: {
                                format: 'YYYY-MM-DD',
                                tooltipFormat: 'LL',
                                unit: 'day',
                                unitStepSize: 1,
                                displayFormats: {
                                    day: 'MMM DD',
                                },
                            },
                        },
                        y: {
                            display: false,
                            stacked: true,
                            beginAtZero: true,
                        },
                    },
                },
            },
            allocationData: {
                type: 'pie',
                data: {
                    labels: ['Cash', 'Stock'],
                    datasets: [
                        {
                            backgroundColor: [
                                'rgb(79, 193, 214, 0.4)',
                                'rgba(99, 179, 237, 0.4)',
                                'rgb(79, 122, 214, 0.4)',
                                'rgb(91, 100, 247, 0.4)',
                            ],
                            data: [0, 0],
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                },
            },
        };
    },
    mounted() {
        this.axios.get('record').then((response) => {
            console.log(response.data);

            // TODO integration this variable with db data
            let activeCrawler = new Set(response.data.map((a) => a.name));
            this.activeCrawlernum = activeCrawler.size;

            this.totalrecord = response.data
                .map((a) => a.info.length)
                .reduce((a, b) => a + b);

            //TODO fill empty date data with previous data 
            for (let crawler of activeCrawler) {
                let alldata = response.data
                    .filter((obj) => {
                        return obj.name === crawler;
                    })
                    .sort(function (a, b) {
                        return b.date.localeCompare(a.date);
                    });

                for (let data of alldata) {
                    if (data.type == 'stock') {
                        let summery = 0;
                        for (let stock of data.info) {
                            summery += stock['currentPrice'] * stock['amount'];
                        }
                        this.historyData.data.datasets[1].data.push({
                            x: data.date,
                            y: summery,
                        });
                    } else if (data.type == 'cash') {
                        let summery = 0;
                        for (let cash of data.info) {
                            summery += cash['exchange'] * cash['amount'];
                        }
                        this.historyData.data.datasets[0].data.push({
                            x: data.date,
                            y: summery,
                        });
                    }
                }

                let [lastest, expired, ...rest] = alldata;
                console.log(lastest)
                if (lastest.type == 'stock') {
                    for (let stock of lastest.info) {
                        this.totalAsset +=
                            stock['currentPrice'] * stock['amount'];
                        this.allocationData.data.datasets[0].data[1] +=
                            stock['currentPrice'] * stock['amount'];
                    }
                } else if (lastest.type == 'cash') {
                    for (let cash of lastest.info) {
                        this.totalAsset += cash['exchange'] * cash['amount'];
                        this.allocationData.data.datasets[0].data[0] +=
                            cash['exchange'] * cash['amount'];
                    }
                }

                if (expired.type == 'stock') {
                    for (let stock of expired.info) {
                        this.expiredtotalAsset +=
                            stock['currentPrice'] * stock['amount'];
                    }
                } else if (expired.type == 'cash') {
                    for (let cash of expired.info) {
                        this.expiredtotalAsset +=
                            cash['exchange'] * cash['amount'];
                    }
                }
            }
            this.assetGrowth =
                (this.totalAsset - this.expiredtotalAsset) /
                this.expiredtotalAsset;
            this.assetGrowth = numeral(this.assetGrowth).format('0.000%');
            this.totalAsset = numeral(this.totalAsset).format('($ 0.00 a)');
            new Chart('allocation-chart', this.allocationData);
            new Chart('history-chart', this.historyData);
        });
        this.axios.get('active').then((response) => {
            console.log(response.data)
            this.activeCrawler = response.data
        });
    },
};
</script>
