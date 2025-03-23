"use client";
import { FC, useEffect, useState } from "react";
import { IChat } from "@/models/IChat";
import { IMessage } from "@/models/IMessage";
import { messageService } from "@/services/message.service";
import { socket } from "@/services/socket";

interface ChatProps {
    chat: IChat;
}

const Chat: FC<ChatProps> = ({ chat }) => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [messageInput, setMessageInput] = useState("");
    const [contextMessage, setContextMessage] = useState<IMessage | null>(null);
    const [editingMessage, setEditingMessage] = useState<IMessage | null>(null);
    const [files, setFiles] = useState<File[]>([]);
    const userId = typeof window === "undefined" ? null : localStorage.getItem("userId");

    useEffect(() => {
        setMessages(chat.messages || []);
    }, [chat]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const fetchedMessages = await messageService.getMessages(chat._id);
                setMessages(fetchedMessages);
            } catch (error) {
                console.error("Error receiving messages:", error);
            }
        };
        fetchMessages();
        socket.emit("joinChat", chat._id);

        const messageHandler = (newMessage: IMessage) => {
            setMessages((prev) => [...prev, newMessage]);
        };
        socket.on("receiveMessage", messageHandler);
        return () => {
            socket.off("receiveMessage", messageHandler);
        };
    }, [chat._id]);

    const handleSendMessage = async () => {
        if (!messageInput.trim() && files.length === 0) return;
        try {
            let sentMessage: IMessage;

            if (editingMessage) {
                sentMessage = await messageService.updateMessage(editingMessage._id, messageInput);
                setMessages((prev) =>
                    prev.map((msg) => (msg._id === editingMessage._id ? { ...msg, content: sentMessage.content } : msg))
                );
                setEditingMessage(null);
            } else if (files.length > 0) {
                sentMessage = await messageService.uploadFiles(chat._id, messageInput, files);
                setMessages((prev) => [...prev, sentMessage]);
            } else {
                sentMessage = await messageService.sendMessage(chat._id, messageInput);
                setMessages((prev) => [...prev, sentMessage]);
            }

            socket.emit("sendMessage", sentMessage);
            setMessageInput("");
            setFiles([]);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleDeleteMessage = async (messageId: string) => {
        try {
            await messageService.deleteMessage(messageId);
            setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
            setContextMessage(null);
        } catch (error) {
            console.error("Error deleting message:", error);
        }
    };

    const handleEditMessage = (msg: IMessage) => {
        setEditingMessage(msg);
        setMessageInput(msg.content);
        setContextMessage(null);
    };

    const handleUploadFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles(Array.from(event.target.files));
        }
    };

    return (
        <div className="w-2/3 p-4 bg-white shadow-md rounded-xl border border-gray-300">
            <h2 className="text-2xl font-semibold mb-4 text-pink-600">Chat</h2>
            <div className="border p-4 h-96 overflow-y-auto flex flex-col gap-2 bg-gray-50 rounded-lg">
                {messages.length ? (
                    messages.map((msg) => (
                        <div
                            key={msg._id}
                            className={`p-3 rounded-xl max-w-xs break-words relative cursor-pointer shadow-sm transition-all duration-200 ease-in-out hover:shadow-lg text-white ${
                                msg._userId === userId ? "bg-pink-500 self-end" : "bg-gray-400 self-start text-black"
                            }`}
                            onClick={() => setContextMessage(msg)}
                        >
                            {msg.content}
                            {contextMessage?._id === msg._id && (
                                <div className="absolute right-0 mt-2 w-32 bg-white shadow-md border rounded-lg p-2 z-10">
                                    <button
                                        onClick={() => handleEditMessage(msg)}
                                        className="block w-full text-left px-2 py-1 hover:bg-gray-200"
                                    >
                                        ✏️ Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteMessage(msg._id)}
                                        className="block w-full text-left px-2 py-1 hover:bg-red-200 text-red-500"
                                    >
                                        🗑️ Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No messages yet.</p>
                )}
            </div>
            <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Enter a message"
                className="w-full p-3 border rounded-lg mt-2 focus:ring-2 focus:ring-pink-500"
            />
            <input
                type="file"
                multiple
                onChange={handleUploadFiles}
                className="w-full p-3 border rounded-lg mt-2"
            />
            <button
                onClick={handleSendMessage}
                className="w-full bg-green-500 text-white p-3 rounded-lg mt-2 hover:bg-green-600 transition"
            >
                {editingMessage !== null ? "📌 Update" : "📨 Send"}
            </button>
        </div>
    );
};

export default Chat;
