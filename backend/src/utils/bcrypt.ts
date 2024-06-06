import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return { hashedPassword, error: null };
  } catch (error) {
    return { hashedPassword: null, error: "Some error when hashing" };
  }
}

export async function comparePasswords(
  plainPassword: string,
  hashedPassword: string
) {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (error) {
    console.error(error);
    return false;
  }
}
