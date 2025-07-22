

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
});

// Animate numbers on scroll
function animateNumbers() {
    const numbers = [
        { id: 'total-users', target: 350, suffix: 'M+' },
        { id: 'platforms-count', target: 450, suffix: '+' },
        { id: 'market-size', target: 2.8, suffix: 'B', prefix: '$' },
        { id: 'avg-time', target: 2.5, suffix: ' hrs' }
    ];
    
    numbers.forEach(num => {
        const element = document.getElementById(num.id);
        if (element) {
            let current = 0;
            const increment = num.target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= num.target) {
                    current = num.target;
                    clearInterval(timer);
                }
                const displayValue = num.prefix ? num.prefix : '';
                element.textContent = displayValue + (current % 1 === 0 ? current : current.toFixed(1)) + num.suffix;
            }, 20);
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.id === 'dashboard') {
                animateNumbers();
                createPlatformChart();
            }
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe sections
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.dashboard-section, .guide-section, .platforms-section, .stats-section');
    sections.forEach(section => observer.observe(section));
});

// Platform Chart
function createPlatformChart() {
    const ctx = document.getElementById('platformChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['BYJU\'S', 'Unacademy', 'Coursera', 'Udemy', 'Others'],
            datasets: [{
                data: [25, 20, 18, 15, 22],
                backgroundColor: [
                    '#FF6B6B',
                    '#4ECDC4',
                    '#45B7D1',
                    '#96CEB4',
                    '#FECA57'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }
    });
}

// Interactive Guide Functions
let selectedDevice = null;
let selectedCategory = null;

function selectDevice(device) {
    selectedDevice = device;
    const buttons = document.querySelectorAll('.device-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const deviceInfo = document.getElementById('device-info');
    const info = {
        laptop: {
            title: 'Laptop/PC - Best Choice!',
            description: 'Perfect for serious learning with large screen, full keyboard, and multitasking capabilities.',
            pros: ['Best for coding and design', 'Great for video editing', 'Comfortable for long sessions']
        },
        mobile: {
            title: 'Mobile Phone - Convenient!',
            description: 'Great for learning on-the-go. Download apps for offline learning.',
            pros: ['Learn anywhere, anytime', 'Offline downloads available', 'Push notifications for reminders']
        },
        tablet: {
            title: 'Tablet - Balanced Option!',
            description: 'Good balance between portability and screen size for comfortable learning.',
            pros: ['Portable like phone', 'Screen size like laptop', 'Touch interface for interactive content']
        }
    };
    
    const deviceData = info[device];
    deviceInfo.innerHTML = `
        <div class="device-details">
            <h4>${deviceData.title}</h4>
            <p>${deviceData.description}</p>
            <ul>
                ${deviceData.pros.map(pro => `<li>${pro}</li>`).join('')}
            </ul>
        </div>
    `;
}

function checkInternet() {
    const result = document.getElementById('internet-result');
    const button = event.target;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking...';
    
    setTimeout(() => {
        // Simulate internet speed check
        const speed = Math.floor(Math.random() * 50) + 5;
        button.innerHTML = '<i class="fas fa-wifi"></i> Test My Internet';
        
        let status, color;
        if (speed >= 10) {
            status = 'Excellent! Your connection is perfect for online learning.';
            color = '#4CAF50';
        } else if (speed >= 5) {
            status = 'Good! Your connection can handle most online learning activities.';
            color = '#FF9800';
        } else {
            status = 'Basic. Consider upgrading for better video quality.';
            color = '#F44336';
        }
        
        result.innerHTML = `
            <div class="internet-status" style="color: ${color}">
                <strong>Speed: ${speed} Mbps</strong><br>
                ${status}
            </div>
        `;
    }, 2000);
}

function selectCategory(category) {
    selectedCategory = category;
    const cards = document.querySelectorAll('.category-card');
    cards.forEach(card => card.classList.remove('active'));
    event.currentTarget.classList.add('active');
    
    const details = document.getElementById('category-details');
    const categories = {
        tech: {
            title: 'Technology & Programming',
            description: 'Learn coding, web development, AI, and data science',
            platforms: ['Coursera', 'Udemy', 'freeCodeCamp', 'Codecademy'],
            duration: '3-12 months',
            salary: '₹3-15 LPA'
        },
        business: {
            title: 'Business & Finance',
            description: 'Master business strategy, finance, and marketing',
            platforms: ['LinkedIn Learning', 'Coursera', 'edX', 'Khan Academy'],
            duration: '2-8 months',
            salary: '₹4-20 LPA'
        },
        creative: {
            title: 'Creative Arts',
            description: 'Explore design, photography, and creative skills',
            platforms: ['Skillshare', 'Udemy', 'CreativeLive', 'Domestika'],
            duration: '1-6 months',
            salary: '₹2-12 LPA'
        },
        language: {
            title: 'Language Learning',
            description: 'Master new languages for career growth',
            platforms: ['Duolingo', 'Babbel', 'Rosetta Stone', 'Coursera'],
            duration: '3-12 months',
            salary: '₹3-8 LPA'
        }
    };
    
    const catData = categories[category];
    details.innerHTML = `
        <div class="category-info">
            <h4>${catData.title}</h4>
            <p>${catData.description}</p>
            <div class="category-meta">
                <p><strong>Top Platforms:</strong> ${catData.platforms.join(', ')}</p>
                <p><strong>Duration:</strong> ${catData.duration}</p>
                <p><strong>Average Salary:</strong> ${catData.salary}</p>
            </div>
        </div>
    `;
}

function updateSchedule() {
    const hours = document.getElementById('weekly-hours').value;
    const preview = document.getElementById('schedule-preview');
    
    if (!hours) {
        preview.innerHTML = '<p>Please select weekly hours</p>';
        return;
    }
    
    const dailyHours = Math.round(hours / 7 * 10) / 10;
    const monthlyHours = hours * 4;
    
    preview.innerHTML = `
        <div class="schedule-info">
            <h4>Your Learning Schedule</h4>
            <p><strong>Daily:</strong> ${dailyHours} hours/day</p>
            <p><strong>Weekly:</strong> ${hours} hours/week</p>
            <p><strong>Monthly:</strong> ${monthlyHours} hours/month</p>
            <p class="tip">💡 Tip: Consistency is key! Even 30 minutes daily is better than 3 hours once a week.</p>
        </div>
    `;
}

// Platform exploration
function openPlatform(platform) {
    const urls = {
        byjus: 'https://byjus.com',
        udemy: 'https://udemy.com',
        coursera: 'https://coursera.com',
        unacademy: 'https://unacademy.com'
    };
    
    if (urls[platform]) {
        window.open(urls[platform], '_blank');
    }
}

// Resource modal
function showResource(resource) {
    const modal = document.getElementById('resourceModal');
    const content = document.getElementById('modalContent');
    
    const resources = {
        internet: {
            title: 'Internet Guide for Online Learning',
            content: `
                <h3>Choosing the Right Internet Plan</h3>
                <p>For effective online learning, you need:</p>
                <ul>
                    <li><strong>Basic Learning:</strong> 2-5 Mbps - Good for video lectures and reading</li>
                    <li><strong>Interactive Content:</strong> 5-10 Mbps - For live classes and interactive sessions</li>
                    <li><strong>HD Streaming:</strong> 10+ Mbps - For high-quality video content</li>
                </ul>
                <h4>Recommended ISPs in India:</h4>
                <ul>
                    <li>JioFiber - Affordable plans starting ₹399/month</li>
                    <li>Airtel Xstream - Reliable with good customer support</li>
                    <li>ACT Fibernet - High speeds in metro cities</li>
                </ul>
                <p><strong>Pro Tip:</strong> Use mobile data as backup during power cuts!</p>
            `
        },
        equipment: {
            title: 'Essential Learning Equipment',
            content: `
                <h3>Must-Have Learning Equipment</h3>
                <h4>Basic Setup:</h4>
                <ul>
                    <li>Laptop/Desktop with 4GB+ RAM</li>
                    <li>Good quality headphones with mic</li>
                    <li>Stable internet connection</li>
                    <li>Webcam for live classes</li>
                </ul>
                <h4>Nice to Have:</h4>
                <ul>
                    <li>External monitor for dual screen</li>
                    <li>Ergonomic keyboard and mouse</li>
                    <li>Ring light for better video quality</li>
                    <li>Standing desk for health</li>
                </ul>
                <h4>Budget Options:</h4>
                <p>Start with what you have! Even a smartphone can be enough to begin your learning journey.</p>
            `
        },
        time: {
            title: 'Time Management for Online Learning',
            content: `
                <h3>Master Your Learning Schedule</h3>
                <h4>Time Blocking Method:</h4>
                <ul>
                    <li>Morning (6-9 AM): Best for complex topics</li>
                    <li>Evening (6-9 PM): Good for review and practice</li>
                    <li>Weekends: Longer sessions for projects</li>
                </ul>
                <h4>Pomodoro Technique:</h4>
                <ul>
                    <li>25 minutes focused learning</li>
                    <li>5 minutes break</li>
                    <li>Repeat 4 times, then longer break</li>
                </ul>
                <h4>Weekly Planning:</h4>
                <p>Plan your week on Sunday. Set 3 main goals and break them into daily tasks.</p>
                <p><strong>Remember:</strong> Consistency beats intensity. 30 minutes daily > 3 hours once a week.</p>
            `
        },
        security: {
            title: 'Stay Safe While Learning Online',
            content: `
                <h3>Online Learning Security Tips</h3>
                <h4>Account Security:</h4>
                <ul>
                    <li>Use strong, unique passwords for each platform</li>
                    <li>Enable two-factor authentication (2FA)</li>
                    <li>Don't share login credentials</li>
                </ul>
                <h4>Payment Safety:</h4>
                <ul>
                    <li>Use secure payment methods (UPI, credit cards)</li>
                    <li>Check for HTTPS in website URLs</li>
                    <li>Never share OTPs with anyone</li>
                </ul>
                <h4>Personal Information:</h4>
                <ul>
                    <li>Be cautious about sharing personal details</li>
                    <li>Check privacy settings on platforms</li>
                    <li>Report suspicious activities immediately</li>
                </ul>
                <p><strong>Red Flags:</strong> Unrealistic promises, pressure to pay quickly, requests for sensitive information.</p>
            `
        }
    };
    
    const resource = resources[resource];
    content.innerHTML = `
        <h2>${resource.title}</h2>
        ${resource.content}
    `;
    
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('resourceModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('resourceModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Animate progress bars on scroll
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Add scroll animations
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('progress-bar')) {
                animateProgressBars();
            }
        }
    });
});

// Observe progress bars
document.addEventListener('DOMContentLoaded', function() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => scrollObserver.observe(bar));
});

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
});

// Add floating animation to hero cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.floating-cards .card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.5}s`;
    });
});

