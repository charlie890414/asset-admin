import fetch from 'node-fetch';

const url = 'https://tw.rter.info/capi.php';
const rateTable = await fetch(url, {
    method: 'GET',
}).then(function (response) {
    return response.json();
});

// https://tw.rter.info/howto_currencyapi.php
async function getExchangeRate(from, to) {
    if (from == to) return 1;
    return from == 'USD'
        ? rateTable[`${from}${to}`]['Exrate']
        : rateTable[`USD${to}`]['Exrate'] / rateTable[`USD${from}`]['Exrate'];
}
export { getExchangeRate };
