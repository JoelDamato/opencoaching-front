import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import ReactPlayer from "react-player";
import useUserStore from "../store/users"; // Importar el store de Zustand


function Capitulos() {
  const API_BASE_URL = process.env.NODE_ENV === "production"
    ? "https://back-cursos.onrender.com"
    : "http://localhost:5000";

  const { cursoId, moduleName, chapterId } = useParams();
  const navigate = useNavigate();
  const commentsEndRef = useRef(null);
  const workerUrl = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState(localStorage.getItem("nombre") || "Anónimo");
  const [showComments, setShowComments] = useState(false);
  const [course, setCourse] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [rol, setRol] = useState(localStorage.getItem("rol") || "");

  const user = useUserStore((state) => state.user);
  const clearUserData = useUserStore((state) => state.clearUserData);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (chapterId) {
      localStorage.setItem("lastChapter", chapterId);
    }
  }, [chapterId]);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/courses/getcourses`);
        const data = await response.json();
        const selectedCourse = data.find(
          (course) =>
            course.courseTitle.toLowerCase().replace(/\s+/g, "-") === cursoId
        );
        if (selectedCourse) {
          setCourse(selectedCourse);
        }
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
      const response = await fetch(`${API_BASE_URL}/api/comments/${cursoId}/${moduleName}/${chapterId}`);
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: cursoId,
          moduleName, // Incluye moduleName en la solicitud
          chapterId: parseInt(chapterId, 10),
          userEmail: userName,
          content: newComment,
        }),
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
        method: "DELETE",
      });
      if (response.ok) {
        fetchComments();
      }
    } catch (error) {
      console.error("Error al borrar comentario:", error);
    }
  };

  useEffect(() => {
    if (cursoId && moduleName && chapterId) {
      fetchComments();
    }
  }, [cursoId, moduleName, chapterId]);

  useEffect(() => {
    if (showComments) {
      commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments, showComments]);

  const goToNextChapter = () => {
    const currentIndex = parseInt(chapterId, 10) - 1;
    if (currentModuleChapters && currentIndex < currentModuleChapters.length - 1) {
      navigate(`/cursos/${cursoId}/${moduleName}/${currentIndex + 2}`);
    }
  };

  const goToPreviousChapter = () => {
    const currentIndex = parseInt(chapterId, 10) - 1;
    if (currentIndex > 0) {
      navigate(`/cursos/${cursoId}/${moduleName}/${currentIndex}`);
    } else {
      navigate(`/${cursoId}`);
    }
  };

  if (!course) {
    return <div className="text-white">Cargando curso...</div>;
  }

  const currentModuleChapters = course.chapters.filter(
    (chapter) => chapter.module === moduleName
  );

  if (currentModuleChapters.length === 0) {
    return <div className="text-white">Módulo no encontrado</div>;
  }

  const currentChapter =
    currentModuleChapters[parseInt(chapterId, 10) - 1];

  if (!currentChapter) {
    return <div className="text-white">Capítulo no encontrado</div>;
  }

  return (
    <div className="py-2 min-h-screen w-screen overflow-y-auto bg-gradient-to-r from-black/80 to-black flex flex-col items-center justify-center">
      <Navbar />

      <h1 className="text-4xl font-bold mb-6 text-white text-center">
        {currentChapter.title}
      </h1>
      <p className="text-white mb-4 text-center">{currentChapter.description}</p>

      <div className="bg-gradient-to-b from-black/80 to-black w-full sm:rounded-2xl flex flex-col items-center p-8 shadow-lg">
        {currentChapter.video ? (
          <div className="w-full h-[180px] md:h-[580px]">


  <ReactPlayer
    url={currentChapter.video}
    width="100%"
    height="100%"
    controls
  />


          </div>
        ) : (
          <p className="text-white">No hay video disponible para este capítulo.</p>
        )}

        <button
          onClick={() => setShowComments(!showComments)}
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold py-2 px-4 rounded-lg mt-4"
        >
          {showComments ? "Ocultar Comentarios" : "Mostrar Comentarios"}
        </button>

        {showComments && (
          <div className="w-full mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-white text-center">Comentarios</h2>
            <div className="space-y-4 mb-6 overflow-y-auto" style={{ maxHeight: "300px" }}>
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center"
                >
                  <div>
                    <p className="font-bold text-xl text-white">{comment.userEmail}</p>
                    <p className="text-white">{comment.content}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleString()}</p>
                  </div>
                  {comment.userEmail === userName || rol === "admin" ? (
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="bg-red-600 text-white py-1 px-2 rounded"
                    >
                      Eliminar
                    </button>
                  ) : null}
                </div>
              ))}
              <div ref={commentsEndRef} />
            </div>

            <textarea
              placeholder="Escribe tu comentario..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border rounded mb-2 bg-gray-900 text-white"
            />
            <button
              onClick={handleAddComment}
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 px-4 rounded-lg w-full"
            >
              Agregar Comentario
            </button>
          </div>
        )}

        <div className="flex justify-between w-full mt-6">
          <button
            onClick={goToPreviousChapter}
            className="bg-black text-white py-2 px-4 rounded-lg"
          >
            Anterior
          </button>
          <button
            onClick={() => navigate(`/${cursoId}`)}
            className="bg-black text-white py-2 px-4 rounded-lg"
          >
            Regresar
          </button>
          {parseInt(chapterId, 10) < currentModuleChapters.length && (
            <button
              onClick={goToNextChapter}
              className="bg-black text-white py-2 px-4 rounded-lg"
            >
              Siguiente
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Capitulos;
