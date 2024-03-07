import { UseCaseError } from '../app-error';

export class TokenExpiredError extends Error implements UseCaseError {
  constructor() {
    super(`Token expired`);
    this.message = 'Token expired';
  }
}
