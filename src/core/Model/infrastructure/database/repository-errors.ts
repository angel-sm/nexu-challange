export class DatabaseUnexpectedError extends Error {
  constructor() {
    super('Database error');
    this.name = 'DatabaseUnexpectedError';
  }
}

export class NotFoundError extends Error {
  constructor(resource: string) {
    super(`${resource} not found`);
    this.name = 'NotFoundError';
  }
}

export class DuplicateEntryError extends Error {
  constructor(resource: string) {
    super(`${resource} already exists`);
    this.name = 'DuplicateEntryError';
  }
}
