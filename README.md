## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Features

- Written in TypeScript with strict typing for better reliability.
- Pre-configured ESLint and Prettier for consistent code style.
- Nodemon for automatic server reload during development.
- Build process with TypeScript Compiler (`tsc`).
- Includes basic middleware: cookie-parser, morgan, and error handling.
- Pug as the default template engine.

## Prerequisites

- [Node.js](https://nodejs.org/) (See or Update check-node-version.ts and .nvmrc)
- [npm](https://www.npmjs.com/) (v10 or later)

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Build the project:

   ```bash
   npm run build
   ```

4. Serve the built project:
   ```bash
   npm run serve
   ```

## Scripts

The following scripts are available in `package.json`:

- **`npm run check-node`**: Checks if the correct Node.js version is installed.
- **`npm run lint`**: Lints and fixes code using ESLint.
- **`npm run dev`**: Starts the development server with Nodemon.
- **`npm run build`**: Compiles TypeScript into JavaScript.
- **`npm run serve`**: Runs the compiled code from the `dist` directory.


## Technologies

- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
- [TypeScript](https://www.typescriptlang.org/) - Strongly typed programming language for JavaScript.
- [Nodemon](https://nodemon.io/) - Utility that monitors changes and automatically restarts the server.
- [Pug](https://pugjs.org/) - Template engine for dynamic HTML generation.
- [ESLint](https://eslint.org/) - Code linter to enforce coding standards.
- [Prettier](https://prettier.io/) - Code formatter to ensure consistent style.

## Contributing

Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## Special Thanks

A big thank you to [Arthur Varteressians](https://github.com/ArthurVarteressians) for helping me create this repository. Your support and expertise are greatly appreciated!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
