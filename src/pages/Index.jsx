import { VideoProvider } from "@/contexts/VideoContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchTab } from "@/components/SearchTab";
import { CollectionTab } from "@/components/CollectionTab";
import { LoginScreen } from "@/components/LoginScreen";
import { AuthCallback } from "@/components/AuthCallback";
import { UserProfile } from "@/components/UserProfile";
import { Search, Heart } from "lucide-react";

const MainApp = () => {
  const { user, isLoading } = useAuth();

  // Kiểm tra nếu đang ở auth callback route
  if (window.location.pathname === "/auth/callback") {
    return <AuthCallback />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang khởi tạo...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <VideoProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  YouTube Video Collector
                </h1>
              </div>
              <UserProfile />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="search" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8 bg-white/50 backdrop-blur-sm">
              <TabsTrigger
                value="search"
                className="flex items-center space-x-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                <Search className="w-4 h-4" />
                <span>Tìm kiếm</span>
              </TabsTrigger>
              <TabsTrigger
                value="collection"
                className="flex items-center space-x-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                <Heart className="w-4 h-4" />
                <span>Danh sách chọn</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="search">
              <SearchTab />
            </TabsContent>

            <TabsContent value="collection">
              <CollectionTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </VideoProvider>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
};

export default Index;
