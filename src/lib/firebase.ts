import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  RecaptchaVerifier, 
  signInWithPhoneNumber,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  collection, 
  onSnapshot,
  query,
  where,
  orderBy,
  DocumentData,
  QuerySnapshot,
  getDoc,
  updateDoc
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const createUserProfile = async (user: User, additionalData = {}) => {
  if (!user) return;

  const userRef = doc(db, 'users', user.uid);
  const userData = {
    email: user.email,
    phoneNumber: user.phoneNumber,
    displayName: user.displayName,
    photoURL: user.photoURL,
    createdAt: new Date().toISOString(),
    role: 'member',
    ...additionalData
  };

  try {
    await setDoc(userRef, userData, { merge: true });
    return userData;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', result.user.uid), {
      lastLogin: new Date().toISOString()
    }, { merge: true });
    return result.user;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await createUserProfile(user);
    return user;
  } catch (error) {
    throw error;
  }
};

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    await createUserProfile(user);
    return user;
  } catch (error) {
    throw error;
  }
};

export const setUpRecaptcha = (phoneNumber: string) => {
  const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
    size: "invisible"
  });
  return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
};

export const verifyOTP = async (confirmationResult: any, otp: string) => {
  try {
    const { user } = await confirmationResult.confirm(otp);
    await createUserProfile(user);
    return user;
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export const isUserAdmin = async (userId: string): Promise<boolean> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    return userDoc.exists() && userDoc.data()?.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

export const updateProductPrice = async (productId: string, newPrice: number) => {
  const productRef = doc(db, 'products', productId);
  await updateDoc(productRef, {
    price: newPrice,
    updatedAt: new Date().toISOString()
  });
};

export const updateWeatherData = async (weatherData: any) => {
  const weatherRef = doc(db, 'weather', 'current');
  await setDoc(weatherRef, {
    ...weatherData,
    updatedAt: new Date().toISOString()
  }, { merge: true });
};

// Real-time market prices listener
export const subscribeToMarketPrices = (callback: (prices: DocumentData[]) => void) => {
  const q = query(
    collection(db, 'market_prices'),
    orderBy('timestamp', 'desc')
  );
  
  return onSnapshot(q, (snapshot: QuerySnapshot) => {
    const prices = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(prices);
  });
};

// Real-time weather updates listener
export const subscribeToWeatherUpdates = (callback: (weather: DocumentData) => void) => {
  const weatherRef = doc(db, 'weather', 'current');
  
  return onSnapshot(weatherRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data());
    }
  });
};

// Real-time product updates listener
export const subscribeToProducts = (category: string, callback: (products: DocumentData[]) => void) => {
  const q = query(
    collection(db, 'products'),
    where('category', '==', category),
    orderBy('updatedAt', 'desc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(products);
  });
};