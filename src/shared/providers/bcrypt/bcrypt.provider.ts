import { HashProvider } from 'src/modules/users/application/providers/hash-provider.interface';
import { hash, compare } from 'bcrypt';

export class BcryptHashProvider implements HashProvider {
  async generate(payload: string): Promise<string> {
    return await hash(payload, 12);
  }
  async compare(payload: string, hashed: string): Promise<boolean> {
    return await compare(payload, hashed);
  }
}
