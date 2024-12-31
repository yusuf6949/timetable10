import { createHash } from 'crypto';

export const hashPassword = async (password: string, salt: string): Promise<{ hash: string; salt: string }> => {
  const hash = createHash('sha256')
    .update(password + salt)
    .digest('hex');
  
  return { hash, salt };
};

export const verifyPassword = async (password: string, hash: string, salt: string): Promise<boolean> => {
  const result = await hashPassword(password, salt);
  return result.hash === hash;
};