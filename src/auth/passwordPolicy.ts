const MIN_LENGTH = 8;

const UPPERCASE_REGEX = /[A-Z]/;
const LOWERCASE_REGEX = /[a-z]/;
const NUMBER_REGEX = /[0-9]/;
const SPECIAL_REGEX = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

export type PasswordRequirement = {
  label: string;
  test: (password: string) => boolean;
};

export const PASSWORD_REQUIREMENTS: PasswordRequirement[] = [
  {
    label: "At least 8 characters",
    test: (pwd) => pwd.length >= MIN_LENGTH
  },
  {
    label: "One uppercase letter",
    test: (pwd) => UPPERCASE_REGEX.test(pwd)
  },
  {
    label: "One lowercase letter",
    test: (pwd) => LOWERCASE_REGEX.test(pwd)
  },
  {
    label: "One number",
    test: (pwd) => NUMBER_REGEX.test(pwd)
  },
  {
    label: "One special character (!@#$%^&*)",
    test: (pwd) => SPECIAL_REGEX.test(pwd)
  }
];

export type PasswordStrength = "empty" | "weak" | "medium" | "strong";

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return "empty";

  const metCount = PASSWORD_REQUIREMENTS.filter((r) => r.test(password)).length;

  if (metCount <= 2) return "weak";
  if (metCount <= 4) return "medium";
  return "strong";
}

export function isPasswordValid(password: string): boolean {
  return PASSWORD_REQUIREMENTS.every((r) => r.test(password));
}

export function validatePassword(
  password: string
): { valid: boolean; failedRequirements: string[] } {
  const failedRequirements = PASSWORD_REQUIREMENTS.filter(
    (r) => !r.test(password)
  ).map((r) => r.label);

  return {
    valid: failedRequirements.length === 0,
    failedRequirements
  };
}