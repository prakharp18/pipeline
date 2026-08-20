import React from 'react';
import { PokemonCard } from './PokemonCard';
import styles from './PokemonGrid.module.css';
import type { PokemonDetail } from '../types/pokemon';

interface PokemonGridProps {
  pokemons: PokemonDetail[];
  isFavorite: (id: number) => boolean;
  onToggleFavorite: (id: number) => void;
  onSelect: (p: PokemonDetail) => void;
  compareList: PokemonDetail[];
  onToggleCompare: (p: PokemonDetail) => void;
}

export const PokemonGrid: React.FC<PokemonGridProps> = ({
  pokemons, isFavorite, onToggleFavorite, onSelect, compareList, onToggleCompare
}) => (
  <div className={styles['poke-grid']}>
    {pokemons.map((p) => (
      <PokemonCard
        key={p.id}
        pokemon={p}
        isFavorite={isFavorite(p.id)}
        onToggleFavorite={onToggleFavorite}
        onSelect={onSelect}
        isComparingSelected={compareList.some((c) => c.id === p.id)}
        onToggleCompare={onToggleCompare}
      />
    ))}
  </div>
);
