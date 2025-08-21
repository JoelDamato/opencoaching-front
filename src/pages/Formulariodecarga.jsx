// client/src/ProfileForm.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const INITIAL = {
  photo: 'https://iili.io/FQLmJp9.jpg',
  name: 'Enzo Chiapello',
  title: 'Coach Ontológico',
  description:
    'Con experiencia acompañando a personas y organizaciones a alcanzar mayor claridad, confianza y compromiso con sus objetivos. Creo en el poder de la conversación para transformar realidades y generar resultados sostenibles, combinando escucha profunda, preguntas poderosas y herramientas prácticas para el cambio.',
  firstSessionLink: 'https://calendar.app.google/UkwVy5oRVdXEzgBLA',
  phone: '5493512101931',
  whatsappMessage: 'Hola vi tu perfil en OpenCoaching!',
  socials: [
    'https://www.linkedin.com/in/enzochiapello/',
    'https://www.instagram.com/enzochiapello.ok/',
    'https://www.facebook.com/enzo.chiapello.1/'
  ],
  certifications: ['https://iili.io/FQQYMCX.jpg'],
  about:
    'Me encanta viajar y perderme en lugares nuevos, siempre con la cámara a mano para capturar momentos y personas que me inspiran. Además de mi trabajo como coach, organizo eventos de desarrollo personal donde conecto con gente increíble y compartimos aprendizajes que nos transforman. Para mí, la vida se trata de explorar, crear y disfrutar el camino.',
  morePhotos: [
    'https://iili.io/FthrU1n.jpg',
    'https://iili.io/Fth6NVI.jpg',
    'https://iili.io/Fthixkb.jpg',
  ],
  testimonials: [
    { text: 'Trabajar con Enzo fue una experiencia transformadora.', images: ['https://iili.io/FQmC7DX.jpg'] },
    { text: 'Gracias a sus sesiones, logré enfocarme en lo que realmente quiero.', images: ['https://iili.io/FQmx7DP.jpg'] },
  ],
  publicId: '',
};

export default function ProfileForm() {
  const [form, setForm] = useState(INITIAL);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const { id: idParam } = useParams();
  const [search] = useSearchParams();
  const queryId = search.get('id');
  const editingId = useMemo(() => idParam || queryId || '', [idParam, queryId]);

  const API_BASE =
    process.env.NODE_ENV === "production"
      ? "https://opencoaching-back-tlfh.onrender.com"
      : "http://localhost:5001";

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  // ID aleatorio (a-z0-9, length 12)
  const randomId = (len = 12) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const bytes = (window.crypto && window.crypto.getRandomValues)
      ? window.crypto.getRandomValues(new Uint8Array(len))
      : Array.from({ length: len }, () => Math.floor(Math.random() * 256));
    let out = '';
    for (let i = 0; i < len; i++) out += chars[bytes[i] % chars.length];
    return out;
  };

  // ------- Helpers de arrays / normalización -------
  const normalizeFromDB = (doc = {}) => {
    const norm = {
      ...INITIAL,
      ...doc,
      phone: (doc.phone || '').replace(/[^\d]/g, ''),
      socials: Array.isArray(doc.socials) ? doc.socials : [],
      certifications: Array.isArray(doc.certifications) ? doc.certifications : [],
      morePhotos: Array.isArray(doc.morePhotos) ? doc.morePhotos : [],
      testimonials: Array.isArray(doc.testimonials)
        ? doc.testimonials.map(t => ({
            text: t?.text ?? '',
            images: Array.isArray(t?.images) && t.images.length ? t.images : ['']
          }))
        : [],
    };
    return norm;
  };

  // ------- Precarga si hay ID -------
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!editingId) return;
      setLoading(true);
      setResult(null);
      try {
        const res = await fetch(`${API_BASE}/api/profiles/${editingId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || 'No se pudo cargar el perfil');
        if (!cancelled) setForm(normalizeFromDB(data));
      } catch (err) {
        if (!cancelled) setResult({ ok: false, message: err.message });
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [editingId, API_BASE]);

  // --- Socials ---
  const addSocial = () => setForm((p) => ({ ...p, socials: [...(p.socials || []), ''] }));
  const removeSocial = (i) => setForm((p) => ({ ...p, socials: (p.socials || []).filter((_, idx) => idx !== i) }));
  const setSocial = (i, value) => setForm((p) => {
    const arr = [...(p.socials || [])];
    arr[i] = value;
    return { ...p, socials: arr };
  });

  // --- Certifications (strings) ---
  const addCertification = () => setForm((p) => ({ ...p, certifications: [...(p.certifications || []), ''] }));
  const removeCertification = (i) => setForm((p) => ({ ...p, certifications: (p.certifications || []).filter((_, idx) => idx !== i) }));
  const setCertification = (i, value) => setForm((p) => {
    const arr = [...(p.certifications || [])];
    arr[i] = value;
    return { ...p, certifications: arr };
  });

  // --- More Photos (strings) ---
  const addPhoto = () => setForm((p) => ({ ...p, morePhotos: [...(p.morePhotos || []), ''] }));
  const removePhoto = (i) => setForm((p) => ({ ...p, morePhotos: (p.morePhotos || []).filter((_, idx) => idx !== i) }));
  const setPhoto = (i, value) => setForm((p) => {
    const arr = [...(p.morePhotos || [])];
    arr[i] = value;
    return { ...p, morePhotos: arr };
  });

  // --- Testimonials ---
  const addTestimonial = () => setForm((p) => ({ ...p, testimonials: [...(p.testimonials || []), { text: '', images: [''] }] }));
  const removeTestimonial = (i) => setForm((p) => ({ ...p, testimonials: (p.testimonials || []).filter((_, idx) => idx !== i) }));
  const setTestimonialText = (i, value) => setForm((p) => {
    const arr = [...(p.testimonials || [])];
    arr[i] = { ...arr[i], text: value };
    return { ...p, testimonials: arr };
  });
  const addTestimonialImage = (ti) => setForm((p) => {
    const arr = [...(p.testimonials || [])];
    const imgs = Array.isArray(arr[ti]?.images) ? arr[ti].images : [];
    arr[ti] = { ...arr[ti], images: [...imgs, ''] };
    return { ...p, testimonials: arr };
  });
  const removeTestimonialImage = (ti, ii) => setForm((p) => {
    const arr = [...(p.testimonials || [])];
    const imgs = (arr[ti]?.images || []).filter((_, idx) => idx !== ii);
    arr[ti] = { ...arr[ti], images: imgs };
    return { ...p, testimonials: arr };
  });
  const setTestimonialImage = (ti, ii, value) => setForm((p) => {
    const arr = [...(p.testimonials || [])];
    const imgs = [...(arr[ti]?.images || [])];
    imgs[ii] = value;
    arr[ti] = { ...arr[ti], images: imgs };
    return { ...p, testimonials: arr };
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setResult(null);
    try {
      const payload = { ...form };

      // genera publicId si está vacío (solo en creación)
      if (!editingId) {
        if (!payload.publicId || !payload.publicId.trim()) {
          payload.publicId = randomId(12);
          setForm((prev) => ({ ...prev, publicId: payload.publicId }));
        }
      }

      // limpiar arrays vacíos
      payload.socials = (payload.socials || []).filter(Boolean);
      payload.certifications = (payload.certifications || []).filter(Boolean);
      payload.morePhotos = (payload.morePhotos || []).filter(Boolean);

      const method = editingId ? 'PUT' : 'POST';
      const url = editingId
        ? `${API_BASE}/api/profiles/${editingId}`
        : `${API_BASE}/api/profiles`;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message || 'Error guardando');

      setResult({ ok: true, id: data.id || data._id || payload.publicId });
      // si era creación, actualizo la URL con el id para futuras ediciones (opcional si usás react-router)
      // window.history.replaceState(null, '', `?id=${data._id || data.id}`);
    } catch (err) {
      setResult({ ok: false, message: err.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-xl p-6">
        <h1 className="text-2xl font-bold">
          {editingId ? 'Perfil — Editar' : 'Perfil — Formulario'}
        </h1>
        <p className="text-gray-600 mb-6">
          {editingId
            ? 'Cargamos los datos desde la base. Editá y guardá los cambios.'
            : 'Completá/ajustá los campos y guardá en la base de datos'}
        </p>

        {loading ? (
          <div className="text-gray-600">Cargando perfil…</div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-8">
            {/* Básicos */}
            <section>
              <h2 className="font-semibold text-lg mb-3">Datos básicos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Foto (URL)</label>
                  <input className="mt-1 w-full border rounded-lg p-2" value={form.photo} onChange={(e) => setField('photo', e.target.value)} type="url" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-medium">Nombre</label>
                  <input className="mt-1 w-full border rounded-lg p-2" value={form.name} onChange={(e) => setField('name', e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm font-medium">Título</label>
                  <input className="mt-1 w-full border rounded-lg p-2" value={form.title} onChange={(e) => setField('title', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium">Link 1ª sesión</label>
                  <input className="mt-1 w-full border rounded-lg p-2" value={form.firstSessionLink} onChange={(e) => setField('firstSessionLink', e.target.value)} type="url" />
                </div>

                {/* ID público opcional */}
                <div>
                  <label className="block text-sm font-medium">ID público (opcional)</label>
                  <div className="flex gap-2">
                    <input
                      className="mt-1 w-full border rounded-lg p-2"
                      value={form.publicId || ''}
                      onChange={(e) => setField('publicId', e.target.value.replace(/[^a-z0-9-]/gi, '').toLowerCase())}
                      placeholder="auto si lo dejás vacío"
                      disabled={!!editingId} // si estás editando, bloqueo cambio de publicId (opcional)
                    />
                    {!editingId && (
                      <button
                        type="button"
                        className="mt-1 px-3 py-2 rounded bg-gray-900 text-white"
                        onClick={() => setField('publicId', randomId(12))}
                      >
                        Generar
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Si lo dejás vacío, se generará automáticamente.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium">Teléfono (solo dígitos)</label>
                  <input className="mt-1 w-full border rounded-lg p-2" value={form.phone} onChange={(e) => setField('phone', e.target.value.replace(/[^\d]/g, ''))} inputMode="numeric" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium">Descripción</label>
                  <textarea className="mt-1 w-full border rounded-lg p-2" rows={4} value={form.description} onChange={(e) => setField('description', e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium">Mensaje de WhatsApp</label>
                  <input className="mt-1 w-full border rounded-lg p-2" value={form.whatsappMessage} onChange={(e) => setField('whatsappMessage', e.target.value)} />
                </div>
              </div>
            </section>

            {/* Redes Sociales */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-lg">Redes sociales (URLs)</h2>
                <button type="button" onClick={addSocial} className="px-3 py-1 text-sm rounded bg-gray-900 text-white">+ Agregar</button>
              </div>
              {(form.socials || []).map((url, i) => (
                <div key={i} className="flex gap-3 mb-2">
                  <input className="flex-1 border rounded-lg p-2" placeholder="https://..." value={url} onChange={(e) => setSocial(i, e.target.value)} />
                  <button type="button" onClick={() => removeSocial(i)} className="px-3 py-2 rounded bg-red-100 text-red-700">Eliminar</button>
                </div>
              ))}
            </section>

            {/* Certificaciones */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-lg">Certificaciones (URLs)</h2>
                <button type="button" onClick={addCertification} className="px-3 py-1 text-sm rounded bg-gray-900 text-white">+ Agregar</button>
              </div>
              {(form.certifications || []).map((c, i) => (
                <div key={i} className="flex gap-3 mb-2">
                  <input className="flex-1 border rounded-lg p-2" placeholder="https://..." value={c} onChange={(e) => setCertification(i, e.target.value)} />
                  <button type="button" onClick={() => removeCertification(i)} className="px-3 py-2 rounded bg-red-100 text-red-700">Eliminar</button>
                </div>
              ))}
            </section>

            {/* Sobre mí */}
            <section>
              <h2 className="font-semibold text-lg mb-3">Más sobre mí</h2>
              <textarea className="w-full border rounded-lg p-2" rows={4} value={form.about} onChange={(e) => setField('about', e.target.value)} />
            </section>

            {/* Más fotos */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-lg">Más fotos (URLs)</h2>
                <button type="button" onClick={addPhoto} className="px-3 py-1 text-sm rounded bg-gray-900 text-white">+ Agregar</button>
              </div>
              {(form.morePhotos || []).map((p, i) => (
                <div key={i} className="flex gap-3 mb-2">
                  <input className="flex-1 border rounded-lg p-2" placeholder="https://..." value={p} onChange={(e) => setPhoto(i, e.target.value)} />
                  <button type="button" onClick={() => removePhoto(i)} className="px-3 py-2 rounded bg-red-100 text-red-700">Eliminar</button>
                </div>
              ))}
            </section>

            {/* Testimonios */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-lg">Testimonios</h2>
                <button type="button" onClick={addTestimonial} className="px-3 py-1 text-sm rounded bg-gray-900 text-white">+ Agregar</button>
              </div>
              {(form.testimonials || []).map((t, ti) => (
                <div key={ti} className="border rounded-lg p-3 mb-3">
                  <label className="block text-sm font-medium">Texto</label>
                  <textarea className="mt-1 w-full border rounded-lg p-2" rows={2} value={t.text} onChange={(e) => setTestimonialText(ti, e.target.value)} />

                  <div className="flex items-center justify-between mt-3">
                    <h4 className="font-medium">Imágenes (URLs)</h4>
                    <button type="button" onClick={() => addTestimonialImage(ti)} className="px-2 py-1 text-xs rounded bg-gray-900 text-white">+ Imagen</button>
                  </div>
                  {(t.images || []).map((img, ii) => (
                    <div key={ii} className="flex gap-3 mt-2">
                      <input className="flex-1 border rounded-lg p-2" placeholder="https://..." value={img} onChange={(e) => setTestimonialImage(ti, ii, e.target.value)} />
                      <button type="button" onClick={() => removeTestimonialImage(ti, ii)} className="px-3 py-2 rounded bg-red-100 text-red-700">Eliminar</button>
                    </div>
                  ))}

                  <div className="mt-3">
                    <button type="button" onClick={() => removeTestimonial(ti)} className="px-3 py-2 rounded bg-red-100 text-red-700">Eliminar testimonio</button>
                  </div>
                </div>
              ))}
            </section>

            {/* Submit */}
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={saving || loading}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg disabled:opacity-60"
              >
                {saving ? 'Guardando…' : (editingId ? 'Actualizar perfil' : 'Guardar en MongoDB')}
              </button>
              {result?.ok && (
                <span className="text-green-700 text-sm">Guardado ✔ ID: {result.id}</span>
              )}
              {result && !result.ok && (
                <span className="text-red-700 text-sm">{result.message}</span>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
