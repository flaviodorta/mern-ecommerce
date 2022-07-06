import { userModel } from '../models/users.model';

export const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, (txt: string) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLocaleLowerCase();
  });
};

export const validateEmail = (mail: string) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  } else {
    return false;
  }
};

export const emailCheckInDatabase = async (email: string) => {
  let userFound = await userModel
    .findOne({ email: email })
    .exec((err, data) => {
      if (data) {
        return true;
      } else {
        return false;
      }
    });
};
