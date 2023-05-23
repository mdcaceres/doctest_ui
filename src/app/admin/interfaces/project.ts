import { Img } from "./img";

export interface Project {
    endDate?: string | number | Date;
    startDate?: string | number | Date;
    id? : string 
    name? : string, 
    description? : string, 
    start?: string,
    end?: string,
    clientId?: string,
    userId? : string
    image? : string
    status? : string
}