export type HouseType = {
  id: number;
  address: string;
  img_url: string;
  price: string;
  location: string;
  size: number;
  numberOfRooms: number;
};

type Roles = "admin" | "user";

export type User = {
  id: number;
  role: Roles;
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
