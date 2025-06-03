import { useState } from 'react';
import styled from 'styled-components';
import { Page } from 'modules';
import { Button, FluidContainer, Typography } from 'components';
import { useBreakpoint } from 'hooks';

// Styled Components
const GameWrapper = styled(FluidContainer)`
  padding: 72px 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;
`;

const WordDisplay = styled.div`
  font-size: 2.4rem;
  letter-spacing: 0.4rem;
`;

const LetterGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  max-width: 600px;
`;

const LetterButton = styled(Button)`
  width: 36px;
  padding: 0.3rem 0;
  font-size: 1rem;
`;

const LetterSlot = styled.span`
  display: inline-block;
  width: 2rem; // wider slot
  margin: 0 0.3rem; // more spacing between letters
  border-bottom: 2px solid black;
  text-align: center;
  font-size: 2rem;
  text-transform: uppercase;
`;

const InputField = styled.input`
  font-size: 1.1rem;
  padding: 0.5rem;
  text-align: center;
  width: 220px;
`;

const ResultSection = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const DrawingWrapper = styled.div`
  position: relative;
  width: 220px;
  height: 250px;
  margin: 1rem 0;
`;

const GallowsFrame = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: -50%;
    width: 100%;
    height: 6px;
    background-color: black; // base platform
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0%;
    height: 100%;
    width: 8px;
    background-color: black; // vertical post
    transform: translateX(-50%);
  }
`;

const TopBar = styled.div`
  position: absolute;
  top: 0;
  left: calc(0%);
  width: 150px;
  height: 8px;
  background-color: black;
`;

const DiagonalSupport = styled.div`
  position: absolute;
  top: 16%;
  left: 14%;
  width: 60px;
  height: 8px;
  background-color: black;
  transform: translateX(-50%) rotate(-45deg);
  transform-origin: bottom left;
`;

const Rope = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 8px;
  left: 50%;
  width: 4px;
  height: 40px;
  background-color: black;
  opacity: ${(p) => (p.visible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const BodyPart = styled.div<{ visible: boolean }>`
  position: absolute;
  background: black;
  opacity: ${(p) => (p.visible ? 1 : 0)};
  transform: ${(p) => (p.visible ? 'scale(1)' : 'scale(0.8)')};
  transition: opacity 0.3s ease, transform 0.3s ease;
`;

const Head = styled(BodyPart)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  top: 48px;
  left: 42%;
`;

const Torso = styled(BodyPart)`
  width: 8px;
  height: 55px;
  top: 80px;
  left: 49%;
`;

const LeftArm = styled(BodyPart)`
  width: 40px;
  height: 8px;
  top: 100px;
  left: calc(52% - 44px);
  transform: rotate(-30deg);
  transform-origin: right center;
`;

const RightArm = styled(BodyPart)`
  width: 40px;
  height: 8px;
  top: 100px;
  left: 52%;
  transform: rotate(30deg);
  transform-origin: left center;
`;

const LeftLeg = styled(BodyPart)`
  width: 40px;
  height: 8px;
  top: 130px;
  left: calc(47% - 35px);
  transform: rotate(-45deg);
  transform-origin: top right;
`;

const RightLeg = styled(BodyPart)`
  width: 40px;
  height: 8px;
  top: 130px;
  left: calc(54% - 3px);
  transform: rotate(45deg);
  transform-origin: top left;
`;

const HangmanDrawing = ({ wrongGuesses }: { wrongGuesses: number }) => (
  <DrawingWrapper>
    <GallowsFrame />
    <TopBar />
    <DiagonalSupport />
    <Rope visible={wrongGuesses > 0} />
    <Head visible={wrongGuesses > 0} />
    <Torso visible={wrongGuesses > 1} />
    <LeftArm visible={wrongGuesses > 2} />
    <RightArm visible={wrongGuesses > 3} />
    <LeftLeg visible={wrongGuesses > 4} />
    <RightLeg visible={wrongGuesses > 5} />
  </DrawingWrapper>
);

export default function Hangman() {
  const { isMobile, isTablet } = useBreakpoint();

  const [secretWord, setSecretWord] = useState('');
  const [inputWord, setInputWord] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [isWordSet, setIsWordSet] = useState(false);
  const [inputError, setInputError] = useState('');

  const maxWrong = 6;
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const handleStartGame = () => {
    const cleaned = inputWord.toUpperCase().trim();

    if (!/^[A-Z ]+$/.test(cleaned)) {
      setInputError(
        'Please enter letters only (no spaces, numbers, or symbols).',
      );
      return;
    }

    setSecretWord(cleaned);
    setIsWordSet(true);
    setInputError('');
  };

  const handleLetterClick = (letter: string) => {
    if (guesses.includes(letter) || wrongGuesses >= maxWrong) return;

    setGuesses([...guesses, letter]);
    if (!secretWord.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleStartGame();
    }
  };

  const displayWord = () =>
    secretWord
      .split('')
      .map((char) =>
        char === ' '
          ? ' ' // keep space
          : guesses.includes(char)
          ? char
          : '_',
      )
      .join(' ');

  const isWinner = !displayWord().includes('_');
  const isGameOver = wrongGuesses >= maxWrong;

  const resetGame = () => {
    setSecretWord('');
    setInputWord('');
    setGuesses([]);
    setWrongGuesses(0);
    setIsWordSet(false);
    setInputError('');
  };

  return (
    <Page>
      <GameWrapper>
        <Typography
          as="h1"
          variant="pageHeader"
          size={isMobile ? '2xl' : isTablet ? '4xl' : '5xl'}
        >
          Hangman
        </Typography>

        <Typography
          variant="copy"
          size={isMobile ? 'md' : 'lg'}
          style={{ maxWidth: '600px' }}
        >
          Player 1: Enter a word. Player 2: Guess it by clicking letters. You
          get 6 wrong guesses before the game ends.
        </Typography>

        {!isWordSet ? (
          <>
            <Typography variant="titleSmall" size="xl">
              Player 1: Enter a word
            </Typography>
            <InputField
              type="password"
              value={inputWord}
              onChange={(e) => setInputWord(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Enter word"
            />
            {inputError && (
              <Typography variant="copy" style={{ color: 'red' }}>
                {inputError}
              </Typography>
            )}
            <Button onClick={handleStartGame}>Start Game</Button>
          </>
        ) : (
          <>
            <HangmanDrawing wrongGuesses={wrongGuesses} />

            <WordDisplay>
              {secretWord.split('').map((char, i) =>
                char === ' ' ? (
                  <span
                    key={i}
                    style={{ width: '1.2rem', display: 'inline-block' }}
                  >
                    &nbsp;
                  </span>
                ) : (
                  <LetterSlot key={i}>
                    {guesses.includes(char) ? char : ''}
                  </LetterSlot>
                ),
              )}
            </WordDisplay>

            <Typography variant="copy">
              Wrong guesses: {wrongGuesses} / {maxWrong}
            </Typography>

            <LetterGrid>
              {letters.map((letter) => (
                <LetterButton
                  key={letter}
                  variant="outline"
                  onClick={() => handleLetterClick(letter)}
                  disabled={guesses.includes(letter) || isWinner || isGameOver}
                >
                  {letter}
                </LetterButton>
              ))}
            </LetterGrid>

            {(isWinner || isGameOver) && (
              <ResultSection>
                <Typography variant="titleSmall" size="xl">
                  {isWinner
                    ? '🎉 You won! Great job!'
                    : `💀 Game over. The word was: ${secretWord}`}
                </Typography>
                <Button onClick={resetGame}>Play Again</Button>
              </ResultSection>
            )}
          </>
        )}
      </GameWrapper>
    </Page>
  );
}
