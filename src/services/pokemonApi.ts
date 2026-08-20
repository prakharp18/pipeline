import type { PokemonDetail, PokemonListResponse, TypeDetailResponse } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (offset = 0, limit = 20): Promise<PokemonListResponse> => {
  const response = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon list');
  }
  return response.json();
};

export const fetchPokemonDetail = async (nameOrId: string | number): Promise<PokemonDetail> => {
  const query = typeof nameOrId === 'string' ? nameOrId.toLowerCase().trim() : nameOrId;
  const response = await fetch(`${BASE_URL}/pokemon/${query}`);
  if (!response.ok) {
    throw new Error(`Pokémon "${nameOrId}" not found.`);
  }
  return response.json();
};

export const fetchPokemonByType = async (typeName: string): Promise<string[]> => {
  const response = await fetch(`${BASE_URL}/type/${typeName.toLowerCase()}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokémon of type ${typeName}`);
  }
  const data: TypeDetailResponse = await response.json();
  return data.pokemon.map((item) => item.pokemon.name);
};
