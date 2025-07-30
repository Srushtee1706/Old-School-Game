import styles from './page.module.css';

interface BoardProps {
  players: any[];
  snakes: [number, number][];
  ladders: [number, number][];
}

export default function Board({ players, snakes, ladders }: BoardProps) {
  const tiles = Array(100).fill(0).map((_, i) => i + 1);
  
  // Function to calculate board position
  const getPosition = (tile: number) => {
    const row = 9 - Math.floor((tile - 1) / 10);
    const isReversed = row % 2 !== 0;
    const col = isReversed ? 9 - ((tile - 1) % 10) : (tile - 1) % 10;
    return { row, col };
  };

  return (
    <div className={styles.board}>
      {tiles.map(tile => {
        const { row, col } = getPosition(tile);
        const style = {
          gridRow: row + 1,
          gridColumn: col + 1,
        };
        
        return (
          <div key={tile} className={styles.tile} style={style}>
            <div className={styles.tileNumber}>{tile}</div>
            
            {/* Render snakes */}
            {snakes.map(([head, tail], idx) => (
              head === tile && (
                <div key={`snake-${idx}`} className={styles.snakeHead}>🐍</div>
              )
            ))}
            
            {/* Render ladders */}
            {ladders.map(([bottom, top], idx) => (
              bottom === tile && (
                <div key={`ladder-${idx}`} className={styles.ladderBottom}>🪜</div>
              )
            ))}
            
            {/* Render player tokens */}
            {players.map(player => (
              player.position === tile && (
                <div 
                  key={`player-${player.id}`} 
                  className={styles.playerToken}
                  style={{ backgroundColor: player.color }}
                >
                  {player.id}
                </div>
              )
            ))}
          </div>
        );
      })}
    </div>
  );
}