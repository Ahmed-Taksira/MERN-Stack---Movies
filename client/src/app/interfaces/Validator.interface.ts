export interface Validator {
  validate: (value: string) => boolean;
  errorMessage: string;
}
