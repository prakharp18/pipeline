import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { PokemonDetail } from '../types/pokemon';
import { capitalize, formatPokemonId } from '../utils/colors';

interface CompareModalProps {
  pokemonList: PokemonDetail[];
  onClose: () => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({ pokemonList, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (pokemonList.length < 2) return null;

  const [p1, p2] = pokemonList;

  const getStat = (pokemon: PokemonDetail, statName: string) => {
    const found = pokemon.stats.find((s) => s.stat.name === statName);
    return found ? found.base_stat : 0;
  };

  const statsToCompare = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: '650px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-body" style={{ paddingTop: '2.5rem' }}>
          <h2 className="section-title" style={{ textAlign: 'center', fontSize: '1.4rem' }}>
            Pokémon Comparison
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              textAlign: 'center',
              margin: '1.5rem 0'
            }}
          >
            {[p1, p2].map((p) => (
              <div key={p.id} style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '12px' }}>
                <img
                  src={p.sprites.other['official-artwork'].front_default || p.sprites.front_default}
                  alt={p.name}
                  style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                />
                <h3 style={{ textTransform: 'capitalize', margin: '0.5rem 0 0.25rem' }}>
                  {capitalize(p.name)}
                </h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {formatPokemonId(p.id)}
                </span>
              </div>
            ))}
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                <th style={{ padding: '0.5rem', color: 'var(--text-secondary)' }}>Stat</th>
                <th style={{ padding: '0.5rem', textAlign: 'center' }}>{capitalize(p1.name)}</th>
                <th style={{ padding: '0.5rem', textAlign: 'center' }}>{capitalize(p2.name)}</th>
              </tr>
            </thead>
            <tbody>
              {statsToCompare.map((stat) => {
                const val1 = getStat(p1, stat);
                const val2 = getStat(p2, stat);
                const isVal1Better = val1 > val2;
                const isVal2Better = val2 > val1;

                return (
                  <tr key={stat} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.75rem 0.5rem', textTransform: 'capitalize' }}>
                      {stat.replace('-', ' ')}
                    </td>
                    <td
                      style={{
                        padding: '0.75rem 0.5rem',
                        textAlign: 'center',
                        fontWeight: isVal1Better ? 700 : 400,
                        color: isVal1Better ? '#10b981' : 'inherit'
                      }}
                    >
                      {val1}
                    </td>
                    <td
                      style={{
                        padding: '0.75rem 0.5rem',
                        textAlign: 'center',
                        fontWeight: isVal2Better ? 700 : 400,
                        color: isVal2Better ? '#10b981' : 'inherit'
                      }}
                    >
                      {val2}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
