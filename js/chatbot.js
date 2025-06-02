 // Comprehensive Moodle navigation responses
        const DEMO_RESPONSES = {
            // Assignments
            "assignment": "📝 **Assignment Submission:**\n1) Navigate to your course\n2) Click the assignment title\n3) Click 'Add submission'\n4) Choose file upload or online text\n5) Attach files or type your answer\n6) Click 'Save changes'\n7) Finally click 'Submit assignment' to finalize",
            "submit": "To submit work: Go to course → Click assignment/activity → 'Add submission' → Upload files/enter text → 'Save changes' → 'Submit assignment'. Always check the deadline!",
            
            // Quizzes
            "quiz": "🎯 **Taking Quizzes:**\n1) Go to your course page\n2) Click on the quiz name\n3) Read instructions carefully\n4) Click 'Attempt quiz now'\n5) Answer questions (save frequently!)\n6) Click 'Finish attempt'\n7) Review answers if allowed\n8) Submit for grading",
            "test": "For tests/quizzes: Course page → Quiz name → 'Attempt quiz now' → Answer questions → 'Finish attempt' → Submit. Pay attention to time limits and attempt restrictions!",
            
            // Communication
            "lecturer": "💬 **Contacting Lecturers:**\n• **Messages:** Dashboard → Messages → Search lecturer name\n• **Email:** Course → Participants → Find lecturer → Send message\n• **Forums:** Post in course Q&A forum\n• **Office Hours:** Check course announcements\n• **Profile:** Visit lecturer's profile for contact info",
            "teacher": "To contact teachers: Use Moodle messaging (Dashboard → Messages), email through course participants, or post in course forums. Check their profile for office hours and contact preferences.",
            "message": "Send messages via: Dashboard → Messages → New message → Type recipient name. Or go to course → Participants → click on person → Message.",
            
            // Grades
            "grades": "📊 **Checking Grades:**\n• **Course grades:** Course page → Grades (left menu)\n• **All grades:** Dashboard → Grades\n• **Grade reports:** User menu → Grades\n• **Feedback:** Click on grade for detailed comments\n• **Grade history:** Shows all submissions and attempts",
            
            // Course Navigation
            "course": "🎓 **Course Navigation:**\n• **Enroll:** Need enrollment key from instructor\n• **Dashboard:** Shows all your courses\n• **Course sections:** Weekly/topic-based organization\n• **Activities:** Assignments, quizzes, forums, resources\n• **Completion:** Track progress with activity completion",
            "navigation": "Navigate Moodle: Dashboard (home) → My courses → Select course → Browse sections → Click activities. Use breadcrumbs to go back levels.",
            
            // Forums & Discussion
            "forum": "💭 **Discussion Forums:**\n• **Find:** Course page → Forums section\n• **Post:** Click forum → 'Add a new discussion topic'\n• **Reply:** Click discussion → 'Reply'\n• **Subscribe:** Get email notifications\n• **Search:** Use forum search box",
            "discussion": "Join discussions: Go to forum → Read posts → Click 'Reply' or 'Add new topic'. Be respectful and stay on topic!",
            
            // Resources & Files
            "download": "📁 **Downloading Files:**\n• Click on file/resource name\n• File opens in browser or downloads\n• Right-click → 'Save as' for specific location\n• Check Downloads folder\n• Some files need special software to open",
            "file": "Access files: Course page → Click resource name → File opens/downloads. For folders, click to browse contents.",
            
            // Profile & Settings
            "profile": "👤 **Profile Management:**\n• **Edit:** User menu → Profile → Edit profile\n• **Picture:** Upload profile photo\n• **Preferences:** Notification settings\n• **Security:** Change password\n• **Privacy:** Control who sees your info",
            
            // Calendar & Deadlines
            "calendar": "📅 **Calendar & Deadlines:**\n• **View:** Dashboard → Calendar block\n• **Events:** Assignment due dates auto-added\n• **Add:** Click date → 'New event'\n• **Export:** Download to your calendar app\n• **Reminders:** Set up notifications",
            "deadline": "Check deadlines: Dashboard calendar, course page, or assignment pages. Enable notifications to get reminders!",
            
            // Technical Help
            "login": "🔐 **Login Issues:**\n• Check username/password\n• Try 'Forgot password' link\n• Clear browser cache/cookies\n• Try different browser\n• Contact IT support if still stuck",
            "password": "Reset password: Login page → 'Forgotten your username or password?' → Enter email → Check inbox → Follow reset link",
            
            // Mobile & Apps
            "mobile": "📱 **Moodle Mobile:**\n• Download Moodle app\n• Use same login credentials\n• Access courses offline\n• Submit assignments on-the-go\n• Get push notifications",
            
            // General Help
            "help": "🤖 **I can help with:**\n• Submitting assignments & taking quizzes\n• Contacting lecturers & using forums\n• Checking grades & downloading files\n• Course navigation & calendar\n• Profile settings & mobile access\n• Technical troubleshooting\n\nWhat specific area do you need help with?",
            
            "default": "👋 Hi! I'm your Moodle navigation assistant. I can help you with assignments, quizzes, contacting lecturers, grades, forums, file downloads, and more. What would you like to know about?"
        };

        document.addEventListener('DOMContentLoaded', function() {
            // Create chatbot elements
            const chatbotContainer = document.createElement('div');
            chatbotContainer.className = 'chatbot-container';
            
            const chatbotButton = document.createElement('button');
            chatbotButton.className = 'chatbot-button';
            chatbotButton.innerHTML = `
            <img src="img/chatbot.gif" alt="Chatbot" class="chatbot-icon">
             `;
            
            const chatbotWindow = document.createElement('div');
            chatbotWindow.className = 'chatbot-window';
            chatbotWindow.style.display = 'none';
            
            const chatbotHeader = document.createElement('div');
            chatbotHeader.className = 'chatbot-header';
            
            const chatbotTitle = document.createElement('div');
            chatbotTitle.className = 'chatbot-title';
            chatbotTitle.textContent = 'LearnHub Assistant';
            
            const chatbotClose = document.createElement('button');
            chatbotClose.className = 'chatbot-close';
            chatbotClose.innerHTML = '×';
            
            const chatbotMessages = document.createElement('div');
            chatbotMessages.className = 'chatbot-messages';
            
            const chatbotInputArea = document.createElement('div');
            chatbotInputArea.className = 'chatbot-input-area';
            
            const chatbotInput = document.createElement('input');
            chatbotInput.className = 'chatbot-input';
            chatbotInput.type = 'text';
            chatbotInput.placeholder = 'Type your message...';
            
            const chatbotSend = document.createElement('button');
            chatbotSend.className = 'chatbot-send';
            chatbotSend.innerHTML = '➤';

            // Assemble the chatbot
            chatbotHeader.appendChild(chatbotTitle);
            chatbotHeader.appendChild(chatbotClose);
            
            chatbotInputArea.appendChild(chatbotInput);
            chatbotInputArea.appendChild(chatbotSend);
            
            chatbotWindow.appendChild(chatbotHeader);
            chatbotWindow.appendChild(chatbotMessages);
            chatbotWindow.appendChild(chatbotInputArea);
            
            chatbotContainer.appendChild(chatbotButton);
            chatbotContainer.appendChild(chatbotWindow);
            
            document.body.appendChild(chatbotContainer);

            // Chatbot functionality
            let isChatOpen = false;
            
            // Toggle chat window
            chatbotButton.addEventListener('click', function() {
                isChatOpen = !isChatOpen;
                chatbotWindow.style.display = isChatOpen ? 'flex' : 'none';
                if (isChatOpen) {
                    chatbotInput.focus();
                    if (chatbotMessages.children.length === 0) {
                        addMessage("Hello! I'm the LearnHub Moodle navigation assistant. How can I help you today?", 'bot');
                    }
                }
            });
            
            chatbotClose.addEventListener('click', function() {
                isChatOpen = false;
                chatbotWindow.style.display = 'none';
            });
            
            // Send message function
            async function sendMessage() {
                const messageText = chatbotInput.value.trim();
                if (messageText === '') return;
                
                addMessage(messageText, 'user');
                chatbotInput.value = '';
                
                showTypingIndicator();
                
                // Simulate API delay
                setTimeout(() => {
                    removeTypingIndicator();
                    const botReply = getBotResponse(messageText);
                    addMessage(botReply, 'bot');
                }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
            }

            // Enhanced bot response function with better keyword matching
            function getBotResponse(userMessage) {
                const message = userMessage.toLowerCase();
                
                // More specific keyword matching
                const keywords = {
                    'submit': ['submit', 'hand in', 'turn in', 'upload'],
                    'assignment': ['assignment', 'homework', 'coursework'],
                    'quiz': ['quiz', 'test', 'exam', 'assessment'],
                    'lecturer': ['lecturer', 'teacher', 'instructor', 'professor', 'contact'],
                    'grades': ['grade', 'mark', 'score', 'result'],
                    'forum': ['forum', 'discussion', 'chat', 'talk'],
                    'download': ['download', 'file', 'resource', 'material'],
                    'login': ['login', 'sign in', 'access', 'cant get in'],
                    'password': ['password', 'forgot', 'reset'],
                    'calendar': ['calendar', 'date', 'schedule'],
                    'deadline': ['deadline', 'due date', 'when is'],
                    'mobile': ['mobile', 'phone', 'app'],
                    'course': ['course', 'class', 'enroll', 'join'],
                    'navigation': ['navigate', 'find', 'where', 'how to get'],
                    'profile': ['profile', 'account', 'settings'],
                    'message': ['message', 'email', 'contact'],
                    'help': ['help', 'assist', 'support']
                };
                
                // Check for keyword matches
                for (const [category, wordList] of Object.entries(keywords)) {
                    if (wordList.some(keyword => message.includes(keyword))) {
                        return DEMO_RESPONSES[category] || DEMO_RESPONSES.default;
                    }
                }
                
                // Special combined queries
                if (message.includes('submit') && message.includes('assignment')) {
                    return DEMO_RESPONSES.submit;
                }
                if (message.includes('take') && (message.includes('quiz') || message.includes('test'))) {
                    return DEMO_RESPONSES.quiz;
                }
                if (message.includes('talk') && (message.includes('teacher') || message.includes('lecturer'))) {
                    return DEMO_RESPONSES.lecturer;
                }
                
                return DEMO_RESPONSES.default;
            }
            
            // Helper functions
            function addMessage(text, sender) {
                const messageDiv = document.createElement('div');
                messageDiv.className = `message ${sender}-message`;
                
                // Handle formatted text (with emojis and line breaks)
                if (text.includes('\n')) {
                    messageDiv.innerHTML = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                } else {
                    messageDiv.textContent = text;
                }
                
                chatbotMessages.appendChild(messageDiv);
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }

            function showTypingIndicator() {
                const typingDiv = document.createElement('div');
                typingDiv.className = 'typing-indicator';
                typingDiv.id = 'typing-indicator';
                typingDiv.innerHTML = `
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                `;
                chatbotMessages.appendChild(typingDiv);
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }

            function removeTypingIndicator() {
                const typingDiv = document.getElementById('typing-indicator');
                if (typingDiv) typingDiv.remove();
            }

            // Event listeners
            chatbotInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') sendMessage();
            });
            
            chatbotSend.addEventListener('click', sendMessage);
        });