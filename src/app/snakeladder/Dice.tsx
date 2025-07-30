import { useState } from 'react';
import styles from './page.module.css';

interface DiceProps {
  value: number;
  onRoll: () => void;
  disabled: boolean;
}

export default function Dice({ value, onRoll, disabled }: DiceProps) {
  const [rolling, setRolling] = useState(false);

  const handleClick = () => {
    if (disabled || rolling) return;
    setRolling(true);
    onRoll();
    
    // Simulate rolling animation
    setTimeout(() => setRolling(false), 600);
  };

  return (
    <div className={styles.diceContainer}>
      <div 
        className={`${styles.dice} ${rolling ? styles.rolling : ''}`} 
        onClick={handleClick}
        data-disabled={disabled || rolling}
      >
        {[1, 2, 3, 4, 5, 6].map(num => (
          <div 
            key={num} 
            className={`${styles.diceFace} ${value === num ? styles.active : ''}`}
          >
            {Array(num).fill(0).map((_, i) => (
              <span key={i} className={styles.diceDot}></span>
            ))}
          </div>
        ))}
      </div>
      <button 
        className={styles.rollButton} 
        onClick={handleClick}
        disabled={disabled || rolling}
      >
        {rolling ? 'Rolling...' : 'Roll Dice'}
      </button>
    </div>
  );
}