import { auth } from "../firebase";
import { formatDate } from "./helpers";

const Message = ({ message }) => {
  let newStyle = "message";
  if (auth.currentUser) {
    const user = auth.currentUser.uid;
    const newUser = message.uid;
    newStyle = user === newUser ? "my-message" : "message";
  }
  //   console.log(message.timestamp);

  return (
    <article className={newStyle}>
      <div>
        <div className="text-message">
          <p className="text">{message.text}</p>
        </div>
        <p className="time">{formatDate(message.timestamp)}</p>
      </div>

      <img src={message.photo} alt="user photo" referrerPolicy="no-referrer" />
    </article>
  );
};

export default Message;
