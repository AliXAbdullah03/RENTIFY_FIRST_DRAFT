export type PropertyType = 'apartment' | 'room' | 'bedspace' | 'commercial' | 'house' | 'car';
export type Furnishing = 'furnished' | 'unfurnished';

export interface Owner {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone?: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  price: number;
  location: string;
  images: string[];
  featured: boolean;
  ownerId: string;
  details: {
    beds?: number;
    baths?: number;
    sqft?: number;
  };
  amenities: string[];
  availableNow: boolean;
  furnishing: Furnishing;
}
