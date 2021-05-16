export type Id = string

export type HasId = {
    id: Id
}

export function sameId(left: HasId, right: HasId): boolean {
    return left.id === right.id
}
