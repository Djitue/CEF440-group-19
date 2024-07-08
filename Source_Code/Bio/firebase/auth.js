// auth.js
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './index';

const signup = async (email, password, role) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    await auth.setCustomUserClaims(user.user.uid, { role });
    return user;
  } catch (error) {
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    throw error;
  }
};

const getCurrentUser = async () => {
  try {
    const user = await auth.currentUser;
    return user;
  } catch (error) {
    throw error;
  }
};

const getRole = async () => {
  const user = await getCurrentUser();
  if (user) {
    const role = await user.getIdTokenResult().claims.role;
    return role;
  } else {
    return null;
  }
};

export { signup, login, getCurrentUser, getRole };