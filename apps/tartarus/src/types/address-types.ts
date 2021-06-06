export interface Address {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  address1: string;
  address2: string | null;
  country: string;
  city: string;
  state: string;
  postal_code: string | null;
  phone: string;
  created_at: string;
  updated_at: string;
}

export type AddressRequest = Omit<Address, "id" | "user_id" | "created_at" | "updated_at">;
