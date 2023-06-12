import argon2 from "argon2";

export const hashPassword = async (password: string) => {
  try {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  } catch (error) {
    console.log("the error from hashing password is", error);
  }
};

export const verifyPassword = async (
  hashedPassword: string,
  password: string
) => {
  try {
    console.log(hashedPassword);
    const verified = await argon2.verify(hashedPassword, password);
    if (verified) {
      return true;
    }
  } catch (error) {
    console.log("the error from verifying password is", error);
  }
};
