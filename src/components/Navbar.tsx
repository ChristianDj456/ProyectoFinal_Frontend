import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-grafiteGray-400 p-4 shadow-lg relative">
            <div className="container mx-auto flex justify-between items-center">

                {/* Botón del menú */}
                <div className="sm:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-white hover:text-steelBlue-400 focus:outline-none transition duration-300"
                    >
                        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>

                {/* Menú de navegación */}
                <ul
                    className={`sm:flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 sm:static absolute left-0 w-full sm:w-auto top-full sm:top-0 bg-grafiteGray-400 sm:bg-transparent shadow-lg sm:shadow-none p-4 sm:p-0 z-10 transition-all duration-300 ${isMenuOpen ? "block" : "hidden"
                        }`}
                >
                    <li>
                        <Link
                            to="/"
                            className="text-white uppercase text-sm hover:text-steelBlue-400 transition duration-300 block"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/candidate"
                            className="text-white uppercase text-sm hover:text-steelBlue-400 transition duration-300 block"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Candidato
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/upload-csv"
                            className="text-white uppercase text-sm hover:text-steelBlue-400 transition duration-300 block"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Múltiples Candidatos
                        </Link>
                    </li>
                </ul>
                {/* Título responsivo */}
                <h1 className="text-white text-lg font-bold sm:block hidden">
                    Proyecto Final - Gestión de Talento Humano
                </h1>
                <h1 className="text-white text-lg font-bold sm:hidden">
                    RRHH
                </h1>
            </div>
        </nav>
    );
};

export default Navbar;
