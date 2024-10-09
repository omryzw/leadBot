# AI Assistant for Lead Generation and Registration

## Overview
The AI Assistant is designed to simplify the lead generation and registration process for chatbots, providing a more natural, conversational experience. It captures leads, stores them in a database for human review, and uses LLM-based conversation history for automatic stage and state management.

## Features
- **Natural Conversation Flow**: Users can register effortlessly through dialogue, making the process intuitive and user-friendly.
- **Lead Capture**: Captures user leads during the conversation and saves them to a database.
- **Automatic State Management**: Utilizes conversation history to automatically manage the registration process stages.
- **Human Review**: Allows human reviewers to access and manage leads captured by the AI assistant.

## Technologies Used
- **Node.js**: For server-side logic and API development.
- **LangChain**: For handling language model interactions.
- **MongoDB**: For lead data storage and management.
- **Express.js**: To create the API endpoints.

## Installation
To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/omryzw/leadBot.git
   cd your-repo-name

2. ```bash
   npm install && npm run start

3. Check out env.example.txt to set up your env file

## Usage : POST : /bot/talk
```bash
{
  "userMessage": "Hello, I want to register.",
  "conversationId": "12345"
}
