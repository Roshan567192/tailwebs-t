MERN Assignment Workflow Portal

A Role-Based Assignment Workflow Portal built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that supports Teacher and Student roles. Teachers can create and publish assignments, while students can view published assignments and submit their answers.

🏗 Project Structure
MERN-Assignment-Portal/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── assignmentController.js
│   │   └── submissionController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Assignment.js
│   │   └── Submission.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── assignmentRoutes.js
│   │   └── submissionRoutes.js
│   ├── seeder.js
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── api.js
    │   ├── components/
    │   │   ├── Login.jsx
    │   │   ├── TeacherDashboard.jsx
    │   │   ├── StudentDashboard.jsx
    │   │   ├── AssignmentForm.jsx
    │   │   
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── App.jsx
    │   ├── index.js
    │   └── styles/
    │       └── main.css
    ├── package.json
    

⚙️ Backend Setup
1. Install dependencies
cd backend
npm install

2. Configure Environment Variables

Create a .env file in the backend folder:

PORT=5000
MONGO_URI=mongodb://localhost:27017/assignment_portal
JWT_SECRET=your_jwt_secret_here

3. Seed Database with Test Users

Run the seeder script:

node seeder.js


Test Accounts:

Role	Email	Password
Teacher	teacher567@gmail.com
	teacher123
Student	student567@gmail.com
	student123
4. Start Backend Server
npm run dev


Server runs at http://localhost:5000

🎨 Frontend Setup
1. Install dependencies
cd ../frontend
npm install

2. Start Frontend
npm run dev


Frontend runs at http://localhost:5173

🔑 Features
Teacher

Login/Logout

Create, edit, and publish assignments

Update assignment status: Draft → Published → Completed

View all assignments

Student

Login/Logout

View Published assignments only

Submit answers for assignments (once per assignment)

See submission status

Common

JWT Authentication

Role-based access control

MongoDB for data persistence

RESTful APIs using Express.js

🧩 API Endpoints

Authentication

Method	Endpoint	Description
POST	/api/auth/login	User login

Assignments

Method	Endpoint	Description
GET	/api/assignments	Get all assignments (role-based)
POST	/api/assignments	Create new assignment (Teacher)
PUT	/api/assignments/:id/status	Update assignment status (Teacher)

Submissions

Method	Endpoint	Description
POST	/api/submissions	Submit assignment answer (Student)
GET	/api/submissions/:assignmentId	Get submissions for an assignment (Teacher)
🚀 Quick Test Flow
Teacher

Email: teacher@example.com

Password: teacher123

Redirected to /teacher

Can create and publish assignments

Student

Email: student@example.com

Password: student123

Redirected to /student

Can view only Published assignments

Can submit answers (once per assignment)

💡 Next Enhancements

File uploads for assignments and submissions

Role-based route protection on frontend

Display dynamic submission status for students

Notifications for new assignments

Enhanced UI/UX with Tailwind or Material UI

🛠 Tech Stack

Frontend: React.js, Vite, Axios, Context API

Backend: Node.js, Express.js, JWT Authentication

Database: MongoDB

Authentication: JWT, bcryptjs

Styling: Tailwind CSS / Custom CSS

⚡ Running the Full Project

Start MongoDB (mongod) or configure Atlas URI in .env

Run Backend:

cd backend
npm run dev


Run Frontend:

cd frontend
npm run dev
