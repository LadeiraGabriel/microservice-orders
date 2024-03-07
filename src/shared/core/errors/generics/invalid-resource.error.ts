import { UseCaseError } from '../app-error';

export class InvalidResourceError extends Error implements UseCaseError {
  constructor(customMessage?: string) {
    const message = customMessage ?? 'Resource invalid';
    super(message);
    this.message = message;
  }
}
