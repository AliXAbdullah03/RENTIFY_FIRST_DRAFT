export type PropertyType = 'apartment' | 'house' | 'car' | 'commercial';

export interface Owner {
  id: string;
  name: string;
  avatar: string;
  email: string;
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
}
