// Tic-Tac-Toe Game Logic

const PLAYER_X = 'X';
const PLAYER_O = 'O';
const EMPTY = '';

class TicTacToe {
    constructor() {
        this.board = Array(9).fill(EMPTY);
        this.currentPlayer = PLAYER_X;
    }

    makeMove(index) {
        if (this.board[index] === EMPTY) {
            this.board[index] = this.currentPlayer;
            this.currentPlayer = this.currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
            return true;
        }
        return false;
    }

    checkWin() {
        const winConditions = [
            // Rows
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            // Columns
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            // Diagonals
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (this.board[a] !== EMPTY && 
                    this.board[a] === this.board[b] && 
                    this.board[a] === this.board[c]) {
                return this.board[a];
            }
        }
        return null;
    }

    checkDraw() {
        return this.board.every(cell => cell !== EMPTY) && !this.checkWin();
    }

    getGameStatus() {
        const winner = this.checkWin();
        if (winner) return `Player ${winner} wins!`;
        if (this.checkDraw()) return "It's a draw!";
        return `Player ${this.currentPlayer}'s turn`;
    }

    reset() {
        this.board = Array(9).fill(EMPTY);
        this.currentPlayer = PLAYER_X;
    }
}

// Usage
const game = new TicTacToe();

// DOM integration: make grid clickable and show current player
function updateUI() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, idx) => {
        const value = game.board[idx];
        cell.textContent = value;
        cell.disabled = value !== EMPTY;
    });

    const statusEl = document.getElementById('status');
    statusEl.textContent = game.getGameStatus();
}

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            const index = parseInt(cell.dataset.index, 10);
            if (game.checkWin() || game.checkDraw()) return;
            const moved = game.makeMove(index);
            if (!moved) return;
            updateUI();
        });
    });

    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            game.reset();
            updateUI();
        });
    }

    updateUI();
});