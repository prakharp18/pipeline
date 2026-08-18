export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonMove {
  move: {
    name: string;
    url: string;
  };
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  moves: PokemonMove[];
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
      home?: {
        front_default: string;
      };
    };
  };
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface TypeListItem {
  name: string;
  url: string;
}

export interface TypePokemonListItem {
  pokemon: {
    name: string;
    url: string;
  };
}

export interface TypeDetailResponse {
  name: string;
  pokemon: TypePokemonListItem[];
}

export type SortOption = 'id' | 'name' | 'hp' | 'attack' | 'speed';
