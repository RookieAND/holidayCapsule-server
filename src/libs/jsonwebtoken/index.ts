import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';

import { UnauthorizedError } from '#/errors/definedErrors';

dotenv.config();

const JWT_TOKEN_KEY = process.env.JWT_TOKEN_KEY || '';

export class JsonwebtokenModule {
    /**
     * 새로운 엑세스 토큰을 생성하는 함수 createAccessToken
     */
    static createAccessToken(userId: string) {
        const accessToken = jsonwebtoken.sign({ userId }, JWT_TOKEN_KEY || '', {
            expiresIn: '30m',
        });
        return accessToken;
    }

    /**
     * 새로운 리프레시 토큰을 생성하는 함수 createRefreshToken
     */
    static createRefreshToken(userId: string) {
        const refreshToken = jsonwebtoken.sign(
            { userId },
            JWT_TOKEN_KEY || '',
            {
                expiresIn: '7d',
            },
        );
        return refreshToken;
    }

    /**
     * 인가 받은 JWT 를 검증하여 userId 를 반환하는 함수 verifyJsonWebToken
     */
    static verifyJsonWebToken(token: string): string {
        try {
            const decoded = jsonwebtoken.verify(token, JWT_TOKEN_KEY);
            return typeof decoded === 'string' ? decoded : decoded.userId;
        } catch (error) {
            throw new UnauthorizedError('인가 받은 토큰이 유효하지 않습니다.');
        }
    }
}
