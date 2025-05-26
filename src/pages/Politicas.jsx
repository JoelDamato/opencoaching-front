import React from "react";

const PoliticasSeguridad = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 bg-white rounded-xl shadow-lg mt-10 mb-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-black">Política de Privacidad y Seguridad</h1>
      <p className="text-sm text-right text-gray-500 mb-4">Última actualización: 16 de mayo de 2025</p>

      <p className="mb-6">
        En <strong>OpenCoaching.io</strong> nos tomamos en serio la privacidad y la protección de tus datos personales.
        A continuación te explicamos cómo los usamos y cuidamos:
      </p>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. ¿Qué datos recopilamos?</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Nombre y apellido</li>
            <li>Correo electrónico</li>
            <li>Edad, país y datos de contacto</li>
            <li>Disponibilidad horaria para prácticas o sesiones</li>
            <li>Información relacionada a tu formación como coach (en caso de aplicar)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. ¿Para qué usamos tus datos?</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Para organizar prácticas de coaching (TriadFlow)</li>
            <li>Para asignarte un coach o mostrar tu perfil en la plataforma</li>
            <li>Para enviarte recordatorios, novedades o información relacionada con tu participación</li>
            <li>Para mejorar la experiencia dentro de la plataforma</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. ¿Compartimos tus datos?</h2>
          <p>No. No vendemos, intercambiamos ni transferimos tus datos personales a terceros. Sólo el equipo de OpenCoaching accede a ellos, exclusivamente con fines operativos.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. ¿Cómo protegemos tu información?</h2>
          <p>Aplicamos medidas razonables de seguridad para proteger tus datos de accesos no autorizados. Además, fomentamos prácticas éticas de uso y confidencialidad dentro del equipo.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. ¿Podés acceder o modificar tus datos?</h2>
          <p>Sí. Podés solicitar en cualquier momento la modificación o eliminación de tus datos escribiendo a <a href="mailto:soporte@opencoaching.io" className="text-blue-600 underline">soporte@opencoaching.io</a>.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">6. Uso de cookies</h2>
          <p>Nuestro sitio puede utilizar cookies para mejorar la navegación. Al continuar usando la página, aceptás esta práctica.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">7. Cambios en esta política</h2>
          <p>Podemos actualizar esta política. Te notificaremos por correo o en la web cualquier cambio importante.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">8. Consentimiento del uso de datos</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Sus datos personales serán utilizados con fines operativos de la plataforma.</li>
            <li>OpenCoaching podrá enviar información relevante por mail o WhatsApp.</li>
            <li>Los datos serán tratados con confidencialidad y no se compartirán sin consentimiento.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">9. Limitación de uso</h2>
          <p>La información recolectada no se utilizará para fines comerciales ajenos a OpenCoaching, ni será vendida ni compartida con otras empresas. El uso de datos se limita a mejorar la experiencia dentro de la plataforma.</p>
        </section>
      </div>
    </div>
  );
};

export default PoliticasSeguridad;
