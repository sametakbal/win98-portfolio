import { createSignal, For, Show } from 'solid-js'
import type { Component } from 'solid-js'
import './Minesweeper.css'

interface Cell {
    isMine: boolean
    isRevealed: boolean
    isFlagged: boolean
    neighborMines: number
}

const Minesweeper: Component = () => {
    const ROWS = 9
    const COLS = 9
    const MINES = 10

    const [board, setBoard] = createSignal<Cell[][]>([])
    const [gameOver, setGameOver] = createSignal(false)
    const [gameWon, setGameWon] = createSignal(false)
    const [minesLeft, setMinesLeft] = createSignal(MINES)

    const initializeBoard = () => {
        const newBoard: Cell[][] = []

        // Create empty board
        for (let i = 0; i < ROWS; i++) {
            newBoard[i] = []
            for (let j = 0; j < COLS; j++) {
                newBoard[i][j] = {
                    isMine: false,
                    isRevealed: false,
                    isFlagged: false,
                    neighborMines: 0
                }
            }
        }

        // Place mines randomly
        let minesPlaced = 0
        while (minesPlaced < MINES) {
            const row = Math.floor(Math.random() * ROWS)
            const col = Math.floor(Math.random() * COLS)
            if (!newBoard[row][col].isMine) {
                newBoard[row][col].isMine = true
                minesPlaced++
            }
        }

        // Calculate neighbor mines
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                if (!newBoard[i][j].isMine) {
                    let count = 0
                    for (let di = -1; di <= 1; di++) {
                        for (let dj = -1; dj <= 1; dj++) {
                            const ni = i + di
                            const nj = j + dj
                            if (ni >= 0 && ni < ROWS && nj >= 0 && nj < COLS && newBoard[ni][nj].isMine) {
                                count++
                            }
                        }
                    }
                    newBoard[i][j].neighborMines = count
                }
            }
        }

        setBoard(newBoard)
        setGameOver(false)
        setGameWon(false)
        setMinesLeft(MINES)
    }

    const revealCell = (row: number, col: number) => {
        if (gameOver() || gameWon()) return

        const currentBoard = board()
        const cell = currentBoard[row][col]

        if (cell.isRevealed || cell.isFlagged) return

        const newBoard = currentBoard.map(r => r.map(c => ({ ...c })))

        if (cell.isMine) {
            // Game over
            newBoard.forEach(r => r.forEach(c => {
                if (c.isMine) c.isRevealed = true
            }))
            setBoard(newBoard)
            setGameOver(true)
            return
        }

        // Reveal cell and flood fill if no neighbor mines
        const reveal = (r: number, c: number) => {
            if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return
            if (newBoard[r][c].isRevealed || newBoard[r][c].isFlagged || newBoard[r][c].isMine) return

            newBoard[r][c].isRevealed = true

            if (newBoard[r][c].neighborMines === 0) {
                for (let di = -1; di <= 1; di++) {
                    for (let dj = -1; dj <= 1; dj++) {
                        reveal(r + di, c + dj)
                    }
                }
            }
        }

        reveal(row, col)
        setBoard(newBoard)
        checkWin(newBoard)
    }

    const toggleFlag = (e: MouseEvent, row: number, col: number) => {
        e.preventDefault()
        if (gameOver() || gameWon()) return

        const currentBoard = board()
        const cell = currentBoard[row][col]

        if (cell.isRevealed) return

        const newBoard = currentBoard.map(r => r.map(c => ({ ...c })))
        newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged

        setBoard(newBoard)
        setMinesLeft(MINES - newBoard.flat().filter(c => c.isFlagged).length)
        checkWin(newBoard)
    }

    const checkWin = (currentBoard: Cell[][]) => {
        const allNonMinesRevealed = currentBoard.every(row =>
            row.every(cell => cell.isMine || cell.isRevealed)
        )
        if (allNonMinesRevealed) {
            setGameWon(true)
        }
    }

    const getCellContent = (cell: Cell) => {
        if (cell.isFlagged) return '🚩'
        if (!cell.isRevealed) return ''
        if (cell.isMine) return '💣'
        if (cell.neighborMines === 0) return ''
        return cell.neighborMines.toString()
    }

    const getCellClass = (cell: Cell) => {
        let className = 'mine-cell'
        if (cell.isRevealed) className += ' revealed'
        if (cell.isMine && cell.isRevealed) className += ' mine'
        if (cell.neighborMines > 0 && cell.isRevealed) className += ` number-${cell.neighborMines}`
        return className
    }

    // Initialize on mount
    if (board().length === 0) {
        initializeBoard()
    }

    return (
        <div class="minesweeper-container">
            <div class="minesweeper-header">
                <div class="mine-counter">{minesLeft().toString().padStart(3, '0')}</div>
                <button class="reset-button" onClick={initializeBoard}>
                    {gameOver() ? '😵' : gameWon() ? '😎' : '🙂'}
                </button>
                <div class="mine-counter">000</div>
            </div>
            <div class="minesweeper-board">
                <For each={board()}>
                    {(row, i) => (
                        <div class="mine-row">
                            <For each={row}>
                                {(cell, j) => (
                                    <button
                                        class={getCellClass(cell)}
                                        onClick={() => revealCell(i(), j())}
                                        onContextMenu={(e) => toggleFlag(e, i(), j())}
                                    >
                                        {getCellContent(cell)}
                                    </button>
                                )}
                            </For>
                        </div>
                    )}
                </For>
            </div>
            <Show when={gameWon()}>
                <div class="game-message">🎉 Kazandınız!</div>
            </Show>
            <Show when={gameOver()}>
                <div class="game-message">💥 Oyun Bitti!</div>
            </Show>
        </div>
    )
}

export default Minesweeper
