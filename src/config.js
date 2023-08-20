const apiBaseUrl = 'https://hero-company-api-0ff826f7bd25.herokuapp.com/' || 'http://localhost:9733/';

const endpoints = {
  registerTrainerEndpoint: apiBaseUrl + 'auth/register',
  loginTrainerEndpoint: apiBaseUrl + 'auth/authenticate',
  getAllHeroesEndpoint: apiBaseUrl + 'heroes',
  trainHeroEndpoint: apiBaseUrl + 'heroes/train'
};

export default endpoints;
