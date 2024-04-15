import { Request, Response } from 'express';

import jwt from 'jsonwebtoken';

import {
  addAccessTokenCookie,
  decrypt,
  generateAccessToken,
} from '../utils/authFunctions';
import { getUserInfo } from '../utils/functions';

import RefreshToken from '../models/refreshTokenModel';
import { access } from 'fs';

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
      console.log(decodedToken);
      const userId = decodedToken.userId;

      try {
        const targetRefreshToken = await RefreshToken.findOne({
          token: refreshToken,
          userId: decodedToken.userId,
        });

        if (refreshToken) {
          const accessToken = generateAccessToken(userId);

          if (accessToken) {
            addAccessTokenCookie(res, accessToken);
          }

          const user = { userId: userId };
          res.status(200).json(user);
        } else {
          return false;
        }
      } catch (error) {
        console.log('hiiiii', error);
        return false;
      }
    }
  } else {
    res.status(401).send('No refresh token');
  }
};

export const authController = async (req: Request, res: Response) => {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

  if (!ACCESS_TOKEN_SECRET) {
    throw new Error('error');
  }

  const accessToken = req.cookies.accessToken;

  if (accessToken) {
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

          const userInfo = { userId: userId };

          if (user) {
            res.status(200).json(userInfo);
          } else {
            res.status(404).json('user not found');
          }
        } catch (error: any) {
          console.error(error.message);
          res.status(500).json('server error');
        }
      } catch (error) {
        res.status(500).send('Internal server error');
      }
    }
  } else {
    res.set('WWW-Authenticate', 'Bearer error="invalid_token"');
    res.header('Access-Control-Expose-Headers', 'WWW-Authenticate');
    res.status(401).send('Unauthorised: no token');
  }
};
