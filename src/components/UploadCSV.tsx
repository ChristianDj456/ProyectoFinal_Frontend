import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress } from "@mui/material";
import Papa from "papaparse";
import { uploadCSVFile } from "../services/api.service";
import { CandidateData } from "../types/candidate.type";
import { Modal, Box } from "@mui/material";
import Slider from "@mui/material/Slider";


const UploadCSV: React.FC = () => {
    const [csvFile, setCsvFile] = useState<File | null>(null);
    const [csvData, setCsvData] = useState<CandidateData[]>([]);
    const [previewData, setPreviewData] = useState<CandidateData[]>([]);
    const [numRows, setNumRows] = useState<number>(5);
    const [predictions, setPredictions] = useState<(CandidateData & { Name: string, Age: number, Gender: number, Education: number, probability: number })[]>([]);
    const [highestProbabilityIndex, setHighestProbabilityIndex] = useState<number | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [infoModalOpen, setInfoModalOpen] = useState(false);
    const [showPreview, setShowPreview] = useState<boolean>(false);

    const handleOpenInfoModal = () => setInfoModalOpen(true);
    const handleCloseInfoModal = () => setInfoModalOpen(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setCsvFile(file);

            Papa.parse<CandidateData>(file, {
                header: true,
                dynamicTyping: true,
                complete: (results) => {
                    const data = results.data as CandidateData[];
                    setCsvData(data);
                    setPreviewData(data.slice(0, numRows));
                },
            });
        }
    };

    const handleSliderChange = (_: Event, value: number | number[]) => {
        const rowValue = Array.isArray(value) ? value[0] : value;
        setNumRows(rowValue);
        setPreviewData(csvData.slice(0, rowValue));
    };

    const handlePredict = async () => {
        if (!csvFile) {
            console.error("No file selected.");
            return;
        }

        const truncatedData = csvData.slice(0, numRows);

        setIsLoading(true); // Mostrar el modal de carga

        try {
            const truncatedCsvBlob = new Blob([Papa.unparse(truncatedData)], { type: "text/csv" });
            const formData = new FormData();
            formData.append("file", truncatedCsvBlob, csvFile.name);

            const predictionsResult = await uploadCSVFile(formData);
            console.log("Predictions result from backend:", predictionsResult);

            if (!Array.isArray(predictionsResult) || predictionsResult.some(pred => pred.probability === undefined)) {
                console.error("Unexpected response structure:", predictionsResult);
                return;
            }

            const combinedData = csvData.slice(0, numRows).map((candidate, index) => ({
                ...candidate,
                Name: candidate.Name || "",
                Age: candidate.age || 0,
                Gender: candidate.gender || 0,
                Education: candidate.education || 0,
                probability: predictionsResult[index]?.probability || 0,
            }));
            console.log("Combined data:", combinedData);

            setPredictions(combinedData);

            const maxProbabilityIndex = combinedData.reduce((maxIndex, candidate, index, array) =>
                candidate.probability > array[maxIndex].probability ? index : maxIndex, 0
            );
            setHighestProbabilityIndex(maxProbabilityIndex);
        } catch (error) {
            console.error("Error predicting CSV data:", error);
        } finally {
            setIsLoading(false); // Ocultar el modal de carga
        }
    };

    return (
        <div className="flex flex-col items-center space-y-10 mt-10 bg-pureWhite-100 px-4 sm:px-8">

            {/* Modal de carga */}
            <Modal open={isLoading} aria-labelledby="loading-modal" aria-describedby="loading-modal-description">
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <CircularProgress />
                    <p style={{ marginTop: "1rem", fontSize: "1rem", color: "#555" }}>Procesando predicción...</p>
                </Box>
            </Modal>

            <div className="mt-6 w-full max-w-md sm:max-w-lg">
                <label className="block text-sm font-medium text-black">Cargar archivo CSV:</label>
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="mt-1 block w-full text-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-steelBlue-400 file:text-white hover:file:bg-indigo-700"
                />
            </div>

            {/* Slider de número de filas */}
            <div className="mt-4 w-full max-w-lg">
                <label className="block text-sm font-medium text-black mb-2">Número de filas a previsualizar:</label>
                <Slider
                    value={numRows}
                    onChange={handleSliderChange}
                    aria-labelledby="num-rows-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={100}
                />
            </div>

            {/* Botón para mostrar/ocultar previsualización */}
            {!showPreview ? (
                <Button
                    variant="contained"
                    onClick={() => setShowPreview(true)}
                    className="mt-4 bg-green-500 hover:bg-green-600 w-full max-w-xs"
                >
                    Ver Previsualización
                </Button>
            ) : (
                <>
                    <Button
                        variant="contained"
                        onClick={() => setShowPreview(false)}
                        className="mt-4 bg-red-500 hover:bg-red-600 w-full max-w-xs"
                    >
                        Ocultar Previsualización
                    </Button>

                    {/* Tabla de previsualización */}
                    {previewData.length > 0 && (
                        <div className="mt-4 w-full max-w-4xl overflow-x-auto">
                            <h3 className="text-lg font-semibold mb-2">Previsualización del archivo CSV</h3>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            {Object.keys(previewData[0]).map((header) => (
                                                <TableCell key={header}>{header}</TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {previewData.map((row, index) => (
                                            <TableRow key={index}>
                                                {Object.values(row).map((value, i) => (
                                                    <TableCell key={i}>{String(value)}</TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    )}
                </>
            )}

            <Button variant="contained" onClick={handlePredict} className="mt-6 bg-steelBlue-400 hover:bg-indigo-700 w-full max-w-xs">
                Predecir
            </Button>

            {predictions.length > 0 && (
                <div className="mt-10 w-full max-w-4xl overflow-x-auto">
                    <h3 className="text-lg font-semibold mb-2">Resultados de la Predicción</h3>
                    <TableContainer component={Paper}>
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
                                {predictions.map((candidate, index) => (
                                    <TableRow
                                        key={index}
                                        style={{
                                            backgroundColor: index === highestProbabilityIndex ? "rgba(0, 128, 0, 0.2)" : "inherit"
                                        }}
                                    >
                                        <TableCell>{candidate.Name}</TableCell>
                                        <TableCell>{candidate.Age}</TableCell>
                                        <TableCell>{candidate.Gender}</TableCell>
                                        <TableCell>{candidate.Education}</TableCell>
                                        <TableCell>{candidate.probability.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}

            {/* Botón de Información */}
            <button
                onClick={handleOpenInfoModal}
                className="fixed bottom-5 right-5 bg-steelBlue-400 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none"
            >
                ?
            </button>

            {/* Modal de Información */}
            <Modal open={infoModalOpen} onClose={handleCloseInfoModal}>
                <Box
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md"
                >
                    <h2 className="text-lg font-semibold mb-4">Instrucciones</h2>
                    <p className="text-sm text-gray-700">
                        En esta página puedes cargar un archivo CSV, previsualizar los datos y realizar predicciones basadas en
                        el contenido del archivo. Usa el slider para ajustar el número de filas a previsualizar. Una vez
                        cargados los datos, haz clic en "Predecir" para ver los resultados.
                    </p>
                    <Button
                        variant="contained"
                        onClick={handleCloseInfoModal}
                        className="mt-4 bg-steelBlue-400 hover:bg-indigo-700"
                    >
                        Cerrar
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default UploadCSV;
