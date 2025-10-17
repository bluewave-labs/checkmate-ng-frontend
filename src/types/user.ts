export interface IUser {
  sub: string;
  email: string;
  exp: number;
  iat: number;
  orgId: string;
  teamIds: string[];
  teams: { _id: string; name: string }[];
}
