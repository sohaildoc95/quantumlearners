import { createUser } from './firebase-config.js';

// Function to create admin user
async function createAdminUser() {
    try {
        // Using a different test number
        const phoneNumber = '9876543210';  // New test number
        const password = 'admin123';
        
        await createUser(phoneNumber, password, 'Admin User', 'admin');
        console.log('Admin user created successfully');
        alert(`Admin user created successfully!\nPhone: ${phoneNumber}\nPassword: ${password}`);
    } catch (error) {
        console.error('Error creating admin:', error);
        alert('Error creating admin: ' + error.message);
    }
}

// Create admin user when the script is run
createAdminUser(); 