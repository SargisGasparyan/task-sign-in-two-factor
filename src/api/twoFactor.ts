// mock API для two-factor
export const mockVerifyTwoFaCode = async (code: string) => {
  return new Promise<{ success: boolean; token?: string }>(
    (resolve, reject) => {
      setTimeout(() => {
        if (code === "123456") {
          resolve({ success: true, token: "mock-token-123" });
        } else {
          reject(new Error("Неверный код 2FA"));
        }
      }, 1000);
    }
  );
};
