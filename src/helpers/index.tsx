import { Timestamp } from "firebase/firestore";

export const formatDate = (objDate: Timestamp) => {
  const date = new Date(objDate?.seconds * 1000);

  const time = `${date.getHours()}:${date.getMinutes()}`;

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
  };
  const newDate = date.toLocaleDateString("en-US", options);
  return `${newDate} - ${time}`;
};
