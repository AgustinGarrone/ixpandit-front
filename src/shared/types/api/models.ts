export interface User {
  id: string;
  username: string;
  email: string;
  initialPokemons: boolean;
}

export interface UserWithToken extends User {
  token: string;
}

export default interface IJwt {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface Type {
  id: number;
  name: string;
}

export interface Ability {
  id: number;
  name: string;
}
