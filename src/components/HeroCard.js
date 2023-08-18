import { Button } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const HeroCard = ({ heroList, handleTrainHero }) => {
  return heroList
    .slice()
    .sort((a, b) => b.current_power - a.current_power)
    .map((hero) => (
      <div className='hero-card' key={hero.guid}>
        <div className='hero-card-title-con'>
          <h2 className='hero-title'>{hero.name}</h2> <h3 className='hero-card-ability'>{hero.ability}</h3>
        </div>
        <div className='hero-content'>
          <p className='hero-text'>Starting Power: {hero.starting_power}</p>
          <p className='hero-text'>Current Power: {hero.current_power}</p>
          <p className='hero-text'>Suit Colors: {hero.suit_colors}</p>
          <p className='hero-text'>Training Start Date: {hero.training_start_date}</p>
        </div>
        <Button endIcon={<FitnessCenterIcon />} variant='contained' className='hero-button' onClick={() => handleTrainHero(hero.guid)}>
          Train Hero
        </Button>
      </div>
    ));
};

export default HeroCard;
