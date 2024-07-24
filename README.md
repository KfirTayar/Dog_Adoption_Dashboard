# AdoptADog
AdoptADog is a MERN stack application for managing dog adoption records.

## Features
- Manage dog adoption records
- Add, edit, delete dog information
- Search for dogs by chip ID
- Filter and sort dog records

## API Endpoints
- `GET /dogs` - Fetch all dogs
- `GET /dogs/:chip` - Find a dog by chip ID
- `POST /dogs` - Add a new dog
- `PUT /dogs/:id` - Update dog information
- `DELETE /dogs/:id` - Delete a dog

## Configuration & Prerequisites

*Create a `.env` file in the root directory with the following content:*

```
MONGO_URI=mongodb://localhost:27017/yourDbName
PORT=3000
```

*Make sure that you pre-install the Prerequisites*
### Frontend
- Material-UI (MUI)
- Axios

### Backend
- Node.js
- Express.js
- Koa
- MongoDB
- mongoose
- dotenv

## Running the Project
```
npm start
```




