import { Timestamp } from "firebase/firestore";
import { z } from "zod";

export const MessageContentSchema = z.object({
  uid: z.string(),
  timestamp: z.instanceof(Timestamp),
  text: z.string(),
  photo: z.string(),
});
// type MessageContent = {
//   uid: string;
//   timestamp: Timestamp;
//   text: string;
//   photo: string;
// };
// const messageContent: z.infer<typeof MessageContentSchema> = {

// };

export const MessageSchema = z.object({
  id: z.string(),
  content: MessageContentSchema,
});
// uid: string;
// timestamp: Timestamp;
// text: string;
// photo: string;

// type User = {
//   name: string;
//   email: string;
// };
// const user: User = {
//   email: "email",
//   name: "name",
// };

// const UserSchema = z.object({
//   name: z.string(),
//   email: z.string().email(),
// });

// const user2 = {};
// function validateUser(user: unknown) {
//   //    const validUser =  UserSchema.parse(user);
// }

// validateUser(123123123);
