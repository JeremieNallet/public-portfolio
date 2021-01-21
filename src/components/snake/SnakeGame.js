import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
//tree
import useInterval from "../../hooks/useInterval";
import { useStore } from "../../../lib/store";
import { SIZE } from "../../constant/mesure";

const GRID_SIZE = 30;

const SnakeGame = ({ placeCursorOnFood, foodRef }) => {
    const [isGameOver, setIsGameOver] = useState(false);
    const resetGameScore = useStore((state) => state.resetGameScore);
    const toggleGame = useStore((state) => state.toggleGame);
    const gameScore = useStore((state) => state.gameScore);
    const incGameScore = useStore((state) => state.incGameScore);
    const isGameShowing = useStore((state) => state.isGameShowing);
    const randomNumber = Math.ceil(Math.random() * GRID_SIZE - 1);
    const [food, setFood] = useState({ x: randomNumber, y: randomNumber });
    const [direction, setDirection] = useState({ x: 1, y: 0 });

    //SNAKE PROPERTIES
    const snakeRef = useRef(null);
    const [snakeLength, setSnakeLength] = useState([
        { x: 8, y: 8 },
        { x: 8, y: 9 },
        { x: 8, y: 10 },
    ]);
    const snakeBody = {
        tail: snakeLength.slice(1, -1),
        head: snakeLength[0],
    };

    //=> FUNCTIONS
    const repeatIfHitBoardEdges = (value) => {
        if (value < 0) return GRID_SIZE - 1;
        else if (value > GRID_SIZE - 1) return 0;
        return value;
    };

    const driveSnake = useCallback(() => {
        const newHead = {
            x: repeatIfHitBoardEdges(snakeBody.head.x) + direction.x,
            y: repeatIfHitBoardEdges(snakeBody.head.y) + direction.y,
        };
        if (newHead.x === food.x && newHead.y === food.y) {
            setSnakeLength((prevState) => [...prevState, newHead]);
        }
        setSnakeLength((prevState) => [newHead, ...prevState.slice(0, -1)]);
    }, [
        direction.x,
        direction.y,
        food.x,
        food.y,
        snakeBody.head.x,
        snakeBody.head.y,
    ]);

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

    const eatItSelf = snakeBody.tail.some((s) => {
        return s.x === snakeBody.head.x && s.y === snakeBody.head.y;
    });

    //=> DIRECTIONS
    const keysDirection = useCallback(
        (e) => {
            //prevent scrolling when pressing the arrow keys.
            if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                e.preventDefault();
            }
            if (!direction.y) {
                if (e.keyCode === 38) {
                    setDirection({ x: 0, y: -1 });
                }
                if (e.keyCode === 40 && direction.y === 0) {
                    setDirection({ x: 0, y: 1 });
                }
            }
            if (!direction.x) {
                if (e.keyCode === 37 && direction.x === 0) {
                    setDirection({ x: -1, y: 0 });
                }
                if (e.keyCode === 39 && direction.x === 0) {
                    setDirection({ x: 1, y: 0 });
                }
            }
        },
        [direction.x, direction.y]
    );

    const touchDirection = useCallback(
        (e) => {
            if (!snakeRef.current || !snakeRef) {
                return;
            }
            const { left, top } = snakeRef.current.getBoundingClientRect();
            const pos = { x: e.clientX - left, y: e.clientY - top };
            if (direction.y === 1 || direction.y === -1) {
                if (pos.x < 0) {
                    setDirection({ x: -1, y: 0 });
                } else if (pos.x > 0) {
                    setDirection({ x: 1, y: 0 });
                }
            }
            if (direction.x === 1 || direction.x === -1) {
                if (pos.y < 0) {
                    setDirection({ x: 0, y: -1 });
                } else if (pos.y > 0) {
                    setDirection({ x: 0, y: 1 });
                }
            }
        },
        [direction.x, direction.y]
    );

    useEffect(() => {
        window.addEventListener("keydown", keysDirection);
        return () => window.removeEventListener("keydown", keysDirection);
    }, [keysDirection]);

    //INIT
    useEffect(() => {
        if (eatItSelf) {
            setIsGameOver(true);
            resetGameScore();
            setDirection({ x: 1, y: 0 });
            toggleGame();
        }
    }, [eatItSelf, resetGameScore, toggleGame]);

    useEffect(() => {
        if (isGameShowing) placeCursorOnFood();
    }, [isGameShowing, placeCursorOnFood]);

    useEffect(() => {
        if (gameScore) placeCursorOnFood();
    }, [gameScore, placeCursorOnFood]);

    useEffect(() => {
        window.addEventListener("resize", placeCursorOnFood);
    }, [placeCursorOnFood]);

    useEffect(() => void randomFoodSpawn(), [randomFoodSpawn]);

    useEffect(() => void resetGameScore(), [resetGameScore]);

    useInterval(
        () => {
            driveSnake();
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
                                                    ref={snakeRef}
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
