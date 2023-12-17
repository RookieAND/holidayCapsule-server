import { userModel } from '#/models/user';
import type { AuthSchema } from '#/routes/auth/auth.validation';
import { ValidatedRequestHandler } from '#/types/validation';

export class AuthController {
    static postLogin: ValidatedRequestHandler<AuthSchema['postLogin']> = async (
        req,
        res,
    ) => {
        const { id, profileImageUrl, nickname } = req.body;

        const isExist = await userModel.findOne({ socialId: id });

        if (isExist) {
            // TODO : JWT 로직 추가 예정

            return res.status(200).json({});
        }

        await userModel.create({ socialId: id, profileImageUrl, nickname });
        // TODO : JWT 로직 추가 예정

        return res.status(201).json({});
    };
}
