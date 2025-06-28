// YouTube API integration utilities
// Trong thực tế, bạn sẽ cần:
// 1. Google OAuth2 setup
// 2. YouTube Data API v3 key
// 3. Proper error handling

export class YouTubeService {
  config = null;

  constructor(config = {}) {
    this.config = config;
  }

  // OAuth2 login flow
  async authenticateUser() {
    // Implementation sẽ được thêm khi tích hợp thật
    console.log("YouTube OAuth2 authentication will be implemented here");
    throw new Error(
      "YouTube API chưa được cấu hình. Hiện tại đang dùng mock data."
    );
  }

  // Search videos using YouTube Data API
  async searchVideos(query, maxResults = 20) {
    // Implementation sẽ được thêm khi tích hợp thật
    console.log(`Searching for: ${query} with max results: ${maxResults}`);
    throw new Error(
      "YouTube API chưa được cấu hình. Hiện tại đang dùng mock data."
    );
  }

  // Get video details
  async getVideoDetails(videoIds) {
    // Implementation sẽ được thêm khi tích hợp thật
    console.log("Getting video details for:", videoIds);
    throw new Error(
      "YouTube API chưa được cấu hình. Hiện tại đang dùng mock data."
    );
  }
}

// Helper function to extract video ID from YouTube URL
export const extractVideoId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Helper function to create YouTube URL from video ID
export const createYouTubeUrl = (videoId) => {
  return `https://www.youtube.com/watch?v=${videoId}`;
};

// Helper function to get thumbnail URL
export const getThumbnailUrl = (videoId, quality = "high") => {
  return `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`;
};

export default YouTubeService;
