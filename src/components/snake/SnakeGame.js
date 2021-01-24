import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
//tree
import useInterval from "../../hooks/useInterval";
import { useStore } from "../../../lib/store";
import { SIZE } from "../../constant/mesure";

const SnakeGame = ({ placeCursorOnFood, foodRef }) => {
    const GRID_SIZE = 31;
    const randomNumber = Math.ceil(Math.random() * GRID_SIZE - 1);

    const [direction, setDirection] = useState({ x: 1, y: 0 });
    const [isGameOver, setIsGameOver] = useState(false);
    const [food, setFood] = useState({ x: randomNumber, y: randomNumber });

    const resetGameScore = useStore((state) => state.resetGameScore);
    const toggleGame = useStore((state) => state.toggleGame);
    const gameScore = useStore((state) => state.gameScore);
    const incGameScore = useStore((state) => state.incGameScore);
    const isGameShowing = useStore((state) => state.isGameShowing);

    const [snakeLength, setSnakeLength] = useState([
        { x: 8, y: 8 },
        { x: 8, y: 9 },
        { x: 8, y: 10 },
    ]);
    const snakeBody = {
        tail: snakeLength.slice(1, -1),
        head: snakeLength[0],
        ref: useRef(null),
    };

    const repeatIfHitEdge = (pos) => {
        if (pos >= GRID_SIZE) {
            return 0;
        } else if (pos < 0) {
            return GRID_SIZE - 1;
        }
        return pos;
    };

    //snake is running and getting longer when it eats.
    const driveSnakeAndUpdate = useCallback(() => {
        const newHead = {
            x: repeatIfHitEdge(snakeBody.head.x + direction.x),
            y: repeatIfHitEdge(snakeBody.head.y + direction.y),
        };
        if (newHead.x === food.x && newHead.y === food.y) {
            return [newHead, ...snakeLength];
        }
        return [newHead, ...snakeLength.slice(0, -1)];
    }, [
        direction.x,
        direction.y,
        food.x,
        food.y,
        snakeBody.head.x,
        snakeBody.head.y,
        snakeLength,
    ]);

    //we randomly place food on the grid when the snake eats.
    const randomFoodSpawn = useCallback(() => {
        if (snakeBody.head.x === food.x && snakeBody.head.y === food.y) {
            setFood({ x: randomNumber, y: randomNumber });
            incGameScore();
        }
    }, [
        food.x,
        food.y,
        incGameScore,
        randomNumber,
        snakeBody.head.x,
        snakeBody.head.y,
    ]);

    //we reset the game if the snake interact with itself.
    const resetGame = useCallback(() => {
        const eatItSelf = snakeBody.tail.some((s) => {
            return s.x === snakeBody.head.x && s.y === snakeBody.head.y;
        });
        if (eatItSelf) {
            setIsGameOver(true);
            resetGameScore();
            setDirection({ x: 1, y: 0 });
            toggleGame();
        }
    }, [
        resetGameScore,
        snakeBody.head.x,
        snakeBody.head.y,
        snakeBody.tail,
        toggleGame,
    ]);

    //control with keys
    const keysDirection = useCallback(
        (e) => {
            const key = {};
            key[e.keyCode] = true;

            //prevent scrolling when pressing the arrow keys.
            if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                e.preventDefault();
            }

            if (!direction.y) {
                if (key[38]) {
                    setDirection({ x: 0, y: -1 });
                }
                if (key[40]) {
                    setDirection({ x: 0, y: 1 });
                }
            }

            if (!direction.x) {
                if (key[37]) {
                    setDirection({ x: -1, y: 0 });
                }
                if (key[39]) {
                    setDirection({ x: 1, y: 0 });
                }
            }
        },
        [direction.x, direction.y]
    );

    //control with touch
    const touchDirection = useCallback(
        (e) => {
            if (!snakeBody.ref.current || !snakeBody.ref) {
                return;
            }
            const { left, top } = snakeBody.ref.current.getBoundingClientRect();
            const snakePos = { x: e.clientX - left, y: e.clientY - top };

            const isMovingOnYAxis = direction.y === 1 || direction.y === -1;
            const isMovingOnXAxis = direction.x === 1 || direction.x === -1;

            if (isMovingOnYAxis) {
                if (snakePos.x < 0) {
                    setDirection({ x: -1, y: 0 });
                }
                if (snakePos.x > 0) {
                    setDirection({ x: 1, y: 0 });
                }
            }

            if (isMovingOnXAxis) {
                if (snakePos.y < 0) {
                    setDirection({ x: 0, y: -1 });
                }
                if (snakePos.y > 0) {
                    setDirection({ x: 0, y: 1 });
                }
            }
        },
        [direction.x, direction.y, snakeBody.ref]
    );

    // listeners
    useEffect(() => {
        window.addEventListener("keydown", keysDirection);
        return () => window.removeEventListener("keydown", keysDirection);
    }, [keysDirection]);

    useEffect(() => {
        window.addEventListener("resize", placeCursorOnFood);
    }, [placeCursorOnFood]);

    // run game functions
    useEffect(() => {
        if (isGameShowing) placeCursorOnFood();
    }, [isGameShowing, placeCursorOnFood]);

    useEffect(() => {
        if (gameScore) placeCursorOnFood();
    }, [gameScore, placeCursorOnFood]);

    useEffect(() => void resetGame(), [resetGame]);
    useEffect(() => void randomFoodSpawn(), [randomFoodSpawn]);
    useEffect(() => void resetGameScore(), [resetGameScore]);
    useInterval(
        () => {
            setSnakeLength(() => driveSnakeAndUpdate());
        },
        isGameOver ? null : 80
    );

    return (
        <SnakeGameStyles placeCursorOnFood={placeCursorOnFood}>
            <div onClick={touchDirection} className="game-content">
                {[...Array(GRID_SIZE).keys()].map((y) => (
                    <div className="game-content__col no-touch" key={y}>
                        {[...Array(GRID_SIZE).keys()].map((x) => (
                            <div className="game-content__row no-touch" key={x}>
                                {(() => {
                                    if (x === food.x && y === food.y) {
                                        return (
                                            <div
                                                ref={foodRef}
                                                className="game-content__food no-touch"
                                            />
                                        );
                                    }
                                    for (const s of snakeLength) {
                                        if (x === s.x && y === s.y) {
                                            return (
                                                <div
                                                    ref={snakeBody.ref}
                                                    className="game-content__snake no-touch"
                                                />
                                            );
                                        }
                                    }
                                })()}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </SnakeGameStyles>
    );
};

const SnakeGameStyles = styled.div`
    .game-content {
        position: relative;
        overflow: hidden;
        border: 1px solid ${({ theme }) => theme.colorLine};
        background: ${({ theme }) => theme.colorBackground};

        &.no-touch {
            pointer-events: none;
            user-select: none;
        }

        &__col {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &__row {
            height: 1.6rem;
            width: 1.6rem;
            @media (max-width: ${SIZE.smallMobile}px) {
                width: 3.1vw;
                height: 3.1vw;
            }
        }
        &__food {
            transform-origin: center;
            height: 100%;
            width: 100%;
        }

        &__snake {
            background: ${({ theme }) => theme.colorSecondary};
            height: 100%;
            width: 100%;
            position: relative;
            z-index: 1;
        }
    }
`;

export default SnakeGame;
