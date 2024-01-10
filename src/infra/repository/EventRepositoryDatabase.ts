import pgp from "pg-promise";
import EventRepository from "../../application/repository/EventRepository";
import Event from "../../domain/entities/Event";

export default class EventRepositoryDataBase implements EventRepository {
  async get(eventId: string): Promise<Event> {
    const connection = pgp()(
      "postgresql://postgres:h6nqpPD8sK@localhost:5432/banco_teste"
    );
    const [eventData] = await connection.query(
      "select * from microservices.event where event_id = $1",
      [eventId]
    );
    await connection.$pool.end();
    return new Event(
      eventData.event_id,
      eventData.description,
      parseFloat(eventData.price),
      eventData.capacity
    );
  }
}
