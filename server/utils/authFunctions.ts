import jwt from 'jsonwebtoken';

import crypto from 'crypto';

require('dotenv').config();

export const generateAccessToken = (user: string) => {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

  console.log(ACCESS_TOKEN_SECRET);

  if (!ACCESS_TOKEN_SECRET) {
    throw new Error('ACCESS_TOKEN_SECRET is undefined');
  }

  const accessToken = jwt.sign({ userId: user }, ACCESS_TOKEN_SECRET, {
    expiresIn: '30m',
  });

  return encrypt(accessToken);
};

export const generateRefreshToken = (user: any) => {
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

  if (!REFRESH_TOKEN_SECRET) {
    throw new Error('REFRESH_TOKEN_SECRET is undefined');
  }

  const refreshToken = jwt.sign({ userId: user }, REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });

  return encrypt(refreshToken);
};

export const encrypt = (text: string) => {
  const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
  const IV_LENGTH = 16;

  if (ENCRYPTION_KEY) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      Buffer.from(ENCRYPTION_KEY, 'hex'),
      iv
    );

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return iv.toString('hex') + ':' + encrypted;
  }
};

export const decrypt = (text: string) => {
  const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

  if (ENCRYPTION_KEY) {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift()!, 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      Buffer.from(ENCRYPTION_KEY, 'hex'),
      iv
    );

    // For Buffers, you don't need to specify the input encoding, only the output encoding if you're converting the output to a string
    let decrypted = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ]);

    return decrypted.toString('utf8'); // Convert the decrypted Buffer back to string
  } else {
    throw new Error('Encryption key is missing');
  }
};

export const getUserId = (token: string): string => {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

  if (!ACCESS_TOKEN_SECRET) {
    throw new Error('error');
  }

  const decryptedToken = decrypt(token);
  const decodedToken = jwt.verify(decryptedToken, ACCESS_TOKEN_SECRET) as {
    userId: string;
  };

  const userId = decodedToken.userId;

  return userId;
};
