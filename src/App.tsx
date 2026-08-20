import { useState, useEffect } from 'react';
import { useNavigate, useMatch } from 'react-router-dom';
import { PokemonGrid } from './components/PokemonGrid';
import { SearchBar } from './components/SearchBar';
import { TypeFilter } from './components/TypeFilter';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { ErrorState } from './components/ErrorState';
import { PokemonModal } from './components/PokemonModal';
import { CompareModal } from './components/CompareModal';

import { useFavorites } from './hooks/useFavorites';
import { fetchPokemonList, fetchPokemonDetail, fetchPokemonByType } from './services/pokemonApi';
import type { PokemonDetail, SortOption } from './types/pokemon';
import styles from './App.module.css';
import compareStyles from './components/CompareModal.module.css';

const POKEMON_TYPES = [
  'normal', 'fire', 'water', 'grass', 'electric', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'steel', 'fairy', 'dark'
];

export default function App() {
  const navigate = useNavigate();
  const pokemonMatch = useMatch('/pokemon/:name');
  const urlPokemonName = pokemonMatch?.params.name;

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [pokemonList, setPokemonList] = useState<PokemonDetail[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('id');
  const [showFavsOnly, setShowFavsOnly] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(null);
  const [compareList, setCompareList] = useState<PokemonDetail[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    loadInitial();
  }, []);

  const loadInitial = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPokemonList(0, 20);
      const details = await Promise.all(data.results.map((r) => fetchPokemonDetail(r.name)));
      setPokemonList(details);
      setOffset(20);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      const data = await fetchPokemonList(offset, 20);
      const batch = await Promise.all(
        data.results.map((r) => fetchPokemonDetail(r.name).catch(() => null))
      );
      const validBatch = batch.filter((p): p is PokemonDetail => p !== null);

      setPokemonList((prev) => {
        const ids = new Set(prev.map((p) => p.id));
        return [...prev, ...validBatch.filter((p) => !ids.has(p.id))];
      });
      setOffset((o) => o + 20);
    } catch {
      // pass
    } finally {
      setLoadingMore(false);
    }
  };

  const handleTypeChange = async (type: string) => {
    setSelectedType(type);
    if (!type) {
      loadInitial();
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const names = await fetchPokemonByType(type);
      const details = await Promise.all(
        names.slice(0, 30).map((n) => fetchPokemonDetail(n).catch(() => null))
      );
      setPokemonList(details.filter((p): p is PokemonDetail => p !== null));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!showFavsOnly || favorites.length === 0) return;
    const missingIds = favorites.filter(
      (id) => !pokemonList.some((p) => p.id === id)
    );
    if (missingIds.length > 0) {
      Promise.all(missingIds.map((id) => fetchPokemonDetail(id).catch(() => null)))
        .then((fetched) => {
          const valid = fetched.filter((p): p is PokemonDetail => p !== null);
          if (valid.length > 0) {
            setPokemonList((prev) => {
              const existingIds = new Set(prev.map((p) => p.id));
              return [...prev, ...valid.filter((p) => !existingIds.has(p.id))];
            });
          }
        });
    }
  }, [showFavsOnly, favorites, pokemonList]);

  useEffect(() => {
    if (!urlPokemonName) {
      setSelectedPokemon(null);
      return;
    }
    const q = urlPokemonName.toLowerCase().trim();
    const existing = pokemonList.find(
      (p) => p.name.toLowerCase() === q || p.id.toString() === q
    );
    if (existing) {
      setSelectedPokemon(existing);
    } else {
      let isMounted = true;
      fetchPokemonDetail(q)
        .then((detail) => {
          if (isMounted) {
            setSelectedPokemon(detail);
            setPokemonList((prev) => (prev.some((p) => p.id === detail.id) ? prev : [detail, ...prev]));
          }
        })
        .catch(() => {
          if (isMounted) {
            setSelectedPokemon(null);
            navigate('/', { replace: true });
          }
        });
      return () => {
        isMounted = false;
      };
    }
  }, [urlPokemonName, pokemonList, navigate]);

  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;
    const t = setTimeout(async () => {
      if (!pokemonList.find((p) => p.name.toLowerCase() === q || p.id.toString() === q)) {
        try {
          const d = await fetchPokemonDetail(q);
          setPokemonList((prev) => [d, ...prev.filter((p) => p.id !== d.id)]);
        } catch {
          // not found
        }
      }
    }, 400);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const displayed = (() => {
    let list = [...pokemonList];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.id.toString().includes(q));
    }
    if (selectedType) {
      list = list.filter((p) => p.types.some((t) => t.type.name === selectedType));
    }
    if (showFavsOnly) {
      list = list.filter((p) => isFavorite(p.id));
    }

    list.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      const statKey = sortBy === 'hp' ? 'hp' : sortBy === 'attack' ? 'attack' : sortBy === 'speed' ? 'speed' : '';
      if (statKey) {
        const sa = a.stats.find((s) => s.stat.name === statKey)?.base_stat || 0;
        const sb = b.stats.find((s) => s.stat.name === statKey)?.base_stat || 0;
        return sb - sa;
      }
      return a.id - b.id;
    });
    return list;
  })();

  const toggleCompare = (p: PokemonDetail) => {
    setCompareList((prev) => {
      if (prev.some((x) => x.id === p.id)) return prev.filter((x) => x.id !== p.id);
      if (prev.length >= 2) return [prev[1], p];
      return [...prev, p];
    });
  };

  return (
    <div className={styles['app-container']}>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        showFavsOnly={showFavsOnly}
        setShowFavsOnly={setShowFavsOnly}
        favoritesCount={favorites.length}
      />

      <TypeFilter
        types={POKEMON_TYPES}
        selectedType={selectedType}
        onTypeChange={handleTypeChange}
      />

      {loading ? (
        <div className="poke-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <LoadingSkeleton key={i} />
          ))}
        </div>
      ) : error || (displayed.length === 0 && searchQuery) ? (
        <ErrorState
          message={error || `No Pokémon found matching "${searchQuery}"`}
          onRetry={() => {
            setSearchQuery('');
            setSelectedType('');
            loadInitial();
          }}
        />
      ) : (
        <>
          <PokemonGrid
            pokemons={displayed}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            onSelect={(pokemon) => navigate(`/pokemon/${pokemon.name}`)}
            compareList={compareList}
            onToggleCompare={toggleCompare}
          />

          {!selectedType && !searchQuery && !showFavsOnly && (
            <div className={styles['load-more-wrap']}>
              <button
                className={styles['load-more-btn']}
                onClick={handleLoadMore}
                disabled={loadingMore}
              >
                {loadingMore ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}

      {compareList.length > 0 && (
        <div className={compareStyles['compare-bar']}>
          <span>{compareList.length} selected</span>
          {compareList.length === 2 && (
            <button className={compareStyles['cmp-go']} onClick={() => setShowCompare(true)}>
              Compare
            </button>
          )}
          <button className={compareStyles['cmp-clear']} onClick={() => setCompareList([])}>
            Clear
          </button>
        </div>
      )}

      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={() => navigate('/')}
          isFavorite={isFavorite(selectedPokemon.id)}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {showCompare && compareList.length === 2 && (
        <CompareModal pokemonList={compareList} onClose={() => setShowCompare(false)} />
      )}
    </div>
  );
}
