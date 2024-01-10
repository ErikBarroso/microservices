import axios from "axios";

test("Deve comprar um ingresso", async function () {
  const input = {
    eventId: "3052b3fe-e3ec-482f-bf67-449132e3429f",
    email: "teste.teste@gmail.com",
    creditCardToken: "958654312",
  };
  const response = await axios.post(
    "http://localhost:3000/purchase_ticket",
    input
  );
  const output = response.data;

  expect(output.ticketId).toBeDefined();
  // expect(output.tid).toBeDefined();
  expect(output.status).toBe("approved");
});
