import bcrypt from 'bcrypt';

export async function hashPassword(plaintextPassword: string): Promise<string> {
  return await bcrypt.hash(plaintextPassword, 10);
}

export async function comparePassword(plaintextPassword: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(plaintextPassword, hash);
}