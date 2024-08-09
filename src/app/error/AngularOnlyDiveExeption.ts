export class AngularOnlyDiveExeption extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AngularOnlyDiveExeption";
  }
}
