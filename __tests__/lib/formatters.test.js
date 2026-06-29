import { formatCurrency, formatDate, formatTime } from "@/lib/formatters";

describe("Formatters", () => {
  describe("formatCurrency", () => {
    it("formats numbers as BRL currency", () => {
      const result = formatCurrency(1105.5);
      // The exact output might vary slightly by Node version space characters,
      // but it should contain "R$" and "1.105,50".
      expect(result).toMatch(/R\$\s?1\.105,50/);
    });

    it("handles zero correctly", () => {
      const result = formatCurrency(0);
      expect(result).toMatch(/R\$\s?0,00/);
    });
  });

  describe("formatDate", () => {
    it("formats a Date object to a readable date string", () => {
      // Usando uma data específica (mês base 0, portanto 5 = Junho)
      const date = new Date(2026, 5, 15);
      const result = formatDate(date);
      // O formato esperado é algo como "15 de jun. de 2026" ou "15 jun 2026", depende do locale,
      // a implementação atual usa pt-BR day: 2-digit, month: short, year: numeric
      expect(result).toMatch(/15 .* jun.* .* 2026/i);
    });
  });

  describe("formatTime", () => {
    it("formats a Date object to a readable time string", () => {
      const date = new Date(2026, 5, 15, 18, 30);
      const result = formatTime(date);
      expect(result).toBe("18:30");
    });
  });
});
