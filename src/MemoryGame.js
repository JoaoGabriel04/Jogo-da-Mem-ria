import { useEffect, useState } from 'react';
import GameOver from './components/GameOver';
import GameBoard from './components/GameBoard';
import game from './game/game';

export default function MemoryGame() {

  const [gameOver, setGameOver] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(game.createCardsFromTechs());
  }, []);

  function restart() {
    game.clearCards();
    setCards(game.createCardsFromTechs());
    setGameOver(false);
  }

  function handleFlip(card) {
    game.flipCard(
      card.id,
      () => {
        setGameOver(true);
        setCards([...game.cards]); // ✅ Atualiza o estado para mostrar todos os cards corretamente no GameOver
      },
      () => {
        setCards([...game.cards]); // ✅ Atualiza após desvirar os errados
      }
    );
    setCards([...game.cards]); // ✅ Necessário para atualizar após o primeiro flip
  }

  return (
    <div>
      <GameBoard handleFlip={handleFlip} cards={cards} />
      <GameOver show={gameOver} handleRestart={restart} />
    </div>
  );
}
