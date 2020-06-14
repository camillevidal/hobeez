import { geometry, opening_hours, photos, plus_code } from './Details';

export interface Activite{
    business_status:string
    geometry:geometry
    icon:string
    id:string
    name:string
    opening_hours:opening_hours
    photos:photos
    place_id:string
    plus_code:plus_code
    rating:number
    reference:string
    scope:string
    types:Array<String>  
    user_ratings_total:number
    vicinity:string 
}


export interface ReponseActivite{
    html_attributions:Array<String>
    next_page_token:string
    results:Array<Activite>
    status:string
}