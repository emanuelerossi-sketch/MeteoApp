# DESCRIZIONE DEL PROGETTO
WeatherApp è un'applicazione web realizzata con React e Typescript che permette di consultare le previsioni meteo in tempo reale per qualsiasi città del mondo. L'applicazione offre funzionalità di salvataggio delle città preferite e la possibilità di aggiungere note personalizzate sul meteo.

# SCOPO DEL PROGETTO
Ho scelto di creare un'applicazione sul meteo perchè le previsioni atmosferiche mi appassionano molto. Inoltre, durante lo sviluppo, ho potuto mettere in pratica molti concetti studiati a lezione e ho potuto imparare molte altre cose nuove

# FUNZIONALITA' PRINCIPALI
RICERCA METEO: Cerca le previsioni meteo per qualsiasi città
DETTAGLI COMPLETI: Visualizza temperatura, umidità, vento, UV, alba e tramonto
PREVISIONI SETTIMANALI: Consulta le previsioni per i prossimi 7 giorni
CITTA PREFERITE: Permette di salvare le città preferite
NOTE SUL METEO: Permette di aggiungere note personalizzate sul meteo

# API UTILIZZATE -> Non richiedono credenziali
- OPEN METEO: 
  Usata per ottenere dati meteo in tempo reale, come temperatura, velocità del vento, umidità...
  
- OPEN METEO geocoding: 
  Usata per convertire i nomi delle città in coordinate geografiche

- JSONPlaceholder (POST): 
  Usata per simulare il salvataggio delle note meteo

# STRUTTURA DEL PROGETTO
meteo-app/
├── src/
│   ├── components/          
│   │   ├── Card.tsx
|   |   |── Footer.tsx 
│   │   ├── Load.tsx
│   │   └── WeatherNotes.tsx
│   ├── pages/              
│   │   ├── HomePage.tsx
│   │   ├── WeatherPage.tsx
│   │   ├── SavedLocPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── interfaces/               
│   │   └── Weather.ts  
│   ├── css/               
│   │   ├── HomePage.css
│   │   ├── WeatherPage.css
│   │   ├── SavedLocPage.css
│   │   ├── Footer.css
│   │   ├── Card.css
│   │   ├── Load.css
│   │   └── WeatherNotes.css
│   ├── App.tsx            
│   └── main.tsx           
├── package.json
└── README.md





# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
