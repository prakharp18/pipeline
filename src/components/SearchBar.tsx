import React from 'react';
import { Heart, Sun, Moon } from 'lucide-react';
import type { SortOption } from '../types/pokemon';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortBy: SortOption;
  setSortBy: (s: SortOption) => void;
  darkMode: boolean;
  setDarkMode: (d: boolean) => void;
  showFavsOnly: boolean;
  setShowFavsOnly: (f: boolean) => void;
  favoritesCount: number;
}

const PokeBallBadge: React.FC = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12H7.05C7.53 9.71 9.56 8 12 8C14.44 8 16.47 9.71 16.95 12H22C22 6.48 17.52 2 12 2Z" fill="#ef4444" />
    <path d="M12 22C17.52 22 22 17.52 22 12H16.95C16.47 14.29 14.44 16 12 16C9.56 16 7.53 14.29 7.05 12H2C2 17.52 6.48 22 12 22Z" fill="currentColor" opacity="0.85" />
    <circle cx="12" cy="12" r="3.2" fill="var(--white)" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="1.3" fill="#ef4444" />
  </svg>
);

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery, setSearchQuery, sortBy, setSortBy, 
  darkMode, setDarkMode, showFavsOnly, setShowFavsOnly, favoritesCount
}) => (
  <header className={styles['app-header']}>
    <div className={styles['brand-wrap']}>
      <PokeBallBadge />
      <h1>PokéExplorer</h1>
    </div>

    <div className={styles['header-controls']}>
      <div className={styles['search-input-wrapper']}>
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)}>
        <option value="id">Sort: ID</option>
        <option value="name">Sort: Name</option>
        <option value="hp">Sort: HP</option>
        <option value="attack">Sort: Attack</option>
        <option value="speed">Sort: Speed</option>
      </select>

      <button className={styles['header-btn']} onClick={() => setDarkMode(!darkMode)} title="Toggle theme">
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <button
        className={`${styles['header-btn']} ${showFavsOnly ? styles.active : ''}`}
        onClick={() => setShowFavsOnly(!showFavsOnly)}
        title="Show favorites"
      >
        <Heart size={18} fill={showFavsOnly ? '#ef4444' : 'none'} color={showFavsOnly ? '#ef4444' : 'currentColor'} />
        <span className={styles['fav-count']}>{favoritesCount > 0 ? favoritesCount : ''}</span>
      </button>
    </div>
  </header>
);
