import React, { useEffect } from 'react';
import type { PokemonDetail } from '../types/pokemon';
import { capitalize, formatId } from '../utils/colors';
import { X } from 'lucide-react';
import styles from './CompareModal.module.css';

interface Props {
  pokemonList: PokemonDetail[];
  onClose: () => void;
}

export const CompareModal: React.FC<Props> = ({ pokemonList, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (pokemonList.length < 2) return null;
  const [p1, p2] = pokemonList;

  const getStat = (p: PokemonDetail, name: string) =>
    p.stats.find((s) => s.stat.name === name)?.base_stat || 0;

  const stats = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];

  return (
    <div className={styles['modal-backdrop']} onClick={onClose}>
      <div className={styles['compare-modal']} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles['modal-close-btn']}
          onClick={onClose}
          style={{
            position: 'absolute',
            right: '1.5rem',
            top: '1.5rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>
        <h2>Pokémon Comparison</h2>

        <div className={styles['compare-grid']}>
          {[p1, p2].map((p) => (
            <div key={p.id} className={styles['compare-card']}>
              <img
                src={p.sprites.other['official-artwork'].front_default || p.sprites.front_default}
                alt={p.name}
              />
              <h3>{capitalize(p.name)}</h3>
              <span className={styles['compare-id']}>{formatId(p.id)}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem' }}>
          {stats.map((stat) => {
            const v1 = getStat(p1, stat);
            const v2 = getStat(p2, stat);
            const isV1Better = v1 > v2;
            const isV2Better = v2 > v1;
            const maxVal = Math.max(v1, v2, 100);
            const p1Pct = (v1 / maxVal) * 100;
            const p2Pct = (v2 / maxVal) * 100;

            return (
              <div
                key={stat}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 80px 1fr',
                  gap: '1rem',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <span
                    className={styles['compare-stat-val']}
                    style={{ color: isV1Better ? '#22c55e' : 'inherit' }}
                  >
                    {v1}
                  </span>
                  <div className={styles['compare-stat-bar-bg']} style={{ direction: 'rtl' }}>
                    <div
                      className={styles['compare-stat-bar-fill']}
                      style={{
                        width: `${p1Pct}%`,
                        backgroundColor: isV1Better ? '#22c55e' : 'var(--border)'
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'var(--text-muted)'
                  }}
                >
                  {stat.replace('-', ' ')}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <span
                    className={styles['compare-stat-val']}
                    style={{ color: isV2Better ? '#22c55e' : 'inherit' }}
                  >
                    {v2}
                  </span>
                  <div className={styles['compare-stat-bar-bg']}>
                    <div
                      className={styles['compare-stat-bar-fill']}
                      style={{
                        width: `${p2Pct}%`,
                        backgroundColor: isV2Better ? '#22c55e' : 'var(--border)'
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
