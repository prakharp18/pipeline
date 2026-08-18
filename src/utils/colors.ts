export const TYPE_COLORS: Record<string, { bg: string; text: string; accent: string }> = {
  normal: { bg: '#A8A77A', text: '#FFFFFF', accent: '#797853' },
  fire: { bg: '#EE8130', text: '#FFFFFF', accent: '#9C4000' },
  water: { bg: '#6390F0', text: '#FFFFFF', accent: '#1D4ED8' },
  grass: { bg: '#7AC74C', text: '#FFFFFF', accent: '#3F6B23' },
  electric: { bg: '#F7D02C', text: '#1F2937', accent: '#A18000' },
  ice: { bg: '#96D9D6', text: '#1F2937', accent: '#368985' },
  fighting: { bg: '#C22E28', text: '#FFFFFF', accent: '#6B120E' },
  poison: { bg: '#A33EA1', text: '#FFFFFF', accent: '#571D56' },
  ground: { bg: '#E2BF65', text: '#1F2937', accent: '#8C6F21' },
  flying: { bg: '#A98FF3', text: '#FFFFFF', accent: '#5635B0' },
  psychic: { bg: '#F95587', text: '#FFFFFF', accent: '#9C113D' },
  bug: { bg: '#A6B91A', text: '#FFFFFF', accent: '#535E00' },
  rock: { bg: '#B6A136', text: '#FFFFFF', accent: '#615414' },
  ghost: { bg: '#735797', text: '#FFFFFF', accent: '#3A2752' },
  dragon: { bg: '#6F35FC', text: '#FFFFFF', accent: '#350996' },
  steel: { bg: '#B7B7CE', text: '#1F2937', accent: '#595978' },
  fairy: { bg: '#D685AD', text: '#FFFFFF', accent: '#7E365A' },
  dark: { bg: '#705746', text: '#FFFFFF', accent: '#33241A' }
};

export const getTypeColor = (type: string) => {
  return TYPE_COLORS[type.toLowerCase()] || { bg: '#68A090', text: '#FFFFFF', accent: '#31544B' };
};

export const formatPokemonId = (id: number): string => {
  return `#${id.toString().padStart(3, '0')}`;
};

export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
};
