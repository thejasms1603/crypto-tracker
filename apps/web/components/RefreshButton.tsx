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


