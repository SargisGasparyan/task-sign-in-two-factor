import type { ResponceTwoFa } from 'types/TwoFaTypes';

// mock API для two-factor
export const mockVerifyTwoFaCode = async (code: string) => {
  return new Promise<ResponceTwoFa>((resolve, reject) => {
    setTimeout(() => {
      if (code === '123456') {
        resolve({ success: true, token: 'mock-token-123' });
      } else {
        reject(new Error('Invalid code'));
      }
    }, 1000);
  });
};
