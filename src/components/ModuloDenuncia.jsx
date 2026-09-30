import { useState } from 'react';

export default function ModuloDenuncia() {
  const [tipo, setTipo] = useState('');
  const [medicamento, setMedicamento] = useState('');
  const [lote, setLote] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [correo, setCorreo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [enviado, setEnviado] = useState(false);

  const opciones = [
    {
      value: 'producto',
      nombre: 'Producto posiblemente adulterado',
      destino: 'Autoridad sanitaria'
    },
    {
      value: 'codigo',
      nombre: 'Código o lote sospechoso',
      destino: 'Autoridad sanitaria'
    },
    {
      value: 'frio',
      nombre: 'Problema de cadena de frío',
      destino: 'Autoridad sanitaria'
    },
    {
      value: 'establecimiento',
      nombre: 'Establecimiento posiblemente no autorizado',
      destino: 'Autoridad sanitaria'
    },
    {
      value: 'robo',
      nombre: 'Robo o desvío de medicamentos',
      destino: 'Autoridad sanitaria y autoridad competente'
    },
    {
      value: 'transporte',
      nombre: 'Irregularidad durante transporte o distribución',
      destino: 'Autoridad sanitaria'
    },
    {
      value: 'otro',
      nombre: 'Otra irregularidad',
      destino: 'Clasificación pendiente'
    }
  ];

  const seleccion = opciones.find(opcion => opcion.value === tipo);

  const enviar = e => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <div
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '42px 24px 70px'
      }}
    >
      <section style={{ marginBottom: '28px' }}>
        <span
          style={{
            color: '#C92D52',
            fontWeight: '800',
            fontSize: '14px'
          }}
        >
          REPORTE DE IRREGULARIDADES
        </span>

        <h1
          style={{
            fontSize: '2.4rem',
            margin: '8px 0 12px',
            color: '#24313A'
          }}
        >
          Reportar una irregularidad
        </h1>

        <p
          style={{
            color: '#65737E',
            lineHeight: '1.7',
            maxWidth: '760px'
          }}
        >
          Reporta problemas relacionados con medicamentos, lotes,
          establecimientos, transporte, cadena de frío o distribución.
        </p>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 0.6fr',
          gap: '24px',
          alignItems: 'start'
        }}
      >
        <form
          onSubmit={enviar}
          style={{
            background: 'white',
            border: '1px solid #DDE7E8',
            borderRadius: '18px',
            padding: '28px'
          }}
        >
          <Campo titulo="Tipo de irregularidad">
            <select
              value={tipo}
              onChange={e => setTipo(e.target.value)}
              required
              style={inputStyle}
            >
              <option value="">Seleccione una opción</option>

              {opciones.map(opcion => (
                <option key={opcion.value} value={opcion.value}>
                  {opcion.nombre}
                </option>
              ))}
            </select>
          </Campo>

          <div style={gridStyle}>
            <Campo titulo="Medicamento o producto">
              <input
                value={medicamento}
                onChange={e => setMedicamento(e.target.value)}
                placeholder="Ej. Paracetamol 500 mg"
                style={inputStyle}
              />
            </Campo>

            <Campo titulo="Lote o identificador">
              <input
                value={lote}
                onChange={e => setLote(e.target.value)}
                placeholder="Ej. MED-GT-2026-X8A73M92L"
                style={inputStyle}
              />
            </Campo>
          </div>

          <div style={gridStyle}>
            <Campo titulo="Empresa o establecimiento relacionado">
              <input
                value={empresa}
                onChange={e => setEmpresa(e.target.value)}
                placeholder="Nombre del establecimiento"
                style={inputStyle}
              />
            </Campo>

            <Campo titulo="Correo de contacto">
              <input
                type="email"
                value={correo}
                onChange={e => setCorreo(e.target.value)}
                placeholder="correo@ejemplo.com"
                style={inputStyle}
              />
            </Campo>
          </div>

          <Campo titulo="Descripción de la irregularidad">
            <textarea
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
              placeholder="Describe qué ocurrió, dónde y cualquier detalle relevante."
              required
              rows="6"
              style={{
                ...inputStyle,
                resize: 'vertical'
              }}
            />
          </Campo>

          <button
            type="submit"
            style={{
              width: '100%',
              border: 'none',
              background: '#C92D52',
              color: 'white',
              padding: '14px',
              borderRadius: '10px',
              fontWeight: '800',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Enviar reporte
          </button>

          {enviado && (
            <div
              style={{
                marginTop: '18px',
                background: '#EAF7EF',
                border: '1px solid #BFDCC9',
                borderRadius: '12px',
                padding: '16px'
              }}
            >
              <strong style={{ color: '#1E6D3B' }}>
                Reporte registrado en la demostración
              </strong>

              <p
                style={{
                  color: '#65737E',
                  marginBottom: 0,
                  lineHeight: '1.6'
                }}
              >
                En una implementación real este reporte se enviaría al sistema
                encargado de clasificarlo y canalizarlo a la institución
                correspondiente.
              </p>
            </div>
          )}
        </form>

        <aside
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
          }}
        >
          <div
            style={{
              background: '#E8F8FA',
              borderRadius: '16px',
              padding: '22px'
            }}
          >
            <span
              style={{
                color: '#287980',
                fontWeight: '800',
                fontSize: '13px'
              }}
            >
              CANALIZACIÓN DEL REPORTE
            </span>

            <h3 style={{ margin: '8px 0 10px' }}>
              {seleccion ? seleccion.destino : 'Seleccione una categoría'}
            </h3>

            <p
              style={{
                color: '#65737E',
                lineHeight: '1.6',
                margin: 0
              }}
            >
              El sistema clasifica el caso según la naturaleza de la
              irregularidad antes de enviarlo a la autoridad competente.
            </p>
          </div>

          
        </aside>
      </section>
    </div>
  );
}

function Campo({ titulo, children }) {
  return (
    <label
      style={{
        display: 'block',
        marginBottom: '18px'
      }}
    >
      <span
        style={{
          display: 'block',
          fontWeight: '700',
          marginBottom: '7px',
          color: '#24313A'
        }}
      >
        {titulo}
      </span>

      {children}
    </label>
  );
}

const inputStyle = {
  width: '100%',
  padding: '13px 14px',
  border: '1px solid #CBD8DA',
  borderRadius: '9px',
  background: 'white',
  color: '#24313A',
  outline: 'none'
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '16px'
};