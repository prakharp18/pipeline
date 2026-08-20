import React, { useEffect } from 'react';
import type { PokemonDetail } from '../types/pokemon';
import { getTypeTheme, formatId, capitalize } from '../utils/colors';
import { Heart, X, Ruler, Weight } from 'lucide-react';
import styles from './PokemonModal.module.css';

interface Props {
  pokemon: PokemonDetail | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export const PokemonModal: React.FC<Props> = ({ pokemon, onClose, isFavorite, onToggleFavorite }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!pokemon) return null;

  const primary = pokemon.types[0]?.type.name || 'normal';
  const theme = getTypeTheme(primary);
  const img = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;

  return (
    <div className={styles['modal-backdrop']} onClick={onClose}>
      <div className={styles['pm-modal']} onClick={(e) => e.stopPropagation()}>
        <div className={styles['pm-header']} style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}>
          <div className={styles['pm-top-bar']}>
            <span className={styles['pm-id']}>{formatId(pokemon.id)}</span>
            <button onClick={onClose} style={{ color: theme.badgeText, background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <X size={16} />
            </button>
          </div>
          
          <img src={img} alt={pokemon.name} className={styles['pm-img']} />
        </div>

        <div className={styles['pm-body']}>
          <h2 className={styles['pm-name']}>{capitalize(pokemon.name)}</h2>
          
          <div className={styles['pm-tags']}>
            {pokemon.types.map((t) => {
              const tt = getTypeTheme(t.type.name);
              return (
                <span key={t.type.name} className="poke-tag" style={{ background: tt.badgeBg, color: tt.badgeText, padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {t.type.name}
                </span>
              );
            })}
          </div>

          <button
            onClick={() => onToggleFavorite(pokemon.id)}
            className={`${styles['pm-fav-btn']} ${isFavorite ? styles.active : styles.inactive}`}
          >
            <Heart size={18} fill={isFavorite ? '#ffffff' : 'none'} color={isFavorite ? '#ffffff' : 'currentColor'} />
            {isFavorite ? 'Remove' : 'Favorite'}
          </button>

          <div className={styles['pm-grid']}>
            <div className={styles['pm-stat-box']}>
              <div className={styles['pm-stat-label']}><Weight size={14} /> Weight</div>
              <div className={styles['pm-stat-val']}>{(pokemon.weight / 10).toFixed(1)} kg</div>
            </div>
            <div className={styles['pm-stat-box']}>
              <div className={styles['pm-stat-label']}><Ruler size={14} /> Height</div>
              <div className={styles['pm-stat-val']}>{(pokemon.height / 10).toFixed(1)} m</div>
            </div>
          </div>

          <div className={styles['pm-section']}>
            <h4 className={styles['pm-section-title']} style={{ color: theme.badgeBg }}>Base Stats</h4>
            <div className={styles['pm-stats-grid']}>
              {pokemon.stats.map((s) => {
                const pct = Math.min(100, (s.base_stat / 255) * 100);
                const statName = s.stat.name.replace('special-', 'Sp. ');
                return (
                  <div key={s.stat.name} className={styles['pm-stat-row']}>
                    <span className={styles['pm-stat-name']}>{statName}</span>
                    <span className={styles['pm-stat-num']}>{s.base_stat}</span>
                    <div className={styles['pm-stat-bar-bg']}>
                      <div className={styles['pm-stat-bar-fill']} style={{ width: `${pct}%`, backgroundColor: theme.badgeBg }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles['pm-section']}>
            <h4 className={styles['pm-section-title']} style={{ color: theme.badgeBg }}>Abilities</h4>
            <div className={styles['pm-abilities']}>
              {pokemon.abilities.map((a) => (
                <span key={a.ability.name} className={styles['pm-ability']}>
                  {capitalize(a.ability.name)} {a.is_hidden && <span style={{ opacity: 0.6, fontSize: '0.75rem' }}>(Hidden)</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
