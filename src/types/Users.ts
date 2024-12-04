type UserLoginRequest = {
  email: string;
  password: string;
};

type UserRegisterReqeust = {
  name: string;
  email: string;
  password: string;
};

type UserResponse = {
  userId: string;
  name: string;
  email: string;
  token: string;
};

export type { UserLoginRequest, UserRegisterReqeust, UserResponse };
