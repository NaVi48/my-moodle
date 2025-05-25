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
 * JavaScript for the chatbot block.
 *
 * @module     block_chatbot/chatbot
 * @package    block_chatbot
 * @copyright  2023 Your Name <your.email@example.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define(['jquery', 'core/ajax', 'core/notification', 'core/str', 'core/config'], 
function($, Ajax, Notification, Str, Config) {
    
    /**
     * Module initialization function.
     */
    function init() {
        // Add the chatbot container to the page if it doesn't exist.
        if ($('#chatbot-container').length === 0) {
            addChatbotToPage();
        }

        // Set up event listeners.
        setupEventListeners();
    }

    /**
     * Adds the chatbot HTML to the page.
     */
    function addChatbotToPage() {
        const chatbotHtml = `
            <div id="chatbot-container" class="chatbot-container">
                <div class="chatbot-header">
                    <div class="chatbot-title">Chat Bot</div>
                    <div class="chatbot-controls">
                        <button class="chatbot-minimize" aria-label="Minimize">−</button>
                        <button class="chatbot-close" aria-label="Close">×</button>
                    </div>
                </div>
                <div class="chatbot-body">
                    <div class="chatbot-messages">
                        <div class="chatbot-message bot">
                            <div class="chatbot-message-content">Hello! How can I help you today?</div>
                        </div>
                    </div>
                    <div class="chatbot-input-container">
                        <input type="text" class="chatbot-input" placeholder="Type your message here..." aria-label="Type your message">
                        <button class="chatbot-send" aria-label="Send message">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <button id="chatbot-toggle" class="chatbot-toggle" aria-label="Open chat">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                        <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z"/>
                    </svg>
                </button>
            </div>
        `;

        $('body').append(chatbotHtml);

        // Add the CSS for the chatbot.
        const style = document.createElement('style');
        style.textContent = `
            .chatbot-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 350px;
                height: 450px;
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                display: flex;
                flex-direction: column;
                z-index: 9999;
                overflow: hidden;
                transition: all 0.3s ease;
                display: none;
            }
            
            .chatbot-header {
                background-color: #0f6cbf;
                color: white;
                padding: 10px 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: move;
            }
            
            .chatbot-title {
                font-weight: bold;
            }
            
            .chatbot-controls button {
                background: none;
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
                margin-left: 5px;
            }
            
            .chatbot-body {
                flex: 1;
                display: flex;
                flex-direction: column;
                padding: 15px;
                overflow: hidden;
            }
            
            .chatbot-messages {
                flex: 1;
                overflow-y: auto;
                padding-right: 5px;
            }
            
            .chatbot-message {
                margin-bottom: 10px;
                display: flex;
            }
            
            .chatbot-message.user {
                justify-content: flex-end;
            }
            
            .chatbot-message-content {
                padding: 8px 12px;
                border-radius: 18px;
                max-width: 80%;
                word-wrap: break-word;
            }
            
            .chatbot-message.bot .chatbot-message-content {
                background-color: #f1f0f0;
                color: #333;
                border-bottom-left-radius: 5px;
            }
            
            .chatbot-message.user .chatbot-message-content {
                background-color: #0f6cbf;
                color: white;
                border-bottom-right-radius: 5px;
            }
            
            .chatbot-input-container {
                display: flex;
                margin-top: 10px;
                border-top: 1px solid #e0e0e0;
                padding-top: 10px;
            }
            
            .chatbot-input {
                flex: 1;
                padding: 8px 12px;
                border: 1px solid #ddd;
                border-radius: 20px;
                outline: none;
            }
            
            .chatbot-send {
                background-color: #0f6cbf;
                color: white;
                border: none;
                border-radius: 50%;
                width: 36px;
                height: 36px;
                margin-left: 8px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .chatbot-toggle {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background-color: #0f6cbf;
                color: white;
                border: none;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9998;
                transition: all 0.3s ease;
            }
            
            .chatbot-toggle:hover {
                transform: scale(1.05);
            }
            
            /* Responsive adjustments */
            @media (max-width: 480px) {
                .chatbot-container {
                    width: 100%;
                    height: 100%;
                    bottom: 0;
                    right: 0;
                    border-radius: 0;
                }
                
                .chatbot-toggle {
                    bottom: 10px;
                    right: 10px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Sets up event listeners for the chatbot.
     */
    function setupEventListeners() {
        // Toggle chatbot visibility.
        $(document).on('click', '#chatbot-toggle', function() {
            $('#chatbot-container').show();
            $(this).hide();
        });

        // Close chatbot.
        $(document).on('click', '.chatbot-close', function() {
            $('#chatbot-container').hide();
            $('#chatbot-toggle').show();
        });

        // Minimize chatbot.
        $(document).on('click', '.chatbot-minimize', function() {
            $('#chatbot-container').hide();
            $('#chatbot-toggle').show();
        });

        // Send message on button click.
        $(document).on('click', '.chatbot-send', function() {
            sendMessage();
        });

        // Send message on Enter key press.
        $(document).on('keypress', '.chatbot-input', function(e) {
            if (e.which === 13) {
                sendMessage();
                e.preventDefault();
            }
        });

        // Make chatbot draggable.
        makeDraggable();
    }

    /**
     * Makes the chatbot draggable.
     */
    function makeDraggable() {
        let isDragging = false;
        let offsetX, offsetY;

        $(document).on('mousedown', '.chatbot-header', function(e) {
            isDragging = true;
            const container = $('#chatbot-container');
            offsetX = e.clientX - container.offset().left;
            offsetY = e.clientY - container.offset().top;
        });

        $(document).on('mousemove', function(e) {
            if (isDragging) {
                const container = $('#chatbot-container');
                container.css({
                    'right': 'auto',
                    'bottom': 'auto',
                    'left': (e.clientX - offsetX) + 'px',
                    'top': (e.clientY - offsetY) + 'px'
                });
            }
        });

        $(document).on('mouseup', function() {
            isDragging = false;
        });
    }

    /**
     * Sends a user message to the chatbot.
     */
    function sendMessage() {
        const input = $('.chatbot-input');
        const message = input.val().trim();
        
        if (message === '') {
            return;
        }
        
        // Add user message to chat.
        addMessage(message, 'user');
        
        // Clear input.
        input.val('');
        
        // Process the message and get a response.
        processMessage(message);
    }

    /**
     * Adds a message to the chat.
     * 
     * @param {string} message - The message text.
     * @param {string} sender - The sender ('user' or 'bot').
     */
    function addMessage(message, sender) {
        const messageHtml = `
            <div class="chatbot-message ${sender}">
                <div class="chatbot-message-content">${message}</div>
            </div>
        `;
        
        $('.chatbot-messages').append(messageHtml);
        
        // Scroll to bottom.
        const messagesContainer = $('.chatbot-messages');
        messagesContainer.scrollTop(messagesContainer[0].scrollHeight);
    }

    /**
     * Processes a user message and generates a response.
     * 
     * @param {string} message - The user's message.
     */
    function processMessage(message) {
        // Show typing indicator.
        const typingHtml = `
            <div class="chatbot-message bot" id="typing-indicator">
                <div class="chatbot-message-content">
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                </div>
            </div>
        `;
        
        $('.chatbot-messages').append(typingHtml);
        
        // In a real implementation, you would call an API here.
        // For this example, we'll use a simple response after a delay.
        setTimeout(function() {
            // Remove typing indicator.
            $('#typing-indicator').remove();
            
            // Add bot response.
            let response;
            
            // Simple response logic - in a real implementation, this would be more sophisticated.
            if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
                response = "Hello! How can I help you today?";
            } else if (message.toLowerCase().includes('course') || message.toLowerCase().includes('class')) {
                response = "You can find your courses on the Dashboard or by clicking on 'My courses' in the navigation.";
            } else if (message.toLowerCase().includes('assignment') || message.toLowerCase().includes('homework')) {
                response = "To view your assignments, go to your course page and look for the assignments section.";
            } else if (message.toLowerCase().includes('grade') || message.toLowerCase().includes('score')) {
                response = "You can check your grades in the 'Grades' section of each course.";
            } else if (message.toLowerCase().includes('help') || message.toLowerCase().includes('support')) {
                response = "If you need help, you can contact your instructor or the support team through the messaging system.";
            } else {
                response = "I'm not sure I understand. Could you please rephrase your question?";
            }
            
            addMessage(response, 'bot');
            
            // In a real implementation, you would use AJAX to send the message to a server.
            // Example:
            /*
            Ajax.call([{
                methodname: 'block_chatbot_process_message',
                args: {
                    message: message
                },
                done: function(response) {
                    addMessage(response.message, 'bot');
                },
                fail: function(error) {
                    Notification.exception(error);
                    addMessage("Sorry, I'm having trouble processing your request.", 'bot');
                }
            }]);
            */
        }, 1000);
    }

    return {
        init: init
    };
});

