// src/AuthContext.tsx
import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {auth} from '@/service/firebase/firebase';
import {onAuthStateChanged, signOut, User} from "firebase/auth";

interface AuthContextType {
	user: User | null;
	loading: boolean;
	logout: () => void;
}

interface AuthProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
	user: null, loading: true, logout: () => {
	}
});


export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		return onAuthStateChanged(auth, (user) => {
			setUser(user);
			setLoading(false);
		}); // Make sure we un-subscribe on component unmount
	}, []);

	const logout = async () => {
		try {
			await signOut(auth);
			console.log("Logged out successfully!");
		} catch (error) {
			console.error("Logout failed: ", error);
		}
	};

	return (
		<AuthContext.Provider value={{user, loading, logout}}>
            {!loading && children}
        </AuthContext.Provider>
	);
};
