# Eventify

Eventify is a modern event management platform built with MERN stack.


## Features

### User Management
- 👤 Authentication (Register/Login/Logout)
- 🔐 JWT-based security with refresh tokens
- 👥 Role-based access control (Manager, Member, Sponsor)
- 🛡️ Protected routes 
  
### Event Management
- ✨ Create and manage events
- 📝 Edit event details
- 🗑️ Delete events
- 🖼️ Image upload support

## Additional Features
- 📰 Latest news integration
- 🎨 Modern UI with Tailwind CSS
- ✅ Form validation with Joi


## Technologies Used
### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Joi Validation
- UploadThing for image handling

### Frontend
- React.js
- Tailwind CSS
- Axios for API calls
- React Router for navigation
- Context API for state management

## Getting Started

### Prerequisites
- **Node.js**
- **MongoDB**

---

### 1. Clone the Repository
```
git clone https://github.com/BrahimJd/Events-Personal-proj
cd Events-Personal-proj
```

---

### 2. Install Dependencies
Run the following commands to install dependencies for both server and client:
```
# Install server dependencies
cd Backend
npm install

# Install client dependencies
cd ../Frontend
npm install
```

---

### 3. Environment Variables Setup

#### Server (.env)
Create a `.env` file in the `Backend` directory with the following content:
```
PORT=3000
MONGO_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id
```

#### Client (.env)
Create a `.env` file in the `Frontend` directory with the following content:
```
VITE_SEATGEEK_CLIENT_ID=your_seatgeek_client_id
VITE_UPLOADTHING_APP_ID=your_uploadthing_app_id
VITE_UPLOADTHING_SECRET=your_uploadthing_secret
```

---

### 4. Start the Application
Run the following commands to start the server and client:

#### Start the server
From the `Backend` directory:
```
cd Backend
npm start
```

#### Start the client
From the `Frontend` directory:
```
cd ../Frontend
npm run dev
```

---


  
## Images

![241114_01h50m24s_screenshot](https://github.com/user-attachments/assets/a18488de-19c5-4244-9c2a-a250175342b5)
![image](https://github.com/user-attachments/assets/171d8f3f-e186-4dbf-ab27-1e07f7d1ec0c)
![image](https://github.com/user-attachments/assets/f89f51c9-cade-4b4e-9867-bbbb28266975)
![image](https://github.com/user-attachments/assets/34fb69be-76ce-4fdc-a504-d820a5657877)
![image](https://github.com/user-attachments/assets/c7cd9397-7d22-4f31-88e5-9a13fe356e5a)
![image](https://github.com/user-attachments/assets/bb7ba246-3e72-4bc3-8317-d519568b58b1)
![image](https://github.com/user-attachments/assets/df888c56-1297-4aec-b0e6-c30163672df0)

