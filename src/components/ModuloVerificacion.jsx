import { useState, useEffect } from 'react';
import datosBase from '../data/trazabilidad.json';

// Flujo secuencial oficial de 9 pasos estrictos
const FLUJO_ESTACIONES = [
  'Registrado en Planta (Laboratorio)',
  'Transporte Primario (Hacia Aduana/Distribuidora)',
  'Inspección Sanitaria en Aduana / MSPAS',
  'Ingreso a Centro de Distribución',
  'Transporte Secundario (Hacia Droguería/Farmacia)',
  'Recibido en Droguería / Almacén Regional',
  'En camino a Farmacia / Hospital / Centro de Salud',
  'Disponible en Farmacia / Centro de Salud',
  'Entregado al Consumidor Final (Paciente)'
];

export default function ModuloVerificacion() {
  const [db, setDb] = useState({ lotes: [], productos: [] });
  const [modoBusqueda, setModoBusqueda] = useState('producto');
  const [query, setQuery] = useState('PROD-1001');
  
  const [resultadoProducto, setResultadoProducto] = useState(null);
  const [resultadoLote, setResultadoLote] = useState(null);
  const [pestana, setPestana] = useState('verificar');

  // Formulario Avanzar Estado
  const [nuevoPaso, setNuevoPaso] = useState({
    faseIndex: 1,
    fase: FLUJO_ESTACIONES[1],
    lugar: '',
    detalle: ''
  });

  // Formulario Crear Lote
  const [nuevoLote, setNuevoLote] = useState({
    loteId: '',
    nombreMedicamento: '',
    fabricante: '',
    registroSanitario: '',
    fechaVencimiento: '',
    cadenaDeFrio: '2°C - 8°C'
  });

  // Formulario Crear Producto
  const [nuevoProducto, setNuevoProducto] = useState({
    productoId: '',
    loteIdRef: '',
    clienteDestino: ''
  });

  useEffect(() => {
    const local = localStorage.getItem('trazabilidad_temu_v5');
    if (local) {
      const parsed = JSON.parse(local);
      setDb(parsed);
      buscar(parsed, 'PROD-1001', 'producto');
    } else {
      // Normalizar datos iniciales asignando índices explícitos
      const dbNormalizada = {
        lotes: datosBase.lotes || [],
        productos: (datosBase.productos || []).map(prod => ({
          ...prod,
          pasoActualIndex: 3, // Iniciar en Centro de Distribución por defecto para pruebas
          historialSeguimiento: [
            { pasoIndex: 0, fase: FLUJO_ESTACIONES[0], lugar: 'Planta Lancasco', fecha: '2026-09-20 08:00 AM', completado: true, detalle: 'Lote registrado' },
            { pasoIndex: 1, fase: FLUJO_ESTACIONES[1], lugar: 'Camión Termoking', fecha: '2026-09-21 10:30 AM', completado: true, detalle: 'Piloto: M. Gómez' },
            { pasoIndex: 2, fase: FLUJO_ESTACIONES[2], lugar: 'Aduana Central MSPAS', fecha: '2026-09-22 02:15 PM', completado: true, detalle: 'Inspección aprobada' },
            { pasoIndex: 3, fase: FLUJO_ESTACIONES[3], lugar: 'Distribuidora Xela', fecha: '2026-09-23 09:00 AM', completado: true, detalle: 'Recepción en bodega' }
          ]
        }))
      };
      setDb(dbNormalizada);
      localStorage.setItem('trazabilidad_temu_v5', JSON.stringify(dbNormalizada));
      buscar(dbNormalizada, 'PROD-1001', 'producto');
    }
  }, []);

  const guardarStorage = (nuevaDb) => {
    setDb(nuevaDb);
    localStorage.setItem('trazabilidad_temu_v5', JSON.stringify(nuevaDb));
  };

  const buscar = (dataState, termino, tipo) => {
    const data = dataState || db;
    if (tipo === 'producto') {
      const prod = data.productos.find(p => p.productoId.toLowerCase() === termino.trim().toLowerCase());
      if (prod) {
        prod.vecesEscaneado = (prod.vecesEscaneado || 0) + 1;
        const lotePadre = data.lotes.find(l => l.loteId === prod.loteIdRef);
        setResultadoProducto({ ...prod, loteInfo: lotePadre });
        setResultadoLote(null);

        // Calcular el índice de la siguiente estación
        const ultimoIndex = prod.pasoActualIndex !== undefined ? prod.pasoActualIndex : (prod.historialSeguimiento.length - 1);
        const siguienteIdx = ultimoIndex + 1;

        if (siguienteIdx < FLUJO_ESTACIONES.length) {
          setNuevoPaso({
            faseIndex: siguienteIdx,
            fase: FLUJO_ESTACIONES[siguienteIdx],
            lugar: '',
            detalle: ''
          });
        }

        guardarStorage(data);
      } else {
        setResultadoProducto(null);
      }
    } else {
      const lote = data.lotes.find(l => l.loteId.toLowerCase() === termino.trim().toLowerCase());
      if (lote) {
        const prodsVinculados = data.productos.filter(p => p.loteIdRef === lote.loteId);
        setResultadoLote({ ...lote, productos: prodsVinculados });
        setResultadoProducto(null);
      } else {
        setResultadoLote(null);
      }
    }
  };

  const handleBuscar = (e) => {
    e.preventDefault();
    buscar(db, query, modoBusqueda);
  };

  const handleAvanzarEstado = (e) => {
    e.preventDefault();
    if (!resultadoProducto) return;

    const idxSeleccionado = Number(nuevoPaso.faseIndex);
    const nombreFase = FLUJO_ESTACIONES[idxSeleccionado];

    const nuevaEntrada = {
      pasoIndex: idxSeleccionado,
      fase: nombreFase,
      lugar: nuevoPaso.lugar,
      fecha: new Date().toLocaleString(),
      completado: true,
      detalle: nuevoPaso.detalle
    };

    const productosActualizados = db.productos.map(p => {
      if (p.productoId === resultadoProducto.productoId) {
        return {
          ...p,
          pasoActualIndex: idxSeleccionado,
          estadoActual: nombreFase,
          historialSeguimiento: [...p.historialSeguimiento, nuevaEntrada]
        };
      }
      return p;
    });

    const nuevaDb = { ...db, productos: productosActualizados };
    guardarStorage(nuevaDb);
    
    const prodActualizado = productosActualizados.find(p => p.productoId === resultadoProducto.productoId);
    const lotePadre = db.lotes.find(l => l.loteId === prodActualizado.loteIdRef);
    setResultadoProducto({ ...prodActualizado, loteInfo: lotePadre });

    const siguienteIdx = idxSeleccionado + 1;
    if (siguienteIdx < FLUJO_ESTACIONES.length) {
      setNuevoPaso({ 
        faseIndex: siguienteIdx, 
        fase: FLUJO_ESTACIONES[siguienteIdx], 
        lugar: '', 
        detalle: '' 
      });
    }

    alert(`📍 ¡Paso ${idxSeleccionado + 1}/${FLUJO_ESTACIONES.length} registrado: "${nombreFase}"!`);
  };

  const handleCrearLote = (e) => {
    e.preventDefault();
    const nuevaDb = { ...db, lotes: [...db.lotes, nuevoLote] };
    guardarStorage(nuevaDb);
    alert(`✅ Lote ${nuevoLote.loteId} creado correctamente.`);
    setNuevoLote({ loteId: '', nombreMedicamento: '', fabricante: '', registroSanitario: '', fechaVencimiento: '', cadenaDeFrio: '2°C - 8°C' });
  };

  const handleCrearProducto = (e) => {
    e.preventDefault();
    const loteExiste = db.lotes.find(l => l.loteId === nuevoProducto.loteIdRef);
    if (!loteExiste) {
      alert("❌ El ID de Lote referenciado no existe.");
      return;
    }

    const prodObj = {
      productoId: nuevoProducto.productoId,
      loteIdRef: nuevoProducto.loteIdRef,
      pasoActualIndex: 0,
      estadoActual: FLUJO_ESTACIONES[0],
      clienteDestino: nuevoProducto.clienteDestino,
      vecesEscaneado: 1,
      historialSeguimiento: [
        {
          pasoIndex: 0,
          fase: FLUJO_ESTACIONES[0],
          lugar: loteExiste.fabricante,
          fecha: new Date().toLocaleString(),
          completado: true,
          detalle: 'Unidad empaquetada y asignada con QR único.'
        }
      ]
    };

    const nuevaDb = { ...db, productos: [...db.productos, prodObj] };
    guardarStorage(nuevaDb);
    alert(`📦 Producto ${nuevoProducto.productoId} vinculado al Lote ${nuevoProducto.loteIdRef}`);
    setQuery(nuevoProducto.productoId);
    setModoBusqueda('producto');
    setPestana('verificar');
    buscar(nuevaDb, nuevoProducto.productoId, 'producto');
  };

  // Determinar el índice actual del producto cargado
  const ultimoPasoIndex = resultadoProducto 
    ? (resultadoProducto.pasoActualIndex !== undefined 
        ? resultadoProducto.pasoActualIndex 
        : resultadoProducto.historialSeguimiento.length - 1)
    : 0;

  // Filtrar estaciones estrictamente posteriores
  const opcionesRestantes = FLUJO_ESTACIONES.map((nombre, idx) => ({ index: idx, nombre }))
    .filter(item => item.index > ultimoPasoIndex);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Navegación */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button onClick={() => setPestana('verificar')} style={{ padding: '10px 16px', background: pestana === 'verificar' ? '#0f172a' : '#e2e8f0', color: pestana === 'verificar' ? 'white' : 'black', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          🔎 Rastrear (Temu Tracking)
        </button>
        <button onClick={() => setPestana('crearLote')} style={{ padding: '10px 16px', background: pestana === 'crearLote' ? '#2563eb' : '#e2e8f0', color: pestana === 'crearLote' ? 'white' : 'black', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          🏭 Crear Lote Madre
        </button>
        <button onClick={() => setPestana('crearProducto')} style={{ padding: '10px 16px', background: pestana === 'crearProducto' ? '#16a34a' : '#e2e8f0', color: pestana === 'crearProducto' ? 'white' : 'black', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          📦 Registrar Producto Individual
        </button>
      </div>

      {/* RASTREO */}
      {pestana === 'verificar' && (
        <div>
          <form onSubmit={handleBuscar} style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '10px' }}>
              <label style={{ fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>
                <input type="radio" name="tipo" checked={modoBusqueda === 'producto'} onChange={() => setModoBusqueda('producto')} />
                📦 Buscar por ID de Producto Individual
              </label>
              <label style={{ fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>
                <input type="radio" name="tipo" checked={modoBusqueda === 'lote'} onChange={() => setModoBusqueda('lote')} />
                🏭 Buscar por Número de Lote Madre
              </label>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder={modoBusqueda === 'producto' ? "Ej: PROD-1001" : "Ej: GT-240926-01"} 
                style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #94a3b8' }}
              />
              <button type="submit" style={{ padding: '10px 20px', background: '#e65100', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                Rastrear
              </button>
            </div>
          </form>

          {/* VISTA PRODUCTO INDIVIDUAL */}
          {modoBusqueda === 'producto' && resultadoProducto ? (
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #f1f5f9', paddingBottom: '12px', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h2 style={{ margin: '0 0 4px 0', color: '#1e293b' }}>Producto: {resultadoProducto.productoId}</h2>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
                    Medicamento: <strong>{resultadoProducto.loteInfo?.nombreMedicamento || 'N/A'}</strong> | Lote Padre: <strong>{resultadoProducto.loteIdRef}</strong>
                  </p>
                </div>
                <div>
                  <span style={{ background: '#ffedf7', color: '#c2185b', padding: '6px 12px', borderRadius: '20px', fontWeight: 'bold', fontSize: '13px' }}>
                    📲 Escaneado {resultadoProducto.vecesEscaneado} veces
                  </span>
                </div>
              </div>

              {/* FORMULARIO ESTRICTO POR ÍNDICE */}
              <div style={{ background: '#fff7ed', border: '1px dashed #f97316', padding: '15px', borderRadius: '8px', marginBottom: '25px' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#c2410c' }}>➕ Avanzar Siguiente Estación en la Cadena de Custodia</h4>
                
                {opcionesRestantes.length > 0 ? (
                  <form onSubmit={handleAvanzarEstado} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Siguiente Estación Permitida *</label>
                      <select 
                        value={nuevoPaso.faseIndex} 
                        onChange={e => {
                          const idx = Number(e.target.value);
                          setNuevoPaso({ ...nuevoPaso, faseIndex: idx, fase: FLUJO_ESTACIONES[idx] });
                        }} 
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', marginTop: '4px' }}
                      >
                        {opcionesRestantes.map((item) => (
                          <option key={item.index} value={item.index}>
                            Paso {item.index + 1}: {item.nombre}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Ubicación / Puesto de Control *</label>
                      <input required placeholder="Ej: Droguería San José / Unidad T-2" value={nuevoPaso.lugar} onChange={e => setNuevoPaso({...nuevoPaso, lugar: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', marginTop: '4px' }} />
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Detalles / Inspección / Temp *</label>
                      <input required placeholder="Ej: Temp 4.0°C - Placa C-123XYZ - Responsable: Licda. Sosa" value={nuevoPaso.detalle} onChange={e => setNuevoPaso({...nuevoPaso, detalle: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', marginTop: '4px' }} />
                    </div>

                    <button type="submit" style={{ gridColumn: 'span 2', padding: '10px', background: '#f97316', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '5px' }}>
                      🚀 Registrar Cambio de Estado
                    </button>
                  </form>
                ) : (
                  <p style={{ margin: 0, color: '#15803d', fontWeight: 'bold' }}>
                    ✅ Este producto ha completado la totalidad de las 9 estaciones de la cadena de suministro hasta el consumidor final.
                  </p>
                )}
              </div>

              {/* TIMELINE VISUAL ESTILO TEMU */}
              <h3 style={{ color: '#0f172a', marginBottom: '20px' }}>🚚 Historial de Tracking en Vivo:</h3>
              <div style={{ position: 'relative', paddingLeft: '20px', borderLeft: '3px solid #16a34a' }}>
                {resultadoProducto.historialSeguimiento.map((paso, idx) => (
                  <div key={idx} style={{ marginBottom: '24px', position: 'relative' }}>
                    <div style={{ 
                      position: 'absolute', 
                      left: '-28px', 
                      top: '2px', 
                      width: '14px', 
                      height: '14px', 
                      borderRadius: '50%', 
                      background: '#16a34a',
                      border: '3px solid white',
                      boxShadow: '0 0 0 2px #16a34a'
                    }} />

                    <div style={{ background: '#f0fdf4', padding: '12px 16px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong style={{ color: '#15803d', fontSize: '15px' }}>
                          ✅ Paso {paso.pasoIndex !== undefined ? paso.pasoIndex + 1 : idx + 1}: {paso.fase}
                        </strong>
                        <small style={{ color: '#94a3b8' }}>{paso.fecha}</small>
                      </div>
                      <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#334155' }}>
                        <strong>Ubicación:</strong> {paso.lugar}
                      </p>
                      <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>
                        {paso.detalle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ) : modoBusqueda === 'producto' ? (
            <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', padding: '20px', borderRadius: '8px', color: '#991b1b' }}>
              <h3>⚠️️ Producto no reconocido</h3>
              <p>El código <strong>"{query}"</strong> no existe en la base de datos oficial. No consuma este medicamento hasta verificar su origen.</p>
            </div>
          ) : null}

          {/* VISTA LOTE MADRE */}
          {modoBusqueda === 'lote' && resultadoLote && (
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
              <h2>🏭 Lote Madre: {resultadoLote.loteId}</h2>
              <p><strong>Medicamento:</strong> {resultadoLote.nombreMedicamento}</p>
              <p><strong>Fabricante:</strong> {resultadoLote.fabricante}</p>
              <p><strong>Registro Sanitario:</strong> {resultadoLote.registroSanitario}</p>
              <hr style={{ margin: '20px 0' }} />
              <h3>📦 Unidades vinculadas a este Lote ({resultadoLote.productos.length}):</h3>
              
              <div style={{ display: 'grid', gap: '10px' }}>
                {resultadoLote.productos.map((p, i) => (
                  <div key={i} style={{ padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong>ID Producto: {p.productoId}</strong>
                      <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Estado Actual: {p.estadoActual}</p>
                    </div>
                    <button 
                      onClick={() => { setModoBusqueda('producto'); setQuery(p.productoId); buscar(db, p.productoId, 'producto'); }}
                      style={{ padding: '6px 12px', background: '#0284c7', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Ver Timeline Temu
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* CREAR LOTE */}
      {pestana === 'crearLote' && (
        <form onSubmit={handleCrearLote} style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
          <h3>🏭 Registrar Nuevo Lote Madre (Agrupador)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <input required placeholder="ID Lote (Ej: GT-9900)" value={nuevoLote.loteId} onChange={e => setNuevoLote({...nuevoLote, loteId: e.target.value})} style={{ padding: '10px' }} />
            <input required placeholder="Medicamento (Ej: Ibuprofeno 400mg)" value={nuevoLote.nombreMedicamento} onChange={e => setNuevoLote({...nuevoLote, nombreMedicamento: e.target.value})} style={{ padding: '10px' }} />
            <input required placeholder="Fabricante" value={nuevoLote.fabricante} onChange={e => setNuevoLote({...nuevoLote, fabricante: e.target.value})} style={{ padding: '10px' }} />
            <input required placeholder="Registro Sanitario" value={nuevoLote.registroSanitario} onChange={e => setNuevoLote({...nuevoLote, registroSanitario: e.target.value})} style={{ padding: '10px' }} />
          </div>
          <button type="submit" style={{ marginTop: '15px', padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Guardar Lote Madre</button>
        </form>
      )}

      {/* CREAR PRODUCTO */}
      {pestana === 'crearProducto' && (
        <form onSubmit={handleCrearProducto} style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
          <h3>📦 Registrar Producto Individual (Con Código Único)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <input required placeholder="ID Producto Único (Ej: PROD-9001)" value={nuevoProducto.productoId} onChange={e => setNuevoProducto({...nuevoProducto, productoId: e.target.value})} style={{ padding: '10px' }} />
            
            <select required value={nuevoProducto.loteIdRef} onChange={e => setNuevoProducto({...nuevoProducto, loteIdRef: e.target.value})} style={{ padding: '10px' }}>
              <option value="">-- Seleccionar Lote Madre --</option>
              {db.lotes.map((l, i) => (
                <option key={i} value={l.loteId}>{l.loteId} ({l.nombreMedicamento})</option>
              ))}
            </select>

            <input required placeholder="Establecimiento / Cliente Destino" value={nuevoProducto.clienteDestino} onChange={e => setNuevoProducto({...nuevoProducto, clienteDestino: e.target.value})} style={{ padding: '10px', gridColumn: 'span 2' }} />
          </div>
          <button type="submit" style={{ marginTop: '15px', padding: '10px 20px', background: '#16a34a', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Vincular a Lote y Activar Tracking</button>
        </form>
      )}

    </div>
  );
}