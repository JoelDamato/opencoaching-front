import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const VerificarIPs = () => {
    const [IP, setIP] = useState(null); // Estado inicial de la IP
    const [email, setEmail] = useState(''); // Estado inicial del email
    const API_BASE_URL =
        process.env.NODE_ENV === 'production'
            ? 'https://back-cursos.onrender.com'
            : 'http://localhost:5000';

    const location = useLocation(); // Detectar cambios de ruta

    // Obtener la IP pública
    const obtenerIP = async () => {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            console.log(`IP del cliente obtenida: ${data.ip}`);
            setIP(data.ip);
        } catch (error) {
            console.error('Error obteniendo la IP:', error);
        }
    };

    // Verificar las IPs activas en el backend
    const checkIPs = async () => {
        if (!email || !IP) {
            console.log('Email o IP no disponibles para verificar.');
            return;
        }

        try {
            console.log(`Enviando datos al backend: Email=${email}, IP=${IP}`);
            const response = await axios.post(`${API_BASE_URL}/api/ip/check-ips`, { email });

            if (response.data.status === 'multiple_ips') {
                alert('Se detectaron múltiples IPs activas. Serás desconectado.');
                localStorage.clear(); // Limpia el estado del usuario
                window.location.href = '/'; // Redirige fuera de la plataforma
            } else {
                console.log('Verificación de IP exitosa:', response.data);
            }
        } catch (error) {
            console.error('Error verificando las IPs:', error);
        }
    };

    // Obtener el email desde localStorage
    const obtenerEmail = () => {
        const emailEnStorage = localStorage.getItem('email');
        if (emailEnStorage) {
            setEmail(emailEnStorage); // Actualiza el estado del email
            console.log(`Email obtenido desde localStorage: ${emailEnStorage}`);
        } else {
            console.warn('Email no encontrado en localStorage.');
        }
    };

    // Obtener la IP y el email al montar el componente
    useEffect(() => {
        console.log('Componente VerificarIPs montado.');
        obtenerIP();
        obtenerEmail(); // Obtén el email al montar
    }, []); // Solo al montar

    // Verificar las IPs cada vez que email o IP cambien, o al cambiar de página
    useEffect(() => {
        console.log('Estado actualizado - Email:', email, 'IP:', IP);
        if (email && IP) {
            console.log('Ambos valores disponibles, ejecutando checkIPs...');
            checkIPs();
        }
    }, [email, IP, location.pathname]); // Se ejecuta en cambios de `email`, `IP` o ruta

    return null; // Este componente no renderiza nada
};

export default VerificarIPs;
