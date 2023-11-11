import React, { useState, useEffect, useRef } from 'react';

const canvasSize = 400;
const cellSize = 20;
const canvasCells = canvasSize / cellSize;

function getRandomCoordinate() {
    return Math.floor(Math.random() * canvasCells) * cellSize;
}

const SnakeGame = () => {
    const canvasRef = useRef(null);
    const [snake, setSnake] = useState([{ x: canvasSize / 2, y: canvasSize / 2 }]);
    const [food, setFood] = useState({ x: getRandomCoordinate(), y: getRandomCoordinate() });
    const [dir, setDir] = useState({ x: 0, y: -cellSize });
    const [lastTouch, setLastTouch] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleKeydown = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    if (dir.y === 0) setDir({ x: 0, y: -cellSize });
                    break;
                case 'ArrowDown':
                    if (dir.y === 0) setDir({ x: 0, y: cellSize });
                    break;
                case 'ArrowLeft':
                    if (dir.x === 0) setDir({ x: -cellSize, y: 0 });
                    break;
                case 'ArrowRight':
                    if (dir.x === 0) setDir({ x: cellSize, y: 0 });
                    break;
                default:
                    break;
            }
        };

        const gameLoop = setInterval(() => {
            let newSnake = snake.map((s) => ({ ...s })); 
            let head = Object.assign({}, newSnake[0]);

            head.x += dir.x;
            head.y += dir.y;

            if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize || snake.some(s => s.x === head.x && s.y === head.y)) {
                // End game and reset snake
                setSnake([{ x: canvasSize / 2, y: canvasSize / 2 }]);
                setDir({ x: 0, y: -cellSize });
                return;
            }

            newSnake = [head, ...newSnake];
            newSnake.pop();

            if (head.x === food.x && head.y === food.y) {
                let tail = { ...snake[snake.length - 1] };
                newSnake.push(tail);
                setFood({ x: getRandomCoordinate(), y: getRandomCoordinate() });
            }

            setSnake(newSnake);
            drawCanvas();
        }, 100);

        drawCanvas();

        window.addEventListener('keydown', handleKeydown);

        return () => {
            clearInterval(gameLoop);
            window.removeEventListener('keydown', handleKeydown);
        };
    }, [snake, dir]);

    const drawCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        snake.forEach(s => {
            ctx.fillStyle = 'green';
            ctx.fillRect(s.x, s.y, cellSize, cellSize);
        });

        ctx.fillStyle = 'red';
        ctx.fillRect(food.x, food.y, cellSize, cellSize);
    };

    const handleTouchStart = (e) => {
        const firstTouch = e.touches[0];
        setLastTouch({ x: firstTouch.clientX, y: firstTouch.clientY });
    };

    const handleTouchMove = (e) => {
        const touch = e.touches[0];
        const deltaX = touch.clientX - lastTouch.x;
        const deltaY = touch.clientY - lastTouch.y;

        if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0 && dir.x === 0) {
            setDir({ x: cellSize, y: 0 });
        } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0 && dir.x === 0) {
            setDir({ x: -cellSize, y: 0 });
        } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0 && dir.y === 0) {
            setDir({ x: 0, y: cellSize });
        } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0 && dir.y === 0) {
            setDir({ x: 0, y: -cellSize });
        }

        e.preventDefault();
    };

    const styles = {
        border: '5px solid rgba(0.125, 0.25, 0.5, 0.75)',
    };

    return (
        <canvas
            style={styles}
            ref={canvasRef}
            width={canvasSize}
            height={canvasSize}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
        />
    );
};

export default SnakeGame;
