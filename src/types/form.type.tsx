export const formState = {
  success: false,
  error: {},
  message: null,
};

export type formStateType = {
  success: boolean;
  error: formValuesType;
  message: string | null;
};
export type formValuesType = {
  name?: string[];
  email?: string[];
  password?: string[];
  rePassword?: string[];
  phone?: string[];
};
