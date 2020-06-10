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