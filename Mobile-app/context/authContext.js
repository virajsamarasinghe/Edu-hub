import { createContext, useEffect, useState, useContext } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../firebaseConfig'; // Ensure 'db' is imported from your firebaseConfig
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const AuthContext=createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated,setIsAuthenticated] = useState(undefined);

    useEffect(()=>{

    const unsub = onAuthStateChanged(auth, (user)=>{
        if (user){
            setIsAuthenticated(true);
            setUser(user);
        }else{
            setIsAuthenticated(false);
            setUser(null);
        }
    });
    return unsub;

    },[])

    const login = async(email, password) => {
        try{

        }
        catch(e){

        }
    }
    const logout = async() => {
        try{

        }
        catch(e){
            
        }
    }
    const register = async (firstname, lastname, email, password) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log('response.user:', response.user);
    
            // Fetch current student count from Firestore
            const countDocRef = doc(db, 'Counts', 'StudentCount');
            const countDoc = await getDoc(countDocRef);
    
            let currentCount = 0;
            if (countDoc.exists()) {
                currentCount = countDoc.data().count;
            }
    
            // Generate the new student ID
            const newStudentId = `eg21${(currentCount + 1).toString().padStart(4, '0')}`;
    
            // Save the new student information to Firestore
            await setDoc(doc(db, 'Students', response.user.uid), {
                firstname,
                lastname,
                email,
                userId: response.user.uid,
                studentId: newStudentId,  // Save the new student ID
            });
    
            // Increment the student count and update the document
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
        <AuthContext.Provider value={{user, isAuthenticated, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>{
    const value = useContext(AuthContext);
    if(!value){
        throw new Error('AuthContext must be used within a AuthContextProvider');
    }
    return value;
}