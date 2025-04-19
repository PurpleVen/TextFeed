# Text Feed With Search

A full-stack web application for creating posts, adding comments, and searching through posts and comments. This project includes authentication via Firebase, a RESTful API for posts and comments, and MongoDB for data storage.

## Tech Stack

### Frontend:
- **React**
- **Vite**
- **Chakra UI**
- **Firebase Authentication**
  
### Backend:
- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose**

### Additional Libraries:
- **Axios**
- **Docker**
- **Docker Compose**

## Features

- **Authentication**: Users can log in with Google using Firebase Authentication.
- **Post Feed**: Users can create, view, and comment on posts.
- **Search**: Users can search for posts or comments based on a query.
- **Commenting**: Users can add comments to posts.

## Architecture

### Backend (Node.js + Express):
1. **Posts API**:
   - `GET /posts`: Fetches all posts.
   - `POST /posts`: Creates a new post.
   - `POST /posts/:postId/comment`: Adds a comment to a post.
   - `GET /posts/search`: Searches for posts or comments based on a query.

2. **MongoDB**: Data is stored in MongoDB, including posts and their associated comments.

### Docker:
The application is containerized using Docker for both the frontend, backend, and MongoDB. The services are orchestrated with Docker Compose.

---

## Project Setup

### Prerequisites

Make sure you have the following installed:
- Docker
- Docker Compose
- Node.js and NPM (for local development if needed)

### Running the Project Locally

1. Clone the repository:

```bash
git clone TextFeed
cd TextFeed
```
2. Install dependencies:
```bash
# For backend
cd backend
npm install

# For frontend
cd frontend
npm install
```

3. Start the services using Docker Compose:
```bash
docker-compose up --build
```

