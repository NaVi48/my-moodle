// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * JavaScript for the Simple Chatbot block.
 *
 * @module     block_simplechatbot/chatbot
 * @copyright  2023 Your Name <your.email@example.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define(['jquery', 'core/ajax', 'core/str', 'core/notification'], function($, Ajax, Str, Notification) {
    
    /**
     * Module initialization function.
     */
    function init() {
        // Get the welcome message and display it.
        fetchConfig().then(function(config) {
            addMessage(config.welcomemessage, 'bot');
            
            // Set up event handlers.
            setupEventHandlers(config);
        }).catch(function(error) {
            Notification.exception(error);
        });
    }
    
    /**
     * Fetch configuration settings from the server.
     *
     * @return {Promise}
     */
    function fetchConfig() {
        return Ajax.call([{
            methodname: 'block_simplechatbot_get_config',
            args: {}
        }])[0];
    }
    
    /**
     * Set up event handlers for the chatbot interface.
     *
     * @param {Object} config - The chatbot configuration.
     */
    function setupEventHandlers(config) {
        var $input = $('#simplechatbot-input');
        var $sendButton = $('#simplechatbot-send');
        
        // Send button click handler.
        $sendButton.on('click', function() {
            processUserInput($input.val(), config);
            $input.val('');
        });
        
        // Enter key press handler.
        $input.on('keypress', function(e) {
            if (e.which === 13) {
                processUserInput($input.val(), config);
                $input.val('');
                e.preventDefault();
            }
        });
    }
    
    /**
     * Process user input and generate a response.
     *
     * @param {string} userInput - The user's input text.
     * @param {Object} config - The chatbot configuration.
     */
    function processUserInput(userInput, config) {
        if (!userInput.trim()) {
            return;
        }
        
        // Add the user's message to the chat.
        addMessage(userInput, 'user');
        
        // Find a matching question and respond.
        var response = findResponse(userInput, config);
        
        // Add the bot's response to the chat.
        setTimeout(function() {
            addMessage(response, 'bot');
        }, 500);
    }
    
    /**
     * Find a response for the given user input.
     *
     * @param {string} userInput - The user's input text.
     * @param {Object} config - The chatbot configuration.
     * @return {string} The bot's response.
     */
    function findResponse(userInput, config) {
        var questionAnswers;
        
        try {
            questionAnswers = JSON.parse(config.questionanswerpairs);
        } catch (e) {
            console.error('Error parsing question-answer pairs:', e);
            return config.fallbackmessage;
        }
        
        // Normalize the user input for comparison.
        var normalizedInput = userInput.toLowerCase().trim();
        
        // Look for a matching question.
        for (var i = 0; i < questionAnswers.length; i++) {
            var qa = questionAnswers[i];
            var normalizedQuestion = qa.question.toLowerCase().trim();
            
            // Simple exact matching for now.
            if (normalizedInput === normalizedQuestion) {
                return qa.answer;
            }
        }
        
        // No match found, return the fallback message.
        return config.fallbackmessage;
    }
    
    /**
     * Add a message to the chat interface.
     *
     * @param {string} message - The message text.
     * @param {string} sender - The sender ('user' or 'bot').
     */
    function addMessage(message, sender) {
        var $messagesContainer = $('#simplechatbot-messages');
        var messageClass = 'simplechatbot-message simplechatbot-' + sender + '-message';
        
        var $messageElement = $('<div class="' + messageClass + '"></div>');
        $messageElement.text(message);
        
        $messagesContainer.append($messageElement);
        
        // Scroll to the bottom of the messages container.
        $messagesContainer.scrollTop($messagesContainer[0].scrollHeight);
    }
    
    return {
        init: init
    };
});

