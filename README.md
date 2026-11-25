# Color Palette Explorer

## Overview

Color Palette Explorer is an interactive web application built with React and TypeScript that allows users to explore and search through a predefined collection of colors.

The application retrieves color data from a mock REST API using Axios, filters the results based on user search queries, and maintains a search history for easy access to previous searches.

The project demonstrates fundamental React concepts, including component-based architecture, state management, derived data, parent-child communication, asynchronous data fetching, and TypeScript type safety.

## Features

- **Color Exploration:** Browse a collection of colors displayed through individual card components.
- **Dynamic Filtering:** Filter colors by name based on the current search query.
- **Search History:** Store and display previous search terms.
- **Reusable Components:** Modular UI components with clearly defined responsibilities.
- **API Integration:** Retrieve color data from a mock REST API using Axios.
- **Mock Backend:** Use JSON Server to expose a local JSON database through HTTP endpoints.
- **Type Safety:** Use TypeScript interfaces to define data models and component props.

## Technologies

| Technology | Purpose |
|---|---|
| React | Component-based user interface |
| TypeScript | Static typing and data contracts |
| Axios | HTTP client and API communication |
| JSON Server | Mock REST API |
| JSON | Local data storage |
| CSS | Component and application styling |

## Project Structure

The application is organized to separate presentation logic, state management, API communication, and data definitions.

```
project-root/
├── db/
│   └── db.json
│
├── src/
│   ├── App.tsx
│   │
│   ├── components/
│   │   ├── Card.tsx
│   │   ├── CardContainer.tsx
│   │   ├── Header.tsx
│   │   ├── History.tsx
│   │   └── Search.tsx
│   │
│   ├── helpers/
│   │   ├── apiAxios.ts
│   │   └── getDataFromApi.ts
│   │
│   └── interfaces/
│       ├── ICard.interface.ts
│       ├── ICardContainerProps.ts
│       ├── IData.interface.ts
│       ├── IHeader.interface.ts
│       ├── IHistory.interface.ts
│       └── ISearch.interface.ts
│
├── README.md
└── .env
```

## Application Architecture

The application follows a component-based architecture with a separation between state management, presentation logic, and data access.

- **Application Layer (`App.tsx`):** Manages application state, coordinates data fetching, handles search history, and implements filtering logic.
- **Presentation Layer (`components/`):** Contains reusable React components responsible for rendering the user interface and handling user interactions.
- **Data Access Layer (`helpers/`):** Encapsulates HTTP client configuration and API requests.
- **Type Definition Layer (`interfaces/`):** Defines TypeScript interfaces for data models and component props.
- **Mock Backend (`db/`):** Contains the JSON dataset exposed through JSON Server.

### Component Hierarchy

```
App
├── Header
├── Search
├── History
└── CardContainer
    ├── Card
    ├── Card
    └── Card ...
```

## Component Responsibilities

| Component | Responsibility |
|---|---|
| `App` | Manages application state, data fetching, search history, and filtering logic. |
| `Header` | Displays the application header and title. |
| `Search` | Handles user input and communicates search queries to the parent component through callback functions. |
| `History` | Displays previously stored search terms and supports interaction with search history. |
| `CardContainer` | Receives a collection of colors and renders individual Card components. Displays a message when no results are available. |
| `Card` | Renders the visual representation and information associated with an individual color. |

Each component has a specific responsibility, promoting maintainability and reusability.

## State Management and Data Flow

Application-level state is managed within `App.tsx` using React's `useState` hook.

| State | Type | Responsibility |
|---|---|---|
| `query` | `string` | Stores the current search query. |
| `colors` | `CardProps[]` | Stores the original color dataset retrieved from the API. |
| `terms` | `string[]` | Stores previous search terms. |

The application uses lifted state to coordinate communication between child components without requiring an external state management library.

### Data Flow

1. On initial rendering, `useEffect` triggers the asynchronous data fetching operation.
2. The API response populates the `colors` state.
3. The `Search` component captures user input.
4. Callback functions communicate search queries from the child component to `App.tsx`.
5. The parent component updates the corresponding state.
6. The filtered collection is calculated from the original color dataset and the current query.
7. The resulting collection is passed to `CardContainer` through props.
8. `CardContainer` renders the corresponding `Card` components.
9. Previous search terms are passed to the `History` component.

### Parent-Child Communication

The application uses props to pass data from parent components to child components and callback functions to communicate user interactions back to the parent.

```
                App
                 |
        State and filtering
                 |
    +------------+------------+
    |            |            |
  Search      History    CardContainer
    |            |            |
    +------------+          Card(s)
      Callbacks
      to parent
```

This approach follows React's unidirectional data flow model.

## Search and Filtering Implementation

Filtering is implemented in `App.tsx` through a function that derives a filtered collection from the original color dataset.

```tsx
const filteredColors = (query: string): CardProps[] => {
    if (query) {
        return colors.filter(color =>
            color.name.includes(
                query.toLocaleLowerCase().trim()
            )
        );
    }

    return colors;
};
```

The filtering logic:

- Converts the search query to lowercase.
- Removes leading and trailing whitespace.
- Uses the JavaScript `filter()` method to select matching colors.
- Uses `includes()` to perform partial name matching.
- Returns the complete dataset when no search query is provided.

The original dataset remains unchanged during filtering.

The filtered collection is derived from existing state rather than stored in a separate state variable. This avoids unnecessary state duplication and helps maintain consistency between the original dataset and the displayed results.

## Search History

The application maintains a collection of previous search terms using a typed array stored in the parent component.

The history is passed to the `History` component through props, separating history management from its visual representation.

This implementation demonstrates:

- Array-based state management.
- Communication between parent and child components.
- Dynamic rendering of collections.
- Separation between application logic and presentation.

## Environment Variables and Version Control

The project uses a `.env` file to centralize non-sensitive
environment configuration, including CSS styling-related
variables and the API base URL.

The `.env` file is intentionally tracked by Git and included
in the repository because it does not contain sensitive
information, credentials, API keys, access tokens, or secrets.

This approach ensures consistent configuration across
development environments and simplifies project setup.

If sensitive environment variables are required in the
future, they should be stored in a separate environment
file excluded from version control through `.gitignore`.

## API Integration

API communication is centralized within the `src/helpers/` directory.

### HTTP Client Configuration

The `apiAxios.ts` helper defines a reusable Axios instance.

The instance uses an environment variable to configure the API base URL, separating the application code from environment-specific configuration.

Centralizing the HTTP client configuration allows API requests to share common settings.

### Data Fetching

The `getDataFromApi.ts` helper encapsulates the asynchronous data retrieval operation.

```typescript
export const getData = async (): Promise<Data[]> => {
    const response = await apiClient<Data[]>("");
    const colors = response.data;

    return colors;
};
```

This implementation demonstrates:

- Asynchronous programming with `async/await`.
- Typed HTTP responses using TypeScript generics.
- Explicit Promise return types.
- Separation of API communication from UI components.

### API Data Flow

```
db/db.json
     |
     v
JSON Server
     |
     v
REST API
     |
     v
Axios HTTP Client
     |
     v
getDataFromApi.ts
     |
     v
App.tsx
     |
     v
React Components
```

## TypeScript Data Models

The project uses TypeScript interfaces to define the structure of API responses and component props.

### Color Data Model

The color data model is defined in `IData.interface.ts`.

```typescript
export interface Data {
    name: string;
    path: string;
    alpha: number;
    radius: string;
    id: string;
}
```

| Property | Type | Description |
|---|---|---|
| `name` | `string` | Color name used for display and filtering. |
| `path` | `string` | Path associated with the color resource. |
| `alpha` | `number` | Alpha value associated with the color. |
| `radius` | `string` | Radius value associated with the color representation. |
| `id` | `string` | Unique identifier for the color item. |

### Component Interfaces

The `src/interfaces/` directory contains interfaces that define data contracts between components.

These interfaces help ensure consistent typing of:

- Component props.
- Color data.
- Collections of color items.
- Search callbacks.
- Search history.
- Header configuration.

Using dedicated interfaces improves code readability, maintainability, and compile-time type checking.

## Mock Database

The `db/db.json` file contains the local dataset used by the application.

JSON Server exposes this dataset through a mock REST API, allowing the React frontend to retrieve data using standard HTTP requests without requiring a custom backend implementation.

This approach provides a practical environment for developing and testing frontend API integration.

The mock backend is independent of the frontend implementation, allowing the data source to be replaced in the future without requiring significant changes to the presentation layer.

## Technical Highlights

### React

- Functional components.
- Component-based architecture.
- State management with `useState`.
- Side effects and initial data fetching with `useEffect`.
- Parent-child communication through props and callbacks.
- Lifted state.
- Unidirectional data flow.
- Derived data.
- Conditional rendering.
- Dynamic rendering of collections.
- Reusable UI components.

### TypeScript

- Custom interfaces.
- Strongly typed component props.
- Typed arrays.
- Function parameter and return types.
- Typed callback functions.
- Generic HTTP responses.
- Asynchronous functions with typed Promises.

### JavaScript

- Array filtering.
- Array mapping.
- String normalization.
- Partial string matching.
- Asynchronous programming.
- ES module imports and exports.

### Software Architecture

- Separation of concerns.
- Centralized HTTP client configuration.
- Independent data access layer.
- Environment-based API configuration.
- Mock REST API integration.
- Modular and maintainable project structure.