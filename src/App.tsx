import { useBingoGame } from './hooks/useBingoGame';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { BingoModal } from './components/BingoModal';
import { ScavengerScreen } from './components/ScavengerScreen';
import { HuntCompleteModal } from './components/HuntCompleteModal';
import { CardDeckScreen } from './components/CardDeckScreen';

function App() {
  const {
    gameState,
    mode,
    board,
    winningSquareIds,
    showBingoModal,
    huntItems,
    showHuntModal,
    startGame,
    handleSquareClick,
    resetGame,
    dismissModal,
    startHunt,
    startDeck,
    toggleHuntItem,
    dismissHuntModal,
    resetHunt,
  } = useBingoGame();

  if (gameState === 'start') {
    return <StartScreen onStart={startGame} onStartHunt={startHunt} onStartDeck={startDeck} />;
  }

  if (mode === 'bingo') {
    return (
      <>
        <GameScreen
          board={board}
          winningSquareIds={winningSquareIds}
          hasBingo={gameState === 'bingo'}
          onSquareClick={handleSquareClick}
          onReset={resetGame}
        />
        {showBingoModal && (
          <BingoModal onDismiss={dismissModal} />
        )}
      </>
    );
  }

  if (mode === 'deck') {
    return (
      <CardDeckScreen onBack={resetGame} />
    );
  }

  // mode === 'hunt'
  return (
    <>
      <ScavengerScreen
        items={huntItems}
        onToggle={toggleHuntItem}
        onReset={resetHunt}
        onBack={resetGame}
      />
      {showHuntModal && (
        <HuntCompleteModal
          onDismiss={dismissHuntModal}
          onPlayAgain={() => { resetHunt(); startHunt(); }}
          onBackToStart={resetGame}
        />
      )}
    </>
  );
}

export default App;
