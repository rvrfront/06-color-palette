# Color Palette Explorer

An interactive React and TypeScript application for exploring a collection of colors and experimenting with image opacity and card border radius. The frontend retrieves its dataset from a local mock REST API using Axios and JSON Server.

The project focuses on custom hooks, component composition, typed data contracts, derived state, and environment-based styling.

## Features

- Browse color cards containing an image, name, identifier, and styling values.
- Search by partial color name using the Search button or Enter key.
- Clear the search and restore the complete collection.
- Reuse previous searches through clickable history buttons (up to eight distinct, non-empty submitted terms).
- Adjust image opacity from 0% to 100% and card border radius from 0 to 50 px independently for each card.
- Display a `No results` message when the filtered collection is empty.
- Configure the application theme and API endpoint through environment variables.

## Technologies

| Technology | Purpose |
| --- | --- |
| React | Functional components, hooks and UI rendering |
| TypeScript | Static typing and component contracts |
| Vite | Development server and production build |
| Axios | HTTP client |
| JSON Server | Local mock REST API |
| CSS | Component styles, custom properties and dynamic inline styles |
| ESLint | Static code analysis |

## Getting Started

Ensure Node.js and npm are installed, using a Node.js version compatible with the project's Vite dependency.

```bash
git clone https://github.com/rvrfront/06-color-palette.git
cd 06-color-palette
npm ci
```

Start the mock API in one terminal:

```bash
npm run server
```

Start the frontend in a second terminal:

```bash
npm run dev
```

Open the local URL displayed by Vite. The configured API endpoint is `http://localhost:3000/cards`.

### Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run server` | Serve `db/db.json` through JSON Server |
| `npm run build` | Run TypeScript compilation and create the production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Project Structure

The following tree shows the principal application files and directories.

```text
project-root/
├── db/
│   └── db.json
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Card.tsx
│   │   ├── CardContainer.tsx
│   │   ├── Header.tsx
│   │   ├── History.tsx
│   │   └── Search.tsx
│   ├── helpers/
│   │   ├── apiAxios.ts
│   │   └── getDataFromApi.ts
│   ├── hooks/
│   │   ├── useApp.tsx
│   │   ├── useCard.tsx
│   │   └── useSearch.tsx
│   ├── interfaces/
│   ├── styles/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .env
├── package.json
├── vite.config.ts
└── README.md
```

## Application Architecture

The application separates rendering, stateful logic, HTTP communication, type definitions and styling. `App` composes the main interface, while custom hooks encapsulate state and event handling.

### Component Hierarchy

```text
App (useApp)
├── Header
├── History
├── Search (useSearch)
└── CardContainer
    ├── Card (useCard)
    ├── Card (useCard)
    └── ...
```

### Component Responsibilities

| Component | Responsibility |
| --- | --- |
| `App` | Connects application state and callbacks to the main UI components. |
| `Header` | Renders the title supplied through props. |
| `Search` | Displays a controlled text input and search/reset controls. |
| `History` | Renders previous search terms as clickable buttons. |
| `CardContainer` | Maps color records to keyed card components or displays an empty-state message. |
| `Card` | Presents color information and controls for individual visual adjustments. |

## Custom Hooks

| Hook | Responsibility |
| --- | --- |
| `useApp` | Loads the dataset, manages the active query and search history, and derives filtered results. |
| `useSearch` | Manages the input value, search submission, keyboard events and reset behavior. |
| `useCard` | Maintains per-card opacity and border radius state and handles slider changes. |

This structure keeps the JSX focused on presentation without introducing an external state management library.

## State Management and Data Flow

Application state resides in `useApp` and is shared with components through props and callbacks.

| State | Type | Purpose |
| --- | --- | --- |
| `query` | `string` | Active search term |
| `colors` | `CardProps[]` | Original dataset returned by the API |
| `terms` | `string[]` | Search history |

`useSearch` maintains its own input state. Each `useCard` instance maintains its own numeric alpha value and CSS radius string.

On mount, an effect requests the color dataset. Submitting a search updates the application query, and selecting a history entry updates that same query. The filtered collection is calculated from the original array during rendering rather than stored as additional state. The resulting array is passed to `CardContainer`.

### Search and History

Filtering uses partial string matching against color names after lowercasing and trimming the query. An empty query restores the full dataset. History rejects empty strings and exact duplicate entries and stops accepting new entries once it contains eight terms. History is held in memory, not persisted across page reloads.

### Interactive Card Styling

Each card initializes its visual state from the API record. The alpha slider is converted to a numeric value and divided by 100 to produce a valid CSS opacity. The radius slider value is converted to a pixel-based CSS length and applied to the card container. These updates affect local component state rather than writing changes to the mock database.

## API Integration

The `apiAxios.ts` helper creates a shared Axios client with an environment-configured base URL, a three-second timeout and a JSON content-type header. The `getDataFromApi.ts` helper performs an asynchronous request and returns a typed array of color records.

```text
db/db.json → JSON Server → Axios client → getData → useApp → UI components
```

## TypeScript Data Model

The color response model is defined in `IData.interface.ts`.

| Field | Type | Purpose |
| --- | --- | --- |
| `name` | `string` | Display name and search target |
| `path` | `string` | Image resource path |
| `alpha` | `number` | Initial opacity percentage |
| `radius` | `string` | Initial CSS border radius |
| `id` | `string` | Record identifier used in the UI and React list keys |

Dedicated interfaces also describe component props and callback contracts.

## Mock Database

`db/db.json` contains the `cards` collection consumed by the frontend. Each stored color entry supplies its name, image path, initial alpha and radius. The file also includes sample `posts`, `comments` and `profile` resources, which are not used by the reviewed color explorer code.

## Environment Variables and Version Control

The `.env` file is intentionally tracked by Git. It contains only non-sensitive theme configuration and the local mock API URL; it contains no API keys, credentials, access tokens or secrets.

| Environment variable | CSS custom property / purpose |
| --- | --- |
| `VITE_BACKGROUND_COLOR` | `--background-color` |
| `VITE_SURFACE_COLOR` | `--surface-color` |
| `VITE_SECONDARY_COLOR` | `--secondary-color` |
| `VITE_ACCENT_COLOR` | `--accent-color` |
| `VITE_COLOR_TEXT` | `--color-text` |
| `VITE_ERROR_COLOR` | `--error-color` |
| `VITE_API_URL` | Axios base URL |

At startup, `main.tsx` reads the theme values through `import.meta.env` and assigns them to CSS custom properties on the document root. Component styles consume those properties using `var()`.

Vite exposes `VITE_` variables to client-side code, so secrets must never be placed in them, even in a Git-ignored file. Any future server-side secrets should be stored separately and excluded from version control.

## Technical Highlights

- Custom hooks and separation of stateful logic from presentation.
- Controlled inputs, typed event handlers and callback props.
- Lifted state, unidirectional data flow and derived collections.
- Conditional rendering and keyed lists.
- Independent component state and dynamic CSS styling.
- Typed asynchronous HTTP requests and centralized API configuration.
- Local mock backend and configurable frontend theme.

## Current Scope

The application is a frontend learning project backed by a local mock API. Search history and card adjustments are in-memory UI state. The reviewed implementation does not include explicit loading/error UI or automated test scripts.
