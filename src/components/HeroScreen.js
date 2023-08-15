import React, { useState } from 'react';
import { Container, Paper, Typography, Box, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(4)
}));

const StyledHeroCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius
}));

function HeroScreen() {
  // Sample hero data (replace with actual fetched data)
  const [heroes, setHeroes] = useState([
    { id: 1, name: 'Hero 1', ability: 'Attacker', power: 80, currentPower: 80 },
    { id: 2, name: 'Hero 2', ability: 'Defender', power: 70, currentPower: 70 }
    // ... more hero data
  ]);

  const handleTrainHero = (heroId) => {
    // Implement training logic here
    // Update the hero's currentPower based on training growth
    const updatedHeroes = heroes.map((hero) =>
      hero.id === heroId ? { ...hero, currentPower: calculateNewPower(hero.currentPower) } : hero
    );
    setHeroes(updatedHeroes);
  };

  const calculateNewPower = (currentPower) => {
    const growthPercentage = Math.random() * 0.1; // Random growth between 0% to 10%
    const newPower = currentPower * (1 + growthPercentage);
    return Math.round(newPower * 100) / 100; // Round to 2 decimal places
  };

  const renderHeroCards = () => {
    return heroes
      .slice() // Clone the array to prevent mutating the original data
      .sort((a, b) => b.currentPower - a.currentPower) // Sort by currentPower in descending order
      .map((hero) => (
        <StyledHeroCard key={hero.id}>
          <Typography variant='h6'>{hero.name}</Typography>
          <Typography variant='body2'>Ability: {hero.ability}</Typography>
          <Typography variant='body2'>Current Power: {hero.currentPower}</Typography>
          <Button variant='contained' color='primary' onClick={() => handleTrainHero(hero.id)}>
            Train Hero
          </Button>
        </StyledHeroCard>
      ));
  };

  return (
    <Container component='main' maxWidth='lg'>
      <StyledPaper elevation={3}>
        <Typography component='h1' variant='h5'>
          Heroes Screen
        </Typography>
        {heroes.length === 0 ? (
          <CircularProgress /> // Show loading indicator if data is being fetched
        ) : (
          renderHeroCards()
        )}
      </StyledPaper>
    </Container>
  );
}

export default HeroScreen;
