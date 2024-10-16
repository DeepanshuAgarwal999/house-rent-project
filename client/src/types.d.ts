export type HouseType = {
  id: number;
  address: string;
  img_url: string;
  price: string;
  location: string;
  size: number;
  numberOfRooms: number;
};



export type User = {
  id: number;
  isAdmin: boolean;
  token: string;
  exp?: number;
  iat?: number;
};

type UserWithDetails = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};

// Define House type
type House = {
  id: number;
  address: string;
  img_url: string;
  size: number;
  location: string;
  numberOfRooms: number;
  price: number;
};

// Define Rental type
type Rental = {
  id: number;
  startDate: string; // Use `Date` if you prefer handling actual date objects
  endDate: string; // Use `Date` if handling actual date objects
  totalPrice: number;
  user: UserWithDetails;
  house: House;
};

// Define the main object structure
type RentalResponse = {
  rental: Rental;
};

export type HouseType = {
  id: number; // Unique identifier for the house
  address: string; // Address of the house
  img_url?: string; // Optional image URL of the house
  size: number; // Size of the house in square meters (or other units)
  location: string; // Location of the house
  numberOfRooms?: number; // Optional number of rooms in the house
  price: number; // Price of the house
  owner?: User; // Owner of the house (optional, can be null)
  rentals?: Rental[]; // List of rentals associated with the house (optional)
};
