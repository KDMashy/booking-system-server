import * as bcrypt from 'bcrypt';

export function EncodePassword(rawPassword: string) {
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawPassword, SALT);
}

export function ComparePassword(rawPassword: string, hash: string) {
    return bcrypt.compareSync(rawPassword, hash);
}