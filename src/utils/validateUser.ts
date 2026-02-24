export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidName(name: string): boolean {
  return name.trim().length >= 2;
}

export function validateUser(name: string, email: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!isValidName(name)) {
    errors.push('Имя должно содержать минимум 2 символа');
  }

  if (!isValidEmail(email)) {
    errors.push('Некорректный email');
  }

  return { valid: errors.length === 0, errors };
}
