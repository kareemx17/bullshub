# Bulls Marketplace

BullsMarket is a comprehensive marketplace designed to disrupt the monopoly on lab kits and books by providing college students a platform to affordably buy, sell, and exchange used lab materials. The application allows students to connect based on location, ensuring easy transactions for academic resources.

<img src="/bulls.png" alt="Homepage" />

## Features

This project offers a variety of features designed to enhance the connectivity and interaction among users within a geographically defined area. Below are the key functionalities:

- **Proximity-Based User Matching**: Utilizes the Google Maps API to fetch and manage user locations. The platform leverages a Quick Sort Algorithm to efficiently sort users based on their proximity, enabling the system to match students who are closest to each other. This feature is particularly useful for creating localized user experiences and fostering community interactions.

- **Real-Time Messaging**: Integrates a robust real-time messaging feature using Socket.io, which allows users to communicate instantaneously within the platform. This feature is supported by a PostgreSQL database backend that maintains message integrity and history securely.

- **Enhanced Security with JSON Web Tokens (JWT)**: Ensures secure communication and data exchange across the platform. The implementation of JWT provides a mechanism for authenticating requests and protecting against common security threats, ensuring that all messages and user interactions are securely managed.

- **Authentication Using OAuth**: Implements OAuth authentication to facilitate secure and straightforward user logins. This feature allows users to authenticate using existing credentials from external providers (e.g., Google, Facebook), simplifying the login process while maintaining high security and privacy standards.

These features are designed to provide a seamless and secure user experience, promoting effective communication and interaction among students within the same locality.

