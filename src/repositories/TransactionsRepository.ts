import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  private getTypeBalance(type: 'income' | 'outcome'): number {
    return this.transactions
      .filter(transaction => transaction.type === type)
      .map(transaction => transaction.value)
      .reduce((previousValue, currentValue) => {
        return previousValue + currentValue;
      }, 0);
  }

  public getBalance(): Balance {
    const income = this.getTypeBalance('income');
    const outcome = this.getTypeBalance('outcome');
    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
