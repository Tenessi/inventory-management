export type AccountingRecordInput = {
  quantity: number;
  transactionId: string;
};

export type AccountingRecordUpdateInput = Omit<AccountingRecordInput, 'transactionId'> &
  Partial<Pick<AccountingRecordInput, 'transactionId'>>;
