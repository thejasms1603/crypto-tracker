# Store

Why We Chose React Query and Zustand

React Query and Zustand were chosen for the following reasons:
- React Query: Simplifies data fetching, caching, and synchronization. It’s highly efficient for dealing with live data, such as cryptocurrency prices, by refetching and caching the results at set intervals.
- React Query’s useQuery hook is used to fetch and cache the live prices, while handling errors and loading states efficiently.
- React Query’s automatic refetching mechanism helps keep the displayed prices up-to-date without requiring manual user intervention.
- Zustand: Used for global state management. We use Zustand to store the fetched cryptocurrency data and manage the loading and error states.

The combination of React Query and Zustand ensures both efficient data management and state management in a user-friendly manner.

Install Zustand:
```
# NPM
npm install zustand
# Or, use any package manager of your choice.
```

Install TanStack/react-query:
```
npm i @tanstack/react-query
```


Create a store folder in root folder:

```ts title="store/useCrypto.ts"
import {create} from 'zustand';
import { Crypto } from '@/types/crypto';

interface CryptoState {
    cryptos: Crypto[];
    isLoading: boolean;
    error: string | null;
    searchTerm: string;
    setCryptos : (cryptos : Crypto[]) => void;
    setLoading : (isLoading : boolean) => void;
    setError : (error: string | null) => void;
    setSearchTerm : (searchTerm: string) => void
    filteredCryptos : () => Crypto[];
}
export const useCryptoStore = create<CryptoState>((set, get) => ({
    cryptos:[],
    isLoading:false,
    error:null,
    searchTerm:'',
    setCryptos:(cryptos) => set({cryptos}),
    setLoading:(isLoading) => set({isLoading}),
    setError: (error) => set({error}),
    setSearchTerm : (searchTerm) => set({searchTerm}),
    filteredCryptos : () => {
        const {cryptos, searchTerm} = get();
        if(!searchTerm) return cryptos;

        return cryptos.filter(
            (crypto) => crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }

}))
```