import { GOOGLE_CONFIG } from "@/config/google";

export class GoogleAuthService {
  static instance = null;
  accessToken = null;
  user = null;

  static getInstance() {
    if (!GoogleAuthService.instance) {
      GoogleAuthService.instance = new GoogleAuthService();
    }
    return GoogleAuthService.instance;
  }

  getAuthUrl() {
    const params = new URLSearchParams({
      client_id: GOOGLE_CONFIG.CLIENT_ID,
      redirect_uri: GOOGLE_CONFIG.REDIRECT_URI,
      response_type: "code",
      scope: GOOGLE_CONFIG.SCOPES.join(" "),
      access_type: "offline",
      prompt: "consent",
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  async handleAuthCallback(code) {
    try {
      const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: GOOGLE_CONFIG.CLIENT_ID,
          client_secret: GOOGLE_CONFIG.CLIENT_SECRET,
          code,
          grant_type: "authorization_code",
          redirect_uri: GOOGLE_CONFIG.REDIRECT_URI,
        }),
      });

      if (!tokenResponse.ok) {
        const errorDetail = await tokenResponse.text();
        console.error("Token exchange failed:", errorDetail);
        throw new Error("Failed to exchange code for token");
      }

      const tokenData = await tokenResponse.json();
      this.accessToken = tokenData.access_token;

      const userResponse = await fetch(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );

      if (!userResponse.ok) {
        throw new Error("Failed to get user info");
      }

      const userData = await userResponse.json();

      this.user = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        picture: userData.picture,
        accessToken: this.accessToken,
      };

      localStorage.setItem("googleUser", JSON.stringify(this.user));
      localStorage.setItem("googleAccessToken", this.accessToken);

      return this.user;
    } catch (error) {
      console.error("Auth callback error:", error);
      throw error;
    }
  }

  restoreSession() {
    try {
      const storedUser = localStorage.getItem("googleUser");
      const storedToken = localStorage.getItem("googleAccessToken");

      if (storedUser && storedToken) {
        this.user = JSON.parse(storedUser);
        this.accessToken = storedToken;
        return this.user;
      }
    } catch (error) {
      console.error("Failed to restore session:", error);
    }

    return null;
  }

  logout() {
    this.user = null;
    this.accessToken = null;
    localStorage.removeItem("googleUser");
    localStorage.removeItem("googleAccessToken");
  }

  getCurrentUser() {
    return this.user;
  }

  getAccessToken() {
    return this.accessToken;
  }

  isAuthenticated() {
    return !!this.accessToken && !!this.user;
  }
}
