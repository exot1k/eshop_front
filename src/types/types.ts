export type customerProfileType = {
    id: number,
    first_name: string | null,
    last_name: string | null,
    email: string | null,
    address: string | null,
    is_anonymous_user: boolean,
    joined_at: string,
    user: number,
    orders: []
}

export type shoesType = {
    id: number
    name: string,
    description: string,
    sex_type: string,
    stock: number,
    price: number,
    offer_of_the_week: boolean,
    image: string | null,
    slug: string,
    in_cart: boolean
    type: shoesTypeType
    brand: shoesBrandType
    qty: number
    fetching: boolean
}

export type shoesTypeType = {
    id: number,
    name: string
}
export type shoesBrandType = {
    id: number,
    name: string
    image: null | string
    slug: string
}