import { useEffect, useState } from 'react';
import './App.css';
import GameBoard from './components/gameBoard';
import ScoreBoard from './components/scoreBoard';
import Token from './components/token';
import { GameContext } from './context/context';


function App() {
  const [board, setBoard] = useState([
    ['grey','grey','grey','grey'],
    ['grey','grey','grey','grey'],
      ['grey','grey','grey','grey'],
      ['grey','grey','grey','grey']
    ]);
  const [moves, setMoves] = useState([]);
  const [message, setMessage] = useState('');
  const [playerColor, setPlayerColor] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [score, setScore] = useState({
    player: 0,
    computer: 0,
    draw: 0
  });
  useEffect(() => {
    if (currentPlayer !== null) {
      let winner = checkForWin(moves[moves.length - 1]);
      if (winner) {
        let winnerColor = currentPlayer === 'red' ? 'blue' : 'red';
        setMessage(`The winner is ${winnerColor}!!`);
        if (playerColor === winnerColor) {
          let newScore = score;
          newScore['player'] = score['player'] + 1;
          setScore(newScore);
        } else {
          let newScore = score;
          newScore['computer'] = score['computer'] + 1;
          setScore(newScore);
        }
      } else {
        if (!board[0].includes('grey')) {
          setMessage('There was a draw.');
          let newScore = score;
          newScore['draw'] = score['draw'] + 1;
          setScore(newScore);
        }
      }
      if (currentPlayer !== playerColor && !winner) {
        fetch(`https://w0ayb2ph1k.execute-api.us-west-2.amazonaws.com/production?moves=[${moves}]`)
        .then(res => res.json())
        .then(data => updateBoard(data[data.length - 1]))
      }
    }
  }, [currentPlayer]);
  function checkForWin(col) {
    let player1 = ['red', 'red', 'red', 'red'];
    let player2 = ['blue', 'blue', 'blue', 'blue'];
    let row = -1
    for (let i = 0; i < board.length; i++) {
      if (board[i][col] !== 'grey') {
        row = i;
        break;
      }
    }
    if (board[row].join() === player1.join() || board[row].join() === player2.join()) {
      return true;
    }
    let colArr = [];
    for (let i = 0; i < board.length; i++) {
      colArr.push(board[i][col])
    }
    if (colArr.join() === player1.join() || colArr.join() === player2.join()) {
      return true;
    }
    let diagonal1 = [board[0][0], board[1][1], board[2][2], board[3][3]];
    if (diagonal1.join() === player1.join() || diagonal1.join() === player2.join()) {
      return true;
    }
    let diagonal2 = [board[0][3], board[1][2], board[2][1], board[3][0]];
    if (diagonal2.join() === player1.join() || diagonal2.join() === player2.join()) {
      return true;
    }
    return false;
  }
  function updateBoard(col) {
    setMessage('');
    let row = board.length - 1;
    for (let i = 0; i < board.length; i++) {
      if (board[i][col] !== 'grey') {
        row--;
      }
    }
    if (row === -1) {
      setMessage('That column is full, please pick another column.');
      return;
    } else {
      let tempBoard = board.map((row) => {
        return row.slice();
      });
      tempBoard[row][col] = currentPlayer;
      setBoard(tempBoard);
    }
    let nextPlayer = currentPlayer === 'red' ? 'blue' : 'red';
    setCurrentPlayer(nextPlayer);
    setMoves([...moves, col])
  }

  function setFirstPlayer(turn) {
    let computerColor = playerColor === 'red' ? 'blue' : 'red';
    let player = turn === 'first' ? playerColor : computerColor;
    setCurrentPlayer(player);
  }
  function resetGame() {
    setBoard([
    ['grey','grey','grey','grey'],
    ['grey','grey','grey','grey'],
      ['grey','grey','grey','grey'],
      ['grey','grey','grey','grey']
    ]);
    setMessage('');
    setMoves([]);
    setPlayerColor(null);
    setCurrentPlayer(null);
  }
  return (
    <GameContext.Provider value={{board, moves, setMoves, message, updateBoard, currentPlayer, setCurrentPlayer, playerColor, setPlayerColor, setFirstPlayer, resetGame, score}}>
      <div className="App" style={{display: 'flex', justifyContent: 'space-around'}}>
        <GameBoard />
        <div>
          <p>You are the color:</p>
          <Token color={playerColor} />
        </div>
        <ScoreBoard />
      </div>
    </GameContext.Provider>
  );
}

export default App;
