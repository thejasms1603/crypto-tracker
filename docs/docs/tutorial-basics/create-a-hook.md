# Hooks

Create a hooks folder in your root folder
```ts title="hooks/useCryptoData.ts"
"use client";
import { useQuery } from "@tanstack/react-query";
import { useCryptoStore } from "@/store/useCrypto";
import { fetchCryptos } from "@/app/api/cryptoApi";
import { useEffect } from "react";

export const useCryptoData = () => {
  const { setCryptos, setLoading, setError } = useCryptoStore();

  const query = useQuery({
    queryKey: ["cryptos"],
    queryFn: fetchCryptos,
    refetchInterval: 60000, 
  });

  useEffect(() => {
    if (query.isSuccess) {
      setCryptos(query.data);
      setLoading(false);
    }

    if (query.isError) {
      setError(query.error.message);
      setLoading(false);
    }

    if (query.isFetching) {
      setLoading(true);
    }
  }, [
    query.data,
    query.isSuccess,
    query.isError,
    query.isFetching,
    query.error,
    setCryptos,
    setLoading,
    setError,
  ]);

  return query;
};

```
