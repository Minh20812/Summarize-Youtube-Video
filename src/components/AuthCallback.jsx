import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const AuthCallback = () => {
  const { handleAuthCallback } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const error = urlParams.get("error");

    if (error) {
      setError("Đăng nhập bị hủy hoặc có lỗi xảy ra");
      return;
    }

    if (code) {
      handleAuthCallback(code)
        .then(() => {
          // Redirect về trang chính sau khi đăng nhập thành công
          window.location.href = "/";
        })
        .catch((err) => {
          console.error("Auth callback error:", err);
          setError("Đăng nhập thất bại. Vui lòng thử lại.");
        });
    } else {
      setError("Thiếu authorization code");
    }
  }, [handleAuthCallback]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-red-100">
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Đăng nhập thất bại
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => (window.location.href = "/")}
              className="text-blue-600 hover:text-blue-800"
            >
              Quay về trang chính
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-blue-100">
        <CardContent className="p-6 text-center">
          <Loader2 className="w-12 h-12 text-blue-500 mx-auto mb-4 animate-spin" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Đang xử lý đăng nhập...
          </h2>
          <p className="text-gray-600">Vui lòng chờ trong giây lát</p>
        </CardContent>
      </Card>
    </div>
  );
};
