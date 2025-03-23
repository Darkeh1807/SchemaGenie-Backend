# SchemaGenie Backend

SchemaGenie is an AI-powered tool that assists users in designing and managing database schemas efficiently. This backend provides API endpoints to store, retrieve, and generate database schemas by Google GEMINI based on user input.

Test App Here: https://schemagenie.vercel.app/

## Features

- AI-powered schema generation
- Project-based schema storage
- Real-time chat history retrieval
- REST API for CRUD operations

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** (Mongoose ODM)
- **TypeScript**
- **Gemini API** (for AI-driven schema generation)

## Installation

```sh
# Clone the repository
git clone https://github.com/Darkeh1807/SchemaGenie-Backend.git
cd SchemaGenie-Backend

# Install dependencies
npm install
```

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
PORT=5000
DB_URL=your-mongodb-url
GEMINI_API_KEY=your-gemini-api-key
```

## Running the Server

### Development
```sh
npm run dev
```

### Production
```sh
npm start
```

## API Endpoints

### Create a New Project
```http
POST /api/projects
```
#### Request Body
```json
{
  "title": "Project Title"
}
```

### Save chat
```http
POST /api/chats/
```
### Get Project Chat History
```http
GET /api/chats/:projectId
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Create a Pull Request

## License



