import React from "react";
import { PredictionResult } from "../types/candidate.type";

interface ResultProps {
    predictionResult: PredictionResult;
}

const Result: React.FC<ResultProps> = ({ predictionResult }) => {
    return (
        <div>
            <h2>Resultado de la Predicción</h2>
            <p><strong>Predicción:</strong> {predictionResult.prediction}</p>
            <p><strong>Probabilidad:</strong> {(predictionResult.probability * 100).toFixed(2)}%</p>
            <img src={predictionResult.chart} alt="Gráfico de Predicción" />
        </div>
    );
};

export default Result;
