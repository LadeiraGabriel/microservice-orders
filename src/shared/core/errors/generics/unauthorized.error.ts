import { UseCaseError } from '../app-error';

export class UnauthorizedError extends Error implements UseCaseError {
  constructor(customMessage?: string) {
    const message = customMessage ?? 'No authorization';
    super(message);
    this.message = message;
  }
}
