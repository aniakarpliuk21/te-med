import { IUserCreate, IUserLogin, IUserResponse } from "@/models/IUser";
import { ITokenPair } from "@/models/IToken";
import { urls } from "@/urls/urls";

export const authService = {
    register: async (userData: IUserCreate): Promise<{ user: IUserResponse; tokens: ITokenPair }> => {
        const response = await fetch(`${urls.backendBaseUrl}${urls.authRegisterUrl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        const text = await response.text();
        if (!response.ok) {
            throw new Error(`Registration failed: ${response.status} - ${text}`);
        }
        return JSON.parse(text);
    },
    login: async (credentials: IUserLogin): Promise<{ user: IUserResponse; tokens: ITokenPair }> => {
        const response = await fetch(`${urls.backendBaseUrl}${urls.authLoginUrl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            }),
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Login failed: ${response.status} - ${errorText}`);
        }
        const data = await response.json();
        localStorage.setItem("userId", data.user._id);
        return data;
    },
     refreshToken: async (): Promise<string | null> => {
         const refreshToken = localStorage.getItem("refresh_token");
         try {
            const refreshResponse = await fetch(`${urls.backendBaseUrl}${urls.authRefreshUrl}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${refreshToken}`,
                }
            });
            if (!refreshResponse.ok) {
                throw new Error("Failed to refresh token");
            }
            const data = await refreshResponse.json();
            localStorage.setItem("access_token", data.accessToken);
            return data.accessToken;
        } catch (error) {
            console.error("Token update error:", error);
            throw error;
        }
     },
};
