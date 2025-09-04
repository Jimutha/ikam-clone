export interface User {
  name: string;
  email: string;
  phone: string;
  password: string;
  profilePic: string | null;
}

export interface Ad {
  title: string;
  category: string;
  price: string;
  currency: string;
  description: string;
  location: string;
  thumbnail: string | null; // New field for thumbnail image
  images: string[]; // Detailed images (up to 4)
  userId: string;
  timestamp: string;
}
