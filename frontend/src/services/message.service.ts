
import {urls} from "@/urls/urls";
import {IMessage} from "@/models/IMessage";

export const messageService = {
    async sendMessage(chatId: string,message: string,) {
        const token = localStorage.getItem("access_token");
        const userId = localStorage.getItem("userId");
        if (!token) throw new Error("Missing access token");
        if (!userId) throw new Error("Відсутній userId");
        try {
            const response = await fetch(`${urls.backendBaseUrl}${urls.messagesUrl}/createMessage`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    content: message,
                    _chatId: chatId,
                    _userId: userId,}),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to send message");
            }
            return data;
        } catch (error) {
            console.error("Error sending message:", error);
        }
    },
    async getMessages(chatId: string) {
        const token = localStorage.getItem("access_token");
        const res = await fetch(`${urls.backendBaseUrl}${urls.messagesUrl}/?chatId=${chatId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Server error");
        return Array.isArray(data) ? data : [];
    },
    async updateMessage(messageId: string, content: string,): Promise<IMessage> {
        const token = localStorage.getItem("access_token");
        const response = await fetch(`${urls.backendBaseUrl}${urls.messagesUrl}/${messageId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({content}),
        });

        if (!response.ok) {
            throw new Error("Failed to update message");
        }

        return await response.json();
    },
    async deleteMessage(messageId: string) {
        const token = localStorage.getItem("access_token");
        const response = await fetch(`${urls.backendBaseUrl}${urls.messagesUrl}/${messageId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete message");
        }
    },
    async uploadFiles(chatId: string, messageInput: string, files: File[]) {
        const token = localStorage.getItem("access_token");
        if (!chatId) throw new Error("ChatId is required");
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User is not authorized.");
        const formData = new FormData();
        formData.append("_userId", userId);
        formData.append("_chatId", chatId);
        formData.append("content", messageInput);
        files.forEach((file) => {
                formData.append("file", file);
            }
        );
        const response = await fetch(`${urls.backendBaseUrl}${urls.messagesUrl}/uploadFiles`, {
            method: "POST",
            credentials: "include",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
        if (!response.ok) throw new Error("File upload error");
        return await response.json();
    }

};


