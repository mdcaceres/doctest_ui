import { Step } from "./step";

export interface ExecutionReuslt {
    id?: string;
    project_id?: number;
    case_id?: number;
    status?: string;
    user_id?: number;
    steps?: Step[];
    duration?: number,
}