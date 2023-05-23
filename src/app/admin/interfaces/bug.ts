export interface Bug {
    id?: number;
    name?: string;
    description?: string;
    status?: string;
    priority?: string;
    severity?: string;
    type?: string;
    project_id?: number;
    test_Case_id?: number;
    user_id?: number;
    assigned_id? : number;
    due?: string;
}