export type Currency = "¥" | "$"
export const availableCurrencies = ():Readonly<Currency[]> => ["¥" , "$"]

export type Money = {
    amount: number,
    currency: Currency
}
