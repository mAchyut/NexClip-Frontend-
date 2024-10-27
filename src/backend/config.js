import conf from "../conf/conf.js";
import axios from "axios";

//1.........Video
class VideoService {
  constructor() {
    this.client = axios.create({
      baseURL: conf.backendUrl + "/video",
      withCredentials: true,
    });
  }

  async getAllVideos({ userId, page }) {
    console.log(page);
    try {
      return userId
        ? (await this.client.post(`/all-videos?userId=${userId}`)).data
        : (await this.client.post(`/all-videos?page=${page}`)).data;
    } catch (error) {
      throw error.response?.data;
    }
  }
  async searchVideos(query) {
    if (query) {
      try {
        return (await this.client.post(`/all-videos?query=${query}`)).data;
      } catch (error) {
        throw error.response?.data;
      }
    }
  }
  async publishAVideo({ title, description, video, thumbnail }) {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("video", video);
      formData.append("thumbnail", thumbnail);
      return await this.client.post("/video-upload", formData);
    } catch (error) {
      throw error.response?.data;
    }
  }

  async getVideoById(videoId) {
    try {
      return (await this.client.get(`/${videoId}`))?.data;
    } catch (error) {
      throw error.response?.data;
    }
  }
  async updateVideo(videoId, { title, description, thumbnail }) {
    console.log(videoId, title, thumbnail, description);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("thumbnail", thumbnail);
      return await this.client.patch(`/update-details/${videoId}`, formData);
    } catch (error) {
      throw error.response?.data;
    }
  }

  async deleteVideo(videoId) {
    try {
      return await this.client.get(`/delete-video/${videoId}`);
    } catch (error) {
      throw error.response?.data;
    }
  }
  async togglePublishStatus(videoId) {
    try {
      return await this.client.patch(`/is-published/${videoId}`);
    } catch (error) {
      throw error.response?.data;
    }
  }

  async addViews(videoId) {
    try {
      return await this.client.get(`/views/${videoId}`);
    } catch (error) {
      throw error.response?.data;
    }
  }

  async getMyLikedVideos() {
    try {
      return await this.client.post("/liked-videos");
    } catch (error) {
      throw error?.response?.data;
    }
  }
  async getVideoLikes(videoId) {
    console.log(videoId, "LIKES");
    try {
      return (await this.client.post(`/${videoId}/get-likes`))?.data;
    } catch (error) {
      throw error?.response?.data;
    }
  }
  async toggleVideoLike(videoId) {
    try {
      return (await this.client.get(`/${videoId}/like`))?.data;
    } catch (error) {
      throw error?.response?.data;
    }
  }
}

const videoService = new VideoService();
export { videoService };

//2........Subscription Service for video
class SubscriptionService {
  constructor() {
    this.client = axios.create({
      baseURL: conf.backendUrl + "/channel",
      withCredentials: true,
    });
  }

  async toggleSubscription({ channelId }) {
    try {
      return await this.client.post(`/subscribe/${channelId}`);
    } catch (error) {
      throw error?.response?.data;
    }
  }

  async getSubscribedChannels(subscriberId) {
    return (await this.client.post(`/${subscriberId}/subscribed-to`)).data;
  }

  //TODO: NOT collecting subscribers list, only counting for now, ready and can be implemented anytime needed
  async getUserChannelSubscribers(channelId) {
    return await this.client.post(`${channelId}/subscribers`);
  }
}

const subscriptionService = new SubscriptionService();
export { subscriptionService };

//3.........Comment Service for video
class CommentService {
  constructor() {
    this.client = axios.create({
      baseURL: `${conf.backendUrl}`,
      withCredentials: true,
    });
  }
  async addComment(videoId, comment) {
    try {
      if (videoId && comment) {
        return await this.client.post(
          `/video/comment/${videoId}/add-comment`,
          comment
        );
      }
    } catch (error) {
      throw error?.response?.data;
    }
  }
  async updateComment(commentId, comment) {
    try {
      if (commentId) {
        return await this.client.patch(
          `/video/comment/${commentId}/update-comment`,
          comment
        );
      }
    } catch (error) {
      throw error?.response?.data;
    }
  }
  async deleteComment(commentId) {
    try {
      if (commentId) {
        return await this.client.post(`/video/comment/${commentId}/delete`);
      }
    } catch (error) {
      throw error?.response?.data;
    }
  }
  async getVideoComments(videoId) {
    try {
      if (videoId) {
        return (await this.client.get(`/video/comment/${videoId}/comments`))
          .data;
      }
    } catch (error) {
      throw error?.response?.data;
    }
  }
  async toggleCommentLike(commentId) {
    try {
      if (commentId) {
        return await this.client.get(`/comment/${commentId}/like`);
      }
    } catch (error) {
      throw error?.response?.data;
    }
  }
  async getCommentLikes(commentId) {
    try {
      if (commentId) {
        return await this.client.get(`/comment/${commentId}/get-likes`);
      }
    } catch (error) {
      throw error?.response?.data;
    }
  }
}

const commentService = new CommentService();
export { commentService };

//4.....Playlist Service
class PlaylistService {
  constructor() {
    this.client = axios.create({
      baseURL: `${conf.backendUrl}`,
      withCredentials: true,
    });
  }

  async createPlaylist({}) {
    try {
    } catch (error) {
      throw error?.response?.data;
    }
  }
}
