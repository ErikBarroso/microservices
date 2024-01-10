import express, { Request, Response } from "express";
import TicketRepositoryDataBase from "./infra/repository/TicketRepositoryDatabase";
import PurchaseTicket from "./application/usecase/PurchaseTicket";
import Registry from "./infra/registry/Registry";
const app = express();
app.use(express.json());

app.post("/purchase_ticket", async function (req: Request, res: Response) {
  const registry = new Registry();
  registry.provide("ticketRepository", new TicketRepositoryDataBase());
  const purchaseTicket = new PurchaseTicket(registry);
  const output = await purchaseTicket.execute(req.body);
  res.json(output);
});

app.listen(3000);
