export class GeneratorUtils {
  static getCreatedDate(): number {
    return Math.round(new Date().getTime() / 1000);
  }

  static generateID(createdDate: number): number {
    return (createdDate + Math.floor(Math.random() * 10000000) + 1);
  }
}
