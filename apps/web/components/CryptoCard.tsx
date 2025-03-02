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
