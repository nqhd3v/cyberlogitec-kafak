import { User } from 'src/user/entities/user';

export interface iReqWithUser extends Request {
  user: User;
}
export interface iAuthResponse {
  user: {
    displayname: string;
    username: string;
    id: number;
    created_at: Date;
    updated_at: Date;
  };
  token: string;
}
