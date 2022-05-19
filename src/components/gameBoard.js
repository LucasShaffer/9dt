import React, { useContext } from 'react';
import Token from './token';
import { GameContext } from '../context/context';

export default function GameBoard() {
  const game = useContext(GameContext);
  return (
    <>
      <div style={{border: '4px solid dodgerblue', background: 'yellow', borderTop: 'none', height: 'fit-content'}}>
        {
          game.board.map((row) => {
            return (
              <div>
                {
                  row.map((col) => {
                    return <Token color={col} />
                  })
                }
              </div>
            )
          })
        }
      </div>
    </>
  );
}
