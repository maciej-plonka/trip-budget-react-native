import {sumBy} from "../../utils/Collections";

export type Currency = "¥" | "$" | "₩"
export const availableCurrencies: ReadonlyArray<Currency> = ["¥", "$", "₩"]

export type Money = {
    amount: number,
    currency: Currency
}

function formatAmount(amount: number) {
    return amount.toFixed(2);
}

function formatAsianAmount(amount: number) {
    return amount.toFixed(0);
}

export function formatMoney(money: Money): string {
    switch (money.currency) {
        case "$":
            return `${money.currency}${formatAmount(money.amount)}`;
        case "₩":
        case "¥" :
            return `${formatAsianAmount(money.amount)}${money.currency}`
    }
}

export function isMore(money: Money, otherToCompare: Money): boolean {
    return sameCurrency(money, otherToCompare) && money.amount > otherToCompare.amount;
}

export function isEqual(money: Money, otherToCompare: Money): boolean {
    return sameCurrency(money, otherToCompare) && sameAmount(money, otherToCompare);
}


export function sameCurrency(money: Money, otherToCompare: Money): boolean {
    return money.currency === otherToCompare.currency;
}

export function sameAmount(money: Money, otherToCompare: Money): boolean {
    return money.amount === otherToCompare.amount;
}


export const isCurrency = (x: string): x is Currency => availableCurrencies.some(it => it === x)

export function isMoney(x: any): x is Money {
    if (!x.hasOwnProperty("amount") || typeof x.amount !== 'number')
        return false
    return x.hasOwnProperty("currency") && typeof x.currency === 'string' && isCurrency(x.currency);

}

export const copyCurrency = (money: Money, amount: number): Money => ({...money, amount})
export const buildMoney = (amount: number, currency: Currency): Money => ({currency, amount})
export const defaultMoney = (): Money => buildMoney(0, "¥")

export function sumMoney(money: ReadonlyArray<Money>): Money {
    return money.length > 0
        ? buildMoney(sumBy(money, it => it.amount), money[0].currency)
        : defaultMoney();
}


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
