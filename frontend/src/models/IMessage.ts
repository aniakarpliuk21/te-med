export interface IMessage {
    _id: string;
    _userId: string;
    _chatId: string;
    content: string;
    files?: string[];
    isDeleted: boolean;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
}
