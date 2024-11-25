import React, { useState } from "react";
import { CandidateData, PredictionResult } from "../types/candidate.type";
import { predictCandidate } from "../services/api.service";
import Result from "./Result";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip, IconButton } from "@mui/material";
import SelectMultipleAppearance from "./Selector";
import InfoIcon from "@mui/icons-material/Info";


interface FormData extends CandidateData {
    name: string;
}

// const skillsOptions = [
//     { value: 'javascript', label: 'JavaScript', logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png' },
//     { value: 'python', label: 'Python', logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968350.png' },
//     { value: 'java', label: 'Java', logo: 'https://cdn-icons-png.flaticon.com/512/226/226777.png' },
//     { value: 'c++', label: 'C++', logo: 'https://cdn-icons-png.flaticon.com/512/6132/6132222.png' },
//     { value: 'ruby', label: 'Ruby', logo: 'https://cdn-icons-png.flaticon.com/512/919/919842.png' },
//     { value: 'go', label: 'Go', logo: 'https://cdn-icons-png.flaticon.com/512/919/919833.png' },
//     { value: 'php', label: 'PHP', logo: 'https://cdn-icons-png.flaticon.com/512/919/919830.png' },
//     { value: 'swift', label: 'Swift', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' }
// ];

const skillsOptions = [
    { value: 'javascript', label: 'JavaScript', logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png' },
    { value: 'python', label: 'Python', logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968350.png' },
    { value: 'java', label: 'Java', logo: 'https://cdn-icons-png.flaticon.com/512/226/226777.png' },
    { value: 'c++', label: 'C++', logo: 'https://cdn-icons-png.flaticon.com/512/6132/6132222.png' },
    { value: 'ruby', label: 'Ruby', logo: 'https://cdn-icons-png.flaticon.com/512/919/919842.png' },
    { value: 'go', label: 'Go', logo: 'https://cdn-icons-png.flaticon.com/512/919/919833.png' },
    { value: 'php', label: 'PHP', logo: 'https://cdn-icons-png.flaticon.com/512/919/919830.png' },
    { value: 'swift', label: 'Swift', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' },
    { value: 'c', label: 'C', logo: 'https://cdn-icons-png.flaticon.com/512/6132/6132221.png' },
    { value: 'csharp', label: 'C#', logo: 'https://cdn-icons-png.flaticon.com/512/6132/6132223.png' },
    { value: 'typescript', label: 'TypeScript', logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968342.png' },
    { value: 'html_css', label: 'HTML/CSS', logo: 'https://cdn-icons-png.flaticon.com/512/732/732212.png' },
    { value: 'nodejs', label: 'Node.js', logo: 'https://cdn-icons-png.flaticon.com/512/919/919825.png' },
    { value: 'reactjs', label: 'React.js', logo: 'https://cdn-icons-png.flaticon.com/512/1126/1126012.png' },
    { value: 'vuejs', label: 'Vue.js', logo: 'https://cdn-icons-png.flaticon.com/512/2111/2111379.png' },
    { value: 'angular', label: 'Angular', logo: 'https://cdn-icons-png.flaticon.com/512/226/226269.png' },
    { value: 'django', label: 'Django', logo: 'https://cdn-icons-png.flaticon.com/512/919/919853.png' },
    { value: 'flask', label: 'Flask', logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968540.png' },
    { value: 'spring', label: 'Spring', logo: 'https://cdn-icons-png.flaticon.com/512/919/919849.png' },
    { value: 'laravel', label: 'Laravel', logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968381.png' },
    { value: 'kotlin', label: 'Kotlin', logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968381.png' },
    { value: 'rust', label: 'Rust', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' },
    { value: 'scala', label: 'Scala', logo: 'https://cdn-icons-png.flaticon.com/512/919/919855.png' },
    { value: 'r', label: 'R', logo: 'https://cdn-icons-png.flaticon.com/512/919/919855.png' },
    { value: 'bash_shell', label: 'Bash/Shell', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' },
    { value: 'aws', label: 'AWS', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' },
    { value: 'docker', label: 'Docker', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' },
    { value: 'kubernetes', label: 'Kubernetes', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' },
    { value: 'mysql', label: 'MySQL', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' },
    { value: 'postgresql', label: 'PostgreSQL', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' },
    { value: 'mongodb', label: 'MongoDB', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' },
    { value: 'firebase', label: 'Firebase', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' },
    { value: 'oracle', label: 'Oracle', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' },
    { value: 'sql', label: 'SQL', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' },
    { value: 'graphql', label: 'GraphQL', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' },
    { value: 'asp.net', label: 'ASP.NET', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' },
    { value: 'ansible', label: 'Ansible', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' },
    { value: 'elasticsearch', label: 'Elasticsearch', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' },
    { value: 'fastapi', label: 'FastAPI', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' },
    { value: 'haskell', label: 'Haskell', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' },
    { value: 'matlab', label: 'MATLAB', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' },
    { value: 'nestjs', label: 'NestJS', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' },
    { value: 'perl', label: 'Perl', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' },
    { value: 'sas', label: 'SAS', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' },
    { value: 'svelte', label: 'Svelte', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' },
    { value: 'xamarin', label: 'Xamarin', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' },
    { value: 'unity', label: 'Unity', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' },
    { value: 'colocation', label: 'Colocation', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' },
    { value: 'cassandra', label: 'Cassandra', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' },
    { value: 'couchdb', label: 'CouchDB', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' },
    { value: 'crystal', label: 'Crystal', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' },
    { value: 'dart', label: 'Dart', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' },
    { value: 'delphi', label: 'Delphi', logo: 'https://cdn-icons-png.flaticon.com/512/919/919847.png' },
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
            num_skills: newValue.length,
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
        <div className="min-h-screen flex flex-col items-center">
            {/* Formulario */}
            <div className="bg-pureWhite-100 rounded-lg p-6 w-full max-w-4xl mx-auto border-green-100 border-solid">
                <h2 className="text-2xl font-bold text-center">Formulario de Selección</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    {/* Nombre */}
                    <div className="col-span-2 ">
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-medium text-gray-700">Nombre: </label>
                            <Tooltip title="Ingrese su nombre completo" arrow>
                                <IconButton size="small" className="ml-2">
                                    <InfoIcon color="info" />
                                </IconButton>
                            </Tooltip>
                        </div>
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
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-medium text-gray-700">Edad:</label>
                            <Tooltip title="Ingrese su edad en años" arrow>
                                <IconButton size="small" className="ml-2">
                                    <InfoIcon color="info" />
                                </IconButton>
                            </Tooltip>
                        </div>
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
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-medium text-gray-700">Prefiere Trabajar Remoto o Presencial:</label>
                            <Tooltip title="Seleccione si prefiere trabajar remoto o presencial" arrow>
                                <IconButton size="small" className="ml-2">
                                    <InfoIcon color="info" />
                                </IconButton>
                            </Tooltip>
                        </div>
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
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-medium text-gray-700">Educación:</label>
                            <Tooltip title="Seleccione su nivel de educación" arrow>
                                <IconButton size="small" className="ml-2">
                                    <InfoIcon color="info" />
                                </IconButton>
                            </Tooltip>
                        </div>
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
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-medium text-gray-700">Actualmente se encuentra trabajando:</label>
                            <Tooltip title="Seleccione si actualmente se encuentra trabajando" arrow>
                                <IconButton size="small" className="ml-2">
                                    <InfoIcon color="info" />
                                </IconButton>
                            </Tooltip>
                        </div>
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
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-medium text-gray-700">Género:</label>
                            <Tooltip title="Seleccione su género" arrow>
                                <IconButton size="small" className="ml-2">
                                    <InfoIcon color="info" />
                                </IconButton>
                            </Tooltip>
                        </div>
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
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-medium text-gray-700">Tiene Problemas de Salud Mental:</label>
                            <Tooltip title="Seleccione si tiene problemas de salud mental" arrow>
                                <IconButton size="small" className="ml-2">
                                    <InfoIcon color="info" />
                                </IconButton>
                            </Tooltip>
                        </div>
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
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-medium text-gray-700">Rama Principal:</label>
                            <Tooltip title="Seleccione su rama principal: si es desarrollador o no" arrow>
                                <IconButton size="small" className="ml-2">
                                    <InfoIcon color="info" />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <select
                            name="main_branch"
                            value={formData.main_branch}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="0">No es Desarrollador</option>
                            <option value="1">Desarrollador</option>
                        </select>
                    </div>

                    {/* Años Codificando */}
                    <div>
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-medium text-gray-700">Años Codificando:</label>
                            <Tooltip title="Ingrese la cantidad de años que lleva codificando" arrow>
                                <IconButton size="small" className="ml-2">
                                    <InfoIcon color="info" />
                                </IconButton>
                            </Tooltip>
                        </div>
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
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-medium text-gray-700">Años Codificando Profesionalmente:</label>
                            <Tooltip title="Ingrese la cantidad de años que lleva codificando profesionalmente" arrow>
                                <IconButton size="small" className="ml-2">
                                    <InfoIcon color="info" />
                                </IconButton>
                            </Tooltip>
                        </div>
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
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-medium text-gray-700">Salario:</label>
                            <Tooltip title="Ingrese su salario en USD" arrow>
                                <IconButton size="small" className="ml-2">
                                    <InfoIcon color="info" />
                                </IconButton>
                            </Tooltip>
                        </div>
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
                    <div className="col-span-2">
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-medium text-gray-700">Habilidades:</label>
                            <Tooltip title="Seleccione sus habilidades" arrow>
                                <IconButton size="small" className="ml-2">
                                    <InfoIcon color="info" />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <SelectMultipleAppearance
                            options={skillsOptions}
                            value={selectedSkills}
                            onChange={handleSkillsChange}
                        />
                    </div>

                    {/* Continente */}
                    <div>
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-medium text-gray-700">Continente:</label>
                            <Tooltip title="Seleccione su continente" arrow>
                                <IconButton size="small" className="ml-2">
                                    <InfoIcon color="info" />
                                </IconButton>
                            </Tooltip>
                        </div>
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

                    <button type="submit" className="col-span-1 sm:col-span-2 w-full border-green-100 bg-steelBlue-400 text-white p-2 rounded-md mt-4 hover:bg-indigo-700">
                        Predecir
                    </button>
                </form>
            </div>

            {/* Resultados al lado del formulario */}
            {result && (
                <div className="bg-beige-100 shadow-md rounded-md p-6 w-full max-w-md">
                    <Result predictionResult={result} />
                </div>
            )}

            {/* Tabla de Candidatos */}
            <div className="w-full p-6 max-w-4xl">
                <TableContainer component={Paper} className="w-full">
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
        </div>
    );
};

export default Form;
