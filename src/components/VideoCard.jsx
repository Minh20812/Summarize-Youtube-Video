import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, HeartOff, ExternalLink } from "lucide-react";
import { useVideo } from "@/contexts/VideoContext";

export const VideoCard = ({ video, compact = false }) => {
  const { addVideo, removeVideo, isVideoSelected } = useVideo();
  const isSelected = isVideoSelected(video.id);

  const handleToggleSelect = () => {
    if (isSelected) {
      removeVideo(video.id);
    } else {
      addVideo(video);
    }
  };

  const formatDuration = (publishedAt) => {
    const date = new Date(publishedAt);
    return date.toLocaleDateString("vi-VN");
  };

  return (
    <Card className="group bg-white/80 backdrop-blur-sm border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardContent className="p-0">
        {/* Thumbnail */}
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={video.thumbnail}
            alt={video.title}
            className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
              compact ? "h-24" : "h-48"
            }`}
          />
          <div className="absolute top-2 right-2">
            <Button
              size="sm"
              variant={isSelected ? "default" : "secondary"}
              onClick={handleToggleSelect}
              className={`${
                isSelected
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-white/80 hover:bg-white text-gray-700"
              } transition-all duration-200`}
            >
              {isSelected ? (
                <HeartOff className="w-4 h-4" />
              ) : (
                <Heart className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className={compact ? "p-3" : "p-4"}>
          <h3
            className={`font-semibold text-gray-800 line-clamp-2 mb-2 ${
              compact ? "text-sm" : "text-base"
            }`}
          >
            {video.title}
          </h3>

          {!compact && (
            <>
              <p className="text-sm text-gray-600 mb-2">{video.channelTitle}</p>
              <p className="text-xs text-gray-500 mb-3">
                {formatDuration(video.publishedAt)}
              </p>
            </>
          )}

          <div className="flex items-center justify-between">
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Xem video</span>
            </a>

            {compact && (
              <Button
                size="sm"
                variant="ghost"
                onClick={handleToggleSelect}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <HeartOff className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
