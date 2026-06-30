import { authorizeUser } from "@/lib/authorize";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

// Mocks
jest.mock("bcryptjs", () => ({
  compare: jest.fn(),
}));

jest.mock("@/lib/prisma", () => ({
  user: {
    findUnique: jest.fn(),
  },
}));

describe("Autenticação e Login (RF001)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("[TU001] Deve autorizar o login com credenciais válidas", async () => {
    const mockUser = {
      id: "user-123",
      name: "João Silva",
      email: "joao@example.com",
      password: "hashed_password",
      role: "FAN",
    };

    prisma.user.findUnique.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);

    const result = await authorizeUser({ email: "joao@example.com", password: "senha123" });

    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: "joao@example.com" } });
    expect(bcrypt.compare).toHaveBeenCalledWith("senha123", "hashed_password");
    
    // A senha nunca deve ser retornada no token
    expect(result).toEqual({
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
      role: mockUser.role,
    });
  });

  it("[TU002] Deve bloquear o login e lançar erro com credenciais inválidas (senha incorreta)", async () => {
    const mockUser = {
      id: "user-123",
      email: "joao@example.com",
      password: "hashed_password",
    };

    prisma.user.findUnique.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false); // Senha errada

    await expect(authorizeUser({ email: "joao@example.com", password: "senha_errada" }))
      .rejects.toThrow("Senha inválida.");
  });

  it("Deve bloquear o login se o usuário não for encontrado", async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    await expect(authorizeUser({ email: "naoexiste@example.com", password: "senha123" }))
      .rejects.toThrow("Usuário não encontrado.");
  });
});
