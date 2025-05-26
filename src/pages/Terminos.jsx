import React from "react";

export default function Terminos() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-white text-gray-800 rounded-xl shadow-lg mt-10 mb-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Términos y Condiciones</h1>
      <p className="text-sm text-right text-gray-500 mb-8">
        Última actualización: 16 de mayo de 2025
      </p>

      <div className="space-y-6 text-base leading-relaxed">
        <section>
          <h2 className="font-semibold text-lg mb-1">1. Aceptación</h2>
          <p>
            Al registrarte o utilizar la plataforma <strong>OpenCoaching.io</strong>, aceptás cumplir con estos términos y condiciones. 
            Si no estás de acuerdo, no utilices el sitio ni los servicios ofrecidos.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg mb-1">2. Rol de la plataforma</h2>
          <p>
            OpenCoaching no ofrece servicios de coaching directo. Es una plataforma que conecta a coaches con personas interesadas en sesiones, prácticas o procesos. 
            No se responsabiliza por los resultados de las conversaciones ni por acuerdos personales entre partes.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg mb-1">3. Coaches y su responsabilidad</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Mantener confidencialidad sobre cada conversación.</li>
            <li>No prometer resultados ni actuar como terapeuta.</li>
            <li>Respetar los límites del coaching profesional.</li>
          </ul>
          <p className="mt-2">
            OpenCoaching puede suspender el acceso de un coach si incumple estos principios.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg mb-1">4. Uso de la plataforma</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>No está permitido el uso de la plataforma con fines de venta, manipulación, acoso o conducta inapropiada.</li>
            <li>El usuario se compromete a usar los espacios con respeto y profesionalismo.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-lg mb-1">5. Política de sesiones</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Las sesiones con coaches aprendices son gratuitas.</li>
            <li>Las sesiones con coaches certificados tienen un valor a partir de 25 USD (o su equivalente), luego de la primera conversación gratuita.</li>
            <li>La continuidad del proceso es decisión del cliente.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-lg mb-1">6. Cancelaciones</h2>
          <p>
            Pedimos avisar con mínimo 12 horas de anticipación si no podés asistir. Reiteradas inasistencias sin aviso pueden limitar tu acceso a la plataforma.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg mb-1">7. Protección de datos</h2>
          <p>
            Los datos personales recolectados (nombre, correo, preferencias horarias, etc.) se usan solo para el funcionamiento de la plataforma y no se comparten con terceros.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg mb-1">8. Modificaciones</h2>
          <p>
            Estos términos pueden modificarse en cualquier momento. Notificaremos los cambios relevantes a través del sitio web o por correo electrónico.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg mb-1">9. Exclusión de responsabilidad de la plataforma</h2>
          <p>
            OpenCoaching es una plataforma intermediaria que conecta coaches con personas interesadas en procesos de coaching. 
            No garantiza resultados ni se hace responsable por:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>El contenido, calidad o resultados de las sesiones brindadas.</li>
            <li>Las acciones, decisiones o consecuencias posteriores a una sesión.</li>
            <li>Conflictos entre partes que usen la plataforma (clientes, coaches o terceros).</li>
          </ul>
          <p className="mt-2">
            Cada usuario (coach o cliente) es responsable por su participación, conducta y decisiones. 
            En caso de conflicto, OpenCoaching se reserva el derecho de limitar o cancelar el acceso de cualquier persona sin previo aviso.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg mb-1">10. Consentimiento informado</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Entiende que el coaching no reemplaza la terapia psicológica, médica ni ningún tratamiento profesional.</li>
            <li>Acepta participar de forma voluntaria y bajo su propio criterio.</li>
            <li>Exonera a OpenCoaching de cualquier responsabilidad sobre los efectos o decisiones derivadas de una conversación de coaching.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
