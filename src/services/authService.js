import axios from 'axios';
import config from '../config';

export async function register(username, password) {
  try {
    const res = await axios.post(config.registerTrainerEndpoint, { username, password });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function login(username, password) {
  try {
    const res = await axios.post(config.loginTrainerEndpoint, { username, password });
    return res.data;
  } catch (error) {
    throw error;
  }
}
