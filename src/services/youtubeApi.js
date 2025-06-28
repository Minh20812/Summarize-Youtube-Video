import { GOOGLE_CONFIG } from "@/config/google";
import { GoogleAuthService } from "./googleAuth";

export class YouTubeApiService {
  static instance = null;
  authService = null;

  constructor() {
    this.authService = GoogleAuthService.getInstance();
  }

  static getInstance() {
    if (!YouTubeApiService.instance) {
      YouTubeApiService.instance = new YouTubeApiService();
    }
    return YouTubeApiService.instance;
  }

  async makeAuthenticatedRequest(endpoint, params = {}) {
    const accessToken = this.authService.getAccessToken();

    if (!accessToken) {
      throw new Error("User not authenticated");
    }

    const url = new URL(`${GOOGLE_CONFIG.YOUTUBE_API_BASE_URL}${endpoint}`);

    // Thêm parameters vào URL
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString());
      }
    });

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token hết hạn, cần đăng nhập lại
        this.authService.logout();
        throw new Error("Authentication expired. Please login again.");
      }

      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `API request failed: ${response.status}`
      );
    }

    return response.json();
  }

  // Tìm kiếm video
  async searchVideos(params) {
    try {
      const searchParams = {
        part: "snippet",
        q: params.q,
        maxResults: params.maxResults || 20,
        order: params.order || "relevance",
        type: params.type || "video",
        safeSearch: "moderate",
      };

      const data = await this.makeAuthenticatedRequest("/search", searchParams);

      if (!data.items) {
        return [];
      }

      // Chuyển đổi dữ liệu YouTube API thành format của ứng dụng
      const videos = data.items.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail:
          item.snippet.thumbnails.medium?.url ||
          item.snippet.thumbnails.default?.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        description: item.snippet.description,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      }));

      return videos;
    } catch (error) {
      console.error("YouTube search error:", error);
      throw error;
    }
  }

  // Lấy chi tiết video
  async getVideoDetails(videoIds) {
    try {
      const params = {
        part: "snippet,contentDetails,statistics",
        id: videoIds.join(","),
      };

      const data = await this.makeAuthenticatedRequest("/videos", params);

      if (!data.items) {
        return [];
      }

      const videos = data.items.map((item) => ({
        id: item.id,
        title: item.snippet.title,
        thumbnail:
          item.snippet.thumbnails.medium?.url ||
          item.snippet.thumbnails.default?.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        description: item.snippet.description,
        url: `https://www.youtube.com/watch?v=${item.id}`,
      }));

      return videos;
    } catch (error) {
      console.error("Get video details error:", error);
      throw error;
    }
  }

  // Kiểm tra trạng thái API
  async checkApiStatus() {
    try {
      await this.makeAuthenticatedRequest("/search", {
        part: "snippet",
        q: "test",
        maxResults: 1,
      });
      return true;
    } catch (error) {
      console.error("API status check failed:", error);
      return false;
    }
  }
}
