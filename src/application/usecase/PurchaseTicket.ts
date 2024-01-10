import Ticket from "../../domain/entities/Ticket";
import Transaction from "../../domain/entities/Transaction";
import Registry from "../../infra/registry/Registry";
import EventRepository from "../repository/EventRepository";
import TicketRepository from "../repository/TicketRepository";
import PaymentGateway from "../gateway/PaymentGateway";
import TransactionRepository from "../repository/TransactionRepository";

export default class PurchaseTicket {
  eventRepository: EventRepository;
  ticketRepository: TicketRepository;
  paymentGateway: PaymentGateway;
  transactionRepository: TransactionRepository;
  constructor(readonly registry: Registry) {
    this.ticketRepository = registry.inject("ticketRepository");
    this.eventRepository = registry.inject("eventRepository");
    this.paymentGateway = registry.inject("paymentGateway");
    this.transactionRepository = registry.inject("transactionRepository");
  }

  async execute(input: Input): Promise<Output> {
    const event = await this.eventRepository.get(input.eventId);
    const ticket = Ticket.create(input.eventId, input.email);
    await this.ticketRepository.save(ticket);
    const output = await this.paymentGateway.createTransaction({
      email: input.email,
      creditCardToken: input.creditCardToken,
      price: event.price,
    });
    const transaction = Transaction.create(
      ticket.ticketId,
      event.eventId,
      output.tid,
      event.price,
      output.status
    );
    await this.transactionRepository.save(transaction);
    if (output.status == "approved") {
      ticket.approve();
    } else {
      ticket.cancel();
    }

    await this.ticketRepository.update(ticket);

    return {
      ticketId: ticket.ticketId,
      status: ticket.status,
      tid: transaction.tid,
      price: transaction.price,
    };
  }
}

type Input = {
  eventId: string;
  email: string;
  creditCardToken: string;
};

type Output = {
  ticketId: string;
  status: string;
  tid: string;
  price: number;
};
