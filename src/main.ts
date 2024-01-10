import express, { Request, Response } from "express";
import TicketRepositoryDataBase from "./infra/repository/TicketRepositoryDatabase";
import PurchaseTicket from "./application/usecase/PurchaseTicket";
import Registry from "./infra/registry/Registry";
import EventRepositoryDataBase from "./infra/repository/EventRepositoryDatabase";
import FakePaymentGateway from "./infra/gateway/FakePaymentGateway";
import TransacionRepositoryDataBase from "./infra/repository/TransactionRepositoryDatabase";
const app = express();
app.use(express.json());

app.post("/purchase_ticket", async function (req: Request, res: Response) {
  const registry = new Registry();
  registry.provide("ticketRepository", new TicketRepositoryDataBase());
  registry.provide("eventRepository", new EventRepositoryDataBase());
  registry.provide("paymentGateway", new FakePaymentGateway());
  registry.provide("transactionRepository", new TransacionRepositoryDataBase());

  const purchaseTicket = new PurchaseTicket(registry);
  const output = await purchaseTicket.execute(req.body);
  res.json(output);
});

app.listen(3000);
