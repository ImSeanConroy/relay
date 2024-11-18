import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAuthContext } from "./auth-context";
import io, { Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: string[];
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

const socketURL = "http://localhost:3000"
  // import.meta.env.NODE === "development" ? "http://localhost:3000" : "/";

export const useSocketContext = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }
  return context;
};

export const SocketContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const socketRef = useRef<Socket | null>(null);

  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { authUser, isLoading } = useAuthContext();

  useEffect(() => {
    if (authUser && !isLoading) {
      const socket = io(socketURL, {
        query: {
          userId: authUser.id,
        },
      });
      socketRef.current = socket;

      socket.on("getOnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.close();
        socketRef.current = null;
      };
    } else if (!authUser && !isLoading) {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    }
  }, [authUser, isLoading]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
