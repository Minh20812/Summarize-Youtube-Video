import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { VideoCard } from "@/components/VideoCard";
import { useYouTubeSearch } from "@/hooks/useYouTubeSearch";

export const SearchTab = () => {
  const [query, setQuery] = useState("");
  const { videos, loading, error, searchVideos } = useYouTubeSearch();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchVideos(query);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100">
        <form onSubmit={handleSearch} className="flex space-x-3">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm video YouTube..."
            className="flex-1 h-12 text-lg border-blue-200 focus:border-blue-400 focus:ring-blue-400"
          />
          <Button
            type="submit"
            disabled={loading}
            className="h-12 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </Button>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Videos Grid */}
      {videos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && videos.length === 0 && !error && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 mx-auto text-blue-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Tìm kiếm video YouTube
          </h3>
          <p className="text-gray-500">
            Nhập từ khóa và nhấn tìm kiếm để bắt đầu
          </p>
        </div>
      )}
    </div>
  );
};
