// src/components/ModuloDenuncia.jsx
import { useState } from 'react';

export default function ModuloDenuncia() {
  const [formData, setFormData] = useState({
    tipoDenuncia: '',
    medicamento: '',
    lote: '',
    empresa: '',
    correo: '',
    descripcion: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos de la denuncia:', formData);
    alert('Denuncia registrada exitosamente');
  };

  return (
    <div>
      <h1 style={{ color: '#e65100', marginTop: 0, borderBottom: '2px solid #e65100', paddingBottom: '10px' }}>
        Módulo de Denuncias e Incidencias
      </h1>
      <p style={{ color: '#555', lineHeight: '1.5' }}>
        Utilice este formulario para reportar anomalías en la cadena de distribución, medicamentos adulterados, irregularidades en aduanas, transporte o establecimientos no autorizados.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        
        {/* Tipo de Denuncia */}
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
            Tipo de Denuncia / Entidad Afectada:
          </label>
          <select 
            name="tipoDenuncia" 
            value={formData.tipoDenuncia} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
          >
            <option value="">-- Seleccione una opción --</option>
            <option value="lote_danado">Lote dañado o en mal estado</option>
            <option value="farmacia">Farmacia / Establecimiento no autorizado</option>
            <option value="transporte">Irregularidad en Transporte / Cadena de frío</option>
            <option value="distribuidor">Distribuidor clandestino o no registrado</option>
            <option value="aduanas">Anomalías en Aduanas / Ingreso de mercancía</option>
            <option value="otro">Grupos clandestinos / Falsificación general</option>
          </select>
        </div>

        {/* Medicamento y Lote */}
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '240px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
              Nombre del Medicamento / Producto:
            </label>
            <input 
              type="text" 
              name="medicamento" 
              value={formData.medicamento} 
              onChange={handleChange} 
              placeholder="Ej. Acetaminofén 500mg" 
              required 
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} 
            />
          </div>
          <div style={{ flex: 1, minWidth: '240px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
              Número de Lote (si aplica):
            </label>
            <input 
              type="text" 
              name="lote" 
              value={formData.lote} 
              onChange={handleChange} 
              placeholder="Ej. LOT-2026-X99" 
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} 
            />
          </div>
        </div>

        {/* Empresa y Correo */}
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '240px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
              Nombre de la Empresa o Entidad Reportante:
            </label>
            <input 
              type="text" 
              name="empresa" 
              value={formData.empresa} 
              onChange={handleChange} 
              placeholder="Ej. Distribuidora Farmacéutica S.A." 
              required 
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} 
            />
          </div>
          <div style={{ flex: 1, minWidth: '240px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
              Correo Electrónico de Contacto:
            </label>
            <input 
              type="email" 
              name="correo" 
              value={formData.correo} 
              onChange={handleChange} 
              placeholder="contacto@empresa.com" 
              required 
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} 
            />
          </div>
        </div>

        {/* Descripción detallada */}
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
            Descripción detallada de la anomalía:
          </label>
          <textarea 
            name="descripcion" 
            value={formData.descripcion} 
            onChange={handleChange} 
            rows="5" 
            placeholder="Describa el estado del producto, la ubicación de la falla (ej. transporte, aduana), o cualquier otra observación relevante..." 
            required 
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontFamily: 'inherit' }}
          ></textarea>
        </div>

        {/* Botón de Enviar */}
        <button 
          type="submit" 
          style={{ background: '#e65100', color: 'white', border: 'none', padding: '12px 20px', fontWeight: 'bold', fontSize: '1rem', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}
        >
          Enviar Denuncia
        </button>

      </form>
    </div>
  );
}