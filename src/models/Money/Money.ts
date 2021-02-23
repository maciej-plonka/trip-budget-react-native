import {sumBy} from "../../utils/Collections";

export type Currency = "¥" | "$"
export const availableCurrencies: ReadonlyArray<Currency> = ["¥", "$"]

const formatAmount = (amount: number) => amount.toFixed(2)
export const formatMoney = (money: Money): string => {
    switch (money.currency) {
        case "$":
            return `${money.currency}${formatAmount(money.amount)}`;
        case "¥" :
            return `${formatAmount(money.amount)}${money.currency}`
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
export const copyCurrency = (money: Money, amount: number): Money => ({...money, amount})
export const buildMoney = (amount: number, currency: Currency): Money => ({currency, amount})
export const defaultMoney = (): Money => buildMoney(0, "¥")
export const sumMoney = (money: ReadonlyArray<Money>): Money => money.length > 0
    ? buildMoney(sumBy(money, it => it.amount), money[0].currency)
    : defaultMoney()


export const sortMoney = (direction: "Ascending" | "Descending") => (left: Money, right: Money) => {
    switch (direction) {
        case "Ascending":
            return Math.sign(left.amount - right.amount)
        case "Descending":
            return Math.sign(right.amount - left.amount)
    }
}

export const sortMoneyDesc = sortMoney("Descending")
export const sortMoneyAsc = sortMoney("Ascending")
