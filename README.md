
#  IBY-Chat-Assignment Backend

#### Name : Amratansh Shrivastava
#### University : IIT Roorkee
#### Department : Production and Industrial Engineering



##  Project Overview

This repository contains the backend of the IBY-Chat-Assignment project. This backend is built using Express as the NodeJS framework, Mongoose for managing MongoDb, and leverages key technologies like Bcrypt, JsonWebToken, and Socket.IO to provide essential functionalities for a real-time chat application. The project follows the MVC (Model-View-Controller) architecture, ensuring a structured and organized codebase. It offers a range of methods to support chat functionality, including creating chats, creating groups, changing group information (e.g., title and users), and leaving groups.




## Technologies used
- Express : The backend server is developed using Express, a popular Node.js framework, to handle routes, requests, and responses efficiently.

- Mongoose : Mongoose is used as an Object Data Modeling (ODM) library for MongoDB. It simplifies database operations and provides a structured way to interact with the database.

- Bcrypt : Bcrypt is employed for secure password hashing and validation, enhancing the security of user data.

- JsonWebToken (JWT) : JWT is used for user authentication, providing a secure and efficient way to manage user sessions and access control.

- Socket.IO : Socket.IO is implemented to enable real-time communication and chat functionality, ensuring a seamless and interactive user experience.


## Features

The backend of IBY-Chat-Assignment offers a range of functionalities, including:

- Creating Chats : Users can create one-on-one chats for private conversations.

- Creating Groups : Users can create groups, enabling multiple users to participate in a chat.

- Changing Group Information : Group administrators can modify group information, such as the group's title and users.

- Leaving Groups : Users can leave groups when they no longer wish to be part of a particular chat.

## Project Structure

The project is structured following the MVC (Model-View-Controller) architecture. This separation of concerns helps maintain a clean and organized codebase. The key directories include:

- Models : Contains data models and schemas for database interactions.

- Controllers : Handles the application's logic, including chat creation, group management, and user authentication.

- Routes : Defines API routes, specifying how incoming requests are handled.

## Installation

To install my project on your machine, Fork this repository and then clone it to your machine.

```bash
  git clone <repository-url>
```

Now, install all the dependencies using npm.
```bash
    npm install
```

The project is setup on your machine. To run the project, enter the following.
```bash
    npm run start
```

## Reach Out

Thank you for checking out the IBY-Chat-Assignment project! If you have any questions or suggestions, please feel free to reach out.
