import React from 'react';
import type { PokemonDetail } from '../types/pokemon';
import { getTypeTheme, formatId, capitalize } from '../utils/colors';
import { Heart } from 'lucide-react';
import styles from './PokemonCard.module.css';

interface PokemonCardProps {
  pokemon: PokemonDetail;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onSelect: (pokemon: PokemonDetail) => void;
  isComparingSelected?: boolean;
  onToggleCompare?: (pokemon: PokemonDetail) => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  isFavorite,
  onToggleFavorite,
  onSelect,
  isComparingSelected,
  onToggleCompare
}) => {
  const img = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;

  return (
    <div
      className={styles['poke-card']}
      onClick={() => onSelect(pokemon)}
    >
      <div className={styles['poke-card-top']}>
        <div className={styles['poke-card-id']}>{formatId(pokemon.id)}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {onToggleCompare && (
            <input
              type="checkbox"
              checked={isComparingSelected || false}
              onChange={(e) => { e.stopPropagation(); onToggleCompare(pokemon); }}
              onClick={(e) => e.stopPropagation()}
              title="Compare"
              style={{ cursor: 'pointer', width: '15px', height: '15px' }}
            />
          )}
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(pokemon.id); }}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className={styles['fav-button']}
          >
            <Heart size={18} fill={isFavorite ? '#ef4444' : 'none'} color={isFavorite ? '#ef4444' : 'currentColor'} />
          </button>
        </div>
      </div>

      <div className={styles['poke-card-center']}>
        <img src={img} alt={pokemon.name} loading="lazy" />
      </div>

      <div className={styles['poke-card-footer']}>
        <div className={styles['poke-card-name']}>{capitalize(pokemon.name)}</div>
        <div className={styles['poke-tags']}>
          {pokemon.types.map((t) => {
            const tt = getTypeTheme(t.type.name);
            return (
              <span key={t.type.name} className={styles['poke-tag']} style={{ backgroundColor: tt.badgeBg, color: tt.badgeText }}>
                {t.type.name}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
