import { useState, useEffect } from 'react';
import datosIniciales from '../data/trazabilidad.json';

export default function ModuloVerificacion() {
  const [productos, setProductos] = useState([]);
  const [pestana, setPestana] = useState('verificar'); // 'verificar', 'crear', 'avance'
  
  // Búsqueda
  const [codigo, setCodigo] = useState('GT-240926-01');
  const [productoEncontrado, setProductoEncontrado] = useState(null);

  // Formulario 1: Crear Producto / Lote Inicial
  const [nuevoLote, setNuevoLote] = useState({
    lote: '',
    nombreMedicamento: '',
    fabricante: '',
    registroSanitario: '',
    fechaVencimiento: '',
    cadenaDeFrioRequerida: '2°C - 8°C'
  });

  // Formulario 2: Agregar Evento / Paso a la Cadena
  const [nuevoPaso, setNuevoPaso] = useState({
    fase: '3. Distribuidora / Droguería',
    entidad: '',
    despachador: '',
    temperatura: '4°C'
  });

  // Carga inicial usando localStorage
  useEffect(() => {
    const guardados = localStorage.getItem('trazabilidad_paso_a_paso');
    if (guardados) {
      const data = JSON.parse(guardados);
      setProductos(data);
      setProductoEncontrado(data[0] || null);
    } else {
      setProductos(datosIniciales);
      localStorage.setItem('trazabilidad_paso_a_paso', JSON.stringify(datosIniciales));
      setProductoEncontrado(datosIniciales[0]);
    }
  }, []);

  // Guardar en LocalStorage helper
  const actualizarStorage = (nuevaLista) => {
    setProductos(nuevaLista);
    localStorage.setItem('trazabilidad_paso_a_paso', JSON.stringify(nuevaLista));
  };

  // Buscar Producto
  const buscarProducto = (e) => {
    e.preventDefault();
    const eFind = productos.find(p => p.lote.toLowerCase() === codigo.trim().toLowerCase());
    setProductoEncontrado(eFind || null);
  };

  // 1. PASO INICIAL: Registrar solo la creación del Lote en Laboratorio
  const handleCrearLote = (e) => {
    e.preventDefault();
    const loteCreado = {
      ...nuevoLote,
      estadoActual: 'Registrado en Laboratorio',
      fases: [
        {
          id: 1,
          fase: '1. Laboratorio / Fabricación',
          entidad: nuevoLote.fabricante,
          despachador: 'Control de Calidad / Producción',
          temperatura: '4°C',
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
    alert(`✅ Lote ${nuevoLote.lote} iniciado con Fase 1 (Laboratorio)`);
  };

  // 2. PASO PROGRESIVO: Agregar un nuevo evento a la ruta existente
  const handleAgregarPaso = (e) => {
    e.preventDefault();
    if (!productoEncontrado) return;

    const nuevaFaseObj = {
      id: productoEncontrado.fases.length + 1,
      fase: nuevoPaso.fase,
      entidad: nuevoPaso.entidad,
      despachador: nuevoPaso.despachador,
      temperatura: nuevoPaso.temperatura,
      fecha: new Date().toLocaleString(),
      completado: true
    };

    const productoActualizado = {
      ...productoEncontrado,
      estadoActual: `Actualizado: ${nuevoPaso.fase}`,
      fases: [...productoEncontrado.fases, nuevaFaseObj]
    };

    const listaModificada = productos.map(p => 
      p.lote === productoEncontrado.lote ? productoActualizado : p
    );

    actualizarStorage(listaModificada);
    setProductoEncontrado(productoActualizado);
    setPestana('verificar');
    alert(`📍 Nueva fase agregada a la línea de tiempo del Lote ${productoEncontrado.lote}`);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      
      {/* Botones de Navegación de Flujo */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <button 
          onClick={() => setPestana('verificar')}
          style={{ padding: '10px 15px', background: pestana === 'verificar' ? '#2e7d32' : '#e0e0e0', color: pestana === 'verificar' ? 'white' : '#333', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          🔍 Ver Trazabilidad
        </button>
        <button 
          onClick={() => setPestana('crear')}
          style={{ padding: '10px 15px', background: pestana === 'crear' ? '#1565c0' : '#e0e0e0', color: pestana === 'crear' ? 'white' : '#333', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          🏭 Paso 1: Crear Lote (Laboratorio)
        </button>
        {productoEncontrado && (
          <button 
            onClick={() => setPestana('avance')}
            style={{ padding: '10px 15px', background: pestana === 'avance' ? '#e65100' : '#e0e0e0', color: pestana === 'avance' ? 'white' : '#333', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            🚚 Paso N: Registrar Nuevo Evento de Cadena
          </button>
        )}
      </div>

      {/* VISTA 1: CONSULTAR RUTA EN VIVO */}
      {pestana === 'verificar' && (
        <div>
          <form onSubmit={buscarProducto} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <input 
              type="text" 
              value={codigo} 
              onChange={(e) => setCodigo(e.target.value)} 
              placeholder="Ingrese Lote (Ej: GT-240926-01)" 
              style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
            />
            <button type="submit" style={{ padding: '10px 20px', background: '#2e7d32', color: 'white', border: 'none', borderRadius: '5px' }}>Buscar</button>
          </form>

          {productoEncontrado && (
            <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, color: '#1b5e20' }}>{productoEncontrado.nombreMedicamento}</h3>
                <span style={{ background: '#e8f5e9', color: '#2e7d32', padding: '4px 10px', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px' }}>
                  {productoEncontrado.estadoActual}
                </span>
              </div>
              <p style={{ fontSize: '14px', color: '#666' }}>Lote: <strong>{productoEncontrado.lote}</strong> | Vence: {productoEncontrado.fechaVencimiento} | Temp Requerida: ❄️ {productoEncontrado.cadenaDeFrioRequerida}</p>

              <h4 style={{ marginTop: '20px', color: '#333' }}>Historial y Cadena de Custodia Registrada:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {productoEncontrado.fases.map((f, i) => (
                  <div key={i} style={{ borderLeft: '4px solid #1565c0', background: '#f8fafc', padding: '12px', borderRadius: '0 6px 6px 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <strong style={{ color: '#0d47a1' }}>{f.fase}</strong>
                      <small style={{ color: '#888' }}>{f.fecha}</small>
                    </div>
                    <p style={{ margin: '4px 0', fontSize: '13px' }}><strong>Establecimiento/Lugar:</strong> {f.entidad}</p>
                    <p style={{ margin: '4px 0', fontSize: '13px', color: '#555' }}>
                      Despachó/Responsable: {f.despachador} | Temp registrada: 🌡️ <strong>{f.temperatura}</strong>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* VISTA 2: CREAR LOTE INICIAL (PASO 1) */}
      {pestana === 'crear' && (
        <form onSubmit={handleCrearLote} style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ccc' }}>
          <h3 style={{ marginTop: 0, color: '#1565c0' }}>PASO 1: Registro Inicial de Fabricación (Laboratorio)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <input required placeholder="Número de Lote (Ej: LOT-XELA-001)" value={nuevoLote.lote} onChange={e => setNuevoLote({...nuevoLote, lote: e.target.value})} style={{ padding: '8px' }} />
            <input required placeholder="Nombre del Medicamento" value={nuevoLote.nombreMedicamento} onChange={e => setNuevoLote({...nuevoLote, nombreMedicamento: e.target.value})} style={{ padding: '8px' }} />
            <input required placeholder="Laboratorio Fabricante" value={nuevoLote.fabricante} onChange={e => setNuevoLote({...nuevoLote, fabricante: e.target.value})} style={{ padding: '8px' }} />
            <input required placeholder="Registro Sanitario (MSPAS)" value={nuevoLote.registroSanitario} onChange={e => setNuevoLote({...nuevoLote, registroSanitario: e.target.value})} style={{ padding: '8px' }} />
            <input required type="date" value={nuevoLote.fechaVencimiento} onChange={e => setNuevoLote({...nuevoLote, fechaVencimiento: e.target.value})} style={{ padding: '8px' }} />
            <input placeholder="Cadena de Frío (Ej: 2°C - 8°C)" value={nuevoLote.cadenaDeFrioRequerida} onChange={e => setNuevoLote({...nuevoLote, cadenaDeFrioRequerida: e.target.value})} style={{ padding: '8px' }} />
          </div>
          <button type="submit" style={{ marginTop: '15px', width: '100%', padding: '10px', background: '#1565c0', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
            Iniciar Lote en Laboratorio
          </button>
        </form>
      )}

      {/* VISTA 3: REGISTRAR SIGUIENTE EVENTO / FASE */}
      {pestana === 'avance' && productoEncontrado && (
        <form onSubmit={handleAgregarPaso} style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ccc' }}>
          <h3 style={{ marginTop: 0, color: '#e65100' }}>
            PASO PROGRESIVO: Registrar Evento para Lote: {productoEncontrado.lote}
          </h3>
          <p style={{ fontSize: '13px', color: '#666' }}>Medicamento: {productoEncontrado.nombreMedicamento}</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px', marginTop: '10px' }}>
            <label><strong>Seleccione la Fase a Actualizar:</strong></label>
            <select value={nuevoPaso.fase} onChange={e => setNuevoPaso({...nuevoPaso, fase: e.target.value})} style={{ padding: '8px' }}>
              <option value="2. Transporte a Distribuidora">2. Transporte a Distribuidora / Aduana</option>
              <option value="3. Recepción en Distribuidora/Droguería">3. Recepción en Distribuidora / Droguería</option>
              <option value="4. Transporte a Farmacia/Hospital">4. Transporte a Farmacia / Hospital</option>
              <option value="5. Recepción y Venta en Farmacia">5. Recepción y Venta en Farmacia</option>
            </select>

            <input required placeholder="Nombre de la Entidad / Vehículo / Sucursal" value={nuevoPaso.entidad} onChange={e => setNuevoPaso({...nuevoPaso, entidad: e.target.value})} style={{ padding: '8px' }} />
            <input required placeholder="Responsable que recibe o despacha / Piloto" value={nuevoPaso.despachador} onChange={e => setNuevoPaso({...nuevoPaso, despachador: e.target.value})} style={{ padding: '8px' }} />
            <input placeholder="Temperatura Registrada durante la Recepción" value={nuevoPaso.temperatura} onChange={e => setNuevoPaso({...nuevoPaso, temperatura: e.target.value})} style={{ padding: '8px' }} />
          </div>

          <button type="submit" style={{ marginTop: '15px', width: '100%', padding: '10px', background: '#e65100', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
            Guardar Evento en la Línea de Tiempo
          </button>
        </form>
      )}

    </div>
  );
}