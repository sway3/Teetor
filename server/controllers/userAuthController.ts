import { Request, Response } from 'express';

import jwt from 'jsonwebtoken';

import { decrypt, generateAccessToken } from '../utils/authFunctions';
import { getUserInfo } from '../utils/functions';

import RefreshToken from '../models/refreshTokenModel';

require('dotenv').config();

export const refreshTokenController = async (req: Request, res: Response) => {
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

  if (!REFRESH_TOKEN_SECRET) {
    throw new Error('error');
  }

  if (req.cookies.refreshToken) {
    const refreshToken = req.cookies.refreshToken;
    const decryptToken = decrypt(refreshToken);

    if (decryptToken) {
      const decodedToken = jwt.verify(decryptToken, REFRESH_TOKEN_SECRET) as {
        userId: string;
      };
      const userId = decodedToken.userId;

      try {
        const refreshToken = await RefreshToken.findOne({
          token: decodedToken,
          userId: decodedToken.userId,
        });

        if (refreshToken) {
          const accessToken = generateAccessToken(userId);

          res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 30 * 60 * 1000,
          });

          res.status(200).send('User login successful');
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};

export const authController = async (req: Request, res: Response) => {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

  if (!ACCESS_TOKEN_SECRET) {
    throw new Error('error');
  }

  if (req.cookies.accessToken) {
    // access Token validation
    const accessToken = req.cookies.accessToken;
    const decrypt_token = decrypt(accessToken);

    if (decrypt_token) {
      const decodedToken = jwt.verify(decrypt_token, ACCESS_TOKEN_SECRET) as {
        userId: string;
      };
      const userId = decodedToken.userId;
      try {
        try {
          const user = await getUserInfo(userId);

          if (user) {
            res.status(200).json('login successful');
          } else {
            res.status(404).json('user not found');
          }
        } catch (error: any) {
          console.error(error.message);
          res.status(500).json('server error');
        }
      } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
          res.set('WWW-Authenticate', 'Bearer error="expired_token"');
          res.status(401).send('Unauthorised');
        } else if (error instanceof jwt.JsonWebTokenError) {
          res.set('WWW-Authenticate', 'Bearer error="invalid_token"');
          res.status(401).send('Unauthorised');
        }
      }
    }
  } else {
    res.set('WWW-Authenticate', 'Bearer error="no token"');
    res.status(401).send('token_not_found');
  }
};
