import PaymentGateway, {
  Input,
  Output,
} from "../../application/gateway/PaymentGateway";

export default class FakePaymentGateway implements PaymentGateway {
  async createTransaction(input: Input): Promise<Output> {
    return {
      tid: "3123123123",
      status: "approved",
    };
  }
}
