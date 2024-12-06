// Time Units
import logo from "../../public/neemble-eat-logo.png"


export const SECOND = 1000
export const MINUTE = SECOND * 60
export const HOUR = MINUTE * 60

export const URL_PATH_PREFIX: string = ""
export const TRANSPARENT_LOGO: string = logo

export const DESKTOP = "(min-width: 768px)"
export const TABLET = "(min-width: 480px)"
export const PHONE = "(max-width: 480px)"
export const MOBILE = "(max-width: 320px)"
export const LARGE_SCREEN = "(min-width: 1024px)"

export type Tag = "All" | "New" | "In Progress" | "Done" | "Cancelled"

export interface Filter {
    name: string;
    tag: Tag;
}

export const FILTERS: Filter[] = [
    {name: "Todos", tag: "All"},
    {name: "Novos", tag: "New"},
    {name: "Em preparo", tag: "In Progress"},
    {name: "Prontos", tag: "Done"},
    {name: "Cancelados", tag: "Cancelled"},
]

