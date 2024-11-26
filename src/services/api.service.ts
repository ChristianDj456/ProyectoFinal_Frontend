import axios from "axios";
import { CandidateData, PredictionResult } from "../types/candidate.type";

const API_URL = "https://proyectofinal-backend-1.onrender.com"; // Cambia esto según la URL del backend

export const predictCandidate = async (data: CandidateData): Promise<PredictionResult> => {
    const response = await axios.post<PredictionResult>(`${API_URL}/predict`, data);
    return response.data;
};

export const uploadCSVFile = async (formData: FormData) => { // Cambia aquí para aceptar FormData
    try {
        const response = await axios.post(`${API_URL}/predict-csv`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading CSV file:", error);
        throw error;
    }
};


