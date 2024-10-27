import conf from "../conf/conf.js";
import axios from "axios";

class AuthService {
  constructor() {
    this.client = axios.create({
      baseURL: conf.backendUrl,
      withCredentials: true,
    });
  }

  async registerUser({
    email,
    password,
    username,
    fullName,
    avatar,
    coverImage,
  }) {
    try {
      const formData = new FormData();

      formData.append("email", email);
      formData.append("password", password);
      formData.append("username", username);
      formData.append("fullName", fullName);

      if (avatar) {
        formData.append("avatar", avatar);
      }
      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      const userAccount = await this.client.post("/users/register", formData);

      if (userAccount) {
        return (await this.login({ email, password }))?.data;
      }
    } catch (error) {
      throw error.response?.data || "An error occurred in registering";
    }
  }

  async login({ email, password, username }) {
    try {
      return await this.client.post("/users/login", {
        email,
        password,
        username,
      });
    } catch (error) {
      throw error.response?.data || "An error occurred in login";
    }
  }

  async logout() {
    try {
      return await this.client.post("/users/logout");
    } catch (error) {
      throw error.response?.data || "An error occurred in logout";
    }
  }

  async changeCurrentPassword({ currentPassword, newPassword }) {
    try {
      return await this.client.post("/users/change-password", {
        currentPassword,
        newPassword,
      });
    } catch (error) {
      throw (
        error.response?.data || "An error occurred in changing the password"
      );
    }
  }
  async updateAccountDetails({ fullName, email }) {
    try {
      return await this.client.patch("/users/account", {
        fullName,
        email,
      });
    } catch (error) {
      throw error.response?.data || "An error occurred in changing the details";
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.client.post("/users/current-user");

      console.log(user);
      return user;
    } catch (error) {
      throw error.response?.data || "An error occurred in fetching the user";
    }
  }

  async updateImageFiles({ avatar, coverImage }) {
    try {
      const formData = new FormData();
      if (avatar && avatar?.length !== 0) {
        formData.append("avatar", avatar[0]);
      }
      if (coverImage && coverImage?.length !== 0) {
        formData.append("coverImage", coverImage[0]);
      }
      console.log(formData);
      return await this.client.patch("/users/files", formData);
    } catch (error) {
      throw error.response?.data || "An error occurred in updating images";
    }
  }

  async getUserChannelProfile(username) {
    try {
      return (await this.client.get(`/users/channel/${username}`))?.data;
    } catch (error) {
      throw (
        error.response?.data ||
        "An error occurred in fetching the user's channel profile"
      );
    }
  }

  async getWatchHistory() {
    try {
      console.log("watch history hit");
      return (await this.client.get(`/users/watch-history`)).data;
    } catch (error) {
      throw (
        error.response?.data || "An error occurred in fetching user's history"
      );
    }
  }

  async addWatchHistory(videoId) {
    try {
      return await this.client.get(`/users/${videoId}/watch`);
    } catch (error) {
      throw (
        error.response?.data || "An error occurred in adding the watch history"
      );
    }
  }
  async removeWatchHistory(videoId) {
    try {
      return videoId
        ? await this.client.get(`/users/${videoId}/history/clear`)
        : await this.client.get(`/users/history/clear`);
    } catch (error) {
      throw error.response?.data || "An error occurred in clearing the history";
    }
  }

  async getChannelStats() {
    try {
      return (await this.client.post("/dashboard/stats"))?.data;
    } catch (error) {
      throw (
        error?.response?.data ||
        "Unable to fetch dashboard for the current user"
      );
    }
  }
}

const authService = new AuthService();

export default authService;
