export interface location
{
    lat:Number
    lng:number
}

export interface geometry
{
    location:location
}

export interface address_components{
    long_name:string
    short_name:string

}

export interface plus_code{
    compound_code:string
    global_code:string
}

export interface open{
    day:number
    time:string
}

export interface result
{
    address_components:Array<address_components>
    adr_address:string
    formatted_address:string
    formatted_phone_number:string
    geometry:geometry
    icon:string
    name:string
    opening_hours:opening_hours
    plus_code:plus_code
    rating:number
    types:Array<string>
    website:string

}

export interface opening_hours
{
    open_now:boolean
    periods:Array<open>
    weekday_text:Array<string>
}

export interface photos
{
    height:number
    html_attributions:Array<string>
    photo_reference:string
    width:number
}

export interface FindPlaceFromTextResponse{
    html_attributions:Array<string>
    result:result
    status:string
}