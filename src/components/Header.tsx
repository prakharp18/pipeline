import React from 'react';
import { Moon, Sun, Flame, Heart } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
  favoritesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  showFavoritesOnly,
  onToggleFavorites,
  favoritesCount
}) => {
  return (
    <header className="header">
      <div className="logo-group">
        <div className="logo-icon">
          <Flame size={20} />
        </div>
        <h1 className="brand-title">PokéExplorer</h1>
      </div>

      <div className="header-actions">
        <button
          className={`icon-btn ${showFavoritesOnly ? 'active' : ''}`}
          onClick={onToggleFavorites}
          title="Filter Favorites"
          style={showFavoritesOnly ? { backgroundColor: '#fee2e2', color: '#ef4444' } : {}}
        >
          <Heart size={20} fill={showFavoritesOnly ? '#ef4444' : 'none'} />
          {favoritesCount > 0 && (
            <span style={{ marginLeft: '6px', fontWeight: 600, fontSize: '0.85rem' }}>
              {favoritesCount}
            </span>
          )}
        </button>

        <button
          className="icon-btn"
          onClick={onToggleDarkMode}
          title="Toggle Theme"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};
