import React from 'react';
import { Heart } from 'lucide-react';
import { PokemonDetail } from '../types/pokemon';
import { getTypeColor, formatPokemonId, capitalize } from '../utils/colors';

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
  const primaryType = pokemon.types[0]?.type.name || 'normal';
  const typeColors = getTypeColor(primaryType);

  const mainImage =
    pokemon.sprites.other['official-artwork'].front_default ||
    pokemon.sprites.front_default;

  return (
    <div className="pokemon-card" onClick={() => onSelect(pokemon)}>
      {onToggleCompare && (
        <input
          type="checkbox"
          className="compare-checkbox"
          checked={isComparingSelected || false}
          onChange={(e) => {
            e.stopPropagation();
            onToggleCompare(pokemon);
          }}
          onClick={(e) => e.stopPropagation()}
          title="Select to compare"
        />
      )}

      <div className="card-top">
        <span className="pokemon-id">{formatPokemonId(pokemon.id)}</span>
        <button
          className={`fav-btn ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(pokemon.id);
          }}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={18} fill={isFavorite ? '#ef4444' : 'none'} />
        </button>
      </div>

      <div className="card-img-wrapper">
        <div
          className="card-img-bg"
          style={{ backgroundColor: typeColors.bg }}
        />
        <img
          src={mainImage}
          alt={pokemon.name}
          className="pokemon-img"
          loading="lazy"
        />
      </div>

      <h3 className="pokemon-name">{capitalize(pokemon.name)}</h3>

      <div className="badge-group">
        {pokemon.types.map((t) => {
          const colors = getTypeColor(t.type.name);
          return (
            <span
              key={t.type.name}
              className="type-badge"
              style={{ backgroundColor: colors.bg, color: colors.text }}
            >
              {t.type.name}
            </span>
          );
        })}
      </div>
    </div>
  );
};
