# Access Levels Documentation

This document outlines the structure of our website with both public and protected access.

## Directory Structure

```
Our Website/
├── public/                      # Publicly accessible files
│   ├── index.html              # Main landing page
│   ├── styles.css              # Main stylesheet
│   ├── script.js               # Main JavaScript
│   ├── assets/
│   │   ├── css/               # Additional styles
│   │   ├── js/                # Additional scripts
│   │   ├── images/            # Images and media
│   │   └── tests/             # Test content
│   └── pages/
│       ├── about.html         # About page
│       ├── services.html      # Services page
│       ├── contact.html       # Contact page
│       ├── test.html          # Test overview page
│       ├── take-test.html     # Test taking page
│       └── login.html         # Login page (entry point to protected area)
│
├── protected/                  # Protected files (requires authentication)
│   ├── pages/                 # Protected pages
│   │   ├── dashboard.html     # User dashboard
│   │   └── admin/            # Admin module
│   │       ├── index.html     # Admin dashboard
│   │       ├── groups/        # Groups management
│   │       │   ├── index.html # Groups list
│   │       │   ├── create.html # Create new group
│   │       │   └── edit.html  # Edit group
│   │       └── users/         # Users management (to be developed)
│   └── assets/                # Protected assets
│       ├── css/               # Protected styles
│       │   └── admin/         # Admin-specific styles
│       ├── js/                # Protected scripts
│       │   └── admin/         # Admin-specific scripts
│       └── images/            # Protected images
│
├── package.json               # Project configuration
└── package-lock.json         # Dependency lock file
```

## Authentication Flow

1. **Entry Point**:
   - Users start at public/login.html
   - They enter their credentials (username/password)

2. **Authentication Process**:
   - Validate credentials
   - Create session/token
   - Redirect to protected dashboard

3. **Protected Access**:
   - All files in protected/ require authentication
   - Session/token validation on each request
   - Redirect to login if not authenticated

## Current Features

### Public Area
1. Main Pages:
   - Home page with navigation
   - About page
   - Services page
   - Contact page

2. Test Features:
   - Test overview page
   - Test taking functionality
   - All test content accessible without login

3. Authentication:
   - Login page (entry point to protected area)

### Protected Area
1. Admin Module:
   - Groups Management
     - List all groups
     - Create new groups
     - Edit existing groups
     - Delete groups
     - Group permissions
   - Users Management (To Be Developed)
     - List all users
     - Create new users
     - Edit user details
     - Manage user permissions

2. User Dashboard:
   - Personal profile
   - Progress tracking
   - Customized content

## Next Steps

1. Create admin dashboard layout
2. Implement Groups management:
   - Create groups list page
   - Add group creation form
   - Add group editing functionality
   - Implement group deletion
   - Add group permissions management
3. Set up authentication system
4. Create protected dashboard
5. Implement session management

Would you like me to:
1. Create the admin dashboard layout?
2. Start implementing the Groups management pages?
3. Set up the authentication system first? 