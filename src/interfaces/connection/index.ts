import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ConnectionInterface {
  id?: string;
  user_id: string;
  connected_user_id: string;
  created_at?: any;
  updated_at?: any;

  user_connection_user_idTouser?: UserInterface;
  user_connection_connected_user_idTouser?: UserInterface;
  _count?: {};
}

export interface ConnectionGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  connected_user_id?: string;
}
