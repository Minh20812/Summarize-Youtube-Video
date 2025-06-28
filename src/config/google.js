// Google OAuth2 và YouTube API configuration
export const GOOGLE_CONFIG = {
  // Bạn cần thay thế các giá trị này bằng credentials của mình
  CLIENT_ID:
    "your-client-id.apps.googleusercontent.com",
  CLIENT_SECRET: "your-client-secret",
  REDIRECT_URI: "http://localhost:5173/auth/callback",

  // YouTube API scope
  SCOPES: ["https://www.googleapis.com/auth/youtube.readonly"],

  // YouTube Data API v3 endpoint
  YOUTUBE_API_BASE_URL: "https://www.googleapis.com/youtube/v3",
};

// Hướng dẫn lấy credentials:
// 1. Vào Google Cloud Console: https://console.cloud.google.com/
// 2. Tạo project mới hoặc chọn project hiện có
// 3. Enable YouTube Data API v3
// 4. Tạo OAuth2 credentials (Web application)
// 5. Thêm authorized redirect URIs: http://localhost:5173/auth/callback
// 6. Copy CLIENT_ID và CLIENT_SECRET vào file này
