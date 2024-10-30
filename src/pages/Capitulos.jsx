// Frontend Component
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

function Capitulos() {
  const { cursoId, chapterId } = useParams(); // Obtener cursoId y chapterId de la URL
  const navigate = useNavigate();
  const commentsEndRef = useRef(null);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState(localStorage.getItem("nombre") || ""); 
  const [showComments, setShowComments] = useState(false); // Estado para manejar el toggle de comentarios
  const [course, setCourse] = useState(null);

  // Función para sanitizar el título del curso (para coincidir con el formato de la URL)
  const sanitizeTitle = (title) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
  };
  

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/courses/getcourses');
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
      const response = await fetch(`http://localhost:5000/api/comments/${cursoId}/${chapterId}`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error al obtener comentarios:", error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment) return; 
    
    try {
      const response = await fetch('http://localhost:5000/api/comments/add', {
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
      const response = await fetch(`http://localhost:5000/api/comments/${commentId}`, {
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
    navigate('/Dashboard');
  };

  if (!course) {
    return <div className="text-white">Cargando curso...</div>;
  }

  const chapter = course.chapters[parseInt(chapterId, 10) - 1] || { title: 'Capítulo no encontrado', description: '', video: '' };

  
  return (
    <div className="py-2 h-full w-screen overflow-y-auto bg-gradient-to-r from-blue-800 to-black flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6 text-white text-center">{chapter.title}</h1>
      <p className="text-white mb-4 text-center">{chapter.description}</p>

      <div className="bg-gradient-to-b from-blue-900 to-black h-auto w-full sm:w-11/12 rounded-xl sm:rounded-2xl flex flex-col items-center p-8 shadow-lg">
        {chapter.video && (
          <iframe className="rounded-lg mb-4" width="100%" height="480" src={chapter.video} allow="autoplay"></iframe>
        )}

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
          {chapterId === '1' && (
            <button onClick={goToMainPage} className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 px-4 rounded-lg">Regresar</button>
          )}
          {chapterId > 1 && (
            <button onClick={goToPreviousChapter} className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 px-4 rounded-lg">Anterior</button>
          )}
          {chapterId < course.chapters.length ? (
            <button onClick={goToNextChapter} className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 px-4 rounded-lg">Siguiente</button>
          ) : (
            <button onClick={() => window.location.href = "/certificados"} className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-2 px-4 rounded-lg">Finalizar</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Capitulos;
