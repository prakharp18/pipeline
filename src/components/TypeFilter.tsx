import React from 'react';
import { getTypeTheme } from '../utils/colors';
import styles from './TypeFilter.module.css';

interface TypeFilterProps {
  types: string[];
  selectedType: string;
  onTypeChange: (type: string) => void;
}

export const TypeFilter: React.FC<TypeFilterProps> = ({ types, selectedType, onTypeChange }) => (
  <div className={styles['type-filter-bar']}>
      <button
        className={`${styles['filter-pill']} ${selectedType === '' ? styles.selected : ''}`}
        style={{ background: '#1a1a2e', color: '#fff' }}
        onClick={() => onTypeChange('')}
      >
        All
      </button>
      {types.slice(0, 8).map((type) => {
        const theme = getTypeTheme(type);
        return (
          <button
            key={type}
            className={`${styles['filter-pill']} ${selectedType === type ? styles.selected : ''}`}
            style={{ background: theme.bg, color: theme.text }}
            onClick={() => onTypeChange(type)}
          >
          {type}
        </button>
      );
    })}
  </div>
);
