import React, { useEffect, useState } from "react";
import { NeoData, fetchNeoData } from "../api/neoApi";

type NeoDataContextType = [
  neoData: NeoData,
  updateNeoData: (newDate: Date) => void,
]

const initialNeoData: NeoDataContextType = [
  { loading: true },
  (newDate) => {},
]

export const NeoDataContext = React.createContext<NeoDataContextType>(initialNeoData);

interface NeoDataProviderProps {
  children: React.ReactNode,
}

export const NeoDataProvider = ({ children }: NeoDataProviderProps) => {
  const [neoData, setNeoData] = useState<NeoData>({ loading: true });

  const updateNeoData = (newDate: Date) => {
    setNeoData( { loading: true });
    fetchNeoData(newDate)
      .then(data => {
        console.log(data);
        setNeoData(data);
      })
      .catch(err => console.error(`Error fetching NEO data: ${err}`));
  }

  useEffect(() => {
    updateNeoData(new Date());
  }, [])

  return (
    <NeoDataContext.Provider value={[neoData, updateNeoData ]}>
      {children}
    </NeoDataContext.Provider>
  )
}