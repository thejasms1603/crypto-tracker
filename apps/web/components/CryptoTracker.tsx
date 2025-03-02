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