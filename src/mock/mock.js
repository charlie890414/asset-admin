import Mock from 'mockjs';

const Random = Mock.Random;

const produceData = function () {
    return [
        {
            info: [
                {
                    name: '0056 元大高股息',
                    currency: 'TWD',
                    currentPrice: 33.11,
                    cost: 32.72,
                    amount: 2000,
                },
                {
                    name: '00885 富邦越南',
                    currency: 'TWD',
                    currentPrice: 16.05,
                    cost: 15.42,
                    amount: 2000,
                },
            ],
            date: '2021-08-26',
            name: 'SinopacStock',
            type: 'stock',
        },
        {
            info: [
                {
                    name: '0056 元大高股息',
                    currency: 'TWD',
                    currentPrice: 33.11,
                    cost: 32.72,
                    amount: 2000,
                },
                {
                    name: '00885 富邦越南',
                    currency: 'TWD',
                    currentPrice: 16.05,
                    cost: 15.42,
                    amount: 2000,
                },
            ],
            date: '2021-08-27',
            name: 'SinopacStock',
            type: 'stock',
        },
    ];
};

const crawlers = [
    {
        name: 'SinopacStock',
        status: true,
        type: 'Stock',
        website: 'https://www.sinotrade.com.tw/newweb/',
    },
    {
        name: 'SinopacBank',
        status: true,
        type: 'Bank',
        website:
            'https://mma.sinopac.com/MemberPortal/Member/NextWebLogin.aspx',
    },
    {
        name: 'KGIStock',
        status: true,
        type: 'Stock',
        website: 'https://www.kgieworld.com.tw/index/index.aspx',
    },
];

export default [
    {
        url: '/api/auth',
        method: 'post',
        response: () => {
            return "charlie890414@gmail.com";
        },
    },
    {
        url: '/api/record',
        method: 'get',
        response: () => {
            return produceData;
        },
    },
    {
        url: '/api/active',
        method: 'get',
        response: () => {
            return crawlers;
        },
    },
];
