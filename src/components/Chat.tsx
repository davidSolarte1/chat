import { useEffect, useRef, useState } from "react";
import { auth, db } from "../firebase";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  MessageContentSchema,
  MessageSchema,
} from "../helpers/validateMessage.helper";
import { z } from "zod";

const Chat = () => {
  const [messages, setMessages] = useState<z.infer<typeof MessageSchema>[]>([]);
  const [user] = useAuthState(auth);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log("Componentne montado");
    const newQuery = query(collection(db, "messages"), orderBy("timestamp"));

    const unSuscribe = onSnapshot(newQuery, (querySnapshot) => {
      const currentMessages: {
        id: string;
        content: {
          uid: string;
          timestamp: Timestamp;
          text: string;
          photo: string;
        };
      }[] = [];
      querySnapshot.forEach((item) => {
        console.log("TIMESTAMP", item.data().timestamp, item.data(), item.id);
        const data = MessageContentSchema.parse(item.data());
        currentMessages.push({
          content: data,
          id: item.id,
        });
      });
      setMessages(currentMessages);
    });
    return () => {
      console.log("Componente desmontado");
      unSuscribe();
    };
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const scrollToBottom = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <section className="chat-content">
        {messages.map((item, index) => (
          <div
            key={item.id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <Message id={item.id} message={item.content} />
          </div>
        ))}
      </section>
      {user && <SendMessage />}
    </div>
  );
};

export default Chat;
