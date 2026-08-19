import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Pokémon not found. Try searching for another name or ID.',
  onRetry
}) => {
  return (
    <div className="error-box">
      <AlertCircle size={40} color="#ef4444" />
      <h3 className="error-title">No Pokémon Found</h3>
      <p className="error-text">{message}</p>
      {onRetry && (
        <button className="btn-primary" onClick={onRetry}>
          Reset Search
        </button>
      )}
    </div>
  );
};
