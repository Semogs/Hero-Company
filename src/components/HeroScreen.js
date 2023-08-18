import { useEffect, useMemo, useState } from 'react';
import { getAllHeroes, trainHero } from '../services/heroService';
import { useAuth } from '../context/AuthContext';
import '../css/heroScreen.css';
import Swal from 'sweetalert2';
import HeroCard from './HeroCard';
import ContentLoader from './widgets/ContentLoader';

function HeroScreen() {
  const [heroes, setHeroes] = useState([]);
  const [trainedHeroes, setTrainedHeroes] = useState([]);
  const [loading, setLoading] = useState(true);

  const { authToken, trainerId, logout } = useAuth();

  useEffect(() => {
    const fetchHeroes = async () => {
      const res = await getAllHeroes(authToken);
      if (!res?.success) {
        if (res) {
          setLoading(false);
          return Swal.fire('', res.error, 'warning');
        }
        return logout();
      }
      setHeroes(res.allHeroes);
      setTrainedHeroes(res.allHeroes.filter((hero) => hero.trainer_id === Number(trainerId)));
      setLoading(false);
    };

    fetchHeroes();
  }, [authToken, trainerId, logout]);

  const handleTrainHero = async (heroId) => {
    const res = await trainHero(authToken, heroId);

    if (!res?.success) {
      if (res) {
        setLoading(false);
        return Swal.fire('', res.error, 'warning');
      }
      return logout();
    }

    const updatedHeroes = heroes.map((hero) =>
      hero.guid === heroId ? { ...hero, current_power: res.newPower, trainer_id: Number(trainerId) } : hero
    );

    setHeroes(updatedHeroes);
    setTrainedHeroes(updatedHeroes.filter((hero) => hero.trainer_id === Number(trainerId)));
  };

  const displayedHeroes = useMemo(
    () => heroes.filter((hero) => !trainedHeroes.find((tHero) => tHero.guid === hero.guid)),
    [heroes, trainedHeroes]
  );

  return (
    <div className='hero-screen-con'>
      {loading ? <ContentLoader /> : null}
      <div>
        <div className='heroes-title'>Your Heroes</div>
        <div className='hero-card-con'>
          <HeroCard heroList={trainedHeroes} handleTrainHero={handleTrainHero} />
        </div>
        <hr className='hero-screen-separator' />
        <div className='heroes-title mt-20'>All Heroes</div>
        <div className='hero-card-con'>
          <HeroCard heroList={displayedHeroes} handleTrainHero={handleTrainHero} />
        </div>
      </div>
    </div>
  );
}

export default HeroScreen;
