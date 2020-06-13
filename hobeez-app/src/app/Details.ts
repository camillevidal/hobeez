<<<<<<< HEAD


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

export interface Photos
{
    height:Number
    html_attributions:Array<String>
    photo_reference:String
    width:Number
}

export interface FindPlaceFromTextResponse{
    html_attributions:Array<string>
    result:result
    status:string
}
=======
export interface Photos
{
    height:Number
    html_attributions:Array<String>
    photo_reference:String
    width:Number
}

export interface Debug_log
{
    line:Array<String>
}

export interface Northeast
{
    lat:number
    lng:number
}

export interface Southwest
{
    lat:number
    lng:number
}

export interface Location{
    lat:number
    lng:number
}

export interface Viewport{
    southwest:Southwest
    northeast:Northeast
}

export interface Geometry
{
    location:Location
    viewport:Viewport
}

export interface Opening_hours
{
    open_now:Boolean
    weekday_text:Array<String>
}

export interface Candidates
{
    name:String
    formatted_address:String
    geometry:Geometry
    opening_hours:Opening_hours
    photos:Array<Photos>
    rating:Number

}

export interface FindPlaceFromTextResponse{
    candiates:Array<Candidates>
    status:String
    debug_log:Debug_log
}
>>>>>>> cam_dev
