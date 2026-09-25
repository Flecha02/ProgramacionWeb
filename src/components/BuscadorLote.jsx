import { useState } from 'react';

// "Base de datos" simulada en memoria
const inventarioMock = [
  {
    lote: "LOT-2026-99A",
    medicamento: "Paracetamol 500mg",
    laboratorio: "Lancasco Guatemala",
    fechaExp: "2028-05-12",
    estado: "Liberado / Seguro",
    ubicacion: "Farmacia Batres, Quetzaltenango",
    historial: [
      { fecha: "2026-08-10", evento: "Fabricación completada" },
      { fecha: "2026-08-15", evento: "Ingreso a Droguería Agefarma" },
      { fecha: "2026-08-20", evento: "Recibido en punto de venta" }
    ]
  },
  {
    lote: "LOT-2026-102B",
    medicamento: "Amoxicilina 500mg",
    laboratorio: "Patria S.A.",
    fechaExp: "2027-11-30",
    estado: "Retenido por Alerta Sanitaria",
    ubicacion: "Aduana Central / Inspección MSPAS",
    historial: [
      { fecha: "2026-09-01", evento: "Fabricación completada" },
      { fecha: "2026-09-05", evento: "Retención preventiva por muestra defectuosa" }
    ]
  }
];

export default function BuscadorLote() {
  const [busqueda, setBusqueda] = useState('');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(false);

  const manejarBusqueda = (e) => {
    e.preventDefault();
    const encontrado = inventarioMock.find(
      (item) => item.lote.toLowerCase() === busqueda.trim().toLowerCase()
    );

    if (encontrado) {
      setResultado(encontrado);
      setError(false);
    } else {
      setResultado(null);
      setError(true);
    }
  };

  return (
    <div style={{
      padding: '1.5rem',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      marginTop: '1.5rem'
    }}>
      <h3 style={{ marginTop: 0, color: '#1e293b' }}>
        🔍 Búsqueda Rápida de Trazabilidad (Isla React)
      </h3>
      
      <form onSubmit={manejarBusqueda} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input 
          type="text" 
          placeholder="Prueba con: LOT-2026-99A o LOT-2026-102B" 
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            flex: 1,
            padding: '0.5rem 1rem',
            border: '1px solid #cbd5e1',
            borderRadius: '6px'
          }}
        />
        <button 
          type="submit"
          style={{
            padding: '0.5rem 1.5rem',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Consultar Lote
        </button>
      </form>

      {error && (
        <div style={{ padding: '0.75rem', backgroundColor: '#fef2f2', color: '#991b1b', borderRadius: '6px' }}>
          ⚠️ Lote no encontrado en el Registro Sanitario. Verifica el código digitado.
        </div>
      )}

      {resultado && (
        <div style={{
          padding: '1rem',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          backgroundColor: '#f8fafc'
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a' }}>{resultado.medicamento}</h4>
          <p style={{ margin: '0.25rem 0' }}><strong>Lote:</strong> {resultado.lote}</p>
          <p style={{ margin: '0.25rem 0' }}><strong>Laboratorio:</strong> {resultado.laboratorio}</p>
          <p style={{ margin: '0.25rem 0' }}><strong>Ubicación Actual:</strong> {resultado.ubicacion}</p>
          <p style={{ margin: '0.25rem 0' }}>
            <strong>Estado: </strong> 
            <span style={{
              fontWeight: 'bold',
              color: resultado.estado.includes('Liberado') ? '#166534' : '#991b1b',
              backgroundColor: resultado.estado.includes('Liberado') ? '#dcfce7' : '#fee2e2',
              padding: '2px 8px',
              borderRadius: '4px'
            }}>
              {resultado.estado}
            </span>
          </p>

          <h5 style={{ marginBottom: '0.25rem', marginTop: '1rem' }}>Cadena de Custodia:</h5>
          <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
            {resultado.historial.map((h, i) => (
              <li key={i} style={{ fontSize: '0.9rem', color: '#475569' }}>
                <strong>{h.fecha}:</strong> {h.evento}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}