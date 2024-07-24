import { createContext, useEffect, useState, useContext } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../firebaseConfig'; // Ensure 'db' is imported from your firebaseConfig
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                setUser(user);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        return unsub;
    }, []);

    const login = async (studentId, password) => {
        try {
            console.log('Attempting to fetch document for student ID:', studentId);
            const studentDoc = await getDoc(doc(db, 'Students', studentId));
            if (!studentDoc.exists()) {
                throw new Error('Invalid student ID');
            }
            const studentData = studentDoc.data();
            const email = studentData.email;
            console.log('Fetched email for student ID:', email);
    
            // Assuming signInWithEmailAndPassword is imported from Firebase Auth
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in:', userCredential.user);
        } catch (error) {
            console.error('Login failed:', error.message);
            throw error; // Rethrow the error to be handled by the caller
        }
    };
    
    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setIsAuthenticated(false);
        } catch (e) {
            console.error('Logout error:', e);
        }
    };

    const register = async (firstname, lastname, email, password) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log('response.user:', response.user);

            const countDocRef = doc(db, 'Counts', 'StudentCount');
            const countDoc = await getDoc(countDocRef);

            let currentCount = 0;
            if (countDoc.exists()) {
                currentCount = countDoc.data().count;
            }

            const newStudentId = `eg21${(currentCount + 1).toString().padStart(4, '0')}`;

            await setDoc(doc(db, 'Students', response.user.uid), {
                firstname,
                lastname,
                email,
                userId: response.user.uid,
                studentId: newStudentId,
            });

            await setDoc(countDocRef, { count: currentCount + 1 }, { merge: true });
            
            return { success: true, data: response.user };
            
        } catch (e) {
            let msg = e.message;
            if (msg.includes('(auth/invalid-email)')) {
                msg = 'Please enter a valid email address.';
            } else if (msg.includes('(auth/email-already-in-use)')) {
                msg = 'Email address is already in use.';
            }
            return { success: false, msg };
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error('AuthContext must be used within a AuthContextProvider');
    }
    return value;
};
