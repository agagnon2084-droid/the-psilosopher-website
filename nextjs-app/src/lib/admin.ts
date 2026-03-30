export const ADMIN_EMAILS = ['agagnon2084@gmail.com', 'hello@thepsilosopher.com'];

export function isAdmin(email: string | undefined | null): boolean {
  return !!email && ADMIN_EMAILS.includes(email);
}
