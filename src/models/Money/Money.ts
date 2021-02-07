import {sumBy} from "../../utils/Collections";

export type Currency = "¥" | "$"
export const availableCurrencies: ReadonlyArray<Currency> = ["¥", "$"]

export const formatMoney = (money: Money): string => {
    switch (money.currency) {
        case "$":
            return `${money.currency}${money.amount}`;
        case "¥" :
            return `${money.amount}${money.currency}`
    }
}

export const isMore = (money: Money, otherToCompare: Money): boolean => {
    return sameCurrency(money, otherToCompare) && money.amount > otherToCompare.amount;
}

export const isEqual = (money: Money, otherToCompare: Money): boolean => {
    return sameCurrency(money, otherToCompare) && sameAmount(money, otherToCompare);
}


export const sameCurrency = (money: Money, otherToCompare: Money): boolean => money.currency === otherToCompare.currency
export const sameAmount = (money: Money, otherToCompare: Money): boolean => money.amount === otherToCompare.amount
export type Money = {
    amount: number,
    currency: Currency
}

export const buildMoney = (amount: number, currency: Currency): Money => ({currency, amount})
export const defaultMoney = (): Money => buildMoney(0, "¥")
export const sumMoney = (money: ReadonlyArray<Money>): Money => money.length > 0
    ? buildMoney(sumBy(money, it => it.amount), money[0].currency)
    : defaultMoney()
