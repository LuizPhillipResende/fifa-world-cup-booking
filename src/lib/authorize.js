import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function authorizeUser(credentials) {
  if (!credentials?.email || !credentials?.password) {
    throw new Error("E-mail e senha são obrigatórios.");
  }

  const user = await prisma.user.findUnique({
    where: { email: credentials.email },
  });

  if (!user || !user.password) {
    throw new Error("Usuário não encontrado.");
  }

  const isValid = await bcrypt.compare(credentials.password, user.password);

  if (!isValid) {
    throw new Error("Senha inválida.");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}
