import { UseCaseError } from '../app-error';

export class NotAllowedError extends Error implements UseCaseError {
  constructor(customMessage?: string) {
    const message = customMessage ?? 'No allowed';
    super(message);
    this.message = message;
  }
}
