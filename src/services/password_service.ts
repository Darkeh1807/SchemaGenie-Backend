import { hash, compare } from "bcrypt";

export class PasswordService {
  static hashPassword = async (rawPassword: string) => {
    try {
      const epass = await hash(rawPassword, 10);
      return epass;
    } catch (error) {
      throw new Error(error as string);
    }
  };

  static comparePassword = async (
    rawPassword: string,
    encryptedPassword: string
  ) => {
    try {
      const isValid = await compare(rawPassword, encryptedPassword);
      return isValid;
    } catch (error) {
      throw new Error(error as string);
    }
  };
}
