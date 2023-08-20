const apiBaseUrl = 'https://git.heroku.com/hero-company-api.git' || 'http://localhost:9733/';

const endpoints = {
  registerTrainerEndpoint: apiBaseUrl + 'auth/register',
  loginTrainerEndpoint: apiBaseUrl + 'auth/authenticate',
  getAllHeroesEndpoint: apiBaseUrl + 'heroes',
  trainHeroEndpoint: apiBaseUrl + 'heroes/train'
};

export default endpoints;
