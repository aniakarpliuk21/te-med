import {IUser} from "@/models/IUser";
import {IMessage} from "@/models/IMessage";

export interface IChat {
    _id: string;
    users: IUser[];
    messages: IMessage[];
    lastMessage?: IMessage;
    createdAt: string;
    updatedAt: string;
}