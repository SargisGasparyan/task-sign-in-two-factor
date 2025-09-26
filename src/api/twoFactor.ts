import type { ResponceTwoFa } from 'types/TwoFaTypes';

// mock API для two-factor
export const mockVerifyTwoFaCode = async (code: string) => {
  // From 1 to 6
  const sixDigits = /^\d{6}$/;

  return new Promise<ResponceTwoFa>((resolve, reject) => {
    setTimeout(() => {
      if (!sixDigits.test(code)) {
        reject(new Error('Code must be exactly 6 digits'));
        return;
      }

      if (code === '123456') {
        resolve({ success: true, token: 'mock-token-123' });
      } else {
        reject(new Error('Invalid code'));
      }
    }, 1000);
  });
};
