export interface Encypter {
  encrypt(value: string): Promise<string>
}
