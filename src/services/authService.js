import axios from 'axios';
import config from '../config';

export async function registerTrainer(email, password) {
  try {
    const res = await axios.post(config.registerTrainerEndpoint, { email, password });
    return res.data;
  } catch (error) {
    console.log(error.response.data.error);
  }
}

export async function authenticateTrainer(email, password) {
  try {
    const res = await axios.post(config.loginTrainerEndpoint, { email, password });
    return res.data;
  } catch (error) {
    console.log(error.response.data.error);
  }
}
