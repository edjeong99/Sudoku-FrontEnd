import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const createUserProfile = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/user`, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || ''
    });
    console.log(response.data.message);
  } catch (error) {
    console.error('Error creating/updating user profile:', error);
  }
};

export const getUserProfile = async (uid) => {
  try {
    const response = await axios.get(`${API_URL}/user/${uid}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export const updateUserProfile = async (uid, data) => {
  try {
    const response = await axios.put(`${API_URL}/user/${uid}`, data);
    console.log(response.data.message);
  } catch (error) {
    console.error('Error updating user profile:', error);
  }
};
