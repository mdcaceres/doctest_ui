import { SafeUrl } from "@angular/platform-browser";

export interface Post {
    id?: number;
    project_id?: string;
    user_id?: number;
    created_at?: string;
    Image?:string;
    comment?: string;
}