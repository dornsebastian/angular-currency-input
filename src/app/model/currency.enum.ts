export interface SelectableValue {
  label: string;
  value: string;
}

export enum Currency {
  EUR = 10,
  USD = 20
}

export namespace Currency {
  export function label(currency: Currency | number): string {
    switch (Number(currency)) {
      case Currency.EUR:
        return 'Euro';
      case Currency.USD:
        return 'US-Dollar';
      default:
        return 'unbekannt';
    }
  }

  export function symbol(currency: Currency | number): string {
    switch (Number(currency)) {
      case Currency.EUR:
        return '€';
      case Currency.USD:
        return '$';
      default:
        return '?';
    }
  }

  export function lov(fn: (c: Currency | number) => string): Array<SelectableValue> {
    const temp: Array<SelectableValue> = [];

    for (const c in Currency) {
      if (typeof Currency[c] === 'number') {
        const currency: number = Number(Currency[c]);
        temp.push({label: fn(currency), value: c});
      }
    }

    return temp;
  }

  export function lovLabels(): Array<SelectableValue> {
    return Currency.lov(Currency.label);
  }

  export function lovSymbols(): Array<SelectableValue> {
    return Currency.lov(Currency.symbol);
  }
}
