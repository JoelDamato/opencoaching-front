import React from 'react';

const ComponentName = () => {
  return (
    <footer className="bg-black text-white py-6">
    <div className="container mx-auto flex flex-col items-center gap-4">
      {/* Logo */}
      <img
        src="https://i.postimg.cc/NF4pMWsn/cold-smooth-tasty-removebg-preview.png"
        alt="Erick Gómez Logo"
        className="w-16 h-16"
      />
      
      {/* Texto principal */}
      <p className="text-center text-lg font-bold">
        Erick Gómez Academy 2019®️ | Todos los derechos reservados ©️
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
