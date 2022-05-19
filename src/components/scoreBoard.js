import React, { useContext, useState } from 'react';
import { GameContext } from '../context/context';
import Token from './token';

export default function ScoreBoard() {
  let messageColor = 'black';
  const game = useContext(GameContext);
  if (game.message.includes('winner')) {
    messageColor = 'green';
  } else if (game.message.includes('draw')) {
    messageColor = 'blue';
  } else {
    messageColor = 'red';
  }
  const buttonStyle = {
    backgroundColor: '#007bff',
    margin: '4px',
    color: 'white',
    border: 'none',
    padding: '4px 16px',
    borderRadius: 3
  }
  const tokenStyle = {
    background: 'none',
    border: 'none'
  }
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <h1>9DT!</h1>
      { game.message &&
        <h3 style={{color: `${messageColor}`}}>{game.message}</h3>
      }
      { game.playerColor === null && game.currentPlayer === null &&
        <>
          <p>Would you like to be red or blue?</p>
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <button style={tokenStyle} onClick={() => game.setPlayerColor('red')}><Token color={'red'} /></button>
            <button style={tokenStyle} onClick={() => game.setPlayerColor('blue')}><Token color={'blue'} /></button>
          </div>
        </>
      }
      { game.playerColor && game.currentPlayer === null &&
        <>
          <p>Would you like to go first or second?</p>
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <button style={buttonStyle} onClick={() => game.setFirstPlayer('first')}>First</button>
            <button style={buttonStyle} onClick={() => game.setFirstPlayer('second')}>Second</button>
          </div>
        </>
      }
      { game.playerColor && game.currentPlayer && !game.message.includes('winner') && !game.message.includes('draw') &&
        <>
          <p>Which column would you like to play?</p>
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <button style={buttonStyle} onClick={(e) => game.updateBoard(0)}>1</button>
            <button style={buttonStyle} onClick={(e) => game.updateBoard(1)}>2</button>
            <button style={buttonStyle} onClick={(e) => game.updateBoard(2)}>3</button>
            <button style={buttonStyle} onClick={(e) => game.updateBoard(3)}>4</button>
          </div>
        </>
      }
      { (game.message.includes('winner') || game.message.includes('draw')) &&
        <>
          <p>Would you like to play again?</p>
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <button style={buttonStyle} onClick={(e) => game.resetGame()}>Yes</button>
          </div>
        </>
      }
      <h2>Score</h2>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
        <p>Player: {game.score.player}</p>
        <p>Computer: {game.score.computer}</p>
        <p>Draw: {game.score.draw}</p>
      </div>
    </div>
  );
}
