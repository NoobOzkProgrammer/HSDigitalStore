import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

const JWT_SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || 'hs_digital_store_super_secure_auth_secret_key_minimum_32_characters_123456'
);

const SESSION_COOKIE_NAME = 'hs_session';

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: 'CUSTOMER' | 'SUPPORT' | 'ADMIN' | 'SUPER_ADMIN';
}

// In-memory default users for immediate admin & customer access
const defaultUsers: (UserSession & { passwordHash: string })[] = [
  {
    id: 'usr-admin-1',
    email: 'admin@hsdigitalstore.com',
    name: 'HS Admin',
    role: 'SUPER_ADMIN',
    // Hash for 'AdminHS2026!'
    passwordHash: bcrypt.hashSync('AdminHS2026!', 10),
  },
  {
    id: 'usr-customer-1',
    email: 'alex.rivera@example.com',
    name: 'Alex Rivera',
    role: 'CUSTOMER',
    // Hash for 'Customer2026!'
    passwordHash: bcrypt.hashSync('Customer2026!', 10),
  },
];

export async function createSession(user: UserSession) {
  const token = await new SignJWT({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(JWT_SECRET);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });

  return token;
}

export async function getSession(): Promise<UserSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;

    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      id: payload.id as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as UserSession['role'],
    };
  } catch {
    return null;
  }
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function authenticateUser(email: string, plainPass: string): Promise<UserSession | null> {
  const user = defaultUsers.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
  if (!user) return null;

  const valid = await bcrypt.compare(plainPass, user.passwordHash);
  if (!valid) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
}

export async function requireAuth(): Promise<UserSession> {
  const session = await getSession();
  if (!session) {
    throw new Error('UNAUTHORIZED');
  }
  return session;
}

export async function requireAdmin(): Promise<UserSession> {
  const session = await getSession();
  if (!session || (session.role !== 'ADMIN' && session.role !== 'SUPER_ADMIN')) {
    throw new Error('FORBIDDEN');
  }
  return session;
}
