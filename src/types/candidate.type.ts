export interface CandidateData {
    age: number;
    accessibility: number;
    education: number;
    employment: number;
    gender: number;
    mental_health: number;
    main_branch: number;
    years_code: number;
    years_code_pro: number;
    salary: number;
    num_skills: number;
    continent: number;
}

export interface PredictionResult {
    prediction: string;
    probability: number;
    chart: string;
}
