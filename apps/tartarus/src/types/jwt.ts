import { UserRole } from "./user-types";

export interface JwtUserToken {
  id: string;
  role: keyof typeof UserRole;
}
