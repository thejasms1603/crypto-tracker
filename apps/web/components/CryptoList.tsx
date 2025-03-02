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