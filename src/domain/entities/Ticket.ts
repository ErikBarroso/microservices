export default class Ticket {
  private constructor(
    readonly ticketId: string,
    readonly eventId: string,
    readonly email: string,
    readonly status: string
  ) {}

  static create(event_id: string, email: string) {
    const ticketId = crypto.randomUUID();
    const initialStatus = "reserved";
    return new Ticket(ticketId, event_id, email, initialStatus);
  }
}
