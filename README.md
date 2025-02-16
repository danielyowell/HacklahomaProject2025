# Comic Generator

Welcome to COMIC.AI, the one and only comic ai app to help you tell your story with confidence in a fun and easy way. All you have to do is input your prompts and voila you will have your life in a comic.

Here is our domain name: livelifetokenize.tech/,

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Scripts](#scripts)
- [License](#license)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/HacklahomaProject2025.git
    cd HacklahomaProject2025
    ```

2. Install the dependencies for both the frontend and backend:

    ```sh
    cd app1
    npm install
    cd ../app1/backend
    npm install
    ```

## Usage

### Starting the Frontend

1. Navigate to the frontend directory:

    ```sh
    cd app1
    ```

2. Start the development server:

    ```sh
    npm run dev
    ```

3. Open your browser and navigate to `http://localhost:3000`.

4. Enter a prompt in the input field and click the "Generate" button to generate an image.

### Starting the Backend

1. Open a new terminal and navigate to the backend directory:

    ```sh
    cd HacklahomaProject2025/app1/backend
    ```

2. Start the backend server:

    ```sh
    node server.cjs
    ```

3. The backend server will be running at `http://localhost:3001`.

## Project Structure

```
HacklahomaProject2025/
├── app1/
│   ├── backend/
│   │   ├── server.cjs
│   │   └── ...
│   ├── src/
│   │   ├── App.jsx
│   │   └── ...
│   ├── public/
│   │   ├── favicon.ico
│   │   └── ...
│   ├── index.html
│   ├── package.json
│   └── ...
├── README.md
└── ...
```

## Dependencies

- React
- Vite
- Axios
- Styled-components
- Express
- PDFKit
- Body-parser
- Cors

## Scripts

- `npm run dev`: Start the development server for the frontend.
- `node server.cjs`: Start the backend server.

## License

This project is licensed under the MIT License.
