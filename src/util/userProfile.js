import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const createUserProfile = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/user`, {
      _id: user._id,
      email: user.email,
      nickName: user.nickName || "",
    });
    console.log(response.data.message);
  } catch (error) {
    console.error("Error creating/updating user profile:", error);
  }
};

export const getUserProfile = async (_id) => {
  try {
    const response = await axios.get(`${API_URL}/user/${_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

export const updateUserProfile = async (_id, data) => {
  try {
    const response = await axios.put(`${API_URL}/user/${_id}`, data);
    console.log(response.data.message);
  } catch (error) {
    console.error("Error updating user profile:", error);
  }
};
