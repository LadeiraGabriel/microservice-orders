export abstract class HashProvider {
  abstract generate(payload: string): Promise<string>;
  abstract compare(payload: string, hashed: string): Promise<boolean>;
}
