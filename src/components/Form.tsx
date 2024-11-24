import React, { useState } from "react";
import { CandidateData, PredictionResult } from "../types/candidate.type";
import { predictCandidate } from "../services/api.service";
import Result from "./Result";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import SelectMultipleAppearance from "./Selector";


interface FormData extends CandidateData {
    name: string;
}

const skillsOptions = [
    { value: 'javascript', label: 'JavaScript', logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png' },
    { value: 'python', label: 'Python', logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968350.png' },
    { value: 'java', label: 'Java', logo: 'https://cdn-icons-png.flaticon.com/512/226/226777.png' },
    { value: 'c++', label: 'C++', logo: 'https://cdn-icons-png.flaticon.com/512/6132/6132222.png' },
    { value: 'ruby', label: 'Ruby', logo: 'https://cdn-icons-png.flaticon.com/512/919/919842.png' },
    { value: 'go', label: 'Go', logo: 'https://cdn-icons-png.flaticon.com/512/919/919833.png' },
    { value: 'php', label: 'PHP', logo: 'https://cdn-icons-png.flaticon.com/512/919/919830.png' },
    { value: 'swift', label: 'Swift', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' }
];



const Form: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        age: 0,
        accessibility: 0,
        education: 0,
        employment: 0,
        gender: 0,
        mental_health: 0,
        main_branch: 0,
        years_code: 0,
        years_code_pro: 0,
        salary: 0,
        num_skills: 0,
        continent: 0,
    });

    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [result, setResult] = useState<PredictionResult | null>(null);
    const [candidates, setCandidates] = useState<(FormData & { probability: number })[]>([]);
    const [highestProbabilityIndex, setHighestProbabilityIndex] = useState<number | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: isNaN(parseFloat(value)) ? value : parseFloat(value),
        });
    };

    const handleSkillsChange = (_: unknown, newValue: string[]) => {
        setSelectedSkills(newValue);
        setFormData({
            ...formData,
            num_skills: newValue.length, // Actualiza el número de habilidades seleccionadas
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { ...candidateData } = formData;
        const prediction = await predictCandidate(candidateData as CandidateData);
        setResult(prediction);

        // Agrega el candidato con su probabilidad y nombre
        const newCandidate = { ...formData, probability: prediction.probability };
        const updatedCandidates = [...candidates, newCandidate];
        setCandidates(updatedCandidates);

        // Actualizar el índice del candidato con la probabilidad más alta
        updateHighestProbabilityIndex(updatedCandidates);
    };

    const updateHighestProbabilityIndex = (candidates: (FormData & { probability: number })[]) => {
        if (candidates.length === 0) return;
        const maxProbabilityIndex = candidates.reduce((maxIndex, candidate, index, array) =>
            candidate.probability > array[maxIndex].probability ? index : maxIndex, 0
        );
        setHighestProbabilityIndex(maxProbabilityIndex);
    };



    return (
        <div className="flex justify-center items-start space-x-10 mt-10 my-5">
            {/* Formulario */}
            <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-6">Formulario de Selección</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    {/* Nombre */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Nombre:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    {/* Edad */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Edad:</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                            min="0"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Accesibilidad */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Prefiere Trabajar Remoto o Presencial:</label>
                        <select
                            name="accessibility"
                            value={formData.accessibility}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="0">Remoto</option>
                            <option value="1">Presencial</option>
                        </select>
                    </div>

                    {/* Educación */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Educación:</label>
                        <select
                            name="education"
                            value={formData.education}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="0">NoHigherEd</option>
                            <option value="1">Undergraduate</option>
                            <option value="2">Master</option>
                            <option value="3">PhD</option>
                            <option value="4">Other</option>
                        </select>
                    </div>

                    {/* Empleo */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Actualmente se encuentra trabajando:</label>
                        <select
                            name="employment"
                            value={formData.employment}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="0">No</option>
                            <option value="1">Sí</option>
                        </select>
                    </div>

                    {/* Género */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Género:</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="0">Masculino</option>
                            <option value="1">Femenino</option>
                            <option value="2">No binario</option>
                        </select>
                    </div>

                    {/* Salud Mental */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tiene Problemas de Salud Mental:</label>
                        <select
                            name="mental_health"
                            value={formData.mental_health}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="0">No</option>
                            <option value="1">Sí</option>
                        </select>
                    </div>

                    {/* Rama Principal */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Rama Principal:</label>
                        <select
                            name="main_branch"
                            value={formData.main_branch}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="0">NotDev</option>
                            <option value="1">Dev</option>
                        </select>
                    </div>

                    {/* Años Codificando */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Años Codificando:</label>
                        <input
                            type="number"
                            name="years_code"
                            value={formData.years_code}
                            onChange={handleChange}
                            required
                            min="0"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Años Codificando Profesionalmente */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Años Codificando Profesionalmente:</label>
                        <input
                            type="number"
                            name="years_code_pro"
                            value={formData.years_code_pro}
                            onChange={handleChange}
                            required
                            min="0"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Salario */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Salario:</label>
                        <input
                            type="number"
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange}
                            required
                            min="0"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Selector de Habilidades */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Habilidades:</label>
                        <SelectMultipleAppearance
                            options={skillsOptions}
                            value={selectedSkills}
                            onChange={handleSkillsChange}
                        />
                    </div>

                    {/* Continente */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Continente:</label>
                        <select
                            name="continent"
                            value={formData.continent}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="0">Europe</option>
                            <option value="1">North America</option>
                            <option value="2">Asia</option>
                            <option value="3">Others</option>
                            <option value="4">South America</option>
                            <option value="5">Australia</option>
                        </select>
                    </div>

                    <button type="submit" className="col-span-2 w-full bg-indigo-600 text-white p-2 rounded-md mt-4 hover:bg-indigo-700">
                        Predecir
                    </button>
                </form>
            </div>

            {/* Resultados al lado del formulario */}
            {result && (
                <div className="max-w-md bg-white shadow-md rounded-md p-6">
                    <Result predictionResult={result} />
                </div>
            )}

            {/* Tabla de Candidatos */}
            <TableContainer component={Paper} className="mt-10 max-w-4xl">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Edad</TableCell>
                            <TableCell>Género</TableCell>
                            <TableCell>Educación</TableCell>
                            <TableCell>Probabilidad</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {candidates.map((candidate, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    backgroundColor: index === highestProbabilityIndex ? "rgba(0, 128, 0, 0.1)" : "inherit",
                                }}
                            >
                                <TableCell>{candidate.name}</TableCell>
                                <TableCell>{candidate.age}</TableCell>
                                <TableCell>{candidate.gender === 0 ? "Masculino" : candidate.gender === 1 ? "Femenino" : "No binario"}</TableCell>
                                <TableCell>{candidate.education}</TableCell>
                                <TableCell>{candidate.probability.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Form;
