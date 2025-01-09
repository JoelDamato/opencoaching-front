import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const Ebook = () => {
  const defaultLayout = defaultLayoutPlugin();

  // Ruta del PDF
  const pdfUrl = "/Colorimetria.pdf"; // Asegúrate de que este archivo esté en `public`

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {/* Encabezado */}
      <header className="w-full py-6 bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold">Ebook - Colorimetría</h1>
        <p className="text-lg mt-2 font-light">Descubre toda la información que necesitas</p>
      </header>

      {/* Contenedor del visor PDF */}
      <main className="flex flex-col items-center justify-center w-full max-w-4xl mt-8 p-4 bg-gray-900 rounded-lg shadow-lg">
        <div className="w-full h-[75vh] bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
            <Viewer
              fileUrl={pdfUrl}
              plugins={[defaultLayout]} // Funcionalidades como zoom, búsqueda, navegación
              theme="dark"
            />
          </Worker>
        </div>
      </main>

      {/* Botones opcionales para interacción */}
      <footer className="mt-6 flex flex-col md:flex-row gap-4">
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg shadow-md transition"
          onClick={() => alert("Compartir este libro")}
        >
          Compartir
        </button>
      </footer>
    </div>
  );
};

export default Ebook;
