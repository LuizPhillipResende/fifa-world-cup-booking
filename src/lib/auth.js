/**
 * Utilitários de autenticação e autorização para API Routes.
 * Centraliza a verificação de sessão e permissões,
 * evitando repetir getServerSession + verificações em cada rota.
 */

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { USER_ROLES } from '@/lib/constants';

/**
 * Retorna a sessão do usuário logado ou null.
 * @returns {Promise<{user: {id: string, name: string, email: string, role: string}} | null>}
 */
export async function getSession() {
  return await getServerSession(authOptions);
}

/**
 * Verifica se o usuário está autenticado.
 * Retorna a sessão se logado, ou uma resposta de erro 401.
 * @returns {Promise<{session: object|null, errorResponse: NextResponse|null}>}
 */
export async function requireAuth() {
  const session = await getSession();

  if (!session) {
    return {
      session: null,
      errorResponse: NextResponse.json(
        { error: 'Autenticação necessária.' },
        { status: 401 }
      ),
    };
  }

  return { session, errorResponse: null };
}

/**
 * Verifica se o usuário é administrador (role === ADMIN).
 * Retorna a sessão se admin, ou resposta de erro 401/403.
 * @returns {Promise<{session: object|null, errorResponse: NextResponse|null}>}
 */
export async function requireAdmin() {
  const { session, errorResponse } = await requireAuth();

  if (errorResponse) {
    return { session: null, errorResponse };
  }

  if (session.user.role !== USER_ROLES.ADMIN) {
    return {
      session: null,
      errorResponse: NextResponse.json(
        { error: 'Acesso restrito a administradores.' },
        { status: 403 }
      ),
    };
  }

  return { session, errorResponse: null };
}
