# Simple Chatbot Block for Moodle

A simple, self-contained chatbot block for Moodle that helps students and teachers with frequently asked questions.

## Features

- Simple chat interface within a Moodle block
- Responds to predefined questions using a static list
- No external APIs or dependencies - everything is contained within Moodle
- Configurable Q&A pairs through the admin settings
- Customizable welcome and fallback messages

## Installation

1. Download the plugin files and extract them into the `blocks/simplechatbot` directory of your Moodle installation.
2. Log in as an administrator and visit the notifications page to complete the installation.
3. Once installed, you can add the block to any course page.

## Configuration

### Global Settings

As an administrator, you can configure the global settings for the chatbot:

1. Go to Site administration > Plugins > Blocks > Simple Chatbot
2. Configure the following settings:
   - Welcome message: The message displayed when the chatbot is first loaded
   - Fallback message: The message displayed when the chatbot doesn't understand a question
   - Question and Answer pairs: A JSON array of question-answer pairs

Example Q&A pairs format:
```json
[
  {
    "question": "What is Moodle?",
    "answer": "Moodle is an open-source learning management system."
  },
  {
    "question": "How do I reset my password?",
    "answer": "You can reset your password by clicking on the 'Forgotten your username or password?' link on the login page."
  }
]
```

### Block Instance Settings

When adding the block to a page, you can configure:

- Block title: The title displayed at the top of the block

## Usage

1. Add the Simple Chatbot block to a course page
2. Students and teachers can type questions in the input field
3. The chatbot will respond with the appropriate answer if the question matches one of the predefined questions
4. If no match is found, the chatbot will display the fallback message

## Requirements

- Moodle 3.9 or higher

## License

This plugin is licensed under the GNU GPL v3 or later. See the LICENSE file for details.

