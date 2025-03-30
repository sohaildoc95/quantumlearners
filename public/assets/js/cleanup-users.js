import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getFirestore, collection, query, where, getDocs, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

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
const db = getFirestore(app);

// Function to clean up test users
async function cleanupUsers() {
    try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('phoneNumber', '==', '1234567890'));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Delete existing test users
            const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
            await Promise.all(deletePromises);
            console.log('Existing test users cleaned up successfully');
        } else {
            console.log('No test users found');
        }
    } catch (error) {
        console.error('Error cleaning up users:', error);
    }
}

// Run cleanup
cleanupUsers().then(() => {
    console.log('Cleanup completed. You can now create a new admin user.');
}); 