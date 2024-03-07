import { UseCaseError } from '../app-error';

export class UnexpectedError extends Error implements UseCaseError {
  public constructor() {
    super(`An unexpected error occurred.`);
    this.message = 'An unexpected error occurred.';
  }
}
