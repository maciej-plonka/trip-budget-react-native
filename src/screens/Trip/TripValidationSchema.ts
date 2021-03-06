import * as yup from "yup";
import {addDays, startOfTomorrow} from "date-fns";

export const tripValidationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    startDate: yup.date().min(startOfTomorrow(), "trip should after today"),
    endDate: yup.date().when('startDate', (startDate: Date) => yup.date().min(addDays(startDate, 1), "End of the trip should be after it's start")),
})
