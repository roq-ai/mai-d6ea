import axios from 'axios';
import queryString from 'query-string';
import { ConnectionInterface, ConnectionGetQueryInterface } from 'interfaces/connection';
import { GetQueryInterface } from '../../interfaces';

export const getConnections = async (query?: ConnectionGetQueryInterface) => {
  const response = await axios.get(`/api/connections${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createConnection = async (connection: ConnectionInterface) => {
  const response = await axios.post('/api/connections', connection);
  return response.data;
};

export const updateConnectionById = async (id: string, connection: ConnectionInterface) => {
  const response = await axios.put(`/api/connections/${id}`, connection);
  return response.data;
};

export const getConnectionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/connections/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteConnectionById = async (id: string) => {
  const response = await axios.delete(`/api/connections/${id}`);
  return response.data;
};
