import { FormEvent, useState } from "react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase";
import EmojiPicker, { EmojiClickData, EmojiStyle } from "emoji-picker-react";

const SendMessage = () => {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState("close");

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.length > 0) {
      if (auth.currentUser) {
        const { uid, displayName, photoURL } = auth.currentUser;
        await addDoc(collection(db, "messages"), {
          text: input,
          name: displayName,
          uid,
          photo: photoURL,
          timestamp: new Timestamp(Math.floor(Date.now() / 1000), 0),
        });
        setInput("");
      }
    }
  };

  const emoji = () => setOpen("open");
  const closeEmoji = () => setOpen("close");
  const onEmojiClick = (emojiObject: EmojiClickData) => {
    console.log(emojiObject);
    setInput(`${input}${emojiObject.emoji}`);
    // setChosenEmoji(emojiObject);
    console.log("Emoji", emojiObject);
  };

  return (
    <form onSubmit={sendMessage}>
      <button type="button" className="btn-emoji" onClick={emoji}>
        <i className="fa-regular fa-face-smile"></i>
      </button>
      <div className={open}>
        <button type="button" className="close-emoji" onClick={closeEmoji}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <EmojiPicker
          emojiStyle={EmojiStyle.NATIVE}
          onEmojiClick={onEmojiClick}
        />
      </div>
      <input
        type="text"
        placeholder="Enter Message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;
