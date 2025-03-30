// Navigation template for consistent navigation across all pages
function createNavigation(isRoot = false, isLoggedIn = false) {
    const nav = document.createElement('nav');
    nav.className = 'navbar';
    
    // Logo section
    const logo = document.createElement('div');
    logo.className = 'logo';
    logo.innerHTML = `<a href="${isRoot ? 'index.html' : '../index.html'}"><span class="logo-quantum">Quantum</span><span class="logo-learners">Learners</span></a>`;
    
    // Navigation links
    const navLinks = document.createElement('ul');
    navLinks.className = 'nav-links';
    
    if (isLoggedIn) {
        // Check which section we're in
        const isAdminSection = window.location.pathname.includes('/admin/');
        const isDashboardSection = window.location.pathname.includes('/dashboard/');
        
        if (isAdminSection) {
            // Admin navigation
            const navItems = [
                { text: 'Dashboard', href: isRoot ? 'protected/pages/dashboard/index.html' : '../dashboard/index.html' },
                { text: 'Groups', href: isRoot ? 'protected/pages/admin/groups.html' : 'groups.html' },
                { text: 'Users', href: isRoot ? 'protected/pages/admin/users.html' : 'users.html' }
            ];
            
            navItems.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${item.href}">${item.text}</a>`;
                navLinks.appendChild(li);
            });
        } else {
            // Dashboard navigation (default for logged-in users)
            const navItems = [
                { text: 'Dashboard', href: isRoot ? 'protected/pages/dashboard/index.html' : '../dashboard/index.html' },
                { text: 'Groups', href: isRoot ? 'protected/pages/admin/groups.html' : '../admin/groups.html' },
                { text: 'Users', href: isRoot ? 'protected/pages/admin/users.html' : '../admin/users.html' }
            ];
            
            navItems.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${item.href}">${item.text}</a>`;
                navLinks.appendChild(li);
            });
        }
    } else {
        // Public navigation
        const navItems = [
            { text: 'Home', href: isRoot ? 'index.html' : '../index.html' },
            { text: 'About', href: isRoot ? 'pages/about.html' : 'about.html' },
            { text: 'Services', href: isRoot ? 'pages/services.html' : 'services.html' },
            { text: 'Contact', href: isRoot ? 'pages/contact.html' : 'contact.html' }
        ];
        
        navItems.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${item.href}">${item.text}</a>`;
            navLinks.appendChild(li);
        });
        
        // Navigation buttons for public pages
        const navButtons = document.createElement('li');
        navButtons.className = 'nav-buttons';
        navButtons.innerHTML = `
            <a href="${isRoot ? 'pages/login.html' : 'login.html'}" class="login-btn">Login</a>
            <a href="${isRoot ? 'pages/test.html' : 'test.html'}" class="test-btn">Free Test</a>
        `;
        navLinks.appendChild(navButtons);
    }
    
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

// Function to initialize navigation
function initializeNavigation() {
    // Check if we're in the root directory or pages directory
    const isRoot = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
    
    // Check if user is logged in (this should be replaced with actual authentication check)
    const isLoggedIn = window.location.pathname.includes('protected/');
    
    // Create and insert navigation
    const navigation = createNavigation(isRoot, isLoggedIn);
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

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeNavigation); 