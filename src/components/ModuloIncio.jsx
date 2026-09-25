import React from 'react';

export default function ModuloInicio() {
  const alertas = [
    {
      id: 1,
      titulo: 'Alerta Sanitaria: Lote clonado de Analgésicos XYZ',
      fecha: '24 de Septiembre, 2026',
      nivel: 'Alta',
      descripcion: 'Se ha detectado la circulación de lotes falsificados que no cumplen con los registros sanitarios oficiales.'
    },
    {
      id: 2,
      titulo: 'Aviso de Retiro: Jarabe ABC',
      fecha: '18 de Septiembre, 2026',
      nivel: 'Media',
      descripcion: 'Retiro voluntario por parte del fabricante debido a inconsistencias en la etiqueta del producto.'
    }
  ];

  const guiasDiferenciacion = [
    {
      paso: '1. Empaque y Sellado',
      detalle: 'Verifica que la caja o envase no tenga sellos rotos, impresiones borrosas o faltas de ortografía en la descripción.'
    },
    {
      paso: '2. Registro Sanitario',
      detalle: 'Asegúrate de que el código de Registro Sanitario esté visible en la etiqueta o caja del medicamento.'
    },
    {
      paso: '3. Número de Lote y Fecha de Vencimiento',
      detalle: 'Compara que el número de lote y la fecha de expiración impresos en la caja coincidan exactamente con el blíster o frasco interno.'
    },
    {
      paso: '4. Código DataMatrix / QR de Trazabilidad',
      detalle: 'Usa la sección "Verificar productos" del sistema para escanear el código y validar la autenticidad en la base de datos oficial.'
    }
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      {}
      <section style={{ background: '#e3f2fd', padding: '20px', borderRadius: '8px', marginBottom: '25px', borderLeft: '6px solid #0d47a1' }}>
        <h1 style={{ color: '#0d47a1', marginTop: 0 }}>Sistema de Trazabilidad de Medicamentos</h1>
        <p style={{ color: '#333', fontSize: '1.1rem', lineHeight: '1.5' }}>
          Portal oficial para la consulta de alertas sanitarias y verificación de la autenticidad de productos farmacéuticos.
        </p>
      </section>

      {}
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#b71c1c', borderBottom: '2px solid #b71c1c', paddingBottom: '8px' }}>
          ⚠️ Alertas Sanitarias Recientes
        </h2>
        <div style={{ display: 'grid', gap: '15px' }}>
          {alertas.map((alerta) => (
            <div key={alerta.id} style={{ background: 'white', padding: '15px 20px', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, color: '#0d47a1' }}>{alerta.titulo}</h3>
                <span style={{ 
                  background: alerta.nivel === 'Alta' ? '#ffebee' : '#fff3e0', 
                  color: alerta.nivel === 'Alta' ? '#c62828' : '#e65100', 
                  padding: '4px 10px', 
                  borderRadius: '12px', 
                  fontSize: '0.85rem', 
                  fontWeight: 'bold' 
                }}>
                  Prioridad {alerta.nivel}
                </span>
              </div>
              <small style={{ color: '#666' }}>Publicado: {alerta.fecha}</small>
              <p style={{ margin: '10px 0 0 0', color: '#444' }}>{alerta.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      {}
      <section style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#2e7d32', borderBottom: '2px solid #2e7d32', paddingBottom: '8px', marginTop: 0 }}>
          🔍 ¿Cómo identificar productos falsificados o adulterados?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px', marginTop: '15px' }}>
          {guiasDiferenciacion.map((guia, idx) => (
            <div key={idx} style={{ background: '#f9f9f9', padding: '15px', borderRadius: '6px', border: '1px solid #e0e0e0' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#1b5e20' }}>{guia.paso}</h4>
              <p style={{ margin: 0, fontSize: '0.95rem', color: '#555', lineHeight: '1.4' }}>{guia.detalle}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}