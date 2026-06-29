import { getReservations } from "@/services/reservationService";
import ReservasClient from "./ReservasClient";

export default async function AdminReservasPage() {
  const reservations = await getReservations();

  return (
    <ReservasClient initialReservations={reservations} />
  );
}
