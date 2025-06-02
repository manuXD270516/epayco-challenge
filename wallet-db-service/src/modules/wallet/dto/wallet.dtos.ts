export class RechargeDto {
  document: string;
  phone: string;
  amount: number;
}

export class BalanceDto {
  document: string;
  phone: string;
}

export class StartPaymentDto {
  document: string;
  phone: string;
  amount: number;
}

export class ConfirmPaymentDto {
  sessionId: string;
  token: string;
}
