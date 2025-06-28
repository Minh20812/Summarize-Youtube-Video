import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogIn, Youtube, Shield, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const LoginScreen = () => {
  const { login, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-blue-100">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-4">
            <Youtube className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            YouTube Video Collector
          </CardTitle>
          <CardDescription className="text-gray-600">
            Đăng nhập với Google để bắt đầu tìm kiếm và thu thập video YouTube
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Features */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <Search className="w-4 h-4 text-blue-500" />
              <span>Tìm kiếm video YouTube thực tế</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Đăng nhập an toàn với Google OAuth2</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <Youtube className="w-4 h-4 text-red-500" />
              <span>Sử dụng YouTube Data API chính thức</span>
            </div>
          </div>

          {/* Login Button */}
          <Button
            onClick={login}
            disabled={isLoading}
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white flex items-center justify-center space-x-2"
          >
            <LogIn className="w-5 h-5" />
            <span>Đăng nhập với Google</span>
          </Button>

          {/* Setup Instructions */}
          <div className="text-xs text-gray-500 space-y-1 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="font-medium text-yellow-800">Cần cấu hình:</p>
            <p>1. Tạo Google Cloud Project</p>
            <p>2. Enable YouTube Data API v3</p>
            <p>3. Tạo OAuth2 credentials</p>
            <p>4. Cập nhật src/config/google.ts</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
