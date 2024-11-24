import React, { useEffect, useState } from "react";
import axios from "axios";
import Plot from 'react-plotly.js';
import '../styles/Dashboard.css';

interface DashboardData {
    charts: {
        employed_counts: Record<string, number>;
        boxplot_distributions: string;
        education_level: string;
        age_distribution: string;
        age_employment: string;
        continent_distribution: string;
        continent_pie: string;
        computer_skills_heatmap: string;
        correlation_heatmap: string;
        roc_curve: string;
        confusion_matrix: string;
    };
    tables: {
        x_description: Record<string, Record<string, number>>; // Diccionario de descripciones estadísticas de cada columna en X
        y_description: Record<string, number>; // Diccionario de descripciones estadísticas de y
    };
    table_data: TableRow[];
    describe_data: DescribeData;
    encoded_head_data: TableRow[];
    encoded_describe_data: DescribeData;

}

interface TableRow {
    [key: string]: string | number;
}

interface TableRow {
    Unnamed: number;
    Age: string;
    Accessibility: string;
    EdLevel: string;
    Employment: number;
    Gender: string;
    MentalHealth: string;
    MainBranch: string;
    YearsCode: number;
    YearsCodePro: number;
    Country: string;
    PreviousSalary: number;
    HaveWorkedWith: string;
    ComputerSkills: number;
    Employed: number;
}

interface DescribeData {
    [key: string]: {
        [stat: string]: number;
    };
}

const Dashboard: React.FC = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [activeTab, setActiveTab] = useState("general"); // Estado para cambiar entre las pestañas

    useEffect(() => {
        axios.get<DashboardData>("http://localhost:8000/dashboard")
            .then(response => setData(response.data))
            .catch(error => console.error("Error al cargar los datos del dashboard:", error));
    }, []);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };


    return (
        <div className="dashboard-container">
            <h1 className="text-xl font-bold">Dashboard de Datos</h1>

            {/* Navegación de las pestañas */}
            <div className="tabs">
                <button
                    className={`tab ${activeTab === "general" ? "active" : ""}`}
                    onClick={() => handleTabChange("general")}
                >
                    General
                </button>
                <button
                    className={`tab ${activeTab === "roc_confusion" ? "active" : ""}`}
                    onClick={() => handleTabChange("roc_confusion")}
                >
                    Modelo Random Forest
                </button>
            </div>

            {activeTab === "general" && (
                <div>

                    {/* Vista Preliminar de los Datos */}
                    {data && (



                        <div className="table-container">
                            <h3 className="table-title">Vista Preliminar de los Datos Originales</h3>
                            <div className="table-wrapper">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            {data.table_data.length > 0 && Object.keys(data.table_data[0]).map((key) => (
                                                <th key={key}>{key}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.table_data.map((row, index) => (
                                            <tr key={index}>
                                                {Object.values(row).map((value, idx) => (
                                                    <td key={idx}>{value}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="table-explanation">
                                Se muestran las primeras cinco filas del conjunto de datos codificado. En esta versión, las columnas categóricas, como edad,
                                nivel educativo, género, y continente, han sido transformadas en valores numéricos mediante Label Encoding. Este paso permite utilizar
                                los datos categóricos en modelos de aprendizaje automático que requieren datos numéricos.
                            </p>
                        </div>
                    )}



                    {/* Resumen Estadístico de los Datos */}
                    {data && (
                        <div className="describe-table-container">
                            <h3 className="table-title">Resumen Estadístico de los Datos Originales</h3>
                            <div className="table-wrapper">
                                <table className="describe-table">
                                    <thead>
                                        <tr>
                                            <th>Estadística</th>
                                            {Object.keys(data.describe_data).map((col) => (
                                                <th key={col}>{col}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(data.describe_data[Object.keys(data.describe_data)[0]]).map((stat, index) => (
                                            <tr key={index}>
                                                <td>{stat}</td>
                                                {Object.keys(data.describe_data).map((col) => (
                                                    <td key={col}>{data.describe_data[col][stat].toFixed(2)}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="table-explanation">
                                Este resumen estadístico proporciona una visión general de las métricas numéricas del conjunto de datos.
                                Muestra valores como el promedio (mean), la desviación estándar (std), los valores mínimos y máximos (min y max),
                                y los percentiles (25%, 50%, 75%) de cada variable numérica.
                            </p>
                        </div>
                    )}

                    {/* Mapa de Calor de la Correlación */}
                    {data && (
                        <div className="chart-container">
                            <h3 className="chart-title"></h3>
                            <img src={data.charts.correlation_heatmap} alt="Mapa de Calor de la Correlación" style={{ width: "100%", height: "auto" }} />
                            <p className="table-explanation">
                                Esta visualización muestra la relación entre las diferentes variables en el conjunto de datos, representando el grado de correlación entre ellas.
                                Los valores de correlación oscilan entre -1 y 1: Un valor cercano a 1 (color rojo intenso) indica una fuerte correlación positiva, donde ambas variables tienden a aumentar o disminuir juntas.
                                Un valor cercano a -1 (color azul intenso) indica una fuerte correlación negativa, donde una variable tiende a aumentar cuando la otra disminuye.
                                Los valores cercanos a 0 (color blanco o azul claro) indican poca o ninguna correlación.
                            </p>
                        </div>


                    )}

                    {/* Gráficas del Dashboard */}
                    {data ? (
                        <>
                            {/* Fila 1: Tres gráficas */}
                            <div className="chart-grid fila-1">
                                <div className="chart-container">
                                    <Plot
                                        data={JSON.parse(data.charts.age_employment).data}
                                        layout={JSON.parse(data.charts.age_employment).layout}
                                        useResizeHandler={true}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                    <p className="table-explanation">
                                        La distribución de empleados en dos grupos de edad: menores de 35 y mayores de 35 años,
                                        desglosada por el estado de empleo (empleado o desempleado). Permite ver cómo el estado de empleo varía en función de la edad.
                                    </p>
                                </div>

                                <div className="chart-container">
                                    <Plot
                                        data={JSON.parse(data.charts.age_distribution).data}
                                        layout={JSON.parse(data.charts.age_distribution).layout}
                                        useResizeHandler={true}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                    <p className="table-explanation">
                                        El conteo de empleados en dos categorías de edad: menores de 35 y mayores de 35 años.
                                        Ofrece una visión general de la cantidad de empleados en cada grupo etario.
                                    </p>
                                </div>
                                <div className="chart-container">
                                    <Plot
                                        data={JSON.parse(data.charts.continent_pie).data}
                                        layout={JSON.parse(data.charts.continent_pie).layout}
                                        useResizeHandler={true}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                    <p className="table-explanation">
                                        La distribución porcentual de empleados por continente, destacando las regiones con mayor representación en el conjunto de datos.
                                    </p>
                                </div>
                            </div>

                            {/* Fila 2: Una gráfica */}
                            <div className="chart-grid fila-2">
                                <div className="chart-container">
                                    <Plot
                                        data={JSON.parse(data.charts.continent_distribution).data}
                                        layout={JSON.parse(data.charts.continent_distribution).layout}
                                        useResizeHandler={true}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                    <p className="table-explanation">
                                        La gráfica de barras presenta el conteo de empleados por continente, permitiendo una comparación
                                        clara de la cantidad de empleados en cada región geográfica.
                                    </p>
                                </div>
                            </div>

                            {/* Fila 3: Dos gráficas */}

                            <div className="chart-grid fila-3">
                                <div className="chart-container">
                                    <Plot
                                        data={JSON.parse(data.charts.education_level).data}
                                        layout={JSON.parse(data.charts.education_level).layout}
                                        useResizeHandler={true}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                    <p className="table-explanation">
                                        La distribución de candidatos según su nivel educativo, desde educación universitaria hasta doctorado.
                                        Facilita la identificación del nivel educativo predominante entre los candidatos.
                                    </p>
                                </div>
                                <div className="chart-container">
                                    <Plot
                                        data={JSON.parse(data.charts.computer_skills_heatmap).data}
                                        layout={JSON.parse(data.charts.computer_skills_heatmap).layout}
                                        useResizeHandler={true}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                    <p className="table-explanation">
                                        Se representa las habilidades de computación promedio de los empleados según su nivel educativo y continente.
                                        Los colores indican la intensidad de las habilidades de computación,
                                        proporcionando una perspectiva de cómo varían estas habilidades en función de la educación y la ubicación geográfica.
                                    </p>
                                </div>
                            </div>
                        </>

                    ) : (
                        <div className="loading">
                            <span>Cargando gráficos del dashboard...</span>
                            <div className="spinner"></div>
                        </div>
                    )}
                    {/* Fila: Tabla de Conteo y Gráfica de Boxplots */}
                    {data && (
                        <div className="chart-grid fila-4">
                            <div className="chart-container">
                                <h3 className="chart-title">Conteo de Empleados</h3>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Employed</th>
                                            <th>Conteo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(data.charts.employed_counts).map(([key, count]) => (
                                            <tr key={key}>
                                                <td>{key}</td>
                                                <td>{count}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <p className="table-explanation">
                                    Se muestra la distribución de la variable Employed, indicando la cantidad de individuos empleados (1) y no empleados (0).
                                </p>
                            </div>

                            <div className="chart-container">
                                <h3 className="chart-title">Distribuciones de Datos</h3>
                                <img src={data.charts.boxplot_distributions} alt="Distribuciones de Boxplots" style={{ width: "100%", height: "auto" }} />
                                <p className="table-explanation">
                                    Los boxplots muestran la distribución de los años de experiencia. Con la primera la mediana se sitúa alrededor de 10 años, con una gran cantidad de valores atípicos
                                    en el rango superior. El salario previo muestra la variabilidad en los salarios, donde la mediana es aproximadamente 50,000, y se observan varios valores atípicos en el rango superior.
                                    Con las habilidades computacionales la distribución de habilidades computacionales en una escala, donde la mayoría de los valores se agrupan en la parte inferior,
                                    con algunos valores atípicos en niveles más altos de habilidad.
                                </p>
                            </div>

                        </div>
                    )}
                </div>
            )}
            {activeTab === "roc_confusion" && (
                <div>
                    {/* Fila: Curva ROC y Matriz de Confusión */}
                    {data && (
                        <div className="chart-grid fila-6">
                            <div className="chart-container">
                                <h3 className="chart-title">Curva ROC</h3>
                                <img src={data.charts.roc_curve} alt="Curva ROC" style={{ width: "100%", height: "auto" }} />
                                <p className="table-explanation">
                                    La curva ROC evalúa el rendimiento del modelo de clasificación (Random Forest en este caso).
                                    Representa la tasa de verdaderos positivos frente a la tasa de falsos positivos a diferentes umbrales de decisión.
                                    Una curva que se aproxima a la esquina superior izquierda indica un modelo con buen desempeño, donde el área bajo la curva (AUC) es alta.
                                    En este caso, el área bajo la curva (AUC) es 0.89, lo cual sugiere que el modelo tiene un buen rendimiento en términos de su capacidad para distinguir entre
                                    las clases "Employed" (Empleados) y "Not Employed" (No empleados).
                                    Un AUC de 0.89 indica que el modelo es capaz de distinguir bien entre los empleados y los no empleados.
                                </p>
                            </div>

                            <div className="chart-container">
                                <h3 className="chart-title">Matriz de Confusión</h3>
                                <img src={data.charts.confusion_matrix} alt="Matriz de Confusión" style={{ width: "100%", height: "auto" }} />
                                <p className="table-explanation">
                                    La matriz de confusión indica que el modelo tiene un buen rendimiento, con una mayor cantidad de predicciones correctas
                                    (TP y TN) en comparación con los errores (FP y FN). Esto sugiere que el modelo es confiable para clasificar correctamente a
                                    los empleados y no empleados en la mayoría de los casos.
                                    Sin embargo, los valores de FP y FN muestran que todavía hay margen de mejora.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>

    );
};

export default Dashboard;

