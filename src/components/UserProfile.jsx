import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const UserProfile = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        <Avatar className="w-8 h-8">
          <AvatarImage src={user.picture} alt={user.name} />
          <AvatarFallback>
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
        <div className="hidden md:block">
          <p className="text-sm font-medium text-gray-700">{user.name}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={logout}
        className="text-gray-600 hover:text-gray-800"
      >
        <LogOut className="w-4 h-4" />
        <span className="hidden md:inline ml-2">Đăng xuất</span>
      </Button>
    </div>
  );
};
