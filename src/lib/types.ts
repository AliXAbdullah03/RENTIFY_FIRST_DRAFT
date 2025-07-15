
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
  paused?: boolean;
  analytics?: {
    views: number;
    inquiries: number;
  }
}

export interface Renter {
    id: string;
    name: string;
    avatar: string;
}

export interface Message {
    id: string;
    senderId: string; // Will be either an owner ID or a renter ID
    text: string;
    timestamp: string;
}

export interface Conversation {
    id: string;
    property: {
        id: string;
        title: string;
        image: string;
    };
    owner: Owner;
    renter: Renter;
    messages: Message[];
}

    
