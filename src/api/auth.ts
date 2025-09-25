// mock API для авторизации
export enum AuthErrorCode {
  InvalidEmail = 'InvalidEmail',
  UserNotFound = 'UserNotFound',
  WrongPassword = 'WrongPassword',
}

export interface SignInPayload {
  email: string;
  password: string;
}

export const mockSignIn = async ({ email, password }: SignInPayload) => {
  return new Promise<{ token: string; twoFa: boolean }>((resolve, reject) => {
    setTimeout(() => {
      // Проверка формата e-mail
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return reject(new Error(AuthErrorCode.InvalidEmail));
      }

      // Проверка пароля: ровно 6 цифр и конкретное значение «123456»
      const passwordRegex = /^\d{6}$/;
      if (!passwordRegex.test(password) || password !== '123456') {
        return reject(new Error(AuthErrorCode.WrongPassword));
      }

      // Успешный ответ
      resolve({ token: 'fake-jwt-token', twoFa: true });
    }, 1000);
  });
};
