export type Trip = {
    id: number,
    name: string,
    startDate: Date,
    endDate: Date,
    totalBudget: number
}

export type NewTrip = {
    name: string,
    startDate: Date,
    endDate: Date,
    totalBudget: number
}

export type UpdateTrip = {
    id: number,
    name: string,
    startDate: Date,
    endDate: Date,
    totalBudget: number
}
