import TicketRepository from "../../application/repository/TicketRepository";
import pgp from "pg-promise";
import Ticket from "../../domain/entities/Ticket";

export default class TicketRepositoryDataBase implements TicketRepository {
  async save(ticket: Ticket): Promise<void> {
    const connection = pgp()(
      "postgresql://postgres:h6nqpPD8sK@localhost:5432/banco_teste"
    );
    await connection.query(
      "insert into microservices.ticket (ticket_id, event_id, email, status) values ($1, $2, $3, $4)",
      [ticket.ticketId, ticket.eventId, ticket.email, ticket.status]
    );
    await connection.$pool.end();
  }

  async update(ticket: Ticket): Promise<void> {
    const connection = pgp()(
      "postgresql://postgres:h6nqpPD8sK@localhost:5432/banco_teste"
    );
    await connection.query(
      "update microservices.ticket set status = $1 where ticket_id = $2",
      [ticket.status, ticket.ticketId]
    );
    await connection.$pool.end();
  }
}
