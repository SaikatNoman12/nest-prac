export class DatabaseConnectionError extends Error {
  code: string;
  description: string;

  constructor(message: string, description: string) {
    super(message);
    this.name = 'DatabaseConnectionError';
    this.code = 'ECONNREFUSED';
    this.description = description;
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
