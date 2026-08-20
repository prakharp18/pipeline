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

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery, setSearchQuery, sortBy, setSortBy, 
  darkMode, setDarkMode, showFavsOnly, setShowFavsOnly, favoritesCount
}) => (
  <header className={styles['app-header']}>
    <h1>PokéExplorer</h1>
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

      <button className={styles['header-btn']} onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <button className={`${styles['header-btn']} ${showFavsOnly ? styles.active : ''}`} onClick={() => setShowFavsOnly(!showFavsOnly)}>
        <Heart size={18} fill={showFavsOnly ? 'currentColor' : 'none'} />
        <span className={styles['fav-count']}>{favoritesCount > 0 ? favoritesCount : ''}</span>
      </button>
    </div>
  </header>
);
