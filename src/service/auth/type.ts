export type ReqParam = {
    register: {
        socialId: number;
        profileImageUrl: string;
        nickname: string;
    };
    login: {
        userId: string;
    };
};
