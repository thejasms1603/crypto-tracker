# Type

As we are using TypeScript we have to specify the type of Crypto:

create a types folder in your root folder
```
export interface Crypto {
    id: string;
    symbol : string;
    name: string;
    image: string;
    current_price: number;
    market_cap : number;
    market_cap_rank: number;
    price_change_percentage_24h : number;
    last_update:string;
}
``` 