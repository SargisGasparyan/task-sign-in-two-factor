import { AuthErrorCode } from '../constants';
import type { ResponceAuth, SignInPayloadAuth } from 'types/AuthTypes';

// mock API для sign-in
export const mockSignIn = async ({ email, password }: SignInPayloadAuth) => {
  return new Promise<ResponceAuth>((resolve, reject) => {
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
