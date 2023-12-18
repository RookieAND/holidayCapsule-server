export type AuthServiceReqParam = {
    register: {
        socialId: number;
        profileImageUrl: string;
        nickname: string;
    }
    login: {
        userId: string
    }
}