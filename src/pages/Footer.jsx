import React from 'react';

const ComponentName = () => {
  return (
    <footer className="bg-black text-white py-6">
    <div className="container mx-auto flex flex-col items-center gap-4">
      {/* Logo */}
      
      {/* Texto principal */}
      <p className="text-center text-lg font-bold">
        Open Coaching 2024®️ | Todos los derechos reservados ©️
      </p>
      
      {/* Términos */}
      <p className="text-center text-sm">
        <a
          href="/politicas-de-privacidad"
          className="hover:underline"
        >
          Políticas de privacidad
        </a>
        {" | "}
        <a
          href="/terminos-condiciones"
          className="hover:underline"
        >
          Términos de condiciones y uso
        </a>
        {" | "}
        <a
          href="/politica-compra"
          className="hover:underline"
        >
          Política de compra
        </a>
      </p>
    </div>
  </footer>
  );
};

export default ComponentName;
