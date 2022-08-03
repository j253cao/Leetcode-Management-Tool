export type invalidInput = {
  [key: string]: boolean;
};

export type formData = {
  username: string | null | undefined;
  email?: string | null | undefined;
  password: string | null | undefined;
  confirmPassword?: string | null | undefined;
};
