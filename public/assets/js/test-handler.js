class TestHandler {
    constructor() {
        this.currentQuestion = 0;
        this.questions = [];
        this.userAnswers = [];
        this.flaggedQuestions = new Set();
        this.testData = null;
        this.timeLeft = 600; // 10 minutes in seconds (constant)
        this.timerInterval = null;
        this.isReviewMode = false;

        // DOM Elements
        this.elements = {
            title: document.querySelector('.test-title'),
            questionCounter: document.getElementById('question-counter'),
            timer: document.getElementById('timer'),
            questionText: document.getElementById('question-text'),
            optionsContainer: document.getElementById('options-container'),
            prevBtn: document.getElementById('prev-btn'),
            nextBtn: document.getElementById('next-btn'),
            submitBtn: document.getElementById('submit-test-btn'),
            resultContainer: document.getElementById('result-container'),
            score: document.getElementById('score'),
            feedbackMessage: document.getElementById('feedback-message'),
            reviewBtn: document.getElementById('review-btn'),
            progressBar: document.getElementById('progress-bar'),
            questionNav: document.getElementById('question-navigation'),
            flagBtn: document.getElementById('flag-btn')
        };

        // Event Listeners
        this.elements.prevBtn.addEventListener('click', () => this.previousQuestion());
        this.elements.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.elements.submitBtn.addEventListener('click', () => this.submitTest());
        this.elements.reviewBtn.addEventListener('click', () => this.reviewAnswers());
        this.elements.flagBtn?.addEventListener('click', () => this.toggleFlagQuestion());

        // Initialize
        this.loadTest();
    }

    async loadTest() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const classYear = urlParams.get('class');
            const subject = urlParams.get('subject');
            const examType = urlParams.get('exam');
            
            if (!classYear || !subject) {
                throw new Error('Class year and subject are required');
            }

            // Convert subject to lowercase for consistency
            const subjectLower = subject.toLowerCase();
            
            // Determine the test path based on the type of test
            let testPath;
            if (examType) {
                testPath = `../assets/tests/competitive-tests/${classYear}/${subjectLower}-${examType}.json`;
            } else {
                // Use the correct path to the subject file
                testPath = `../assets/tests/class-tests/${classYear}/${subjectLower}.json`;
            }

            console.log('Attempting to load test from:', testPath);
            
            const response = await fetch(testPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            this.testData = await response.json();
            
            if (!this.testData || !this.testData.questions || !Array.isArray(this.testData.questions)) {
                throw new Error('Invalid test data format');
            }
            
            this.questions = this.testData.questions;
            this.timeLeft = 600; // Use fixed 10 minutes (600 seconds)
            
            this.elements.title.textContent = this.testData.testName || `${subject} Test`;
            this.startTimer();
            this.displayQuestion();
        } catch (error) {
            console.error('Error loading test:', error);
            this.elements.title.textContent = 'Error Loading Test';
            this.elements.questionText.textContent = 'There was an error loading the test. Please try again or contact support.';
            this.elements.questionCounter.textContent = 'Error';
            this.elements.timer.textContent = '--:--';
            
            // Hide navigation buttons
            this.elements.prevBtn.style.display = 'none';
            this.elements.nextBtn.style.display = 'none';
            this.elements.submitBtn.style.display = 'none';
        }
    }

    displayQuestion() {
        if (!this.questions.length) return;

        const question = this.questions[this.currentQuestion];
        this.elements.questionCounter.textContent = `Question ${this.currentQuestion + 1}/${this.questions.length}`;
        this.elements.questionText.textContent = question.question;
        
        // Update navigation buttons
        this.elements.prevBtn.style.display = this.currentQuestion === 0 ? 'none' : 'block';
        this.elements.nextBtn.style.display = this.currentQuestion === this.questions.length - 1 ? 'none' : 'block';
        
        // Clear previous options
        this.elements.optionsContainer.innerHTML = '';
        
        // Create radio buttons for options
        question.options.forEach((option, index) => {
            const optionContainer = document.createElement('div');
            optionContainer.className = 'option-container';
            
            const input = document.createElement('input');
            input.type = 'radio';
            input.id = `option${index}`;
            input.name = 'answer';
            input.value = index;
            input.checked = this.userAnswers[this.currentQuestion] === index;
            
            const label = document.createElement('label');
            label.htmlFor = `option${index}`;
            label.textContent = option;
            
            optionContainer.appendChild(input);
            optionContainer.appendChild(label);
            this.elements.optionsContainer.appendChild(optionContainer);
            
            input.addEventListener('change', () => {
                this.userAnswers[this.currentQuestion] = index;
                this.updateProgress();
            });
        });
        
        // Update flag button state
        if (this.elements.flagBtn) {
            this.elements.flagBtn.classList.toggle('flagged', this.flaggedQuestions.has(this.currentQuestion));
        }
        
        this.updateProgress();
        this.updateQuestionNavigation();
    }

    updateProgress() {
        const answeredCount = this.userAnswers.filter(answer => answer !== undefined).length;
        const progress = (answeredCount / this.questions.length) * 100;
        
        // Update progress bar
        this.elements.progressBar.innerHTML = `<div class="progress" style="width: ${progress}%"></div>`;
        
        // Enable submit button if at least one question is answered
        this.elements.submitBtn.disabled = answeredCount === 0;
    }

    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.displayQuestion();
        }
    }

    nextQuestion() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            this.displayQuestion();
        }
    }

    startTimer() {
        // Set initial display
        const updateTimerDisplay = () => {
            const minutes = Math.floor(this.timeLeft / 60);
            const seconds = this.timeLeft % 60;
            this.elements.timer.textContent = `Time Left: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        };

        // Initial display without starting countdown
        updateTimerDisplay();

        // Start the countdown
        this.timerInterval = setInterval(() => {
            if (this.timeLeft > 0) {
                this.timeLeft--;
                updateTimerDisplay();
                
                // Warning when 2 minutes remaining
                if (this.timeLeft === 120) {
                    this.showTimeWarning('2 minutes remaining!');
                }
                // Warning when 1 minute remaining
                else if (this.timeLeft === 60) {
                    this.showTimeWarning('1 minute remaining!');
                }
                // Warning when 30 seconds remaining
                else if (this.timeLeft === 30) {
                    this.showTimeWarning('30 seconds remaining!');
                }
            } else {
                this.submitTest();
            }
        }, 1000);
    }

    showTimeWarning(message) {
        const warning = document.createElement('div');
        warning.className = 'time-warning';
        warning.textContent = message;
        document.body.appendChild(warning);
        
        setTimeout(() => {
            warning.classList.add('fade-out');
            setTimeout(() => warning.remove(), 1000);
        }, 2000);
    }

    calculateScore() {
        let correct = 0;
        this.questions.forEach((question, index) => {
            if (this.userAnswers[index] === question.correctAnswer) {
                correct++;
            }
        });
        return Math.round((correct / this.questions.length) * 100);
    }

    getFeedback(score) {
        if (!this.testData.feedbackRanges) {
            // Default feedback messages if feedbackRanges is not defined
            if (score >= 90) {
                return 'Excellent! Outstanding performance!';
            } else if (score >= 80) {
                return 'Great job! Very good performance!';
            } else if (score >= 70) {
                return 'Good work! Keep it up!';
            } else if (score >= 60) {
                return 'Fair performance. Room for improvement.';
            } else {
                return 'Keep practicing. You can do better!';
            }
        }
        
        const feedback = this.testData.feedbackRanges.find(
            range => score >= range.min && score <= range.max
        );
        return feedback ? feedback.message : 'Thank you for completing the test.';
    }

    submitTest() {
        try {
            clearInterval(this.timerInterval);
            const score = this.calculateScore();
            const totalQuestions = this.questions.length;
            const answeredQuestions = this.userAnswers.filter(answer => answer !== undefined).length;
            const timeSpent = 600 - this.timeLeft;
            
            // Create the results HTML
            const resultsHTML = `
                <h2>Test Results</h2>
                <div class="score-display">
                    <div class="score-circle">
                        <span class="score-value">${score}%</span>
                        <span class="score-label">Score</span>
                    </div>
                </div>
                
                <div class="feedback-message">
                    ${this.getFeedback(score)}
                </div>

                <div class="detailed-results">
                    <h3>Test Summary</h3>
                    <div class="result-grid">
                        <div class="result-item">
                            <span class="result-label">Total Questions</span>
                            <span class="result-value">${totalQuestions}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">Questions Answered</span>
                            <span class="result-value">${answeredQuestions}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">Questions Skipped</span>
                            <span class="result-value">${totalQuestions - answeredQuestions}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">Accuracy</span>
                            <span class="result-value">${score}%</span>
                        </div>
                    </div>
                    
                    <div class="time-taken">
                        <i class="fas fa-clock"></i> Time Taken: ${Math.floor(timeSpent / 60)}m ${timeSpent % 60}s
                    </div>
                </div>

                <button id="review-answers-btn" class="review-btn">
                    <i class="fas fa-search"></i> Review Answers
                </button>
            `;
            
            // Update the result content
            const resultContent = document.createElement('div');
            resultContent.className = 'result-content';
            resultContent.innerHTML = resultsHTML;
            
            // Clear and update the result container
            this.elements.resultContainer.innerHTML = '';
            this.elements.resultContainer.appendChild(resultContent);
            
            // Show results page
            document.querySelector('.test-container').classList.add('submitted');
            this.elements.resultContainer.style.display = 'block';
            
            // Add event listener to the new review button
            document.getElementById('review-answers-btn')?.addEventListener('click', () => this.reviewAnswers());
            
            // Scroll to top of results
            window.scrollTo(0, 0);
        } catch (error) {
            console.error('Error submitting test:', error);
            alert('There was an error submitting your test. Please try again.');
        }
    }

    reviewAnswers() {
        this.isReviewMode = true;
        document.querySelector('.test-container').classList.remove('submitted');
        this.elements.resultContainer.style.display = 'none';
        
        this.currentQuestion = 0;
        this.displayQuestion();
    }

    createDetailedAnalysis() {
        const totalQuestions = this.questions.length;
        const answeredQuestions = this.userAnswers.filter(answer => answer !== undefined).length;
        const correctAnswers = this.questions.reduce((count, question, index) => 
            count + (this.userAnswers[index] === question.correctAnswer ? 1 : 0), 0);
        
        const score = Math.round((correctAnswers / totalQuestions) * 100);
        const timeSpent = 600 - this.timeLeft;
        
        // Create subject-wise analysis
        const subjectAnalysis = {};
        this.questions.forEach((question, index) => {
            const subject = question.subject || 'General';
            if (!subjectAnalysis[subject]) {
                subjectAnalysis[subject] = { total: 0, correct: 0 };
            }
            subjectAnalysis[subject].total++;
            if (this.userAnswers[index] === question.correctAnswer) {
                subjectAnalysis[subject].correct++;
            }
        });
        
        let analysisHTML = `
            <h2>Test Analysis</h2>
            <div class="score-summary">
                <div class="score-circle">
                    <span class="score-value">${score}%</span>
                    <span class="score-label">Score</span>
                </div>
                <div class="time-info">
                    <p>Time Taken: ${Math.floor(timeSpent / 60)}m ${timeSpent % 60}s</p>
                    <p>Questions Attempted: ${answeredQuestions}/${totalQuestions}</p>
                    <p>Correct Answers: ${correctAnswers}/${totalQuestions}</p>
                </div>
            </div>
            
            <div class="subject-analysis">
                <h3>Subject-wise Performance</h3>
                <div class="subject-grid">
        `;
        
        for (const [subject, data] of Object.entries(subjectAnalysis)) {
            const subjectScore = Math.round((data.correct / data.total) * 100);
            analysisHTML += `
                <div class="subject-card">
                    <h4>${subject}</h4>
                    <div class="subject-stats">
                        <div class="subject-score">${subjectScore}%</div>
                        <p>Correct: ${data.correct}/${data.total}</p>
                    </div>
                </div>
            `;
        }
        
        analysisHTML += `
                </div>
            </div>
            <div class="review-instructions">
                <p>Click on questions below to review your answers. Correct answers are marked in green, incorrect in red.</p>
            </div>
        `;
        
        return analysisHTML;
    }

    toggleFlagQuestion() {
        if (this.flaggedQuestions.has(this.currentQuestion)) {
            this.flaggedQuestions.delete(this.currentQuestion);
        } else {
            this.flaggedQuestions.add(this.currentQuestion);
        }
        this.updateQuestionNavigation();
        this.displayQuestion();
    }

    updateQuestionNavigation() {
        if (!this.elements.questionNav) return;
        
        this.elements.questionNav.innerHTML = '';
        this.questions.forEach((_, index) => {
            const button = document.createElement('button');
            button.className = 'question-nav-btn';
            button.textContent = index + 1;
            
            if (this.userAnswers[index] !== undefined) {
                button.classList.add('answered');
            }
            if (this.flaggedQuestions.has(index)) {
                button.classList.add('flagged');
            }
            if (index === this.currentQuestion) {
                button.classList.add('current');
            }
            
            button.addEventListener('click', () => {
                this.currentQuestion = index;
                this.displayQuestion();
            });
            
            this.elements.questionNav.appendChild(button);
        });
    }
}

// Initialize the test handler when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TestHandler();
});

function updateQuestionStatus(questionIndex) {
    const questionButtons = document.querySelectorAll('.question-nav-btn');
    questionButtons.forEach((btn, index) => {
        btn.classList.remove('current');
        
        // Update status classes
        if (index === questionIndex) {
            btn.classList.add('current');
        }
        if (userAnswers[index] !== undefined) {
            btn.classList.add('answered');
        } else {
            btn.classList.remove('answered');
        }
        if (flaggedQuestions.has(index)) {
            btn.classList.add('flagged');
        } else {
            btn.classList.remove('flagged');
        }
        if (userAnswers[index] === undefined && index < currentQuestionIndex) {
            btn.classList.add('skipped');
        } else {
            btn.classList.remove('skipped');
        }
    });
}

function createQuestionNavigation() {
    const navigationContainer = document.getElementById('question-navigation');
    navigationContainer.innerHTML = '';
    
    for (let i = 0; i < testData.questions.length; i++) {
        const button = document.createElement('button');
        button.className = 'question-nav-btn';
        button.textContent = i + 1;
        button.addEventListener('click', () => navigateToQuestion(i));
        navigationContainer.appendChild(button);
    }
    updateQuestionStatus(currentQuestionIndex);
}

function displayQuestion(index) {
    // ... existing code ...
    updateQuestionStatus(index);
    // ... existing code ...
}

// Add flagged questions tracking
let flaggedQuestions = new Set();

document.getElementById('flag-btn').addEventListener('click', function() {
    if (flaggedQuestions.has(currentQuestionIndex)) {
        flaggedQuestions.delete(currentQuestionIndex);
    } else {
        flaggedQuestions.add(currentQuestionIndex);
    }
    this.classList.toggle('flagged');
    updateQuestionStatus(currentQuestionIndex);
});

// Update navigation functions
function navigateToQuestion(index) {
    if (index >= 0 && index < testData.questions.length) {
        currentQuestionIndex = index;
        displayQuestion(currentQuestionIndex);
        updateNavigationButtons();
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.disabled = currentQuestionIndex === testData.questions.length - 1;
} 