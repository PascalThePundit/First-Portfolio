
// This creates the typing and deleting animation

// Array of words to cycle through
const words = ['Web Developer', 'Designer', 'Content Writer', 'Vibe Coder'];

// Get the element where text will appear
const typewriterElement = document.getElementById('typewriter');

// State variables
let wordIndex = 0;        // Which word we're currently on
let charIndex = 0;        // Which character we're typing
let isDeleting = false;   // Are we typing or deleting?

// Speed settings (in milliseconds)
const typingSpeed = 50;   // Speed when typing
const deletingSpeed = 50; // Speed when deleting (faster)
const pauseAfterWord = 2000; // Pause after completing a word
const pauseAfterDelete = 500; // Pause after deleting before next word

function typeWriter() {
    // Get current word
    const currentWord = words[wordIndex];

    if (isDeleting) {
        // DELETING MODE: Remove one character
        charIndex--;
        typewriterElement.textContent = currentWord.substring(0, charIndex);

        // If we've deleted everything
        if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Move to next word
            setTimeout(typeWriter, pauseAfterDelete);
            return;
        }
    } else {
        // TYPING MODE: Add one character
        charIndex++;
        typewriterElement.textContent = currentWord.substring(0, charIndex);

        // If we've typed the complete word
        if (charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeWriter, pauseAfterWord);
            return;
        }
    }

    // Continue typing/deleting
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeWriter, speed);
}

// Start the typewriter effect when page loads
typeWriter();

// Phone Bubble Interaction
const phoneIcon = document.getElementById('phone');
const copyBtn = document.getElementById('copy-btn');
const phoneNumberText = document.getElementById('phone-number-text');

// Check if the elements exist to avoid errors
if (phoneIcon && copyBtn && phoneNumberText) {

    // Function to check if it's a mobile screen (less than or equal to 768px)
    const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

    // Add 'click' event listener to the main phone icon
    phoneIcon.addEventListener('click', (e) => {
        if (isMobile()) {
            // On mobile, prevent default event and directly call the number
            e.preventDefault();
            // Assuming phoneNumberText contains the dialable number, remove spaces
            window.location.href = `tel:${phoneNumberText.innerText.replace(/\s/g, '')}`;
        } else {
            // On desktop, toggle expansion if click is not on copy button
            if (e.target.id !== 'copy-btn') {
                phoneIcon.classList.toggle('expanded');
            }
        }
    });

    // Add 'click' event listener to the copy button (only relevant for desktop expanded state)
    copyBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevents the phone bubble from collapsing

        const phoneNumber = phoneNumberText.innerText;
        const originalText = copyBtn.innerText;

        navigator.clipboard.writeText(phoneNumber).then(() => {
            // --- Visual Feedback ---
            copyBtn.innerText = 'Copied!';
            copyBtn.classList.add('copied');

            // Revert back after 2 seconds
            setTimeout(() => {
                copyBtn.innerText = originalText;
                copyBtn.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            // Optional: Provide feedback to the user that copy failed
            copyBtn.innerText = 'Failed!';
            setTimeout(() => {
                copyBtn.innerText = originalText;
            }, 2000);
        });
    });

    // Optional: Close the bubble if user clicks outside of it (only for desktop)
    document.addEventListener('click', (e) => {
        if (!isMobile() && !phoneIcon.contains(e.target) && phoneIcon.classList.contains('expanded')) {
            phoneIcon.classList.remove('expanded');
        }
    });
}

