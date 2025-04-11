import { JobCriteria } from "./job-criteria-item";

export interface Job {
    job_id:number
    job_compagny: string;
    job_title: string;
    job_description: string;
    criteriaList: JobCriteria[];
    job_available_place: number;
    job_work_time: string;
    job_work_place: string;
    job_email_address: string;
    job_phone_address: string;
    job_author: string;
    job_salary_min: number;
    job_salary_max: number;
    job_deadline: string;
    job_location: string;
}