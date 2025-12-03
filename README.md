# Microservice Java React Project

A full-stack microservice application with a Java Spring Boot backend and React frontend.

## Project Structure

```
microservice-project/
├── backend/                 # Java Spring Boot Microservice
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/microservice/
│   │   │   │   ├── BackendApplication.java
│   │   │   │   ├── controller/
│   │   │   │   ├── model/
│   │   │   │   ├── repository/
│   │   │   │   └── service/
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   └── pom.xml
│
└── frontend/               # React Application
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── services/
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## Backend (Java Spring Boot)

### Features
- RESTful API with Spring Boot 3.2.0
- JPA/Hibernate for database operations
- H2 in-memory database for development
- PostgreSQL support for production
- User CRUD operations
- Health check endpoint
- CORS enabled for frontend integration

### Prerequisites
- Java 17 or higher
- Maven 3.6+

### Running the Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### API Endpoints

- `GET /api/health` - Health check
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Database

- **Development**: H2 in-memory database (accessible at `/h2-console`)
- **Production**: PostgreSQL (configure via environment variables)

## Frontend (React)

### Features
- React 18.2.0
- Modern UI with responsive design
- User management interface
- Axios for API calls
- Form validation

### Prerequisites
- Node.js 16+ and npm

### Running the Frontend

```bash
cd frontend
npm install
npm start
```

The frontend will start on `http://localhost:3000`

## Docker

You mentioned you'll create the Docker files. Here are some hints for your Dockerfiles:

### Backend Dockerfile
- Base image: `openjdk:17-jdk-slim` or `eclipse-temurin:17-jdk-alpine`
- Copy `pom.xml` first for better layer caching
- Run `mvn clean package -DskipTests`
- Expose port 8080
- Use `java -jar` to run the JAR file

### Frontend Dockerfile
- Base image: `node:18-alpine` for build stage
- Use multi-stage build
- Build stage: `npm install` and `npm run build`
- Production stage: Use `nginx:alpine` to serve static files
- Expose port 80

## Environment Variables

### Backend
- `DB_HOST` - Database host (default: localhost)
- `DB_PORT` - Database port (default: 5432)
- `DB_NAME` - Database name (default: mydb)
- `DB_USER` - Database user (default: postgres)
- `DB_PASSWORD` - Database password (default: postgres)

### Frontend
- `REACT_APP_API_URL` - Backend API URL (default: /api)

## Development

1. Start the backend service first
2. Start the frontend application
3. The frontend is configured to proxy API requests to `http://localhost:8080`

## Production Deployment

1. Build both services
2. Configure environment variables
3. Use Docker containers for deployment
4. Ensure proper networking between services

## License

MIT

