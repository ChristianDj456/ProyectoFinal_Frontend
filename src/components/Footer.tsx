import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="flex flex-col p-2">
      {/* Footer */}
      <footer className="bg-pureWhite-100 py-6 border-green-100 rounded-2xl mt-auto border shadow min-w-screen">
        <div className="container mx-auto text-center">
          {/* Título */}
          <h2 className="text-lg font-semibold mb-4">
            Analítica de datos en la selección de talento humano mediante el uso de técnicas básicas de IA
          </h2>
  
          {/* Información de los autores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p>Cristian De Jesús Chavez Sarmiento</p>
              <p>Dpto. de Ingeniería de Sistemas</p>
              <p>Universidad del Norte</p>
              <p>Barranquilla, Colombia</p>
              <a
                href="mailto:cdchavez@uninorte.edu.co"
                className="text-indigo-600 hover:underline"
              >
                cdchavez@uninorte.edu.co
              </a>
            </div>
            <div>
              <p>Valeria Andrea Jimenez Silvera</p>
              <p>Dpto. de Ingeniería de Sistemas</p>
              <p>Universidad del Norte</p>
              <p>Barranquilla, Colombia</p>
              <a
                href="mailto:vjimenez@uninorte.edu.co"
                className="text-indigo-600 hover:underline"
              >
                vjimenez@uninorte.edu.co
              </a>
            </div>
            <div>
              <p>Anyelo Rafael Tilano Algarín</p>
              <p>Dpto. de Ingeniería de Sistemas</p>
              <p>Universidad del Norte</p>
              <p>Barranquilla, Colombia</p>
              <a
                href="mailto:anyelot@uninorte.edu.co"
                className="text-indigo-600 hover:underline"
              >
                anyelot@uninorte.edu.co
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );  
};

export default Footer;
