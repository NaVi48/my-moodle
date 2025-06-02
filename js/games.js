$(document).ready(function() {
    // Initialize all games when their modals are shown
    $('.game-modal').on('show.bs.modal', function() {
        const gameId = $(this).attr('id');
        switch(gameId) {
            case 'memory-game':
                initMemoryGame();
                break;
            case 'quiz-game':
                initQuizGame();
                break;
            case 'typing-game':
                initTypingGame();
                break;
            case 'math-game':
                initMathGame();
                break;
            case 'word-game':
                initWordGame();
                break;
            case 'puzzle-game':
                initPuzzleGame();
                break;
        }
    });
    
    // Reset games when modals are hidden
    $('.game-modal').on('hidden.bs.modal', function() {
        const gameId = $(this).attr('id');
        switch(gameId) {
            case 'memory-game':
                resetMemoryGame();
                break;
            case 'quiz-game':
                resetQuizGame();
                break;
            case 'typing-game':
                resetTypingGame();
                break;
            case 'math-game':
                resetMathGame();
                break;
            case 'word-game':
                resetWordGame();
                break;
            case 'puzzle-game':
                resetPuzzleGame();
                break;
        }
    });
    
    // Memory Game (already completed in previous response)
    // ...
    
    // Quiz Game (already completed in previous response)
    // ...
    
    function endQuiz() {
        clearInterval(quizTimer);
        $('#quiz-game-container').hide();
        $('#quiz-results').show();
        
        const percentage = Math.round((score / quizQuestions.length) * 100);
        const totalTime = (quizQuestions.length * 30) - timeLeft;
        
        $('#quiz-final-score').text(score);
        $('#quiz-percentage').text(`${percentage}%`);
        $('#quiz-time-taken').text(`${totalTime}s`);
        
        if (percentage >= 80) {
            $('#quiz-result-title').text('Excellent!');
            $('#quiz-result-message').text('You have an excellent general knowledge! Keep it up!');
        } else if (percentage >= 60) {
            $('#quiz-result-title').text('Good Job!');
            $('#quiz-result-message').text('You have good knowledge, but there\'s room for improvement!');
        } else {
            $('#quiz-result-title').text('Keep Practicing!');
            $('#quiz-result-message').text('Keep learning and try again to improve your score!');
        }
    }
    
    $('#quiz-restart').click(function() {
        resetQuizGame();
        $('#quiz-results').hide();
        $('#quiz-intro').show();
    });
    
    // Typing Game
    let typingTimer;
    let typingTimeLeft = 60;
    let typingActive = false;
    let typingText = "";
    let typingSampleTexts = [
        "The quick brown fox jumps over the lazy dog. This sentence contains all the letters in the English alphabet.",
        "Programming is the process of creating a set of instructions that tell a computer how to perform a task.",
        "Learning to type quickly and accurately is an essential skill in today's digital world.",
        "Practice makes perfect. The more you type, the better and faster you will become at typing.",
        "Typing games can help improve your typing speed while making the learning process fun and engaging."
    ];
    let correctChars = 0;
    let totalChars = 0;
    
    function initTypingGame() {
        resetTypingGame();
        $('#typing-intro').show();
        $('#typing-game-container').hide();
        $('#typing-results').hide();
        
        // Display a random sample text
        const randomIndex = Math.floor(Math.random() * typingSampleTexts.length);
        $('#typing-sample').text(typingSampleTexts[randomIndex]);
    }
    
    function resetTypingGame() {
        typingTimeLeft = 60;
        typingActive = false;
        correctChars = 0;
        totalChars = 0;
        $('#typing-wpm').text('0');
        $('#typing-timer').text('60');
        $('#typing-accuracy').text('100%');
        $('#typing-input').val('');
        clearInterval(typingTimer);
    }
    
    $('#typing-start').click(function() {
        $('#typing-intro').hide();
        $('#typing-game-container').show();
        
        // Use the sample text or a predefined text
        typingText = $('#typing-sample').text();
        $('#typing-text').html(highlightTypingText(''));
        
        startTypingTimer();
        typingActive = true;
        
        $('#typing-input').focus();
    });
    
    function highlightTypingText(inputText) {
        let html = '';
        for (let i = 0; i < typingText.length; i++) {
            let char = typingText[i];
            if (i < inputText.length) {
                if (char === inputText[i]) {
                    html += `<span class="correct-char">${char}</span>`;
                    correctChars++;
                } else {
                    html += `<span class="incorrect-char">${char}</span>`;
                }
                totalChars++;
            } else {
                html += char;
            }
        }
        return html;
    }
    
    function startTypingTimer() {
        typingTimer = setInterval(() => {
            typingTimeLeft--;
            $('#typing-timer').text(typingTimeLeft);
            
            // Calculate WPM (5 characters = 1 word)
            const typedWords = correctChars / 5;
            const minutes = (60 - typingTimeLeft) / 60;
            const wpm = Math.round(typedWords / minutes) || 0;
            $('#typing-wpm').text(wpm);
            
            // Calculate accuracy
            const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
            $('#typing-accuracy').text(`${accuracy}%`);
            
            if (typingTimeLeft <= 0) {
                endTypingGame();
            }
        }, 1000);
    }
    
    $('#typing-input').on('input', function() {
        if (!typingActive) return;
        
        const inputText = $(this).val();
        $('#typing-text').html(highlightTypingText(inputText));
        
        // Reset counts for new calculation
        correctChars = 0;
        totalChars = 0;
        
        // Check if all text has been typed
        if (inputText.length >= typingText.length) {
            endTypingGame();
        }
    });
    
    function endTypingGame() {
        clearInterval(typingTimer);
        typingActive = false;
        $('#typing-game-container').hide();
        $('#typing-results').show();
        
        // Calculate final stats
        const typedWords = correctChars / 5;
        const minutes = (60 - typingTimeLeft) / 60;
        const wpm = Math.round(typedWords / minutes) || 0;
        const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
        const errors = totalChars - correctChars;
        
        $('#typing-final-wpm').text(wpm);
        $('#typing-final-accuracy').text(`${accuracy}%`);
        $('#typing-final-errors').text(errors);
    }
    
    $('#typing-restart').click(function() {
        resetTypingGame();
        $('#typing-results').hide();
        $('#typing-intro').show();
    });
    
    // Math Game
    function initMathGame() {
        resetMathGame();
        generateMathProblem();
        startMathTimer();
    }
    
    function resetMathGame() {
        $('#math-score').text('0');
        $('#math-timer').text('60');
        $('#math-problems').empty();
        clearInterval(mathTimer);
        mathScore = 0;
        mathTimeLeft = 60;
    }
    
    function generateMathProblem() {
        const operations = ['+', '-', '*'];
        const operation = operations[Math.floor(Math.random() * operations.length)];
        let num1, num2, answer;
        
        switch(operation) {
            case '+':
                num1 = Math.floor(Math.random() * 50) + 1;
                num2 = Math.floor(Math.random() * 50) + 1;
                answer = num1 + num2;
                break;
            case '-':
                num1 = Math.floor(Math.random() * 50) + 1;
                num2 = Math.floor(Math.random() * num1) + 1;
                answer = num1 - num2;
                break;
            case '*':
                num1 = Math.floor(Math.random() * 12) + 1;
                num2 = Math.floor(Math.random() * 12) + 1;
                answer = num1 * num2;
                break;
        }
        
        $('#math-problem').text(`${num1} ${operation} ${num2} = ?`);
        $('#math-answer').val('').data('correct', answer);
    }
    
    $('#math-submit').click(function() {
        const userAnswer = parseInt($('#math-answer').val()) || 0;
        const correctAnswer = parseInt($('#math-answer').data('correct'));
        
        if (userAnswer === correctAnswer) {
            mathScore++;
            $('#math-score').text(mathScore);
            $('#math-feedback').text('Correct!').addClass('correct').removeClass('incorrect').show();
        } else {
            $('#math-feedback').text(`Incorrect! The answer was ${correctAnswer}`).addClass('incorrect').removeClass('correct').show();
        }
        
        setTimeout(() => {
            $('#math-feedback').hide();
            generateMathProblem();
        }, 1500);
    });
    
    function startMathTimer() {
        mathTimer = setInterval(() => {
            mathTimeLeft--;
            $('#math-timer').text(mathTimeLeft);
            
            if (mathTimeLeft <= 0) {
                clearInterval(mathTimer);
                $('#math-feedback').text(`Time's up! Your score: ${mathScore}`).addClass('correct').show();
                $('#math-submit').prop('disabled', true);
            }
        }, 1000);
    }
    
    // Word Game
    function initWordGame() {
        resetWordGame();
        setupWordGrid();
        startWordTimer();
    }
    
    function resetWordGame() {
        $('#word-score').text('0');
        $('#word-timer').text('60');
        $('#word-words').empty();
        $('#word-found').empty();
        clearInterval(wordTimer);
        wordScore = 0;
        wordTimeLeft = 60;
        foundWords = [];
    }
    
    function setupWordGrid() {
        // Simple word search implementation
        const words = ['LEARN', 'STUDY', 'READ', 'WRITE', 'KNOW', 'BRAIN', 'MIND', 'FOCUS'];
        const gridSize = 10;
        let grid = Array(gridSize).fill().map(() => Array(gridSize).fill(''));
        
        // Place words horizontally
        words.forEach(word => {
            const row = Math.floor(Math.random() * gridSize);
            const col = Math.floor(Math.random() * (gridSize - word.length));
            
            for (let i = 0; i < word.length; i++) {
                grid[row][col + i] = word[i];
            }
        });
        
        // Fill remaining spaces with random letters
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (grid[i][j] === '') {
                    grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
                }
            }
        }
        
        // Display grid
        let gridHtml = '';
        for (let i = 0; i < gridSize; i++) {
            gridHtml += '<div class="word-row">';
            for (let j = 0; j < gridSize; j++) {
                gridHtml += `<span class="word-cell" data-row="${i}" data-col="${j}">${grid[i][j]}</span>`;
            }
            gridHtml += '</div>';
        }
        
        $('#word-grid').html(gridHtml);
        $('#word-wordlist').html(words.map(word => `<li>${word}</li>`).join(''));
    }
    
    // Puzzle Game
    function initPuzzleGame() {
        resetPuzzleGame();
        setupPuzzle();
        startPuzzleTimer();
    }
    
    function resetPuzzleGame() {
        $('#puzzle-moves').text('0');
        $('#puzzle-timer').text('0:00');
        clearInterval(puzzleTimer);
        puzzleMoves = 0;
        puzzleSeconds = 0;
    }
    
    function setupPuzzle() {
        // Simple sliding puzzle implementation
        const size = 3;
        let numbers = Array.from({length: size * size - 1}, (_, i) => i + 1);
        numbers.push(0); // 0 represents the empty space
        
        // Shuffle the numbers
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        
        // Create puzzle grid
        let gridHtml = '';
        for (let i = 0; i < size; i++) {
            gridHtml += '<div class="puzzle-row">';
            for (let j = 0; j < size; j++) {
                const index = i * size + j;
                const num = numbers[index];
                if (num === 0) {
                    gridHtml += '<div class="puzzle-cell empty" data-index="${index}"></div>';
                } else {
                    gridHtml += `<div class="puzzle-cell" data-index="${index}" data-number="${num}">${num}</div>`;
                }
            }
            gridHtml += '</div>';
        }
        
        $('#puzzle-grid').html(gridHtml);
        
        // Add click handlers
        $('.puzzle-cell').click(function() {
            if ($(this).hasClass('empty')) return;
            
            const index = parseInt($(this).data('index'));
            const emptyIndex = $('.puzzle-cell.empty').data('index');
            
            // Check if adjacent to empty cell
            if (isAdjacent(index, emptyIndex, size)) {
                // Move tile
                $(this).addClass('empty').removeAttr('data-number').empty();
                $('.puzzle-cell.empty').not(this).removeClass('empty')
                    .attr('data-number', $(this).data('number'))
                    .text($(this).data('number'));
                
                puzzleMoves++;
                $('#puzzle-moves').text(puzzleMoves);
                
                // Check if puzzle is solved
                if (isPuzzleSolved()) {
                    clearInterval(puzzleTimer);
                    setTimeout(() => {
                        alert(`Congratulations! You solved the puzzle in ${puzzleMoves} moves and ${formatTime(puzzleSeconds)}!`);
                    }, 500);
                }
            }
        });
    }
    
    function isAdjacent(index1, index2, size) {
        const row1 = Math.floor(index1 / size);
        const col1 = index1 % size;
        const row2 = Math.floor(index2 / size);
        const col2 = index2 % size;
        
        return (Math.abs(row1 - row2) === 1 && col1 === col2) || 
               (Math.abs(col1 - col2) === 1 && row1 === row2);
    }
    
    function isPuzzleSolved() {
        let correct = true;
        $('.puzzle-cell').each(function(index) {
            const num = $(this).data('number') || 0;
            if (num !== index + 1 && index !== 8) {
                correct = false;
                return false; // break loop
            }
        });
        return correct;
    }
    
    function startPuzzleTimer() {
        puzzleTimer = setInterval(() => {
            puzzleSeconds++;
            const minutes = Math.floor(puzzleSeconds / 60);
            const seconds = puzzleSeconds % 60;
            $('#puzzle-timer').text(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        }, 1000);
    }
    
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    }

    // Replace the existing event listener with:
$('#startBreakBtn').on('click', function() {
    startBreakTimer();

    $(document).ready(function() {
    // Break Timer Functionality
    let breakTimer;
    let timeLeft = 0;
    let isPaused = false;
    
    // Break Over Modal
    const breakOverModal = $(`
        <div class="break-over-modal" id="breakOverModal">
            <div class="break-over-content">
                <h3>Break Time is Over!</h3>
                <p>Your scheduled break has ended. Ready to get back to learning?</p>
                <button class="btn btn-brand" id="closeBreakModal">Back to Work</button>
            </div>
        </div>
    `);
    $('body').append(breakOverModal);
    
    // Start Break Button
    $('#startBreak').click(function() {
        const minutes = parseInt($('#breakMinutes').val());
        if (minutes > 0) {
            startTimer(minutes * 60);
            $('#breakMinutes').prop('disabled', true);
            $(this).hide();
            $('#cancelBreak').show();
            $('.timer-display').show();
        }
    });
    
    // Cancel Break Button
    $('#cancelBreak').click(function() {
        clearInterval(breakTimer);
        resetTimer();
        $(this).hide();
        $('#startBreak').show();
        $('.timer-display').hide();
        $('#breakMinutes').prop('disabled', false);
    });
    
    // Pause Break Button
    $('#pauseBreak').click(function() {
        if (isPaused) {
            // Resume timer
            startTimer(timeLeft);
            $(this).html('<i class="bx bx-pause"></i>');
            isPaused = false;
        } else {
            // Pause timer
            clearInterval(breakTimer);
            $(this).html('<i class="bx bx-play"></i>');
            isPaused = true;
        }
    });
    
    // Close Break Modal Button
    $('#closeBreakModal').click(function() {
        $('#breakOverModal').fadeOut();
    });
    
    function startTimer(seconds) {
        timeLeft = seconds;
        updateTimerDisplay();
        
        clearInterval(breakTimer);
        breakTimer = setInterval(function() {
            if (!isPaused) {
                timeLeft--;
                updateTimerDisplay();
                
                if (timeLeft <= 0) {
                    clearInterval(breakTimer);
                    showBreakOverModal();
                    resetTimer();
                }
            }
        }, 1000);
    }
    
    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        $('#timeRemaining').text(
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
    }
    
    function resetTimer() {
        $('#breakMinutes').prop('disabled', false);
        $('#startBreak').show();
        $('#cancelBreak').hide();
        $('.timer-display').hide();
        isPaused = false;
    }
    
    function showBreakOverModal() {
        $('#breakOverModal').fadeIn();
        
        // Add confetti effect for celebration
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 2001 };
        
        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }
        
        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();
            
            if (timeLeft <= 0) {
                return clearInterval(interval);
            }
            
            const particleCount = 50 * (timeLeft / duration);
            
            // Since particles fall down, start a bit higher than random
            confetti(
                Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
                })
            );
            confetti(
                Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
                })
            );
        }, 250);
    }
});
});
});