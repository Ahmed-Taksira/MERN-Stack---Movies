const isRequired = {
  validate: (value: string) => value.trim() !== "",
  errorMessage: "This field is required.",
};

const isEmail = {
  validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  errorMessage: "Enter a valid email address.",
};

const isNumber = {
  validate: (value: string) => /^\d+$/.test(value),
  errorMessage: "This field must be a number.",
};

export const Validator = {
  isRequired,
  isEmail,
  isNumber,
};
