import { FC, useState } from "react";
import { auth, db } from "../firebase";
import { formatDate } from "../helpers";
import { doc, updateDoc } from "firebase/firestore";
import { z } from "zod";
import { MessageContentSchema } from "../helpers/validateMessage.helper";

type Props = {
  id: string;
  message: z.infer<typeof MessageContentSchema>;
};

const Message: FC<Props> = ({ id, message }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newMessage, setNewMessage] = useState(message.text);

  let newStyle = "message";
  if (auth.currentUser) {
    const user = auth.currentUser.uid;
    const newUser = message.uid;
    newStyle = user === newUser ? "my-message" : "message";
  }
  const updateMessage = async () => {
    const newMessageRef = doc(db, "messages", id);
    await updateDoc(newMessageRef, {
      text: newMessage,
    });
  };
  //   console.log(message.timestamp);

  return (
    <article className={newStyle}>
      <div
        onClick={() => {
          setIsEditing(true);
        }}
      >
        <div className="text-message">
          {isEditing ? (
            <input
              onKeyUp={async (event) => {
                if (event.key === "Enter") {
                  console.log("Enter");
                  setIsEditing(false);
                  await updateMessage();
                }
              }}
              onChange={(event) => {
                setNewMessage(event.target.value);
              }}
              value={newMessage}
            />
          ) : (
            <p className="text">{newMessage}</p>
          )}
        </div>
        <p className="time">{formatDate(message.timestamp)}</p>
      </div>

      <img src={message.photo} alt="user photo" referrerPolicy="no-referrer" />
    </article>
  );
};

export default Message;
