# Pokemon Explorer

A frontend application built with React, TypeScript, Vite, and Vanilla CSS, utilizing the public PokeAPI.

## Features

- **Card-Based Grid**: Displays Pokemon images, names, formatted IDs, and type badges.
- **Search**: Search Pokemon by name or ID.
- **Pagination**: Dynamic fetching of next batches.
- **Type Filtering**: Filter Pokemon by official types.
- **Modal View**: Detailed view showing artwork, height, weight, abilities, and base stats.
- **Skeleton States**: Loading placeholders.
- **Responsive Layout**: Support for mobile, tablet, and desktop viewports.
- **Dark/Light Mode**: Theme configuration persisted in local storage.
- **Favorites**: Ability to favorite Pokemon, stored in local storage.
- **Sorting**: Sort by ID, Name, HP, Attack, or Speed.
- **Comparison**: Select two Pokemon to compare base stats.

## Tech Stack

- React 18
- TypeScript
- Vite
- Plain CSS
- Lucide React (Icons)
- PokeAPI (https://pokeapi.co/api/v2/)

## Getting Started

### Prerequisites
- Node.js (>=18.0.0)
- npm or yarn

### Installation
```bash
git clone https://github.com/prakharp18/pipeline.git
cd pipeline
npm install
```

### Running Locally
```bash
npm run dev
```
The application will be available at http://localhost:5173.

### Production Build
```bash
npm run build
```

## Project Structure

```text
src/
  components/
    CompareModal.tsx
    ErrorState.tsx
    LoadingSkeleton.tsx
    PokemonCard.tsx
    PokemonGrid.tsx
    PokemonModal.tsx
    SearchBar.tsx
    TypeFilter.tsx
  services/
    pokemonApi.ts
  hooks/
    useFavorites.ts
  types/
    pokemon.ts
  utils/
    colors.ts
  styles/
    index.css
  App.tsx
  main.tsx
```

## Design Architecture

- The application uses standard React architecture without state management libraries.
- API requests are optimized to prevent redundant fetching.
- Styling is implemented using standard CSS variables and grid layouts.
