import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function TriadFlow() {
  const [horariosAgrupados, setHorariosAgrupados] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarHorarios() {
      try {
        const res = await fetch('https://opencoaching-io.app.n8n.cloud/webhook/horarios');
        const datos = await res.json();

        if (!Array.isArray(datos) || datos.length === 0) {
          setHorariosAgrupados(null);
          return;
        }

        const agrupado = {};
        datos.forEach(item => {
          const data = item.json;
          const [dia, hora] = data.diaYhora.split(' - ');
          if (!agrupado[dia]) agrupado[dia] = [];
          agrupado[dia].push({ hora, faltan: data.faltan });
        });

        setHorariosAgrupados(agrupado);
      } catch (error) {
        console.error('Error al obtener los horarios:', error);
        setHorariosAgrupados(null);
      } finally {
        setLoading(false);
      }
    }
    cargarHorarios();
  }, []);

  function postularme(dia, hora) {
    const url = `https://docs.google.com/forms/d/e/1FAIpQLSc8o_QK0Yr-on0F46bMpGmp1fSDxeGS_E3F6Xd8vjdft9VoJQ/viewform?usp=pp_url&entry.1585980036=${encodeURIComponent(dia)}&entry.2618048=${encodeURIComponent(hora)}`;
    window.open(url, '_blank');
  }

  return (
   
    <>  
     <Navbar />
    <div className="min-h-screen bg-white text-gray-900 px-4 py-8 font-inter">
      <div className="max-w-3xl mx-auto">
        <img src="https://i.ibb.co/VcK06RDZ/Triad-Flow-1.png" alt="TriadFlow" className="bg-black rounded-lg w-40 mx-auto mb-6" />

        <h1 className="text-2xl md:text-4xl font-bold text-center mb-4">
          Próximas Tríadas Disponibles
        </h1>

        <p className="text-center text-sm md:text-base mb-8 text-gray-700 leading-relaxed">
          En <strong>Open Coaching</strong> medimos el compromiso de los coaches mediante su asistencia a las prácticas.<br />
          <strong>Agendá con responsabilidad y respeto hacia tu comunidad de práctica.</strong>
        </p>

        {loading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : horariosAgrupados ? (
          Object.entries(horariosAgrupados).map(([dia, horarios]) => (
            <div key={dia} className="mb-6 border border-gray-200 rounded-lg shadow-sm">
              <div className="bg-blue-100 px-4 py-2 font-semibold cursor-pointer">
                📅 {dia}
              </div>
              <div className="divide-y divide-gray-200">
                {horarios.map(({ hora, faltan }, index) => (
                  <div
                    key={index}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${faltan === 1 ? 'bg-yellow-100' : ''}`}
                    onClick={() => postularme(dia, hora)}
                  >
                    <strong>{hora}</strong> – Faltan <strong>{faltan}</strong> persona(s)<br />
                    <span className="text-sm">
                      {faltan === 1 ? '⚠ ¡Último cupo!' : '🙌 Se necesitan 2 personas.'}
                    </span><br />
                    <span className="text-blue-700 font-semibold">📲 Hacé click para agendar</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No hay horarios disponibles en este momento.</p>
        )}
<div className="bg-red-100 text-red-700 border border-red-300 px-4 py-3 rounded-md text-center font-medium my-4">
  ⚠️ <strong>Importante:</strong> Si agendás un horario y no asistís ni avisás con anticipación, podrías recibir una suspensión temporal del uso de la herramienta. <br />
  Te pedimos compromiso y respeto hacia tu comunidad de práctica.
</div>


        <div className="text-center ">
          <a
            href="https://forms.gle/GQqf4zPbBqy5kUx59"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 transition"
          >
            🕒 ¿No encontrás horario? Proponé uno
          </a>
        </div>
      </div>
    </div>
    </>
  );
}
