import { useState, useEffect } from 'react';
import datosIniciales from '../data/trazabilidad.json';

const ESTACIONES_SISTEMA = [
  'Laboratorio (Fabricación)',
  'Transporte 1 (Planta a Aduana)',
  'Aduana / Inspección MSPAS',
  'Distribuidora Autorizada',
  'Transporte 2 (Distribuidora a Droguería)',
  'Droguería Regional',
  'Transporte 3 (Droguería a Farmacia/Hospital)',
  'Farmacia / Hospital / Centro de Salud',
  'Destrucción de Lote (Retirado/Caducado)',
  'Consumidor Final (Paciente)'
];

export default function ModuloVerificacion() {
  const [productos, setProductos] = useState([]);
  const [pestana, setPestana] = useState('verificar');
  
  // Búsqueda
  const [codigo, setCodigo] = useState('GT-240926-01');
  const [productoEncontrado, setProductoEncontrado] = useState(null);

  // Formulario 1: Nuevo Lote Estricto
  const [nuevoLote, setNuevoLote] = useState({
    lote: '',
    nombreMedicamento: '',
    fabricante: '',
    registroSanitario: '',
    fechaFabricacion: '',
    fechaVencimiento: '',
    cadenaDeFrioRequerida: '2°C - 8°C',
    distribuidorAutorizado: '',
    establecimientoReceptor: ''
  });

  // Formulario 2: Nuevo Evento / Estación Estricta (Campos Obligatorios)
  const [nuevoPaso, setNuevoPaso] = useState({
    estacion: ESTACIONES_SISTEMA[1],
    lugar: '',
    despachador: '',
    tipoTransporte: '',
    placaTransporte: '',
    tiempoEstancia: '',
    temperatura: ''
  });

  // Inicializar localStorage
  useEffect(() => {
    const guardados = localStorage.getItem('trazabilidad_estricta_v2');
    if (guardados) {
      const data = JSON.parse(guardados);
      setProductos(data);
      const inicial = data.find(p => p.lote === 'GT-240926-01') || data[0];
      if (inicial) registrarEscaneo(inicial, data);
    } else {
      setProductos(datosIniciales);
      localStorage.setItem('trazabilidad_estricta_v2', JSON.stringify(datosIniciales));
      registrarEscaneo(datosIniciales[0], datosIniciales);
    }
  }, []);

  const actualizarStorage = (nuevaLista) => {
    setProductos(nuevaLista);
    localStorage.setItem('trazabilidad_estricta_v2', JSON.stringify(nuevaLista));
  };

  // Registrar e incrementar el contador de escaneos
  const registrarEscaneo = (prod, listaActual) => {
    if (!prod) {
      setProductoEncontrado(null);
      return;
    }
    const actualizado = { ...prod, vecesEscaneado: (prod.vecesEscaneado || 0) + 1 };
    const listaActualizada = (listaActual || productos).map(p => 
      p.lote === prod.lote ? actualizado : p
    );
    setProductoEncontrado(actualizado);
    actualizarStorage(listaActualizada);
  };

  const buscarProducto = (e) => {
    e.preventDefault();
    const eFind = productos.find(p => p.lote.toLowerCase() === codigo.trim().toLowerCase());
    if (eFind) {
      registrarEscaneo(eFind, productos);
    } else {
      setProductoEncontrado(null);
    }
  };

  // Crear Lote
  const handleCrearLote = (e) => {
    e.preventDefault();
    const loteCreado = {
      ...nuevoLote,
      estadoGeneral: 'En Proceso de Distribución',
      vecesEscaneado: 1,
      alertaReportada: false,
      fases: [
        {
          id: 1,
          estacion: 'Laboratorio (Fabricación)',
          lugar: nuevoLote.fabricante,
          despachador: 'Control de Calidad / Planta',
          tipoTransporte: 'N/A (Planta)',
          placaTransporte: 'N/A',
          tiempoEstancia: '24 Horas',
          temperatura: '4.0°C',
          fecha: new Date().toLocaleString(),
          completado: true
        }
      ]
    };

    const lista = [loteCreado, ...productos];
    actualizarStorage(lista);
    setCodigo(nuevoLote.lote);
    setProductoEncontrado(loteCreado);
    setPestana('verificar');
    alert(`✅ Lote ${nuevoLote.lote} iniciado con éxito en Laboratorio.`);
  };

  // Agregar Estación Estricta (Paso a Paso)
  const handleAgregarPaso = (e) => {
    e.preventDefault();
    if (!productoEncontrado) return;

    // Validación de Destrucción
    const esDestruccion = nuevoPaso.estacion.includes('Destrucción');
    const esEntregaFinal = nuevoPaso.estacion.includes('Consumidor Final');

    const nuevaFaseObj = {
      id: productoEncontrado.fases.length + 1,
      ...nuevoPaso,
      fecha: new Date().toLocaleString(),
      completado: true
    };

    let nuevoEstado = `Ubicación: ${nuevoPaso.estacion}`;
    if (esDestruccion) nuevoEstado = '⛔ LOTE DESTRUIDO / RETIRADO';
    if (esEntregaFinal) nuevoEstado = '✅ Vendido al consumidor final';

    const productoActualizado = {
      ...productoEncontrado,
      estadoGeneral: nuevoEstado,
      fases: [...productoEncontrado.fases, nuevaFaseObj]
    };

    const listaModificada = productos.map(p => 
      p.lote === productoEncontrado.lote ? productoActualizado : p
    );

    actualizarStorage(listaModificada);
    setProductoEncontrado(productoActualizado);
    
    // Reset de formulario de paso
    setNuevoPaso({
      estacion: ESTACIONES_SISTEMA[0],
      lugar: '',
      despachador: '',
      tipoTransporte: '',
      placaTransporte: '',
      tiempoEstancia: '',
      temperatura: ''
    });

    setPestana('verificar');
    alert(`📍 Nueva estación registrada correctamente para el Lote ${productoEncontrado.lote}`);
  };

  return (
    <div style={{ maxWidth: '950px', margin: '0 auto', fontFamily: 'system-ui, sans-serif', color: '#1e293b' }}>
      
      {/* Navegación de Flujo */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setPestana('verificar')}
          style={{ padding: '10px 18px', background: pestana === 'verificar' ? '#2e7d32' : '#e2e8f0', color: pestana === 'verificar' ? 'white' : '#334155', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          🔍 Verificar Producto
        </button>
        <button 
          onClick={() => setPestana('crear')}
          style={{ padding: '10px 18px', background: pestana === 'crear' ? '#1565c0' : '#e2e8f0', color: pestana === 'crear' ? 'white' : '#334155', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          🏭 Registrar Nuevo Lote (Laboratorio)
        </button>
        {productoEncontrado && (
          <button 
            onClick={() => setPestana('avance')}
            style={{ padding: '10px 18px', background: pestana === 'avance' ? '#e65100' : '#e2e8f0', color: pestana === 'avance' ? 'white' : '#334155', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            🚚 Registrar Evento / Estación Progresiva
          </button>
        )}
      </div>

      {/* VISTA 1: VERIFICAR PRODUCTO */}
      {pestana === 'verificar' && (
        <div>
          <form onSubmit={buscarProducto} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <input 
              type="text" 
              value={codigo} 
              onChange={(e) => setCodigo(e.target.value)} 
              placeholder="Ingrese Lote o Código (Ej: GT-240926-01)" 
              style={{ flex: 1, padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '15px' }}
            />
            <button type="submit" style={{ padding: '12px 24px', background: '#2e7d32', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
              Verificar
            </button>
          </form>

          {/* CASO A: PRODUCTO NO RECONOCIDO */}
          {!productoEncontrado ? (
            <div style={{ border: '2px solid #ef4444', background: '#fef2f2', padding: '24px', borderRadius: '8px', color: '#991b1b' }}>
              <h3 style={{ margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                ⚠️ Producto no reconocido
              </h3>
              <p style={{ margin: '0 0 8px 0', fontSize: '15px' }}>
                Este código no se encuentra registrado o presenta inconsistencias en la base de datos nacional del MSPAS.
              </p>
              <p style={{ margin: 0, fontWeight: 'bold' }}>
                No consuma el medicamento hasta verificar su procedencia.
              </p>
            </div>
          ) : (
            /* CASO B: PRODUCTO VÁLIDO / ENCONTRADO */
            <div>
              {/* Encabezado e Información General */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <h2 style={{ margin: '0 0 6px 0', color: '#0f172a' }}>{productoEncontrado.nombreMedicamento}</h2>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Fabricante: <strong>{productoEncontrado.fabricante}</strong></p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ 
                      background: productoEncontrado.estadoGeneral.includes('DESTRUIDO') ? '#fee2e2' : '#dcfce7', 
                      color: productoEncontrado.estadoGeneral.includes('DESTRUIDO') ? '#991b1b' : '#166534', 
                      padding: '6px 12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '13px', display: 'inline-block'
                    }}>
                      Estado: {productoEncontrado.estadoGeneral}
                    </span>
                    <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#2563eb', fontWeight: 'bold' }}>
                      📲 Veces escaneado: {productoEncontrado.vecesEscaneado} veces
                    </p>
                  </div>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '15px 0' }} />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '14px' }}>
                  <div><strong>Lote:</strong> {productoEncontrado.lote}</div>
                  <div><strong>Reg. Sanitario:</strong> {productoEncontrado.registroSanitario}</div>
                  <div><strong>Fecha Fabricación:</strong> {productoEncontrado.fechaFabricacion || 'N/A'}</div>
                  <div><strong>Fecha Vencimiento:</strong> {productoEncontrado.fechaVencimiento}</div>
                  <div><strong>Distribuidor Autorizado:</strong> {productoEncontrado.distribuidorAutorizado || 'N/A'}</div>
                  <div><strong>Establecimiento Receptor:</strong> {productoEncontrado.establecimientoReceptor || 'N/A'}</div>
                  <div style={{ color: '#0284c7', fontWeight: 'bold' }}>❄️ Cadena de Frío Exigida: {productoEncontrado.cadenaDeFrioRequerida}</div>
                </div>
              </div>

              {/* Trazabilidad por Estaciones / Cadena de Frío */}
              <h3 style={{ color: '#0f172a', marginBottom: '15px' }}>Ruta de Trazabilidad y Cadena de Custodia:</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {productoEncontrado.fases.map((f, index) => (
                  <div key={index} style={{ 
                    borderLeft: `5px solid ${f.estacion.includes('Destrucción') ? '#ef4444' : '#2563eb'}`, 
                    background: '#ffffff', 
                    border: '1px solid #e2e8f0',
                    borderLeftWidth: '5px',
                    padding: '16px', 
                    borderRadius: '6px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <h4 style={{ margin: 0, color: '#1e40af' }}>{f.estacion}</h4>
                      <small style={{ color: '#64748b' }}>📅 {f.fecha}</small>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px', fontSize: '13px', color: '#334155' }}>
                      <p style={{ margin: 0 }}><strong>Lugar / Sucursal:</strong> {f.lugar}</p>
                      <p style={{ margin: 0 }}><strong>Persona que Despacha/Recibe:</strong> {f.despachador}</p>
                      <p style={{ margin: 0 }}><strong>Tipo de Transporte:</strong> {f.tipoTransporte}</p>
                      <p style={{ margin: 0 }}><strong>Placa de Vehículo:</strong> {f.placaTransporte}</p>
                      <p style={{ margin: 0 }}><strong>Tiempo Estancia en Lugar:</strong> {f.tiempoEstancia}</p>
                      <p style={{ margin: 0, color: '#0369a1', fontWeight: 'bold' }}>🌡️ Temp Registrada: {f.temperatura}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* VISTA 2: CREAR NUEVO LOTE (OBLIGATORIO Y ESTRICTO) */}
      {pestana === 'crear' && (
        <form onSubmit={handleCrearLote} style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
          <h3 style={{ marginTop: 0, color: '#1565c0' }}>PASO 1: Creación de Lote en Laboratorio (Registro Inicial)</h3>
          <p style={{ fontSize: '13px', color: '#64748b' }}>* Todos los campos marcados son obligatorios para garantizar la trazabilidad nacional.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Número de Lote *</label>
              <input required placeholder="Ej: GT-240926-01" value={nuevoLote.lote} onChange={e => setNuevoLote({...nuevoLote, lote: e.target.value})} style={{ width: '100%', padding: '10px', marginTop: '4px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Nombre del Medicamento *</label>
              <input required placeholder="Ej: Paracetamol 500 mg" value={nuevoLote.nombreMedicamento} onChange={e => setNuevoLote({...nuevoLote, nombreMedicamento: e.target.value})} style={{ width: '100%', padding: '10px', marginTop: '4px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Laboratorio Fabricante *</label>
              <input required placeholder="Ej: Laboratorio X" value={nuevoLote.fabricante} onChange={e => setNuevoLote({...nuevoLote, fabricante: e.target.value})} style={{ width: '100%', padding: '10px', marginTop: '4px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Registro Sanitario MSPAS *</label>
              <input required placeholder="Ej: PF-45920-2026" value={nuevoLote.registroSanitario} onChange={e => setNuevoLote({...nuevoLote, registroSanitario: e.target.value})} style={{ width: '100%', padding: '10px', marginTop: '4px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Fecha de Fabricación *</label>
              <input required type="date" value={nuevoLote.fechaFabricacion} onChange={e => setNuevoLote({...nuevoLote, fechaFabricacion: e.target.value})} style={{ width: '100%', padding: '10px', marginTop: '4px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Fecha de Vencimiento *</label>
              <input required type="date" value={nuevoLote.fechaVencimiento} onChange={e => setNuevoLote({...nuevoLote, fechaVencimiento: e.target.value})} style={{ width: '100%', padding: '10px', marginTop: '4px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Distribuidor Autorizado *</label>
              <input required placeholder="Ej: Distribuidora X" value={nuevoLote.distribuidorAutorizado} onChange={e => setNuevoLote({...nuevoLote, distribuidorAutorizado: e.target.value})} style={{ width: '100%', padding: '10px', marginTop: '4px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Establecimiento Receptor Destino *</label>
              <input required placeholder="Ej: Farmacia Y / Hospital Xela" value={nuevoLote.establecimientoReceptor} onChange={e => setNuevoLote({...nuevoLote, establecimientoReceptor: e.target.value})} style={{ width: '100%', padding: '10px', marginTop: '4px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
            </div>
          </div>

          <button type="submit" style={{ marginTop: '20px', width: '100%', padding: '12px', background: '#1565c0', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>
            💾 Guardar e Iniciar Lote
          </button>
        </form>
      )}

      {/* VISTA 3: REGISTRAR ESTACIÓN / EVENTO PASO A PASO (CAMPOS OBLIGATORIOS) */}
      {pestana === 'avance' && productoEncontrado && (
        <form onSubmit={handleAgregarPaso} style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
          <h3 style={{ marginTop: 0, color: '#e65100' }}>
            PASO PROGRESIVO: Registrar Estación para Lote {productoEncontrado.lote}
          </h3>
          <p style={{ fontSize: '14px', color: '#475569' }}>
            Medicamento: <strong>{productoEncontrado.nombreMedicamento}</strong> | Puntos registrados a la fecha: {productoEncontrado.fases.length}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '15px' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Seleccionar Estación / Evento *</label>
              <select value={nuevoPaso.estacion} onChange={e => setNuevoPaso({...nuevoPaso, estacion: e.target.value})} style={{ width: '100%', padding: '10px', marginTop: '4px', border: '1px solid #cbd5e1', borderRadius: '4px' }}>
                {ESTACIONES_SISTEMA.map((est, i) => (
                  <option key={i} value={est}>{est}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Lugar / Dirección / Recinto *</label>
              <input required placeholder="Ej: Aduana Central / Bodega 3" value={nuevoPaso.lugar} onChange={e => setNuevoPaso({...nuevoPaso, lugar: e.target.value})} style={{ width: '100%', padding: '10px', marginTop: '4px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Persona que Despacha / Recibe *</label>
              <input required placeholder="Ej: Lic. Mario Paz (Regente)" value={nuevoPaso.despachador} onChange={e => setNuevoPaso({...nuevoPaso, despachador: e.target.value})} style={{ width: '100%', padding: '10px', marginTop: '4px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Tipo de Transporte *</label>
              <input required placeholder="Ej: Camión Refrigerado / Panel" value={nuevoPaso.tipoTransporte} onChange={e => setNuevoPaso({...nuevoPaso, tipoTransporte: e.target.value})} style={{ width: '100%', padding: '10px', marginTop: '4px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Placa de Vehículo *</label>
              <input required placeholder="Ej: C-123XYZ / N/A si es local" value={nuevoPaso.placaTransporte} onChange={e => setNuevoPaso({...nuevoPaso, placaTransporte: e.target.value})} style={{ width: '100%', padding: '10px', marginTop: '4px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Tiempo de Permanencia / Estancia *</label>
              <input required placeholder="Ej: 12 Horas / 45 Minutos" value={nuevoPaso.tiempoEstancia} onChange={e => setNuevoPaso({...nuevoPaso, tiempoEstancia: e.target.value})} style={{ width: '100%', padding: '10px', marginTop: '4px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Temperatura Registrada (°C) *</label>
              <input required placeholder="Ej: 4.2°C" value={nuevoPaso.temperatura} onChange={e => setNuevoPaso({...nuevoPaso, temperatura: e.target.value})} style={{ width: '100%', padding: '10px', marginTop: '4px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
            </div>
          </div>

          <button type="submit" style={{ marginTop: '20px', width: '100%', padding: '12px', background: '#e65100', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>
            📍 Registrar Estación en la Cadena de Custodia
          </button>
        </form>
      )}

    </div>
  );
}