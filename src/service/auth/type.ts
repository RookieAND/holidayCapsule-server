export type AuthServiceReqParam = {
    register: {
        id: string;
        profileImageUrl: string;
        nickname: string;
    }
}

export type AuthServiceResponse = {}