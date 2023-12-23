import { JsonwebtokenModule } from '#/libs/jsonwebtoken';
import { userModel } from '#/models/user';

import type { ReqParam } from './type';

export class AuthService {
    /**
     * 새로운 유저 회원가입을 진행하는 함수 register
     */
    static async register({
        socialId,
        nickname,
        profileImageUrl,
    }: ReqParam['register']) {
        const createdUser = await userModel.create({
            socialId,
            profileImageUrl,
            nickname,
        });
        const userId = createdUser.id;
        const accessToken = JsonwebtokenModule.createAccessToken(userId);
        const refreshToken = JsonwebtokenModule.createRefreshToken(userId);
        return { accessToken, refreshToken };
    }

    /**
     * 기존 유저의 로그인을 진행하는 함수 login
     */
    static login({ userId }: ReqParam['login']) {
        const accessToken = JsonwebtokenModule.createAccessToken(userId);
        const refreshToken = JsonwebtokenModule.createRefreshToken(userId);
        return { accessToken, refreshToken };
    }
}
