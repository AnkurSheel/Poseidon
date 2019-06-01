export class UniqueConstraintError extends Error {
    constructor(m: string) {
        super(m);
        this.name = 'UniqueConstraintError';

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, UniqueConstraintError.prototype);
    }
}
