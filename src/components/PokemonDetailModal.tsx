import React, { useEffect } from 'react';
import { X, Heart } from 'lucide-react';
import { PokemonDetail } from '../types/pokemon';
import { getTypeColor, formatPokemonId, capitalize } from '../utils/colors';

interface PokemonDetailModalProps {
  pokemon: PokemonDetail | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export const PokemonDetailModal: React.FC<PokemonDetailModalProps> = ({
  pokemon,
  onClose,
  isFavorite,
  onToggleFavorite
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!pokemon) return null;

  const primaryType = pokemon.types[0]?.type.name || 'normal';
  const typeColors = getTypeColor(primaryType);
  const image =
    pokemon.sprites.other['official-artwork'].front_default ||
    pokemon.sprites.front_default;

  const maxStat = 255;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <div
          className="modal-header-bg"
          style={{ backgroundColor: `${typeColors.bg}22` }}
        >
          <img src={image} alt={pokemon.name} className="modal-pokemon-img" />
          <h2 className="pokemon-name" style={{ fontSize: '1.6rem' }}>
            {capitalize(pokemon.name)}{' '}
            <span style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
              {formatPokemonId(pokemon.id)}
            </span>
          </h2>

          <div className="badge-group" style={{ marginTop: '0.5rem' }}>
            {pokemon.types.map((t) => {
              const c = getTypeColor(t.type.name);
              return (
                <span
                  key={t.type.name}
                  className="type-badge"
                  style={{ backgroundColor: c.bg, color: c.text }}
                >
                  {t.type.name}
                </span>
              );
            })}
          </div>
        </div>

        <div className="modal-body">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '1.5rem'
            }}
          >
            <button
              className="btn-primary"
              style={{
                backgroundColor: isFavorite ? '#ef4444' : 'var(--primary)',
                padding: '0.5rem 1.2rem',
                fontSize: '0.85rem'
              }}
              onClick={() => onToggleFavorite(pokemon.id)}
            >
              <Heart size={16} fill={isFavorite ? 'white' : 'none'} />
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>

          <div className="detail-section">
            <div className="info-grid">
              <div>
                <div className="info-label">Height</div>
                <div className="info-value">{pokemon.height / 10} m</div>
              </div>
              <div>
                <div className="info-label">Weight</div>
                <div className="info-value">{pokemon.weight / 10} kg</div>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h4 className="section-title">Abilities</h4>
            <div className="badge-group" style={{ justifyContent: 'flex-start' }}>
              {pokemon.abilities.map((a) => (
                <span
                  key={a.ability.name}
                  className="type-badge"
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  {capitalize(a.ability.name)} {a.is_hidden && '(Hidden)'}
                </span>
              ))}
            </div>
          </div>

          <div className="detail-section">
            <h4 className="section-title">Base Stats</h4>
            {pokemon.stats.map((s) => {
              const percent = Math.min(100, (s.base_stat / maxStat) * 100);
              return (
                <div key={s.stat.name} className="stat-row">
                  <span className="stat-name">{s.stat.name.replace('-', ' ')}</span>
                  <span className="stat-val">{s.base_stat}</span>
                  <div className="stat-bar-bg">
                    <div
                      className="stat-bar-fill"
                      style={{
                        width: `${percent}%`,
                        backgroundColor: typeColors.bg
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="detail-section">
            <h4 className="section-title">Moves (Sample)</h4>
            <div className="badge-group" style={{ justifyContent: 'flex-start' }}>
              {pokemon.moves.slice(0, 6).map((m) => (
                <span
                  key={m.move.name}
                  className="type-badge"
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  {capitalize(m.move.name)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
