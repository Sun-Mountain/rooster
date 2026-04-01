[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

# 🐓 Rooster Web App

Rooster Web App is built and maintained by the Electric Sheep Cooperative.

Rooster is currently under construction and not ready for use.

Rooster is a web application that allows students to sign up for classes, track their session progress, manage profiles, and interact with program administrators. Admin users can manage sessions, classes, students, payments, and more through a dedicated dashboard.

## 📖 Table of Contents
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#💡-about-rooster">About Rooster</a>
      <ul>
        <li>
          <a href="#🚧-built-with">Built With</a>
        </li>
        <li>
          <a href="🧩-features">Features</a>
        </li>
        <li>
          <a href="📝-important-notes">Important Notes</a>
        </li>
      </ul>
    </li>
    <li>
      <a href="#🌱-getting-started">Getting Started</a>
      <ul>
        <li>
          <a href="#📋-prerequisites">Prerequisites</a>
        </li>
        <li>
          <a href="#🛠️-installation">Installation</a>
        </li>
      </ul>
    </li>
    <li>
      <a href="#📢-acknowledgements">Acknowledgements</a>
    </li>
  </ol>
</details>

## 💡 About Rooster

The Rooster Web App provides a full platform for managing classes, student registration, and progress tracking. It supports both student-facing and admin-facing functionality. Students can register for accounts, select classes, pay for sessions, and track progress. Admins can manage all program data from a clean dashboard.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### 🚧 Built With

* [![Next][Next.js]][Next-url]
* [![Prisma][Prisma.io]][Prisma-url]
* [![PostgreSQL][PostgreSQL.org]][Postgres-url]
* [![TypeScript][Typescript.ts]][Typescript-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### 🧩 Features

✅ - Complete
⏳ - In Progress
❌ - Not Yet

* Student-Facing
  * ✅ Create and manage user profile (including emergency contacts and pronouns)
  * ✅ Auth via email + password
  * ❌ Email confirmation + password recovery
  * ❌ Browse available live classes
  * ❌ Sign up and pay for classes
  * ❌ View schedule and enrollment status
* Admin-Facing
  * ⏳ Admin dashboard with filtering, sorting, pagination
  * Create and manage:
    * ⏳ Sessions
    * ⏳ Classes
    * ❌ Student profiles
    * ⏳ User accounts
  * ⏳ Mark sessions as live for enrollment
  * ❌ Copy sessions and classes for quick reuse
  * ❌ Sort sessions by date (ASC/DESC)
  * ❌ Manage payments and enrollment
  * ❌ Send alerts and notifications
  * ❌ Connect preferred POS system (Stripe/Square/PayPal/Venmo)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### 📝 Important Notes

<p align="right">(<a href="#readme-top">back to top</a>)</p>

#### Sessions vs. Terms

There is a discrepancy in the database and the website. What are called "sessions" on the frontend are referred to "terms" on the backend.

This is because Sessions is the default word for a group of classes that repeat over a period of time and we did not want to confuse end users. However, sessions is used by `better-auth`, which is what Rooster uses for user authorization.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🌱 Getting Started

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### 📋 Prerequisites

* Node ≥ 22
* PostgreSQL ≥ 17
* NPM or Yarn or PNPM

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### 🛠️ Installation

Clone and navigate to the project folder:
```
git clone git@github.com:Sun-Mountain/rooster.git
cd rooster
```

Use preferred package manager to install 
```
pnpm / yarn / npm install
npx prisma generate
```

Create a `.env` file in the root folder:
```
APP_ENV=development
DATABASE_URL=
TEST_DATABASE_URL=
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=
```

Run the app:
```
pnpm / yarn / npm dev
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📢 Acknowledgements

* [Material UI](https://mui.com/material-ui/getting-started/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Sun-Mountain/Rooster.svg?style=for-the-badge
[contributors-url]: https://github.com/Sun-Mountain/Rooster/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Sun-Mountain/Rooster.svg?style=for-the-badge
[forks-url]: https://github.com/Sun-Mountain/Rooster/network/members
[stars-shield]: https://img.shields.io/github/stars/Sun-Mountain/Rooster.svg?style=for-the-badge
[stars-url]: https://github.com/Sun-Mountain/Rooster/stargazers
[issues-shield]: https://img.shields.io/github/issues/Sun-Mountain/Rooster.svg?style=for-the-badge
[issues-url]: https://github.com/Sun-Mountain/Rooster/issues
[license-shield]: https://img.shields.io/github/license/Sun-Mountain/Rooster.svg?style=for-the-badge
[license-url]: https://github.com/Sun-Mountain/Rooster/blob/master/LICENSE.txtp
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Prisma.io]: https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white
[Prisma-url]: https://www.prisma.io
[PostgreSQL.org]: https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&style=for-the-badge&logoColor=white
[Postgres-url]: https://www.postgresql.org
[Typescript.ts]: https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&style=for-the-badge&logoColor=fff
[Typescript-url]: https://www.typescriptlang.orgb