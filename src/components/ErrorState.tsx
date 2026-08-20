import React from 'react';
import { SearchX } from 'lucide-react';
import styles from './ErrorState.module.css';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Pokémon not found. Try searching for another Pokémon.',
  onRetry
}) => (
  <div className={styles['error-container']}>
    <div style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
      <SearchX size={48} />
    </div>
    <h3>No Pokémon Found</h3>
    <p>{message}</p>
    {onRetry && <button onClick={onRetry}>Reset Search</button>}
  </div>
);
