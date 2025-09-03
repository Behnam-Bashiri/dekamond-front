# Dekamond Front V1

A modern frontend project for Dekamond.

## Table of Contents

- [Getting Started](#getting-started)
- [Development](#development)
- [Build](#build)
- [Run with Docker](#run-with-docker)
- [Project Structure](#project-structure)
- [Folder Structure & Details](#folder-structure--details)
- [Router Overview](#router-overview)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/dekamond-front-v1.git
    cd dekamond-front-v1
    ```
2. **Install dependencies:**
    ```bash
    npm install
    ```
3. **Start the development server:**
    ```bash
    npm start
    ```

## Development

- Source code is located in the `src/` directory.
- Update environment variables in `.env` as needed.

## Build

To create a production build:
```bash
npm run build
```

## Run with Docker

You can run the project using Docker for easier deployment:

1. **Build the Docker image:**
    ```bash
    docker build -t dekamond-front-v1 .
    ```
2. **Run the container:**
    ```bash
    docker run -p 3000:3000 dekamond-front-v1
    ```

> Make sure to adjust the port if your app uses a different one.

## Project Structure

The project follows a modular structure for scalability and maintainability.

```
dekamond-front-v1/
├── .gitattributes
├── docker-compose.yml
├── README.md
├── .vscode/
│   └── settings.json
├── login-demo/
│   ├── bun.lockb
│   ├── components.json
│   ├── Dockerfile
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   ├── public/
│   │   ├── logo.svg
│   │   └── robots.txt
│   └── src/
│       ├── App.tsx
│       ├── index.css
│       ├── main.tsx
│       ├── vite-env.d.ts
│       ├── components/
│       │   ├── atoms/
│       │   ├── molecules/
│       │   └── organisms/
│       ├── hooks/
│       │   └── use-toast.ts
│       ├── lib/
│       │   ├── auth.ts
│       │   ├── i18n.ts
│       │   └── utils.ts
│       ├── locales/
│       └── pages/
```

## Folder Structure & Details

- **.gitattributes**: Git configuration for handling line endings and file attributes.
- **docker-compose.yml**: Docker Compose configuration for multi-container setups.
- **README.md**: Project documentation.
- **.vscode/**: Editor settings for Visual Studio Code.
- **login-demo/**: Main application directory.
    - **bun.lockb**: Bun package manager lockfile.
    - **components.json**: Component registry/configuration.
    - **Dockerfile**: Docker build instructions.
    - **eslint.config.js**: ESLint configuration.
    - **index.html**: Main HTML template.
    - **package.json**: Project dependencies and scripts.
    - **postcss.config.js**: PostCSS configuration.
    - **tailwind.config.ts**: Tailwind CSS configuration.
    - **tsconfig.*.json**: TypeScript configuration files.
    - **vite.config.ts**: Vite build tool configuration.
    - **public/**: Static files (e.g., logo, robots.txt).
    - **src/**: Source code.
        - **App.tsx**: Main React application component.
        - **index.css**: Global styles.
        - **main.tsx**: Application entry point.
        - **vite-env.d.ts**: Vite environment type declarations.
        - **components/**: Reusable UI components.
            - **atoms/**: Small, reusable UI elements.
            - **molecules/**: Compound components built from atoms.
            - **organisms/**: Complex components composed of molecules and atoms.
        - **hooks/**: Custom React hooks (e.g., `use-toast.ts`).
        - **lib/**: Utility libraries (e.g., `auth.ts`, `i18n.ts`, `utils.ts`).
        - **locales/**: Localization files.
        - **pages/**: Page-level React components.

## Router Overview

Routing is handled in `src/routes/` (or directly in `App.tsx` if not separated):

```tsx
// src/routes/index.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}
```

In `App.tsx`:

```tsx
import AppRoutes from './routes';

function App() {
  return <AppRoutes />;
}

export default App;
```

# Login Demo

## Running with Docker

To build and run the application using Docker, use the following commands:

```sh
# Build the Docker image
docker build -t login-demo .

# Run the Docker container
docker run -p 3000:3000 login-demo
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Contributing

Contributions are welcome! Please open issues and submit pull requests.

## License

This project is licensed under the