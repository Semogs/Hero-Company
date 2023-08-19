import { Button } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ShieldIcon from '@mui/icons-material/Shield';
import AttackIcon from '../assets/images/attack_icon.png';

const HeroCard = ({ heroList, handleTrainHero }) => {
  return (
    <div className='hero-card-con'>
      {heroList
        .slice()
        .sort((a, b) => b.current_power - a.current_power)
        .map((hero) => {
          const suitColors = hero.suit_colors.split(' and ');
          return (
            <div
              className='hero-card'
              key={hero.guid}
              style={{
                background: `linear-gradient(to bottom right, ${suitColors[0]}, ${suitColors[1]})`
              }}
            >
              <div className='hero-card-title-con'>
                <p className='hero-current-power'>{hero.current_power}</p>
                <h2 className='hero-card-title'>
                  <em>{hero.name}</em>
                </h2>
                <h3 className='hero-card-ability'>
                  <em>{hero.ability}</em>
                  {hero.ability === 'attacker' ? (
                    <img className='hero-ability-img-attack' src={AttackIcon} alt='attack-icon' />
                  ) : (
                    <ShieldIcon className='hero-ability-img-defend' />
                  )}
                </h3>
              </div>
              <div className='hero-content'>
                <p className='hero-text start-power'>
                  Start power - <em>{hero.starting_power}</em>
                </p>
                <p className='hero-text'>
                  Training started at - <em>{hero.training_start_date}</em>
                </p>
              </div>
              <Button
                endIcon={<FitnessCenterIcon />}
                variant='contained'
                className='hero-button'
                onClick={() => handleTrainHero(hero.guid)}
              >
                Train Hero
              </Button>
            </div>
          );
        })}
    </div>
  );
};

export default HeroCard;
