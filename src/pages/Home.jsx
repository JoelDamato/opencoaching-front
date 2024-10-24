import '../App.css'

function Home() {
  return (
<div className="h-screen w-screen bg-gradient-to-r from-blue-950 to-blue-800 flex flex-col items-center justify-center"> 
      <h1 className="text-4xl font-bold mb-6 text-white text-shadow-xl">Erick Gomez Academy</h1>
      
      {/* Contenedor del formulario */}
      <div className="bg-white h-auto w-full sm:w-11/12 rounded-xl sm:rounded-2xl flex flex-col items-center p-8 shadow-lg">
        <h1 className="flex justify-center text-black text-3xl tracking-wide font-bold py-4 sm:text-6xl">
          INGRESAR
        </h1>
        
        <form className="flex flex-col w-full items-center gap-5">
          {/* Campo de email */}
          <div className="w-4/5">
            <label className="block text-black font-semibold tracking-wide mb-2">
              EMAIL:
              <div className="flex items-center mt-1">
                <input
                  className="w-full h-12 sm:h-16 bg-gray-200 rounded-lg px-4"
                  type="email"
                />
                <img
  className="w-6 h-6 sm:w-10 sm:h-10 sm:mt-5 ml-[-10%] mt-2 mr-1"
  src="https://cdn-icons-png.flaticon.com/128/3916/3916631.png"
                  alt="Email Icon"
                />
              </div>
            </label>
          </div>

          {/* Campo de contraseña */}
          <div className="w-4/5">
            <label className="block text-black font-semibold tracking-wide mb-2">
              CONSTRASEÑA:
              <div className="flex items-center mt-1">
                <input
                  className="w-full h-12 sm:h-16 bg-gray-200 rounded-lg px-4"
                  type="password"
                />
              <img
  className="w-6 h-6 sm:w-10 sm:h-10 sm:mt-5 ml-[-10%] mt-2 mr-1"
  src="https://cdn-icons-png.flaticon.com/128/3917/3917642.png"
  alt="Password Icon"
/>

              </div>
            </label>
          </div>

          {/* Botón de inicio de sesión */}
          <button
            className="bg-black rounded-2xl w-4/5 sm:h-20 sm:w-3/5 h-16 tracking-wide text-3xl text-white"
            type="submit"
          >
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
