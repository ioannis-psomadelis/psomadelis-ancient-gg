# GraphQL Blog Posts

An Angular application for managing blog posts using GraphQL, built with Angular 18.2.10.

## Installation

### 1. Install dependencies and run the project

- Node.js version > 18

```bash
npm install
```

```bash
npm run start
```

### Working demo

[Live Demo](https://psomadelis-ancient-gg.vercel.app/)

## 🚀 Features

- **Post Listing**: Fetch and display posts from GraphQLZero API
- **Post Details**: View individual post details with dedicated routing
- **Post Creation**: Create new posts with local state persistence
- **State Management**: State handling with NgRx and facade pattern
- **GraphQL Integration**: Apollo Client implementation for API communication
- **Skeleton Loaders**: Skeleton loader for better user experience

## 🏗️ Project Structure

- `src/app/core`: Core module with shared layout components and providers
- `src/app/features`: Features module with individual features containing components, models, services, store, and routing
- `src/app/shared`: Shared components and utils

## 🔧 Configuration

### GraphQL Setup

The application uses Apollo Client to communicate with the GraphQLZero API. Configuration can be found in:

- `src/app/core/providers/apollo.ts`

### State Management Setup

The application uses NgRx for centralized state management

- `src/app/features/blog/store`

### Facade architectural pattern setup

The application uses the facade architectural pattern to manage the state and side effects.

- `src/app/features/blog/store/blog.facade.ts`

## 📚 Features Documentation

### 1. Post Listing

- Displays a grid of posts fetched from GraphQLZero API + local posts from the store
- Pagination controls for navigating through posts

### 2. Post Details

- Dedicated route: `/posts/:id`
- Displays title - description - author - comments
- Implements back navigation with state preservation (back to paginated page)

### 3. Post Creation

- Form-based post creation interface
- Call to the API and then store the new post in the store