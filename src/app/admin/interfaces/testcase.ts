export interface TestCase { 
    id?: string;
    creator_id?: string;
    title?: string;
    type?: string;
    suite_id?: string;
    priority?: string;
    description?: string;
    steps?: Map<string,string>[];
    duration?: string;
    status?: string;
    project_id?: string;
}