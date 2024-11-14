export class ApplicationError extends Error {
  constructor(
    public message: string,
    public status: number,
    public name: string,
    public cause?: unknown,
  ) {
    super(message, { cause });
  }
}
