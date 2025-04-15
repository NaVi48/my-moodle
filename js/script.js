
    // Add some simple animations and interactivity
    document.addEventListener('DOMContentLoaded', function() {
        // Animate job cards on scroll
        const jobCards = document.querySelectorAll('.job-card');
        
        // Simple animation for job cards when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        jobCards.forEach(card => {
            card.style.opacity = 0;
            card.style.transform = 'translateY(20px)';
            observer.observe(card);
        });
        
        // Add click event to tab navigation
        const navLinks = document.querySelectorAll('.nav-tabs a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Here you would normally filter jobs based on the selected category
                // For demo purposes, we're just animating the job cards
                jobCards.forEach(card => {
                    card.style.opacity = 0;
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.opacity = 1;
                        card.style.transform = 'translateY(0)';
                    }, 300);
                });
            });
        });
    });
