# Posts Feed With Search

A full-stack web application for creating posts, adding comments, and searching through posts and comments. This project is built with a modern tech stack and includes authentication via Firebase, a RESTful API for posts and comments, and MongoDB for data storage.

## Tech Stack

### Frontend:
- **React**: JavaScript library for building the user interface.
- **Vite**: Next-generation build tool for fast development.
- **Chakra UI**: A component library for building modern UIs.
- **Firebase Authentication**: For handling user authentication (Google Sign-in).
  
### Backend:
- **Node.js**: JavaScript runtime for building the backend API.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database used for storing posts and comments.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.

### Additional Libraries:
- **Axios**: Promise-based HTTP client for making API requests.
- **Docker**: For containerization of the application.
- **Docker Compose**: To manage multi-container Docker applications.

## Features

- **Authentication**: Users can log in with Google using Firebase Authentication.
- **Post Feed**: Users can create, view, and comment on posts.
- **Search**: Users can search for posts or comments based on a query.
- **Pagination**: The app supports paginated display of posts.
- **Commenting**: Users can add comments to posts.

## Architecture

### Frontend (React):
1. **Firebase Authentication**: Handles user authentication through Google.
2. **Post Feed**: Displays posts and their associated comments.
3. **Post Creation**: Users can create new posts with a text message.
4. **Search**: Allows searching for posts and comments.

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
git clone <repository-url>
cd <project-folder>

2. Install dependencies:
# For backend
cd backend
npm install

# For frontend
cd frontend
npm install

3. Start the services using Docker Compose:
docker-compose up --build

