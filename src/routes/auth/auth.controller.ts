import { userModel } from '#/models/user';
import type { AuthSchema } from '#/routes/auth/auth.validation';
import { AuthService } from '#/service/auth/auth.service';
import { ValidatedRequestHandler } from '#/types/validation';

export class AuthController {
    static postLogin: ValidatedRequestHandler<AuthSchema['postLogin']> = async (
        req,
        res,
    ) => {
        const { id, profileImageUrl, nickname } = req.body;

        const user = await userModel.findOne({ socialId: id });

        // NOTE : 유저 정보가 있다면 로그인을 진행하고, 그렇지 않은 경우 회원가입 진행
        if (user) {
            console.log(user);
            const { accessToken, refreshToken } = AuthService.login({
                userId: user.id,
            });
            res.cookie('refresh-token', refreshToken);
            return res.status(200).json({ accessToken });
        }

        const { accessToken, refreshToken } = await AuthService.register({
            socialId: id,
            profileImageUrl,
            nickname,
        });
        res.cookie('refresh-token', refreshToken);
        return res.status(201).json({ accessToken });
    };
}
