import {Id} from "../../../../store";
import {useSelector} from "react-redux";
import {useState} from "react";
import {selectBudgetCategoriesByBudgetId} from "../../../../store/selectors";
import {endOfToday, format, isBefore, isSameDay} from "date-fns";
import {BudgetExpense} from "../../../../store/models";
import {Money} from "../../../../models";
import {useTripDaysRange} from "../../TripDayRangeHook";
import {useBudgetDailyExpenses} from "../../TripDailyExpensesHook";


const formatDate = (date: Date) => format(date, "dd.MM.yyyy")

export const useBudgetDaily = (tripId: Id, initialDay: Date) => {
    const categories = useSelector(selectBudgetCategoriesByBudgetId(tripId))
    const days = useTripDaysRange(tripId)
    const dailyExpenses = useBudgetDailyExpenses(tripId, days)
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(initialDay )
    const onDayChanged = (day: string | null) => setSelectedDay(days.find(it => formatDate(it) === day))
    const isDaySelected = (day: string) => selectedDay && formatDate(selectedDay) === day
    return {
        days: days.filter(it => isBefore(it, endOfToday())).map(formatDate),
        onDayChanged,
        isDaySelected,
        dailyExpenses,
        categories,
        currentDayDailyExpense: selectedDay && dailyExpenses.find(it => isSameDay(it.day, selectedDay))
    }
}

export type DailyExpense = {
    day: Date,
    max: Money
    expenses: ReadonlyArray<BudgetExpense>
}
