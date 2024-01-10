import TicketRepository from "../../application/repository/TicketRepository";
import pgp from "pg-promise";
import Transaction from "../../domain/entities/Transaction";
import TransactionRepository from "../../application/repository/TransactionRepository";

export default class TransacionRepositoryDataBase
  implements TransactionRepository
{
  async save(transaction: Transaction): Promise<void> {
    const connection = pgp()(
      "postgresql://postgres:h6nqpPD8sK@localhost:5432/banco_teste"
    );
    await connection.query(
      "insert into microservices.transaction (transaction_id, ticket_id, event_id, tid, price , status) values ($1, $2, $3, $4, $5, $6)",
      [
        transaction.transactionId,
        transaction.ticketId,
        transaction.eventiId,
        transaction.tid,
        transaction.price,
        transaction.status,
      ]
    );
    await connection.$pool.end();
  }
}
