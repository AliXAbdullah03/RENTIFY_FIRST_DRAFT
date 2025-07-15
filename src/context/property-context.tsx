'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Property } from '@/lib/types';
import { properties as initialProperties } from '@/lib/mock-data';

interface PropertyContextType {
  properties: Property[];
  addProperty: (property: Property) => void;
  deleteProperty: (propertyId: string) => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export function PropertyProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(initialProperties);

  const addProperty = (property: Property) => {
    setProperties((prevProperties) => [property, ...prevProperties]);
  };

  const deleteProperty = (propertyId: string) => {
    setProperties((prevProperties) => prevProperties.filter((p) => p.id !== propertyId));
  };

  return (
    <PropertyContext.Provider value={{ properties, addProperty, deleteProperty }}>
      {children}
    </PropertyContext.Provider>
  );
}

export function usePropertyContext() {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('usePropertyContext must be used within a PropertyProvider');
  }
  return context;
}
