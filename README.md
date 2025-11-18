# 🐓 Rooster App

A web application that allows students to sign up for classes, track their session progress, manage profiles, and interact with program administrators. Admin users can manage sessions, classes, students, payments, and more through a dedicated dashboard.

## 🚧 MVP Currently Under Construction 🚧

This project is currently not live.

## Overview

The Rooster web app provides a full platform for managing classes, student registration, and progress tracking. It supports both student-facing and admin-facing functionality. Students can register for accounts, select classes, pay for sessions, and track progress. Admins can manage all program data from a clean dashboard.

## Features

### Student-Facing
✅ Create and manage user profile (including emergency contacts and pronouns)
✅ Auth via email + password
⭕ Email confirmation + password recovery
⭕ Browse available sessions and classes
⭕ Sign up and pay for classes
⭕ View schedule and enrollment status

### Admin-Facing
⭕ Admin dashboard with filtering, sorting, pagination
🟨 Create and manage:
  ⭕ Sessions
  ⭕ Classes
  ⭕ Student profiles
  ⭕ User accounts
  ⭕ Mark sessions as live for enrollment
  ⭕ Copy sessions and classes for quick reuse
  ⭕ Sort sessions by date (ASC/DESC)
  ⭕ Manage payments and enrollment
  ⭕ Send alerts and notifications

## Tech Stack

### Frontend
- Next.js / React
- TypeScript
- Storybook (coming soon...)

### Backend
- Node.js
- REST
- Prisma
- PostgreSQL

### Other
- Stripe (payments) (coming soon...)
- SendGrid/Postmark (email) (coming soon...)
- Playwright (testing)

## Getting Started

### Prerequisites
- Node.js ≥ 18
- PostgreSQL ≥ 14
- Yarn or NPM or pnpm (project currently uses pnpm)

### Installation
