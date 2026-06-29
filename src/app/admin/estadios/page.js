import { getStadiums } from "@/services/stadiumService";
import EstadiosClient from "./EstadiosClient";

// Next.js App Router Page
export default async function AdminEstadiosPage({ searchParams }) {
  // Extract search params if available (Next.js 13+ passes searchParams as promise in 15 or directly in older, assuming await is safe)
  const resolvedParams = await searchParams;
  const search = resolvedParams?.search || "";

  const stadiums = await getStadiums(search);

  return (
    <EstadiosClient initialStadiums={stadiums} initialSearch={search} />
  );
}
