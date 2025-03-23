import { urls } from "@/urls/urls";
import { IChat } from "@/models/IChat";

export const chatService = {
    getAllChats: async (): Promise<IChat[]> => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            throw new Error("Token not found");
        }
        const response = await fetch(`${urls.backendBaseUrl}${urls.chatsUrl}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to load chats: ${response.status} - ${errorText}`);
        }
        try {
            return await response.json();
        } catch (error) {
            throw new Error("JSON parsing error: " + error);
        }
    },
    createChat: async (email: string): Promise<IChat> => {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("User is not authorized.");
        if (!email.trim()) throw new Error("Email cannot be empty.");

        const response = await fetch(`${urls.backendBaseUrl}${urls.chatsUrl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to create chat: ${response.status} - ${errorText}`);
        }

        const chat: IChat = await response.json();
        if (!chat._id) {
            throw new Error("The created chat has no id");
        }
        return chat;
    },

    getChatById: async (chatId: string): Promise<IChat> => {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("Token not found");
        if (!chatId) throw new Error("chatId cannot be empty");

        const response = await fetch(`${urls.backendBaseUrl}${urls.chatsUrl}/${chatId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to get chat: ${response.status}`);
        }
        return response.json();
    },
};
