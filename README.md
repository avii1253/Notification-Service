# Notification Service Application

A lightweight and modular notification service built using Node.js, supporting Email, SMS, and In-App notifications. Messages are handled asynchronously with Bull (Redis-based queue) and retry logic.

## Git Repository Link

    https://github.com/avii1253/Notification-Service.git 

## Setup Instructions:

### 1. Clone the Repo & Install Dependencies

    git clone https://github.com/avii1253/Notification-Service.git
    cd Notification-Service
    npm install

### 2. Set Up Redis (Required)

    docker run --name redis -p 6379:6379 redis

### 3. Environment Variables

   > Create a .env file in the root directory and add the following:

    PORT=8080
    EMAIL_FROM=anandavinash1253@gmail.com
    EMAIL_PASS=**** **** **** ****

### 4. Start the Server
    npm run dev


## API Endpoints:

### 1. POST   /notifications

> Queue a new notification to be processed.

> POST request on this URL.

    localhost:8080/notifications/
    
  >  Request Body:

    {
        "userId": "191",
        "type": "email",
        "content": "Your Booking is confirmed!",
        "channelInfo": {
            "email": "22052018@kiit.ac.in",
            "phone": "9523613460"
        }
    }

   > type: "email", "sms", or "in-app"

   > channelInfo: required for email and sms

   > Response:

    {
        "message": "Notification queued successfully"
    }

### 2. GET   /notifications/user/:userId

   > Fetch all notifications sent to a specific user.

   > Example:

   > > GET http://localhost:8080/notifications/user/191

   > Response:

                [
                    {
                        "id": "...",  // it will be a UUID
                        "userId": "191",
                        "type": "in-app",
                        "content": "Your Booking is confirmed!",
                        "channelInfo": {
                            "email": "22052018@kiit.ac.in",
                            "phone": "9523613460"
                        },
                        "status": "sent",
                        "timestamp": "2025-05-18T09:33:21.000Z"
                    }
                ]

    
## Notification Types: 

   > Type	Delivery Channel <br>
   
   > email	Sent via Gmail (Nodemailer) <br>
   
   > sms	Simulated via console.log <br>
   
   > in-app	Simulated via console.log <br>


## Queueing System:

> This service uses Bull (built on Redis) for managing notification jobs asynchronously.

> Retries: Configured with attempts: 3 and backoff: 5 seconds
 
> Failure handling with retry + logging

> Queue worker runs automatically from notificationQueue.js <br>

> Why Bull?

> > > Simpler and well-documented than RabbitMQ/Kafka for this scale. Mentioned for clarity.


## Project Structure:

    Notification-Service/
    ├── src/
    │   ├── app.js
    │   ├── server.js
    │   ├── routes/
    │   │   └── notificationRouter.js
    │   ├── controllers/
    │   │   └── notificationController.js
    │   ├── services/
    │   │   └── notificationServices.js
    │   ├── queues/
    │   │   └── notificationQueue.js
    │   └── models/
    │       └── database.js
    ├── .env
    ├── .gitignore
    └── README.md

## ASSUMPTIONS: 

> SMS and In-App delivery are simulated via logs.

> Notifications are stored in-memory (array in database.js) — this can be replaced with a database later.

> Email sending assumes a valid Gmail App Password setup.

> Best Working on local machine and handleing all post and get requests.

> Ensure docker is installed in your local machine otherwise redis will not function.

## Testing:

> Use Postman to test endpoints
    
## Deployed URL Link
    https://notification-service-1k50.onrender.com
> This url is listening to the requests but redis cloud is not connected so it will not send responses.
