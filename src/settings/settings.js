export const settings = {
    apiKey: 'X3bkjz7sMIjjU7E_vHR3be5Ue0k9R3ke',
    apiUrl: 'https://api.polygon.io/v3/',
    tickers: [
        {
            name: 'eur',
            prettyName: 'Price of EUR in USD',
            type: 'forex',
            id: 'C:EUR-USD',
            app: 'quotes'

        },
        {
            name: 'chf',
            prettyName: 'Price of CHF in USD',
            type: 'forex',
            id: 'C:CHF-USD',
            app: 'quotes'
        },
        {
            name: 'btc',
            prettyName: 'Price of BTC in USD',
            type: 'crypto',
            id: 'X:BTC-USD',
            app: 'trades'
        },
        {
            name: 'eth',
            prettyName: 'Price of ETH in USD',
            type: 'crypto',
            id: 'X:ETH-USD',
            app: 'trades'
        }
    ],
    count: '20'
};