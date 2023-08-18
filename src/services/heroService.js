import axios from 'axios';
import config from '../config';
import Swal from 'sweetalert2';

export async function getAllHeroes(token) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const res = await axios.get(config.getAllHeroesEndpoint, { headers });
    return res.data;
  } catch (error) {
    Swal.fire('', error.response.data.message, 'warning');
  }
}

export async function trainHero(token, guid) {
  const headers = {
    Authorization: `Bearer ${token}`
  };

  try {
    const res = await axios.post(config.trainHeroEndpoint, { guid }, { headers });
    return res.data;
  } catch (error) {
    Swal.fire('', error.response.data.message, 'warning');
  }
}
