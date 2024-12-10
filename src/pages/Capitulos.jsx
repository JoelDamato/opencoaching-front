import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';

function Capitulos() {

  const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://back-cursos.onrender.com'
  : 'http://localhost:5000';
  
  const { cursoId, chapterId } = useParams(); // Obtener cursoId y chapterId de la URL
  const navigate = useNavigate();
  const commentsEndRef = useRef(null);
  const workerUrl = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState(localStorage.getItem("nombre") || ""); 
  const [showComments, setShowComments] = useState(false); // Estado para manejar el toggle de comentarios
  const [course, setCourse] = useState(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Guardar el capítulo actual en el localStorage
  useEffect(() => {
    if (chapterId) {
      localStorage.setItem("lastChapter", chapterId);
    }
  }, [chapterId]);

  // Función para sanitizar el título del curso (para coincidir con el formato de la URL)
  const sanitizeTitle = (title) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
  };
  

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/courses/getcourses`);
        const data = await response.json();
        const selectedCourse = data.find(course => sanitizeTitle(course.courseTitle) === cursoId);
        setCourse(selectedCourse);
      } catch (error) {
        console.error("Error al obtener el curso:", error);
      }
    };

    if (cursoId) {
      fetchCourseData();
    }
  }, [cursoId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/comments/${cursoId}/${chapterId}`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error al obtener comentarios:", error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment) return; 
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/comments/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          courseId: cursoId, // courseId como string para pasar el nombre del curso
          chapterId: parseInt(chapterId, 10),
          userEmail: userName,
          content: newComment
        })
      });

      if (response.ok) {
        setNewComment("");
        fetchComments(); 
      }
    } catch (error) {
      console.error("Error al agregar comentario:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/comments/${commentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchComments(); // Refrescar los comentarios después de borrar
      }
    } catch (error) {
      console.error("Error al borrar comentario:", error);
    }
  };

  useEffect(() => {
    if (cursoId && chapterId) {
      fetchComments();
    }
  }, [cursoId, chapterId]);

  useEffect(() => {
    if (showComments) {
      commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments, showComments]);

  const goToNextChapter = () => {
    if (course && parseInt(chapterId, 10) < course.chapters.length) {
      navigate(`/cursos/${cursoId}/${parseInt(chapterId, 10) + 1}`);
    }
  };

  const goToPreviousChapter = () => {
    if (parseInt(chapterId, 10) > 1) {
      navigate(`/cursos/${cursoId}/${parseInt(chapterId, 10) - 1}`);
    }
  };

  const goToMainPage = () => {
    navigate(`/${cursoId}`);
  };

  if (!course) {
    return <div className="text-white">Cargando curso...</div>;
  }

  const chapter = course.chapters[parseInt(chapterId, 10) - 1] || { title: 'Capítulo no encontrado', description: '', video: '' };

  const customTheme = {
    viewer: {
      background: 'transparent',
    },
    page: {
      background: 'transparent',
      padding: '0',
    },
  };

  return (
    <div className="py-2 h-full w-screen overflow-y-auto bg-gradient-to-r from-blue-800 to-black flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6 text-white text-center">{chapter.title}</h1>
      <p className="text-white mb-4 text-center">{chapter.description}</p>

      <div className="bg-gradient-to-b from-blue-900 to-black h-auto w-full sm:w-11/12 rounded-xl sm:rounded-2xl flex flex-col items-center p-8 shadow-lg">
        
      {
  course.courseTitle === "Colorimetria" ? (
    <Worker workerUrl={workerUrl}>

            <div
              style={{
                width: "100%",
                height: "100vh",
                margin: "0",
                padding: "0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "transparent",
                overflow: "hidden"
              }}
            >
              <div 
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative"
                }}
              >
                <Viewer
                  fileUrl="/EBOOKCOLORIMETRIAERICKGOMEZACADEMY.pdf"
                  initialScale={1.0}
                  theme={customTheme}
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "transparent",
                  }}
                />
                <style>
                  {`
                    .rpv-core__viewer {
                      background: transparent !important;
                    }
                    .rpv-core__page-layer {
                      background: transparent !important;
                    }
                    .rpv-core__page {
                      background: transparent !important;
                    }
                    .rpv-core__canvas-layer {
                      background: transparent !important;
                    }
                  `}
                </style>
              </div>
            </div>
          </Worker>
  ) : (
    chapter.video && (
      <ReactPlayer
        url={chapter.video}
        width="100%"
        height="480px"
        controls
        config={{
          file: {
            attributes: {
              crossOrigin: "anonymous" // Necesario para cargar subtítulos externos
            },
            tracks: [
              { kind: "subtitles", src: "/subtitles/english.vtt", srcLang: "en", label: "English" },
              { kind: "subtitles", src: "/subtitles/spanish.vtt", srcLang: "es", label: "Español" },
              { kind: "subtitles", src: "/subtitles/french.vtt", srcLang: "fr", label: "Français" }
            ]
          }
        }}
      />
    )
  )
}

        {/* Toggle de Comentarios */}
        <button 
          onClick={() => setShowComments(!showComments)} 
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold py-2 px-4 rounded-lg mt-4 flex items-center gap-2"
        >
          {showComments ? "Ocultar Comentarios" : "Mostrar Comentarios"}
        </button>

        {/* Sección de comentarios (toggle) */}
        {showComments && (
          <div className="w-full mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-white text-center">Comentarios</h2>

            {/* Lista de comentarios */}
            <div className="space-y-4 mb-6 overflow-y-auto" style={{ maxHeight: '300px' }}>
              {comments.map((comment, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center">
                  <div>
                    <p className="font-bold text-xl text-white">{comment.userEmail}</p>
                    <p className="text-white">{comment.content}</p>
                    <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
                  </div>
                  {comment.userEmail === userName && (
                    <button 
                      onClick={() => handleDeleteComment(comment._id)} 
                      className="bg-red-600 text-white py-1 px-2 rounded ml-4"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              <div ref={commentsEndRef} />
            </div>

            {/* Formulario para añadir un nuevo comentario */}
            <textarea
              placeholder="Escribe tu comentario..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border rounded mb-2 bg-gray-900 text-white"
            />
            <button onClick={handleAddComment} className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 px-4 rounded-lg w-full">
              Agregar Comentario
            </button>
          </div>
        )}

        <div className="flex justify-between w-full mt-6">
          {chapterId > 1 && (
            <button onClick={goToPreviousChapter} className="bg-black text-white py-2 px-4 rounded-lg">Anterior</button>
          )}

<button
  onClick={() => {
    if (course.courseTitle === "Colorimetria") {
      navigate("/dashboard");
    } else {
      goToMainPage();
    }
  }}
  className="bg-black shadow-2xl text-white py-2 px-4"
>
  Regresar 
</button>

          
          <button onClick={goToMainPage} className="bg-black shadow-2xl text-white py-2 px-4 ">Regresar a {course.courseTitle}</button>


          {chapterId < course.chapters.length ? (
            <button onClick={goToNextChapter} className="bg-black text-white py-2 px-4 rounded-lg">Siguiente</button>
          ) : (
              <button
                onClick={() => {
                  if (course.courseTitle === "Master Fade") {
                    window.location.href = "/certificados";
                  } else if (course.courseTitle === "Focus") {
                    window.location.href = "/dashboard";
                  } else if (course.courseTitle === "Cutting Mastery") {
                    window.location.href = "/certificadoscuty";
                  } else {
                    console.warn("Ruta no definida para este curso");
                  }
                }}
                className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-2 px-4 rounded-lg"
              >
                Finalizar
              </button>
            )}          
        </div>
      </div>
    </div>
  );
}

export default Capitulos;