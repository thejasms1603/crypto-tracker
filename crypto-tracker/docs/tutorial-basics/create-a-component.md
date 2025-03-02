---
sidebar_position: 2
---

# Create a Component

app/page.tsx are **groups of components** connected through:

- **crytotracker**
- **cryptolist**
- **searchbar**
- **navbar**
- **button**


## Create your first Component

Create a Components folder at `your project folder`:

```md title="your-project/components"
# /your-project
    /apps
    /components

```

## Create a CryptoCard.tsx
```md title="components/CryptoCard.tsx"
import { Crypto } from "@/types/crypto";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import Image from "next/image";

interface CryptoCardProps {
  crypto: Crypto;
}

const CryptoCard = ({ crypto }: CryptoCardProps) => {
  const priceChangeIsPositive = crypto.price_change_percentage_24h > 0;
  return (
    <div className="bg-white cursor-pointer text-black rounded-lg shadow-md p-4  hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-2 gap-2">
        <Image src={crypto.image} alt={crypto.name} width={40} height={40} />
        <div>
          <h3 className="font-bold">{crypto.name}</h3>
          <p className="text-gray-500 text-sm">{crypto.symbol.toUpperCase()}</p>
        </div>
      </div>

      <div className="mt-2">
        <p className="text-xl font-bold">${crypto.current_price.toLocaleString()}</p>
        <div className={`flex items-center mt-1 ${priceChangeIsPositive ? 'text-green-500' : 'text-red-500'}`}>
          {priceChangeIsPositive ? (
            <ArrowUpCircle size={16} className='mr-1' />
          ) : (
            <ArrowDownCircle size={16} className='mr-1' />
          )}
          <span>
            {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
          </span>
        </div>
      </div>
      <div className="mt-3 text-sm text-gray-500">
        <p>Market Cap: ${crypto.market_cap.toLocaleString()}</p>
        <p>Rank : #{crypto.market_cap_rank} </p>
      </div>
    </div>
  );
};

export default CryptoCard;
```

## Create a CryptoList.tsx

```md title="components/CryptoList.tsx"
"use client"
import CryptoCard from './CryptoCard'
import { useCryptoStore } from '@/store/useCrypto'
import { TextGenerateEffect } from './ui/text-generate-effect';

const CryptoList = () => {
    const {filteredCryptos, isLoading, error} = useCryptoStore();
    const cryptos = filteredCryptos();

    if(isLoading)
    {
        return (
            <div className='flex justify-center items-center h-64'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'>
                </div>
            </div>
        );
    }
    if(error)
    {
        return (
            <div className='bg-red-100 border border-red-500 text-red-700 px-4 py-3 rounded relative' role='alert'>
                <strong className='font-bold'>Error!</strong>
                <span className='block sm:inline'>{error}</span>
            </div>
        )
    }
    if(cryptos.length === 0)
    {
        return (
          <div className='text-center py-10'>
            <TextGenerateEffect words='No CryptoCurrencies found' />
          </div>
        );
    }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {cryptos.map((crypto) => (
            <CryptoCard key={crypto.id} crypto={crypto} />
        ))}
    </div>
  )
}

export default CryptoList
```

## Create a CryptoTracker.tsx
```md title="components/CryptoTracker.tsx"
"use client"
import { useCryptoData } from "@/hooks/useCryptoData"
import { Coins } from "lucide-react";
import RefreshButton from "./RefreshButton";
import SearchBar from "./SearchBar";
import CryptoList from "./CryptoList";

const CryptoTracker = () => {
    useCryptoData();
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <Coins className="h-8 w-8 text-blue-600 mr-2" />
                    <h1 className="text-2xl font-bold">
                        Crypto Price Tracker
                    </h1>
                </div>
                <RefreshButton/>
            </div>
            <SearchBar/>
        </header>
        <main>
            <CryptoList/>
        </main>

        <footer className="mt-12 text-center text-gray-500 text-sm">
            <p>Data provided by CoinGecko API</p>
            <p className="mt-1">© {new Date().getFullYear()} Crypto Tracker</p>
        </footer>
    </div>
  )
}

export default CryptoTracker
```


## Create a Searchbar.tsx

```md title="components/Searchbar.tsx"
import { useCryptoStore } from "@/store/useCrypto";
import { Search } from "lucide-react";

const SearchBar = () => {
  const {searchTerm, setSearchTerm} = useCryptoStore();
  return (
    <div className='relative'>
      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
        <Search className='h-5 w-5 text-gray-400' />
      </div>
      <input
        type='text'
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:text-black"
        placeholder="Search cryptocurrencies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchBar
```

## Create a RefreshButton.tsx
```
import { useQueryClient } from "@tanstack/react-query"
import { RefreshCw } from "lucide-react";
import { useState } from "react";

const RefreshButton = () => {
    const queryClient = useQueryClient();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = async () =>{
        setIsRefreshing(true);
        await queryClient.refetchQueries({ queryKey: ["cryptos"] });
        setTimeout(()=> setIsRefreshing(false), 1000);
    }
  return (
    <button
      onClick={handleRefresh}
      className='p-[3px] relative'
      disabled={isRefreshing}
    >
      <div className='absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg' />
      <div className=' flex items-center px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent'>
        <RefreshCw
          className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
        />
        Refresh
      </div>
    </button>
  );
}

export default RefreshButton



```


## Create a Navbar.tsx
```
import Image from "next/image";
import Link from "next/link";
import { ToggleMode } from "./ToggleMode";

const Navbar = () => {
  return (
    <nav className='border-gray-200'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <Link
          href='https://www.blockhouse.app/'
          className='flex items-center space-x-3'
        >
          <Image src="/blockhouse.svg" className="bg-white"  alt='Logo' width={35} height={35} />
          <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
            Blockhouse
          </span>
        </Link>
        <div className='flex'>
          <ToggleMode />

          <div className='flex items-center gap-2'>
            <button
              type='button'
              className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-menu'
              >
                <line x1='4' x2='20' y1='12' y2='12' />
                <line x1='4' x2='20' y1='6' y2='6' />
                <line x1='4' x2='20' y1='18' y2='18' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar
```
