import * as yup from "yup"
import {availableCurrencies, Currency} from "../models";

export const moneySchema = yup.object().shape({
    amount: yup.number().moreThan(0, "Money value should be set"),
    currency: yup.mixed().oneOf<Currency>([...availableCurrencies], "Please select currency")
})
