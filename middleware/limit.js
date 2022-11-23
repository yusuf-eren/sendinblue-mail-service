import { sendMailToUser } from "../services/send-mail.js";

let limit = 5;
export const limitMiddleware = (req, res, next) => {
  if (limit === 0) {
    const { nameSurname, email } = req.body;
    sendMailToUser(nameSurname, email, 'limit_exceeded');
    return res.json({ message: 'You reached your daily limit' });
  }
  console.log(limit)
  limit--;
  next();
};
