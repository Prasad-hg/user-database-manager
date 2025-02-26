#User Management System 👥  

Description  

Welcome to the User Management System built using Node.js, Express, MySQL, and EJS. This app allows users to perform CRUD operations (Create, Read, Update, Delete) on a user database. Users can:

Add new users  

Update existing users  

Delete users after authentication  


Features ⚙️  

🔑 User Authentication: Secure deletion of users after password verification. 

📝 Add New User: Add users with essential details like ID, username, email, and password. 

✏️ Update User: Update a user’s username after verifying their password. 

❌ Delete User: Delete a user only after confirming the email and password. 

📜 View Users: List all users with their details.


 
Technologies Used 🛠️ 

Node.js: JavaScript runtime for server-side development. 

Express: Web framework for building RESTful APIs and handling requests. 

MySQL: Relational database to store user data. 

EJS: Templating engine for rendering dynamic HTML pages. 



Setup Instructions 🏗️

1. Clone this repository:
   git clone <repository-url> 
2. Install required dependencies:
   npm install
3. Set up MySQL database with the necessary tables.
4. Update the database connection settings in index.js.
5. Start the application:
6. Visit the app in your browser at http://localhost:8080.

Endpoints 📍

GET /: Display the home page with user count and management options.

GET /user: Show all users.

GET /user/:id/edit: Edit a user’s information.

POST /user/delete: Delete a user after authentication.

PATCH /user/:id: Update user’s details.


Contributing 🙌
We welcome contributions! Feel free to fork this repository and submit a pull request. If you have any issues or suggestions, please open an issue on GitHub.


