export type Serializer<T> = {
    toJson(value: T): string,
    fromJson(json: string): T
}
