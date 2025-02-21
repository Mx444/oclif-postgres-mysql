export const logger = {
  success: (message: string): void => {
    console.log(`SUCCESS: ${message}`);
  },
  info: (message: string): void => {
    console.log(`INFO: ${message}`);
  },
  error: (message: string): void => {
    console.error(`ERROR: ${message}`);
  },
};
