import { FluidContainer, Typography, Image } from 'components';
import { useBreakpoint } from 'hooks';
import React, { useEffect } from 'react';
import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Colors, FontSizes, media, Spaces } from 'theme';
import { Game } from 'types';

const slideDown = keyframes`
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 100%;
    opacity: 1;
  }
`;

const GameTypesWrapper = styled.div`
  min-height: calc(100vh - 100px);
  padding: 0;
  margin: 0;
  background-image: url('/departments/recreation/game-room/game-room_background2.svg');
  background-size: cover;
  display: flex;
  justify-content: center;
`;

const games: Game[] = [
  {
    id: 1,
    gameName: 'Ping Pong',
    gameDescription:
      'Ping pong, also known as table tennis, is a racket sport where players use small rackets to hit a ball back and forth across a table. The ball is usually orange or white and weighs about 2.7 grams. The game is played on a hard, rectangular table divided into two halves by a net. Players can play individually or in teams of two, taking turns hitting the ball over the net onto the other side of the table. The first player to 11 points wins, but they must beat their opponent by at least two points.',
    gameImgSrc: '/departments/recreation/game-room/game-types/pingPong2.png',
  },
  {
    id: 2,
    gameName: 'Pool (8-Ball)',
    gameDescription:
      'Eight Ball is a call shot game played with a cue ball and fifteen object balls, numbered 1 through 15. One player must pocket balls of the group numbered 1 through 7 (solid colors), while the other player has 9 thru 15 (stripes). The player pocketing his group first and then legally pocketing the 8-ball wins the game.',
    gameImgSrc: '/departments/recreation/game-room/game-types/pool.png',
  },
  {
    id: 3,
    gameName: 'Foosball',
    gameDescription:
      "Foosball, also known as table football or table soccer, is a tabletop game where players use rods to move small figures of players to hit a ball into the opponent's goal. The game is similar to soccer and is loosely based on association football.",
    gameImgSrc: '/departments/recreation/game-room/game-types/foosball.png',
  },
  {
    id: 4,
    gameName: 'Air Hockey',
    gameDescription:
      "Air hockey is a tabletop game where two players use paddles to shoot a plastic puck across a table with minimal friction into the opponent's goal. The puck moves on a cushion of air created by tiny holes in the table's surface. The game is based on ice hockey and was invented in the 1960s and 1970s to be faster and more exciting than pool.",
    gameImgSrc: '/departments/recreation/game-room/game-types/airhockey.jpg',
  },
  {
    id: 5,
    gameName: 'Video Games',
    gameDescription: [
      'Super Smash Bros.: Test your skills and battle it out with your favorite characters in this dynamic and fast-paced fighting game.',
      'Mario Party: Gather your friends and compete in a series of mini-games and board game challenges to claim victory in this classic party game.',
      'Mario Kart: Race against each other on imaginative tracks and prove your driving prowess in this beloved kart racing game.',
      'Additional Games: Explore a variety of other exciting titles that cater to every gaming taste.',
    ],
    gameImgSrc: '/departments/recreation/game-room/game-types/videoGames2.png',
  },
];

const WhiteListItem = styled.li`
  color: white;
`;

interface GameTitleProps {
  game_id: number;
  text: string;
  selected: boolean;
  onClickHandler: Function;
}

const GameTitleWrapper = styled.h2<{ selected: boolean }>`
  color: ${(p) => (p.selected ? Colors.primary : Colors.white)};
  font-size: ${FontSizes['5xl']};
  font-weight: ${(p) => (p.selected ? 400 : 200)};
  margin: 0;
  padding: 0;
  user-select: none;
  cursor: pointer;
  &:hover {
    color: ${Colors.primary};
  }

  ${() =>
    media('widescreen')(`
    font-size: ${FontSizes['4xl']};
  `)}
  ${() =>
    media('desktop')(`
    font-size: ${FontSizes['2xl']};
  `)}
`;

const GameTitle = ({
  text,
  game_id,
  selected,
  onClickHandler,
}: GameTitleProps) => {
  return (
    <GameTitleWrapper
      selected={selected}
      onClick={() => onClickHandler(game_id)}
    >
      {text}
    </GameTitleWrapper>
  );
};

const GameDescription = styled.div<{ display: boolean }>`
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: all 0.3s ease;
  animation: ${(p) => (p.display ? slideDown : '')} 0.3s forwards;
  padding: 10px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-left: 2px solid ${Colors.primary};
`;

const GameImageContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GameTypesContainer = styled.div<{ isTablet: boolean }>`
  width: ${(p) => (p.isTablet ? '100%' : '50%')};
  height: 100%;
  display: flex;
  padding: ${Spaces.lg};
  flex-direction: column;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 12px;
`;

export const GameTypes = () => {
  const { isTablet, isDesktop } = useBreakpoint();

  const [selectedGame, setSelectedGame] = useState<number>(1);
  const [gameImg, setGameImg] = useState<string>(games[0].gameImgSrc);

  useEffect(() => {
    if (selectedGame != 0) {
      setGameImg(games[selectedGame - 1].gameImgSrc);
    }
  }, [selectedGame]);

  const clickGameHandler = (game_id: number) => {
    setSelectedGame(game_id != selectedGame ? game_id : 0);
  };

  return (
    <GameTypesWrapper>
      <FluidContainer flex={true} flexDirection="row" alignItems="center">
        <GameTypesContainer isTablet={isTablet}>
          {games.map((game) => {
            return (
              <React.Fragment key={game.id}>
                <GameTitle
                  game_id={game.id}
                  text={game.gameName}
                  selected={selectedGame === game.id}
                  onClickHandler={clickGameHandler}
                />

                <GameDescription display={selectedGame === game.id}>
                  {typeof game.gameDescription === 'string' ? (
                    <Typography
                      weight="400"
                      size={isDesktop ? 'sm' : 'md'}
                      color="white"
                    >
                      {game.gameDescription}
                    </Typography>
                  ) : (
                    <ul style={{ margin: 0, padding: '20px' }}>
                      {Array.isArray(game.gameDescription) &&
                        game.gameDescription.map(
                          (gameDescriptionBulletPoint, idx) => {
                            return (
                              <WhiteListItem key={idx}>
                                <Typography
                                  weight="400"
                                  size={isDesktop ? 'sm' : 'md'}
                                  color="white"
                                >
                                  {gameDescriptionBulletPoint}
                                </Typography>
                              </WhiteListItem>
                            );
                          },
                        )}
                    </ul>
                  )}
                </GameDescription>
              </React.Fragment>
            );
          })}
        </GameTypesContainer>

        {!isTablet && (
          <GameImageContainer>
            <Image
              // height="600px"
              width="75%"
              src={gameImg}
              borderRadius="12px"
              alt="test"
            ></Image>
          </GameImageContainer>
        )}
      </FluidContainer>
    </GameTypesWrapper>
  );
};
