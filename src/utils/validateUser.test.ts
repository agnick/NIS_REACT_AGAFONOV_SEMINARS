import { isValidEmail, isValidName, validateUser } from './validateUser';

describe('isValidEmail (синхронный)', () => {
  test('возвращает true для корректного email', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
  });

  test('возвращает false для некорректного email', () => {
    expect(isValidEmail('invalid')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });
});

describe('isValidName (синхронный)', () => {
  test('возвращает true для имени от 2 символов', () => {
    expect(isValidName('John')).toBe(true);
  });

  test('возвращает false для слишком короткого имени', () => {
    expect(isValidName('A')).toBe(false);
    expect(isValidName('  ')).toBe(false);
  });
});

describe('validateUser (синхронный)', () => {
  test('возвращает valid: true для корректных данных', () => {
    const result = validateUser('John Doe', 'john@example.com');
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('возвращает ошибки для некорректных данных', () => {
    const result = validateUser('', 'bad');
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(2);
  });
});
