import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/auth/login", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};


export const searchUsers = async (name) => {
 
  try {
    const res = await axios.get("/users/search/"+name);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateProfile = async (data) => {
 
  try {
    const res = await axios.put("/users/update-profile/"+data.userId,data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const logoutCall = async (dispatch) => {
  dispatch({ type: "LOGOUT" });
};

