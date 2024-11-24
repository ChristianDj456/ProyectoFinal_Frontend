import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gradient-to-r from-purple-500 to-purple-400 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">

                <ul className="flex space-x-6">
                    <li>
                        <Link
                            to="/"
                            className="text-white uppercase text-sm hover:text-yellow-400 transition duration-300"
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/candidate"
                            className="text-white uppercase text-sm hover:text-yellow-400 transition duration-300"
                        >
                            Candidato
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/upload-csv"
                            className="text-white uppercase text-sm hover:text-yellow-400 transition duration-300"
                        >
                            Múltiples Candidatos
                        </Link>
                    </li>
                </ul>

                <h1 className="text-white text-lg font-bold">
                    Proyecto Final - Grupo 11 Gestión de Talento Humano
                </h1>

            </div>
        </nav>
    );
};

export default Navbar;
