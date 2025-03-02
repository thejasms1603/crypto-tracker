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