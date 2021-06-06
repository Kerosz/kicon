// packages
import { v4 as uuid } from "uuid";
// internals
import usePoolConnection from "../utils/use-pool-connection";
// types
import type { Address, AddressRequest } from "../types";

class AddressStore {
  public async getUserAddressById(addressId: string, userId: string): Promise<Address> {
    const sql = "SELECT * FROM addresses WHERE id = ($1) AND user_id = ($2)";

    const [result]: Address[] = await usePoolConnection<Address>(sql, [addressId, userId]);

    return result;
  }

  public async getAddressByUserId(userId: string): Promise<Address[]> {
    const sql = "SELECT * FROM addresses WHERE user_id = ($1)";

    return await usePoolConnection<Address>(sql, [userId]);
  }

  public async saveAddress(userId: string, a: AddressRequest): Promise<Address> {
    const id = uuid();
    const sql =
      "INSERT INTO addresses VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *";

    const [result]: Address[] = await usePoolConnection<Address>(sql, [
      id,
      userId,
      a.first_name,
      a.last_name,
      a.address1,
      a.address2,
      a.country,
      a.city,
      a.state,
      a.postal_code,
      a.phone,
      Date.now().toString() /** create_at */,
      Date.now().toString() /** updated_at */,
    ]);

    return result;
  }
}

export const store = new AddressStore();
