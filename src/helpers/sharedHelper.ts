export const getRamdonId = (complement: string): string =>
  `${Date.now()}${Math.random()}${complement}`;
