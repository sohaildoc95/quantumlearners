// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getFirestore, collection, query, where, getDocs, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "YAIzaSyCQaNmsv-oPtoTY46D2rqPOlrRIENndLy4",
    authDomain: "quantum-learners.firebaseapp.com",
    projectId: "quantum-learners",
    storageBucket: "quantum-learners.firebasestorage.app",
    messagingSenderId: "188818331084",
    appId: "1:188818331084:web:748d212ce990d9114eb969"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to handle user login
async function loginUser(phoneNumber, password) {
    try {
        // Validate phone number format
        if (!/^\d{10}$/.test(phoneNumber)) {
            throw new Error('Invalid phone number format');
        }

        // Query Firestore to find the user with the given phone number
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('phoneNumber', '==', phoneNumber));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw new Error('User not found');
        }

        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        // Verify password (you should use proper password hashing in production)
        if (userData.password !== password) {
            throw new Error('Invalid password');
        }
        
        // Store user data in session
        sessionStorage.setItem('user', JSON.stringify({
            uid: userDoc.id,
            phoneNumber: userData.phoneNumber,
            role: userData.role,
            name: userData.name
        }));

        return true;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

// Function to create a new user
async function createUser(phoneNumber, password, name, role = 'user') {
    try {
        // Validate phone number
        if (!/^\d{10}$/.test(phoneNumber)) {
            throw new Error('Invalid phone number format');
        }

        // Check if user already exists
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('phoneNumber', '==', phoneNumber));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            throw new Error('Phone number already registered');
        }

        // Create new user document
        const newUserRef = doc(collection(db, 'users'));
        await setDoc(newUserRef, {
            phoneNumber,
            password, // In production, you should hash the password
            name,
            role,
            createdAt: new Date().toISOString()
        });

        return true;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

// Function to check if user is authenticated
function isAuthenticated() {
    return sessionStorage.getItem('user') !== null;
}

// Function to get current user data
function getCurrentUser() {
    const userData = sessionStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
}

// Function to handle user logout
function logoutUser() {
    sessionStorage.removeItem('user');
    window.location.href = '/index.html';
}

// Export the functions
export {
    loginUser,
    createUser,
    isAuthenticated,
    getCurrentUser,
    logoutUser
}; 