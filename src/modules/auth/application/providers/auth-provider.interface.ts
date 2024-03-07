export type AuthorizationProps = {
  userId: string;
  role: string;
};

export abstract class AuthProvider {
  abstract generateAuth(data: AuthorizationProps): string;
  abstract verifyCredentials(token: string): AuthorizationProps | undefined;
}
