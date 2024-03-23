import axios from "axios";

const url = "http://localhost:3000/api";

export const AuthService = {
  registerUser: async (firstName: string, lastName: string, email: string, password: string) => {
    try {
      return await axios.post("/api/users/register", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
    } catch (err: any) {
      return err;
    }
  },

  loginUser: async (email: string, password: string) => {
    try {
      return await axios.post("/api/users/login", {
        email: email,
        password: password,
      });
    } catch (err: any) {
      return err;
    }
  },

  logoutUser: async () => {
    try {
      return await axios.post("/api/users/logout", {});
    } catch (err: any) {
      return err;
    }
  },

  get_me: async () => {
    try {
      return await axios.get("/api/users/me");
    } catch (err: any) {
      return err;
    }
  },

  put_me: async (payload:any) => {
    try {
      return await axios.put("/api/users/me");
    } catch (err: any) {
      return err;
    }
  },
};
