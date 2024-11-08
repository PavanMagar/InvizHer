// Navbar functionality
function openNav() {
    const sidebar = document.getElementById("mySidebar");
    if (sidebar) {
        sidebar.style.left = "0";
    }
}

function closeNav() {
    const sidebar = document.getElementById("mySidebar");
    if (sidebar) {
        sidebar.style.left = "-720px";
    }
}

// Greeting message functionality
document.addEventListener('DOMContentLoaded', function() {
    const greetingMessage = document.getElementById('greeting-message');
    
    if (greetingMessage) {
        const now = new Date();
        const hours = now.getHours();
        
        let greetingText = '';
        
        if (hours >= 5 && hours < 12) {
            greetingText = "Good Morning, I'm";
        } else if (hours >= 12 && hours < 17) {
            greetingText = "Good Afternoon, I'm";
        } else if (hours >= 17 && hours < 20) {
            greetingText = "Good Evening, I'm";
        } else {
            greetingText = "Good Evening, I'm";
        }
        
        greetingMessage.textContent = greetingText;
    }
});

function toggleNav() {
    const sidebar = document.getElementById("mySidebar");
    const openBtn = document.getElementById("openBtn");
    const closeBtn = document.getElementById("closeBtn");

    if (!sidebar || !openBtn || !closeBtn) return;

    if (sidebar.classList.contains("open")) {
        sidebar.classList.remove("open");
        closeBtn.classList.add("hide");
        openBtn.classList.remove("hide");
    } else {
        sidebar.classList.add("open");
        openBtn.classList.add("hide");
        closeBtn.classList.remove("hide");
    }
}

// Header scroll effect
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector("header");
    if (header) {
        let lastScrollTop = 0;

        window.addEventListener("scroll", function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop) {
                // User is scrolling down
                header.style.top = "-100px"; // Adjust as per your header height
            } else {
                // User is scrolling up
                header.style.top = "0";
            }
            lastScrollTop = scrollTop;
        });
    }
});

/*=============== FILTERS TABS ===============*/
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".filters-button");
    const sections = document.querySelectorAll(".filters-container > div");

    if (buttons.length && sections.length) {
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                const target = button.getAttribute("data-target");

                // Toggle active button class
                buttons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                // Toggle sections visibility
                sections.forEach(section => {
                    if (section.getAttribute("data-content") === target) {
                        section.classList.add("filters__active");
                        section.classList.remove("filter__inactive");
                    } else {
                        section.classList.add("filter__inactive");
                        section.classList.remove("filters__active");
                    }
                });
            });
        });
    }
});

// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name')?.value || '';
            const message = document.getElementById('message')?.value || '';

            const recipient = "invizher@gmail.com";
            const subject = "I want to discuss about...";
            const body = `Name: ${name}\n\nMessage: ${message}`;

            const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;
        });
    }
});

// Progress button functionality
document.addEventListener('DOMContentLoaded', function() {
    const progressBtn = document.querySelector('.progress-btn');
    const progressPath = document.querySelector('.progress-circle-path');

    if (progressBtn && progressPath) {
        // Calculate values
        const pathLength = progressPath.getTotalLength();
        progressPath.style.strokeDasharray = pathLength;
        progressPath.style.strokeDashoffset = pathLength;

        // Update progress and button visibility
        function updateProgress() {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            const progress = Math.min(scrolled / windowHeight, 1);

            // Update circle progress
            const dashoffset = pathLength - (progress * pathLength);
            progressPath.style.strokeDashoffset = dashoffset;

            // Show/hide button
            if (scrolled > window.innerHeight * 0.3) {
                progressBtn.classList.add('visible');
            } else {
                progressBtn.classList.remove('visible');
            }
        }

        // Smooth scroll to top
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Event listeners
        window.addEventListener('scroll', updateProgress);
        progressBtn.addEventListener('click', scrollToTop);
    }
});

// Toggle heart icon and show donation modal
function toggleDonorHeart(element) {
    const heart = element.querySelector('i');
    heart.classList.toggle('fa-solid');
    heart.classList.toggle('fa-regular');
    showDonationModal();
  }
  
  // Show the donation modal
  function showDonationModal() {
    const overlay = document.getElementById('donationOverlay');
    overlay.style.display = 'flex';
    // Trigger reflow
    overlay.offsetHeight;
    overlay.classList.add('active');
  }
  
  // Close the donation modal
  function closeDonationModal() {
    const overlay = document.getElementById('donationOverlay');
    overlay.classList.add('closing');
    overlay.classList.remove('active');
    
    setTimeout(() => {
      overlay.classList.remove('closing');
      overlay.style.display = 'none';
      resetModal();
    }, 300);
  }
  
  // Reset modal state
  function resetModal() {
    const redirectMessage = document.getElementById('redirectMessage');
    const donationContent = document.querySelector('.donation-content');
    redirectMessage.style.display = 'none';
    redirectMessage.classList.remove('active');
    donationContent.style.display = 'block';
  }
  
  // Initialize payment process with countdown
  function initiatePayment() {
    const paymentLink = 'https://razorpay.me/@invizher'; // Replace with your payment page URL
    const redirectMessage = document.getElementById('redirectMessage');
    const donationContent = document.querySelector('.donation-content');
    const countdownElement = document.getElementById('countdown');
    
    donationContent.style.display = 'none';
    redirectMessage.style.display = 'block';
    
    // Trigger reflow and add active class for animation
    redirectMessage.offsetHeight;
    redirectMessage.classList.add('active');
    
    let secondsLeft = 5;
    
    const countdownInterval = setInterval(() => {
      secondsLeft--;
      countdownElement.textContent = secondsLeft;
      countdownElement.classList.add('pulse');
      
      // Remove pulse class after animation
      setTimeout(() => {
        countdownElement.classList.remove('pulse');
      }, 1000);
      
      if (secondsLeft <= 0) {
        clearInterval(countdownInterval);
        window.location.href = paymentLink;
      }
    }, 1000);
  }
  
  // Close modal when clicking outside
  document.getElementById('donationOverlay').addEventListener('click', (e) => {
    if (e.target.id === 'donationOverlay') {
      closeDonationModal();
    }
  });