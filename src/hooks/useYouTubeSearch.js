import { useState } from "react";
import { YouTubeApiService } from "@/services/youtubeApi";

export const useYouTubeSearch = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const youtubeService = YouTubeApiService.getInstance();

  const searchVideos = async (query, maxResults = 20) => {
    setLoading(true);
    setError(null);

    try {
      const results = await youtubeService.searchVideos({
        q: query,
        maxResults,
        order: "relevance",
        type: "video",
      });

      setVideos(results);

      if (results.length === 0) {
        setError("Không tìm thấy video nào phù hợp với từ khóa");
      }
    } catch (err) {
      console.error("Search error:", err);
      setError(err.message || "Có lỗi xảy ra khi tìm kiếm video");

      if (err.message?.includes("Authentication expired")) {
        // Reload trang để user đăng nhập lại
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    videos,
    loading,
    error,
    searchVideos,
  };
};
