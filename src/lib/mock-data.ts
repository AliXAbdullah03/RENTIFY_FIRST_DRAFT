
import type { Property, Owner, Conversation, Renter } from './types';

export const owners: Owner[] = [
  {
    id: 'owner-1',
    name: 'Ali Abdullah',
    avatar: '/profile.jpg',
    email: 'ali.abdullah@gmail.com',
    phone: '056 3015516',
  },
  {
    id: 'owner-2',
    name: 'Bob Williams',
    avatar: 'https://placehold.co/100x100.png',
    email: 'bob.w@example.com',
  },
];

export const renters: Renter[] = [
    {
        id: 'renter-1',
        name: 'Charlie Davis',
        avatar: 'https://placehold.co/100x100.png',
    },
     {
        id: 'renter-2',
        name: 'Diana Prince',
        avatar: 'https://placehold.co/100x100.png',
    }
]

export const properties: Property[] = [
  {
    id: 'prop-1',
    title: 'Modern Downtown Apartment',
    description: 'A stylish and modern apartment in the heart of the city. Perfect for young professionals. Comes with all modern amenities and a great view of the city skyline.',
    type: 'apartment',
    price: 2200,
    location: 'New York, NY',
    images: ['/listing-1.jpg', '/listing-2.jpg'],
    featured: true,
    ownerId: 'owner-1',
    details: {
      beds: 2,
      baths: 2,
    },
    amenities: ['WiFi', 'Kitchen', 'Air Conditioning', 'Gym', 'Pool'],
    availableNow: true,
    furnishing: 'furnished',
  },
  {
    id: 'prop-2',
    title: 'Private Room in Shared House',
    description: 'Charming room in a quiet suburban neighborhood. Ideal for students or single professionals. Access to shared kitchen and living spaces.',
    type: 'room',
    price: 800,
    location: 'San Francisco, CA',
    images: ['/listing-3.jpg', '/listing-4.jpg'],
    featured: false,
    ownerId: 'owner-2',
    details: {
      beds: 1,
      baths: 1,
    },
     amenities: ['WiFi', 'Kitchen', 'Washer', 'Dryer'],
     availableNow: false,
     furnishing: 'furnished',
  },
  {
    id: 'prop-3',
    title: 'Affordable Bedspace for Rent',
    description: 'A cozy and affordable bedspace in a shared room. Includes a personal locker. Great for those on a tight budget.',
    type: 'bedspace',
    price: 300,
    location: 'Chicago, IL',
    images: ['/listing-2.jpg'],
    featured: false,
    ownerId: 'owner-1',
    details: {},
    amenities: ['WiFi', 'Shared Bathroom', 'Air Conditioning'],
    availableNow: true,
    furnishing: 'furnished',
  },
  {
    id: 'prop-4',
    title: 'Spacious Commercial Space',
    description: 'Prime commercial space on a busy street. Excellent for a retail store or a modern office. High foot traffic area.',
    type: 'commercial',
    price: 5000,
    location: 'Miami, FL',
    images: ['/listing-3.jpg'],
    featured: true,
    ownerId: 'owner-2',
    details: {
      sqft: 2000,
    },
    amenities: ['High-Speed Internet', 'Central Air', 'Parking', 'Security System'],
    availableNow: true,
    furnishing: 'unfurnished',
  },
  {
    id: 'prop-5',
    title: 'Unfurnished Studio Apartment',
    description: 'A blank canvas for you to make your own. This bright and airy studio apartment with large windows is ready for your personal touch. Close to public transportation and local cafes.',
    type: 'apartment',
    price: 1500,
    location: 'Los Angeles, CA',
    images: ['/listing-2.jpg'],
    featured: false,
    ownerId: 'owner-1',
    details: {
      beds: 1,
      baths: 1,
    },
    amenities: ['Kitchenette', 'Air Conditioning', 'Parking'],
    availableNow: false,
    furnishing: 'unfurnished',
  },
];


export const conversations: Conversation[] = [
    {
        id: 'convo-1',
        property: {
            id: 'prop-1',
            title: 'Modern Downtown Apartment',
            image: '/listing-1.jpg',
        },
        owner: owners[0],
        renter: renters[0],
        messages: [
            { id: 'msg-1-1', senderId: 'renter-1', text: 'Hi, is this apartment still available?', timestamp: '2024-05-20T10:00:00Z' },
            { id: 'msg-1-2', senderId: 'owner-1', text: 'Hello! Yes, it is. Are you interested in a viewing?', timestamp: '2024-05-20T10:05:00Z' },
            { id: 'msg-1-3', senderId: 'renter-1', text: 'Great! How about tomorrow afternoon?', timestamp: '2024-05-20T10:06:00Z' },
        ]
    },
    {
        id: 'convo-2',
        property: {
            id: 'prop-4',
            title: 'Spacious Commercial Space',
            image: '/listing-3.jpg',
        },
        owner: owners[1],
        renter: renters[1],
        messages: [
            { id: 'msg-2-1', senderId: 'renter-2', text: 'Good morning, I have a few questions about the commercial space.', timestamp: '2024-05-19T09:00:00Z' },
            { id: 'msg-2-2', senderId: 'owner-2', text: 'Sure, I\'d be happy to answer them.', timestamp: '2024-05-19T09:10:00Z' },
        ]
    },
     {
        id: 'convo-3',
        property: {
            id: 'prop-3',
            title: 'Affordable Bedspace for Rent',
            image: '/listing-2.jpg',
        },
        owner: owners[0],
        renter: renters[1],
        messages: [
            { id: 'msg-3-1', senderId: 'renter-1', text: 'Can you tell me more about the rules for the bedspace?', timestamp: '2024-05-21T11:00:00Z' },
            { id: 'msg-3-2', senderId: 'owner-1', text: 'Of course. The main rules are no smoking and keeping the shared space clean.', timestamp: '2024-05-21T11:05:00Z' },
            { id: 'msg-3-3', senderId: 'renter-1', text: 'Sounds good, thank you!', timestamp: '2024-05-21T11:06:00Z' },
        ]
    },
]

