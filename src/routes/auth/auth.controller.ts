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
        await userModel.findOne

        if (user) {
            const accessToken = AuthService.createAccessToken(user.id);
            const refreshToken = AuthService.createRefreshToken(user.id);

            return res.status(200).json({});
        }

        await userModel.create({ socialId: id, profileImageUrl, nickname });
        // TODO : JWT 로직 추가 예정

        return res.status(201).json({});
    };
}
