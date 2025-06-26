/**
 * VS555 Casino - Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Winner Ticker Animation
    initWinnerTicker();

    // Category Tabs
    initCategoryTabs();

    // Promo code copy functionality
    initPromoCopy();

    // FAQ toggles
    initFaqToggles();

    // Live chat button
    initLiveChat();
    
    // Initialize sidebar category filtering
    initSidebarCategories();
    
    // Initialize sidebar search functionality
    initSidebarSearch();
    
    // Initialize winner notifications
    initWinnerNotifications();
    
    // Initialize floating animations
    initFloatingIcons();
    
    // Initialize jackpot counter
    initJackpotCounter();
    
    // Initialize casino chips animation
    initCasinoChips();
    
    // Initialize fireworks animation
    initFireworks();
    
    // Initialize confetti animation
    initConfetti();
});

/**
 * Initializes the winner ticker animation
 */
function initWinnerTicker() {
    // Sample winner data
    const winners = [
        "Nusrat (Comilla): ৳2,815,850 on Gates of Olympus",
        "Aarif (Dhaka): ৳471,000 on Sweet Bonanza",
        "Sadia (Chittagong): 10,000x multiplier on Crazy Time",
        "Rafiq (Sylhet): Doubled balance in 20 minutes on Teen Patti",
        "Nayeem (Khulna): ৳1,300,000 on Mega Moolah",
        "Mohammad (Rajshahi): ৳750,000 on vs555 Mega Reels",
        "Farida (Barisal): ৳950,000 on Andar Bahar",
        "Ahmed (Rangpur): ৳1,200,000 jackpot on Wolf Gold"
    ];
    
    const winnerText = document.getElementById('winner-text');
    if (!winnerText) return;
    
    let currentIndex = 0;
    
    setInterval(() => {
        // Fade out
        winnerText.style.opacity = '0';
        
        setTimeout(() => {
            // Change text and fade in
            currentIndex = (currentIndex + 1) % winners.length;
            winnerText.textContent = winners[currentIndex];
            winnerText.style.opacity = '1';
        }, 500);
    }, 5000);
}

/**
 * Initializes the game category tabs functionality
 */
function initCategoryTabs() {
    const tabs = document.querySelectorAll('.category-tab');
    const gameCards = document.querySelectorAll('.game-card');
    
    if (tabs.length === 0) return;
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Get the category to filter by
            const category = tab.getAttribute('data-category');
            
            // Update the header text
            const gameCollectionHeader = document.querySelector('.game-collection h2');
            if (gameCollectionHeader) {
                let headerText = 'All Games';
                let headerIcon = 'dice';
                
                switch(category) {
                    case 'slots':
                        headerText = 'Top Slot Games in BD';
                        headerIcon = 'dice';
                        break;
                    case 'live':
                        headerText = 'Live Dealer Favorites';
                        headerIcon = 'users';
                        break;
                    case 'table':
                        headerText = 'Table Games';
                        headerIcon = 'table';
                        break;
                    case 'jackpot':
                        headerText = 'Jackpot Games';
                        headerIcon = 'gem';
                        break;
                    case 'new':
                        headerText = 'New Games';
                        headerIcon = 'bolt';
                        break;
                }
                
                gameCollectionHeader.innerHTML = `<i class="fas fa-${headerIcon}"></i> ${headerText}`;
            }
            
            // Filter the game cards
            gameCards.forEach(card => {
                // For demo purposes, we'll use classes to determine the game type
                // In a real implementation, you'd have data attributes on each card
                
                if (category === 'all') {
                    card.style.display = 'block';
                    return;
                }
                
                const gameImg = card.querySelector('.game-img');
                let showCard = false;
                
                if (gameImg) {
                    if (category === 'slots' && gameImg.classList.contains('slot-')) {
                        showCard = true;
                    } else if (category === 'live' && gameImg.classList.contains('live-')) {
                        showCard = true;
                    } else if (category === 'table' && gameImg.classList.contains('table-')) {
                        showCard = true;
                    } else if (category === 'jackpot' && gameImg.classList.contains('jackpot-')) {
                        showCard = true;
                    } else if (category === 'new' && gameImg.classList.contains('new-')) {
                        showCard = true;
                    } else {
                        // For demo purposes, show some random cards for each category
                        showCard = Math.random() > 0.5;
                    }
                }
                
                card.style.display = showCard ? 'block' : 'none';
                
                // Add animation to visible cards
                if (showCard) {
                    card.classList.add('animate-in');
                    setTimeout(() => {
                        card.classList.remove('animate-in');
                    }, 500);
                }
            });
        });
    });
}

/**
 * Initializes the promo code copy functionality
 */
function initPromoCopy() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    if (copyButtons.length === 0) return;
    
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the promo code
            const promoCode = button.parentElement.querySelector('.promo-code').textContent;
            
            // Create a temporary textarea to copy the text
            const textarea = document.createElement('textarea');
            textarea.value = promoCode;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            
            // Change button text temporarily
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            button.style.backgroundColor = 'var(--color-accent)';
            button.style.color = 'var(--color-white)';
            
            // Reset button after 2 seconds
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
                button.style.color = '';
            }, 2000);
        });
    });
}

/**
 * Initializes FAQ accordion functionality
 */
function initFaqToggles() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // Initially hide answers
        answer.style.display = 'none';
        
        question.addEventListener('click', () => {
            // Toggle answer visibility
            const isVisible = answer.style.display === 'block';
            
            // Закрыть все остальные FAQ
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    
                    otherAnswer.style.display = 'none';
                    otherQuestion.classList.remove('active');
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            answer.style.display = isVisible ? 'none' : 'block';
            
            // Add visual indication of open/closed state
            question.classList.toggle('active', !isVisible);
            item.classList.toggle('active', !isVisible);
        });
    });
}

/**
 * Initializes the live chat button functionality
 */
function initLiveChat() {
    const chatButton = document.querySelector('.chat-btn');
    if (!chatButton) return;
    
    chatButton.addEventListener('click', () => {
        // For demo purposes, just animate the button
        chatButton.classList.add('pulse');
        
        // Remove the animation class after animation completes
        setTimeout(() => {
            chatButton.classList.remove('pulse');
            alert('Live chat functionality would be implemented here');
        }, 300);
    });
}

/**
 * Add smooth scroll animation for all internal links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * Add pulse animation class for CSS
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }

    .pulse {
        animation: pulse 0.3s ease-in-out;
    }
`;
document.head.appendChild(style);

/**
 * Show/hide floating buttons based on scroll position
 */
window.addEventListener('scroll', () => {
    const floatingButtons = document.querySelector('.floating-buttons');
    if (!floatingButtons) return;
    
    if (window.scrollY > 300) {
        floatingButtons.style.opacity = '1';
    } else {
        floatingButtons.style.opacity = '0';
    }
});

/**
 * Initializes the sidebar category filtering functionality
 */
function initSidebarCategories() {
    const categoryLinks = document.querySelectorAll('.categories a');
    const slotCards = document.querySelectorAll('.slot-card');
    
    if (categoryLinks.length === 0) return;
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get category from data attribute or text content
            const category = link.getAttribute('data-category') || link.textContent.trim().toLowerCase();
            
            // Remove active class from all links
            categoryLinks.forEach(cat => cat.parentElement.classList.remove('active'));
            
            // Add active class to clicked link
            link.parentElement.classList.add('active');
            
            // Filter slot cards based on category
            filterSlotCards(category);
            
            // Update header text
            const slotSectionHeader = document.querySelector('.slot-section h2');
            if (slotSectionHeader) {
                slotSectionHeader.innerHTML = `<i class="fas fa-diamond"></i> ${link.textContent.trim()}`;
            }
        });
    });
    
    // Function to filter slot cards
    function filterSlotCards(category) {
        // For demo purposes, we'll just show/hide cards randomly
        slotCards.forEach(card => {
            if (category === 'trending' || category === 'featured' || category === 'all') {
                card.style.display = 'block';
            } else {
                // Randomly show/hide cards for demo
                card.style.display = Math.random() > 0.5 ? 'block' : 'none';
            }
        });
    }
}

/**
 * Simulates hero banner slider
 */
function initHeroSlider() {
    const dots = document.querySelectorAll('.hero-dots .dot');
    const heroContent = document.querySelector('.hero-content');
    const welcomeBonus = document.querySelector('.welcome-bonus');
    if (dots.length === 0 || !heroContent || !welcomeBonus) return;
    
    // Sample hero slider content
    const slides = [
        {
            title: "vs555 Casino – Bangladesh's Premier Online Casino Experience",
            subtitle: "Grab a 250% Welcome Bonus + 100 Free Spins on vs555's Most Popular Slots!",
            class: "slide-1"
        },
        {
            title: "VIP Rewards Like Nowhere Else in Bangladesh",
            subtitle: "Join our VIP program for exclusive bonuses, cashback and personal service 24/7",
            class: "slide-2"
        },
        {
            title: "Fast Payments with Local Methods",
            subtitle: "Deposit and withdraw instantly with bKash, Nagad, and more local payment options",
            class: "slide-3"
        }
    ];
    
    let currentSlide = 0;
    
    // Initialize slider controls
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlide();
        });
    });
    
    function updateSlide() {
        // Remove active class from all dots
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current dot
        dots[currentSlide].classList.add('active');
        
        // Update content
        const slide = slides[currentSlide];
        const h1 = heroContent.querySelector('h1');
        const p = heroContent.querySelector('p');
        
        // Fade out
        heroContent.style.opacity = '0';
        
        setTimeout(() => {
            // Update content
            if (h1) h1.textContent = slide.title;
            if (p) p.textContent = slide.subtitle;
            
            // Update background image
            welcomeBonus.className = 'welcome-bonus ' + slide.class;
            
            // Fade in
            heroContent.style.opacity = '1';
        }, 300);
    }
    
    // Auto rotate slides
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
    }, 5000);
    
    // Initial setup
    updateSlide();
}

// Add required CSS for slide transitions
const sliderStyle = document.createElement('style');
sliderStyle.textContent = `
    .hero-content {
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(sliderStyle);

// Initialize hero slider
initHeroSlider();

/**
 * Initializes the sidebar search functionality
 */
function initSidebarSearch() {
    const searchInput = document.querySelector('.search-box input');
    const categoryLinks = document.querySelectorAll('.categories a');
    
    if (!searchInput || categoryLinks.length === 0) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        categoryLinks.forEach(link => {
            const categoryText = link.textContent.toLowerCase();
            const listItem = link.parentElement;
            
            if (searchTerm === '' || categoryText.includes(searchTerm)) {
                listItem.style.display = 'block';
            } else {
                listItem.style.display = 'none';
            }
        });
    });
}

/**
 * Initializes winner notifications
 */
function initWinnerNotifications() {
    // Sample winner data for notifications
    const winners = [
        { name: "Rahim", location: "Dhaka", amount: "৳1,250,000", game: "Sweet Bonanza" },
        { name: "Farida", location: "Chittagong", amount: "৳780,500", game: "Gates of Olympus" },
        { name: "Kamal", location: "Sylhet", amount: "৳2,100,000", game: "vs555 Mega Reels" },
        { name: "Nadia", location: "Khulna", amount: "৳950,000", game: "Book of Dead" },
        { name: "Jamal", location: "Rajshahi", amount: "৳1,500,000", game: "Wolf Gold" }
    ];
    
    // Create notification container if it doesn't exist
    let notificationContainer = document.querySelector('.win-notifications');
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'win-notifications';
        document.body.appendChild(notificationContainer);
    }
    
    // Show random winner notification every 15-30 seconds
    setInterval(() => {
        const winner = winners[Math.floor(Math.random() * winners.length)];
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'win-notification';
        notification.innerHTML = `
            <div class="win-icon"><i class="fas fa-trophy"></i></div>
            <div class="win-details">
                <div class="win-name">${winner.name} from ${winner.location}</div>
                <div class="win-amount">just won ${winner.amount}</div>
                <div class="win-game">playing ${winner.game}</div>
            </div>
        `;
        
        // Add to container
        notificationContainer.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 5000);
    }, Math.random() * 15000 + 15000); // Random interval between 15-30 seconds
}

/**
 * Initializes floating background icons
 */
function initFloatingIcons() {
    const icons = [
        'dice', 'coins', 'diamond', 'crown', 'trophy', 'star', 
        'spade', 'heart', 'club', 'diamond', '7', 'dollar-sign',
        'gem', 'gift', 'money-bill-wave', 'money-bill-alt'
    ];
    
    // Create container for floating icons
    const floatingContainer = document.createElement('div');
    floatingContainer.className = 'floating-icons';
    document.body.appendChild(floatingContainer);
    
    // Create 30 static icons
    for (let i = 0; i < 30; i++) {
        const icon = document.createElement('div');
        const iconType = icons[Math.floor(Math.random() * icons.length)];
        
        icon.className = 'floating-icon';
        icon.innerHTML = `<i class="fas fa-${iconType}"></i>`;
        
        // Random position
        icon.style.left = `${Math.random() * 100}%`;
        icon.style.top = `${Math.random() * 100}%`;
        
        // Random size
        const size = Math.random() * 40 + 15;
        icon.style.fontSize = `${size}px`;
        
        // Lower opacity
        icon.style.opacity = Math.random() * 0.1 + 0.1;
        
        floatingContainer.appendChild(icon);
    }
}

/**
 * Initializes the jackpot counter animation
 */
function initJackpotCounter() {
    // Create jackpot counter if it doesn't exist
    let jackpotContainer = document.querySelector('.jackpot-container');
    if (!jackpotContainer) {
        // Create container
        jackpotContainer = document.createElement('div');
        jackpotContainer.className = 'jackpot-container';
        
        // Create counter
        const counter = document.createElement('div');
        counter.className = 'jackpot-counter';
        counter.innerHTML = `
            <div class="jackpot-label">MEGA JACKPOT</div>
            <div class="jackpot-amount">৳12,345,678</div>
        `;
        
        jackpotContainer.appendChild(counter);
        
        // Добавляем на все страницы после слайдера или после заголовка страницы
        const welcomeBonus = document.querySelector('.welcome-bonus');
        const pageHeader = document.querySelector('.page-header');
        
        if (welcomeBonus && welcomeBonus.nextSibling) {
            // Для главной страницы - после слайдера
            welcomeBonus.parentNode.insertBefore(jackpotContainer, welcomeBonus.nextSibling);
        } else if (pageHeader && pageHeader.nextSibling) {
            // Для других страниц - после заголовка страницы
            pageHeader.parentNode.insertBefore(jackpotContainer, pageHeader.nextSibling);
        } else {
            // Fallback - после header
            const header = document.querySelector('header');
            if (header && header.nextSibling) {
                header.parentNode.insertBefore(jackpotContainer, header.nextSibling);
            } else {
                document.body.appendChild(jackpotContainer);
            }
        }
    }
    
    // Animate jackpot amount
    const jackpotAmount = document.querySelector('.jackpot-amount');
    if (!jackpotAmount) return;
    
    let baseAmount = 12345678;
    
    setInterval(() => {
        // Increase by random amount (0-100)
        baseAmount += Math.floor(Math.random() * 100);
        
        // Format with commas
        const formattedAmount = '৳' + baseAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        
        // Update display
        jackpotAmount.textContent = formattedAmount;
    }, 2000);
}

/**
 * Initializes casino chips animation
 */
function initCasinoChips() {
    // Create container for casino chips
    const chipsContainer = document.createElement('div');
    chipsContainer.className = 'casino-chips';
    document.body.appendChild(chipsContainer);
    
    // Chip colors
    const chipColors = ['chip-red', 'chip-blue', 'chip-green', 'chip-purple'];
    
    // Create 20 chips
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const chip = document.createElement('div');
            const colorClass = chipColors[Math.floor(Math.random() * chipColors.length)];
            
            chip.className = `casino-chip ${colorClass}`;
            
            // Random position
            chip.style.left = `${Math.random() * 100}%`;
            
            // Random animation duration
            const duration = Math.random() * 10 + 5;
            chip.style.animationDuration = `${duration}s`;
            
            // Add to container
            chipsContainer.appendChild(chip);
            
            // Remove after animation completes
            setTimeout(() => {
                chip.remove();
            }, duration * 1000);
        }, i * 1000); // Stagger the creation of chips
    }
    
    // Create new chips periodically
    setInterval(() => {
        const chip = document.createElement('div');
        const colorClass = chipColors[Math.floor(Math.random() * chipColors.length)];
        
        chip.className = `casino-chip ${colorClass}`;
        
        // Random position
        chip.style.left = `${Math.random() * 100}%`;
        
        // Random animation duration
        const duration = Math.random() * 10 + 5;
        chip.style.animationDuration = `${duration}s`;
        
        // Add to container
        chipsContainer.appendChild(chip);
        
        // Remove after animation completes
        setTimeout(() => {
            chip.remove();
        }, duration * 1000);
    }, 2000); // Create a new chip every 2 seconds
}

/**
 * Initializes fireworks animation
 */
function initFireworks() {
    // Create fireworks container
    const fireworkContainer = document.createElement('div');
    fireworkContainer.className = 'firework';
    document.body.appendChild(fireworkContainer);
    
    // Show fireworks when user clicks buttons
    const buttons = document.querySelectorAll('.btn-large, .btn-signup, .btn-play');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create firework at button position
            createFirework(e.clientX, e.clientY);
        });
    });
    
    function createFirework(x, y) {
        // Make container visible
        fireworkContainer.classList.add('active');
        
        // Clear previous fireworks
        fireworkContainer.innerHTML = '';
        
        // Set default position if not provided
        x = x || Math.random() * window.innerWidth;
        y = y || Math.random() * window.innerHeight * 0.5;
        
        // Create firework particles
        const colors = ['#f5b300', '#ff9900', '#00cc66', '#ff3366', '#3366ff', '#9933ff'];
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';
            
            // Random angle and distance
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            
            // Calculate end position
            const endX = x + Math.cos(angle) * distance;
            const endY = y + Math.sin(angle) * distance;
            
            // Random color
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Set CSS variables for animation
            particle.style.setProperty('--x', `${endX}px`);
            particle.style.setProperty('--initialY', `${y}px`);
            particle.style.setProperty('--initialSize', '5px');
            particle.style.setProperty('--finalSize', `${Math.random() * 6 + 3}px`);
            
            // Set position and style
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.backgroundColor = color;
            particle.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            fireworkContainer.appendChild(particle);
        }
        
        // Hide container after animation completes
        setTimeout(() => {
            fireworkContainer.classList.remove('active');
        }, 1000);
    }
}

/**
 * Initializes confetti animation
 */
function initConfetti() {
    // Create confetti container
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);
    
    // Show confetti on jackpot container hover
    const jackpotContainer = document.querySelector('.jackpot-container');
    if (jackpotContainer) {
        jackpotContainer.addEventListener('mouseenter', () => {
            createConfetti();
        });
    }
    
    function createConfetti() {
        // Clear previous confetti
        confettiContainer.innerHTML = '';
        
        // Colors for confetti
        const colors = ['#f5b300', '#ff9900', '#00cc66', '#ff3366', '#3366ff', '#9933ff'];
        
        // Create confetti pieces
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random position, color, size, and shape
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = `-20px`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = `${Math.random() * 10 + 5}px`;
            confetti.style.height = `${Math.random() * 10 + 5}px`;
            
            // Random shape (square, circle, triangle)
            const shape = Math.floor(Math.random() * 3);
            if (shape === 0) {
                // Square (default)
            } else if (shape === 1) {
                // Circle
                confetti.style.borderRadius = '50%';
            } else {
                // Triangle (using clip-path)
                confetti.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
            }
            
            // Set fixed animation duration (no delay)
            const duration = Math.random() * 3 + 2;
            confetti.style.animationDuration = `${duration}s`;
            
            confettiContainer.appendChild(confetti);
            
            // Remove each confetti piece when it finishes falling
            setTimeout(() => {
                confetti.remove();
            }, duration * 1000);
        }
    }
} 