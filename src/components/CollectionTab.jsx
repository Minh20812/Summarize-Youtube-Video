import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Trash2, Heart, CheckCircle } from "lucide-react";
import { VideoCard } from "@/components/VideoCard";
import { useVideo } from "@/contexts/VideoContext";
import { toast } from "sonner";

export const CollectionTab = () => {
  const { selectedVideos, clearAll } = useVideo();
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Chia videos thành các nhóm 4
  const videoGroups = [];
  for (let i = 0; i < selectedVideos.length; i += 4) {
    videoGroups.push(selectedVideos.slice(i, i + 4));
  }

  const generatePromptText = (videos) => {
    const links = videos.map((video) => video.url).join("\n");
    return `@Youtube tóm tắt chi tiết các video youtube sau:\n${links}`;
  };

  const copyToClipboard = async (text, groupIndex) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(groupIndex);
      toast.success("Prompt đã được copy vào clipboard");

      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    } catch (error) {
      toast.error("Không thể copy vào clipboard");
    }
  };

  if (selectedVideos.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="w-16 h-16 mx-auto text-blue-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          Chưa có video nào được chọn
        </h3>
        <p className="text-gray-500">
          Hãy vào tab tìm kiếm và thêm video vào danh sách
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header với số lượng và clear all */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Video đã chọn ({selectedVideos.length})
            </h2>
            <p className="text-gray-600 mt-1">
              {videoGroups.length} nhóm prompt sẽ được tạo
            </p>
          </div>
          <Button
            variant="outline"
            onClick={clearAll}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Xóa tất cả
          </Button>
        </div>
      </div>

      {/* Copy Prompts */}
      <div className="space-y-4">
        {videoGroups.map((group, groupIndex) => (
          <Card
            key={groupIndex}
            className="bg-white/70 backdrop-blur-sm border-blue-100"
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg">
                  Nhóm {groupIndex + 1} ({group.length} video)
                </span>
                <Button
                  onClick={() =>
                    copyToClipboard(generatePromptText(group), groupIndex)
                  }
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  {copiedIndex === groupIndex ? (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  ) : (
                    <Copy className="w-4 h-4 mr-2" />
                  )}
                  {copiedIndex === groupIndex ? "Đã copy!" : "Copy prompt"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                  {generatePromptText(group)}
                </pre>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {group.map((video) => (
                  <VideoCard key={video.id} video={video} compact />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
