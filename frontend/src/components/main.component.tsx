"use client";
import { useEffect, useState } from "react";
import { IChat } from "@/models/IChat";
import { chatService } from "@/services/chat.service";
import Chat from "@/components/chat.component";

const MainPage = () => {
    const [chats, setChats] = useState<IChat[]>([]);
    const [email, setEmail] = useState("");
    const [selectedChat, setSelectedChat] = useState<IChat | null>(null);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const fetchedChats = await chatService.getAllChats();
                setChats(fetchedChats);
            } catch (error) {
                console.error("Error loading chats:", error);
            }
        };
        fetchChats();
    }, []);

    const handleCreateChat = async () => {
        if (!email.trim()) return;
        try {
            const newChat = await chatService.createChat(email);
            setChats((prevChats) => [...prevChats, newChat]);
            setSelectedChat(newChat);
            setEmail("");
        } catch (error) {
            console.error("Error creating chat:", error);
        }
    };

    const handleChatSelect = (chatId: string) => {
        const chat = chats.find((chat) => chat._id === chatId);
        if (chat) setSelectedChat(chat);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="w-1/3 bg-white shadow-lg p-6 flex flex-col">
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email to start chat"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <button
                    onClick={handleCreateChat}
                    className="w-full mt-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white p-3 rounded-lg font-semibold hover:shadow-md transition-all duration-300"
                >
                    Create chat
                </button>
                <h2 className="mt-6 text-lg font-semibold text-gray-700">Your chats:</h2>
                <ul className="mt-3 space-y-2">
                    {chats.map((chat) => (
                        <li
                            key={chat._id}
                            className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                                selectedChat?._id === chat._id
                                    ? "bg-pink-500 text-white"
                                    : "bg-gray-200 hover:bg-gray-300"
                            }`}
                            onClick={() => handleChatSelect(chat._id)}
                        >
                            {chat.users.map((user) => user.email).join(", ")}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex-1 flex items-center justify-center">
                {selectedChat ? (
                    <Chat key={selectedChat._id} chat={selectedChat} />
                ) : (
                    <p className="text-gray-500 text-xl">Select a chat</p>
                )}
            </div>
        </div>
    );
};

export default MainPage;
