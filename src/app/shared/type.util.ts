const MAX_SAFE_INTEGER = 9007199254740991; // Math.pow(2, 53) - 1;

export function isSafeInteger(value: string) {
  const num = Number.parseInt(value, 10);
  return Number.isNaN(num) ? false : Number.isInteger(num) && Math.abs(num) <= MAX_SAFE_INTEGER;
}

export function isSafeFloat(value: string) {
  const num = Number.parseFloat(value);
  return Number.isNaN(num) ? false : Number(num) === num && num % 1 !== 0 && Math.abs(num) <= MAX_SAFE_INTEGER;
}
