# 🚀 Devportfolio: A Full-Stack Developer Portfolio

[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-FF4081?style=for-the-badge&logo=next.js&logoColor=white)](https://next-auth.js.org/)
[![Last Commit](https://img.shields.io/github/last-commit/Can-Ozan/Devportfolio?style=for-the-badge)](https://github.com/Can-Ozan/Devportfolio/commits/main)

Devportfolio is a modern, full-stack developer portfolio project designed to showcase your skills, projects, and experience in a professional and engaging manner. Built with a robust technology stack including Next.js for a powerful React frontend and API routes, Tailwind CSS for sleek styling, Prisma as an elegant ORM, PostgreSQL for reliable data storage, and NextAuth.js for secure authentication, this project provides a solid foundation for your online presence.

This repository serves as a comprehensive template for developers looking to create their personalized portfolio with cutting-edge web technologies.

## 📋 Table of Contents

*   [✨ Features](#-features)
*   [🛠️ Tech Stack](#️-tech-stack)
*   [🏗️ Architecture](#️-architecture)
*   [🚀 Getting Started](#-getting-started)
    *   [⚙️ Prerequisites](#️-prerequisites)
    *   [📦 Installation](#-installation)
    *   [▶️ Running the Application](#️-running-the-application)
*   [🌐 REST API Endpoints](#-rest-api-endpoints)
*   [📂 Project Structure](#-project-structure)
*   [🤝 Contributing](#-contributing)
*   [📄 License](#-license)
*   [📧 Contact](#-contact)

## ✨ Features

Devportfolio offers a rich set of features designed to make your portfolio stand out:

*   **Interactive Project Showcase:** Dynamically display your projects with detailed descriptions, technologies used, and links.
*   **Skills Section:** Highlight your technical proficiencies with an organized and visually appealing list of skills.
*   **Experience Timeline:** Present your professional journey and work experience in a clear, chronological format.
*   **Responsive Design:** Optimized for various screen sizes, ensuring a seamless experience on desktops, tablets, and mobile devices.
*   **Secure Authentication:** Leverages NextAuth.js for robust and flexible authentication, enabling secure content management (e.g., for the portfolio owner).
*   **Database Integration:** Utilizes PostgreSQL via Prisma ORM for efficient and scalable data management.
*   **Modern UI:** Crafted with Tailwind CSS for a clean, customizable, and maintainable user interface.
*   **SEO Friendly:** Built with Next.js for server-side rendering (SSR) and static site generation (SSG) capabilities, enhancing search engine visibility.

## 🛠️ Tech Stack

The Devportfolio project is built using the following core technologies:

*   **Frontend Framework:** [Next.js](https://nextjs.org/) (React)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Database ORM:** [Prisma](https://www.prisma.io/)
*   **Database:** [PostgreSQL](https://www.postgresql.org/)
*   **Authentication:** [NextAuth.js](https://next-auth.js.org/)
*   **TypeScript:** For type-safe development.

## 🏗️ Architecture

The Devportfolio project follows a modern full-stack architecture, leveraging Next.js's capabilities to serve both the frontend and backend API routes.

The architecture can be broken down into several key components:

1.  **Client (Browser):** The user's web browser interacts with the Next.js application, rendering the React components.
2.  **Next.js Application:** This is the core of the system, acting as both the frontend renderer and the backend API server.
    *   **Frontend Rendering:** Next.js handles server-side rendering (SSR) or static site generation (SSG) for optimal performance and SEO, delivering HTML, CSS, and JavaScript to the client.
    *   **Next.js API Routes:** This feature allows the Next.js application to expose RESTful API endpoints. These routes are serverless functions that handle business logic, interact with the database, and manage authentication.
3.  **NextAuth.js:** Integrated within the Next.js application, NextAuth.js provides a complete authentication solution. It handles session management, various authentication providers (e.g., Google, GitHub, credentials), and secure callback mechanisms. It communicates with external Authentication Providers for user verification.
4.  **Prisma ORM:** An Object-Relational Mapper (ORM) that sits between the Next.js API routes and the PostgreSQL database. Prisma simplifies database interactions by allowing developers to work with a type-safe API, abstracting away raw SQL queries. It handles schema migrations and provides a powerful query builder.
5.  **PostgreSQL Database:** The primary data store for the application. It stores all portfolio-related information, including projects, skills, experience entries, and potentially user data (if managing multiple portfolio owners).

**Data Flow and Interaction:**

*   A user's browser sends requests to the Next.js application.
*   For UI rendering, Next.js processes the request and serves the appropriate React components, potentially fetching initial data from its own API routes or directly from the database (via server components/getServerSideProps).
*   For data operations (e.g., fetching projects, adding a new skill), the frontend makes API calls to the Next.js API Routes.
*   These API Routes use Prisma Client to interact with the PostgreSQL database, performing CRUD (Create, Read, Update, Delete) operations.
*   Authentication is handled by NextAuth.js. When a user attempts to log in, NextAuth.js redirects them to an external Authentication Provider (e.g., Google). After successful authentication, the provider redirects back to NextAuth.js, which then creates and manages a secure session for the user within the Next.js application. API routes can then check for authenticated sessions to protect sensitive operations.

```mermaid
graph TD
    A["Client (Browser)"] --> B["Next.js Application (Frontend)"];
    B --> C["Next.js API Routes (Backend)"];
    C --> D["Prisma ORM"];
    D --> E["PostgreSQL Database"];
    B --> F["NextAuth.js"];
    F --> G["Authentication Provider (e.g., Google, GitHub)"];
    C --> F;
```

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### ⚙️ Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js**: [v18.x or higher](https://nodejs.org/en/download/)
*   **npm** or **Yarn**: (npm comes with Node.js, Yarn can be installed globally)
    *   `npm install -g yarn` (if you prefer Yarn)
*   **PostgreSQL**: A running PostgreSQL instance. You can install it locally, use Docker, or a cloud-hosted service.

### 📦 Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Can-Ozan/Devportfolio.git
    cd Devportfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project based on `.env.example`.

    ```ini
    # .env
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
    NEXTAUTH_SECRET="YOUR_NEXTAUTH_SECRET"
    NEXTAUTH_URL="http://localhost:3000" # Or your deployment URL

    # Example for Google Provider
    GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
    GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"

    # Example for GitHub Provider
    GITHUB_ID="YOUR_GITHUB_ID"
    GITHUB_SECRET="YOUR_GITHUB_SECRET"
    ```
    *   `DATABASE_URL`: Connection string for your PostgreSQL database.
    *   `NEXTAUTH_SECRET`: A long, random string used to sign and encrypt session tokens. Generate one using `openssl rand -base64 32`.
    *   `NEXTAUTH_URL`: The base URL of your application.
    *   `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_ID`, `GITHUB_SECRET`: Obtain these from your respective OAuth providers if you plan to use them for authentication.

4.  **Database Setup:**
    *   **Migrate the database schema:**
        ```bash
        npx prisma migrate dev --name init
        ```
        This command will apply the schema defined in `prisma/schema.prisma` to your PostgreSQL database.
    *   **Seed the database (optional):**
        If you have a `prisma/seed.ts` file, you can populate your database with initial data:
        ```bash
        npx prisma db seed
        ```

### ▶️ Running the Application

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be accessible at `http://localhost:3000`.

## 🌐 REST API Endpoints

The Devportfolio project exposes a set of RESTful API endpoints for managing portfolio content. These endpoints are built using Next.js API Routes and interact with the PostgreSQL database via Prisma.

| Method | Endpoint                       | Description                                         | Authentication |
| :----- | :----------------------------- | :-------------------------------------------------- | :------------- |
| `GET`  | `/api/auth/session`            | Retrieves the current user session.                 | Optional       |
| `POST` | `/api/auth/signin`             | Initiates the sign-in process.                      | No             |
| `GET`  | `/api/projects`                | Fetches all projects.                               | No             |
| `POST` | `/api/projects`                | Creates a new project.                              | Required       |
| `GET`  | `/api/projects/:id`            | Fetches a single project by ID.                     | No             |
| `PUT`  | `/api/projects/:id`            | Updates an existing project by ID.                  | Required       |
| `DELETE` | `/api/projects/:id`          | Deletes a project by ID.                            | Required       |
| `GET`  | `/api/skills`                  | Fetches all skills.                                 | No             |
| `POST` | `/api/skills`                  | Creates a new skill.                                | Required       |
| `GET`  | `/api/skills/:id`              | Fetches a single skill by ID.                       | No             |
| `PUT`  | `/api/skills/:id`              | Updates an existing skill by ID.                    | Required       |
| `DELETE` | `/api/skills/:id`            | Deletes a skill by ID.                              | Required       |
| `GET`  | `/api/experience`              | Fetches all experience entries.                     | No             |
| `POST` | `/api/experience`              | Creates a new experience entry.                     | Required       |
| `GET`  | `/api/experience/:id`          | Fetches a single experience entry by ID.            | No             |
| `PUT`  | `/api/experience/:id`          | Updates an existing experience entry by ID.         | Required       |
| `DELETE` | `/api/experience/:id`        | Deletes an experience entry by ID.                  | Required       |

*Note: Endpoints requiring authentication are typically used by the portfolio owner to manage content via an administrative interface.*

## 📂 Project Structure

The project follows a standard Next.js App Router structure, enhanced with clear separation of concerns:

```
.
├── app/                      # Next.js App Router root
│   ├── api/                  # API Routes (backend)
│   │   ├── auth/             # NextAuth.js authentication routes
│   │   ├── experience/       # API for experience entries
│   │   ├── projects/         # API for projects
│   │   └── skills/           # API for skills
│   ├── (auth)/               # Authentication related pages (e.g., sign-in)
│   ├── (dashboard)/          # Protected routes for content management (e.g., admin panel)
│   ├── globals.css           # Global CSS styles
│   ├── layout.tsx            # Root layout for the application
│   └── page.tsx              # Root page component
├── components/               # Reusable React components
│   ├── ui/                   # Shadcn/ui or similar UI components
│   └── shared/               # Application-specific shared components
├── lib/                      # Utility functions and configurations
│   ├── auth.ts               # NextAuth.js configuration
│   ├── db.ts                 # Prisma client instance
│   └── utils.ts              # General utility functions
├── public/                   # Static assets (images, fonts, etc.)
├── prisma/                   # Prisma schema and migrations
│   ├── migrations/           # Database migration files
│   └── schema.prisma         # Prisma data model definition
├── types/                    # TypeScript custom types and interfaces
├── .env.example              # Example environment variables
├── next.config.js            # Next.js configuration
├── package.json              # Project dependencies and scripts
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project README file
```

## 🤝 Contributing

We welcome contributions to the Devportfolio project! If you have suggestions for improvements, new features, or bug fixes, please follow these guidelines.

1.  **Fork the repository:** Click the "Fork" button at the top right of this page.
2.  **Clone your forked repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/Devportfolio.git
    cd Devportfolio
    ```
3.  **Create a new branch:**
    ```bash
    git checkout -b feature/your-feature-name
    # or
    git checkout -b bugfix/issue-description
    ```
4.  **Make your changes:** Implement your feature or fix the bug.
5.  **Commit your changes:** Write clear and concise commit messages.
    ```bash
    git commit -m "feat: Add new project filtering option"
    # or
    git commit -m "fix: Resolve database connection error"
    ```
6.  **Push to your branch:**
    ```bash
    git push origin feature/your-feature-name
    ```
7.  **Open a Pull Request:** Go to the original repository on GitHub and open a new Pull Request from your forked repository. Provide a detailed description of your changes.

### Reporting Bugs

If you encounter any bugs, please open an issue on GitHub and provide:

*   A clear and concise description of the bug.
*   Steps to reproduce the behavior.
*   Expected behavior.
*   Screenshots or error messages, if applicable.
*   Your environment details (OS, Node.js version, browser).

### Feature Requests

For new features or enhancements, please open an issue on GitHub and describe:

*   The proposed feature.
*   Why it would be beneficial to the project.
*   Any potential design considerations.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

Yusuf Can Ozan
