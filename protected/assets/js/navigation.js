// Protected Navigation template
function createProtectedNavigation() {
    const nav = document.createElement('nav');
    nav.className = 'navbar';  // Using the same navbar class as public navigation
    
    // Logo section - exactly matching public navigation structure
    const logo = document.createElement('div');
    logo.className = 'logo';
    logo.innerHTML = `<a href="/protected/pages/dashboard/index.html"><span class="logo-quantum">Quantum</span><span class="logo-learners">Learners</span></a>`;
    
    // Navigation links
    const navLinks = document.createElement('ul');
    navLinks.className = 'nav-links';
    
    // Navigation items for protected area
    const navItems = [
        { text: 'Dashboard', href: '/protected/pages/dashboard/index.html' },
        { 
            text: 'Admin',
            children: [
                { text: 'Groups', href: '/protected/pages/admin/groups.html' },
                { text: 'Users', href: '/protected/pages/admin/users.html' }
            ]
        }
    ];
    
    navItems.forEach(item => {
        const li = document.createElement('li');
        if (item.children) {
            // Create dropdown for Admin
            li.className = 'dropdown';
            li.innerHTML = `
                <a href="#" class="dropdown-toggle">${item.text}</a>
                <ul class="dropdown-menu">
                    ${item.children.map(child => `
                        <li><a href="${child.href}">${child.text}</a></li>
                    `).join('')}
                </ul>
            `;
        } else {
            li.innerHTML = `<a href="${item.href}">${item.text}</a>`;
        }
        navLinks.appendChild(li);
    });
    
    // Navigation buttons
    const navButtons = document.createElement('li');
    navButtons.className = 'nav-buttons';
    navButtons.innerHTML = `
        <button onclick="logout()" class="logout-btn">Logout</button>
    `;
    navLinks.appendChild(navButtons);
    
    // Burger menu for mobile
    const burger = document.createElement('div');
    burger.className = 'burger';
    burger.innerHTML = `
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
    `;
    
    // Assemble navigation
    nav.appendChild(logo);
    nav.appendChild(navLinks);
    nav.appendChild(burger);
    
    return nav;
}

// Initialize protected navigation
function initializeProtectedNavigation() {
    const navigation = createProtectedNavigation();
    document.body.insertBefore(navigation, document.body.firstChild);
    
    // Initialize mobile menu
    const burger = navigation.querySelector('.burger');
    const nav = navigation.querySelector('.nav-links');
    const navLinks = navigation.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle Navigation
        nav.classList.toggle('active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeProtectedNavigation); 