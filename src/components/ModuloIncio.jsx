import React from 'react';

export default function ModuloInicio() {
  const kpis = [
    { cifra: '10%', titulo: 'Mercado Ilícito', desc: 'De los fármacos circulantes en el país son falsos o adulterados[cite: 2].' },
    { cifra: 'Q150M', titulo: 'Pérdidas Anuales', desc: 'Pérdidas económicas generadas por el comercio ilícito en Guatemala[cite: 2].' },
    { cifra: '+280%', titulo: 'Aumento en Decomisos', desc: 'Incremento de incautaciones de mercancía falsa según la SAT[cite: 2].' },
    { cifra: '100+', titulo: 'Puntos Críticos', desc: 'Lugares identificados de distribución no autorizada[cite: 2].' }
  ];

  const modalidades = [
    { tipo: 'Sin principio activo', desc: 'Medicamento sin la sustancia farmacológica declarada[cite: 2].', riesgo: 'Tratamiento ineficaz' },
    { tipo: 'Dosis incorrecta', desc: 'Dosis reducidas o sustituidas por compuestos de menor costo[cite: 2].', riesgo: 'Resistencia / Toxicidad' },
    { tipo: 'Empaque falsificado', desc: 'Copia de logos, códigos de lote y hologramas oficiales[cite: 2].', riesgo: 'Engaño visual' },
    { tipo: 'Fármacos de alto costo', desc: 'Falsificación en medicamentos oncológicos, diabetes y vacunas[cite: 2].', riesgo: 'Riesgo vital alto' }
  ];

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '1100px', margin: '0 auto', display: 'grid', gap: '25px' }}>
      
      {/* Banner Principal */}
      <section style={{ background: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)', color: 'white', padding: '30px', borderRadius: '10px' }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>Sistema Nacional de Trazabilidad de Medicamentos</h1>
        <p style={{ margin: 0, fontSize: '1.1rem', opacity: 0.9, lineHeight: '1.5' }}>
          Garantizando la seguridad del paciente desde el laboratorio fabricante hasta la entrega final en hospitales y farmacias[cite: 2].
        </p>
        <div style={{ display: 'flex', gap: '15px', marginTop: '20px', flexWrap: 'wrap' }}>
          <a href="/verificacion" style={{ background: '#2e7d32', color: 'white', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}>
            🔍 Verificar Producto / Escanear QR
          </a>
          <a href="/denuncias" style={{ background: '#e65100', color: 'white', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}>
            🚨 Reportar Anomaly / Denuncia
          </a>
        </div>
      </section>

      {/* Tarjetas de Estadísticas (KPIs) */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
        {kpis.map((kpi, idx) => (
          <div key={idx} style={{ background: 'white', padding: '20px', borderRadius: '8px', borderLeft: '5px solid #0d47a1', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h2 style={{ margin: 0, color: '#0d47a1', fontSize: '2.2rem' }}>{kpi.cifra}</h2>
            <h4 style={{ margin: '5px 0', color: '#333' }}>{kpi.titulo}</h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>{kpi.desc}</p>
          </div>
        ))}
      </section>

      {/* Cadena de Trazabilidad explicada */}
      <section style={{ background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h2 style={{ color: '#0d47a1', marginTop: 0 }}>🔗 Ruta Completa de Trazabilidad</h2>
        <p style={{ color: '#555' }}>Así protege el sistema la cadena de suministro en Guatemala[cite: 2]:</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', marginTop: '15px' }}>
          <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '6px', textAlign: 'center' }}>
            <span style={{ fontSize: '2rem' }}>🧪</span>
            <h4 style={{ margin: '8px 0 4px 0' }}>1. Laboratorio</h4>
            <small style={{ color: '#666' }}>Asignación de Lote y QR Único[cite: 2].</small>
          </div>
          <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '6px', textAlign: 'center' }}>
            <span style={{ fontSize: '2rem' }}>🛃</span>
            <h4 style={{ margin: '8px 0 4px 0' }}>2. Aduanas</h4>
            <small style={{ color: '#666' }}>Control Sanitario e Ingreso[cite: 2].</small>
          </div>
          <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '6px', textAlign: 'center' }}>
            <span style={{ fontSize: '2rem' }}>🚛</span>
            <h4 style={{ margin: '8px 0 4px 0' }}>3. Transporte</h4>
            <small style={{ color: '#666' }}>Cadena de Frío (2°C a 8°C)[cite: 2].</small>
          </div>
          <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '6px', textAlign: 'center' }}>
            <span style={{ fontSize: '2rem' }}>🏥</span>
            <h4 style={{ margin: '8px 0 4px 0' }}>4. Farmacia / Hospital</h4>
            <small style={{ color: '#666' }}>Recepción y Validación[cite: 2].</small>
          </div>
          <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '6px', textAlign: 'center' }}>
            <span style={{ fontSize: '2rem' }}>👤</span>
            <h4 style={{ margin: '8px 0 4px 0' }}>5. Paciente</h4>
            <small style={{ color: '#666' }}>Consumo Seguro Garantizado[cite: 2].</small>
          </div>
        </div>
      </section>

      {/* Tabla de Modalidades de Falsificación */}
      <section style={{ background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h2 style={{ color: '#b71c1c', marginTop: 0 }}>⚠️ Modalidades Detectadas de Falsificación</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ background: '#ffebee', color: '#b71c1c', textAlign: 'left' }}>
              <th style={{ padding: '10px' }}>Modalidad</th>
              <th style={{ padding: '10px' }}>Descripción</th>
              <th style={{ padding: '10px' }}>Riesgo Principal</th>
            </tr>
          </thead>
          <tbody>
            {modalidades.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px', fontWeight: 'bold' }}>{item.tipo}</td>
                <td style={{ padding: '10px', color: '#555' }}>{item.desc}</td>
                <td style={{ padding: '10px', color: '#c62828', fontWeight: 'bold' }}>{item.riesgo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

    </div>
  );
}