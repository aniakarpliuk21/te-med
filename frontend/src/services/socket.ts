import { io } from "socket.io-client";
import {urls} from "@/urls/urls";


export const socket = io(urls.backendBaseUrl, {
    withCredentials: true,
    transports: ["websocket"],
});