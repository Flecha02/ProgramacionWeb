import { useState } from 'react';

export default function ModuloInstitucional() {
  const [autenticado, setAutenticado] = useState(false);
  const [rol, setRol] = useState('Laboratorio');
  const [vista, setVista] = useState('inicio');
  const [mensaje, setMensaje] = useState('');

  const iniciarSesion = e => {
    e.preventDefault();
    setAutenticado(true);
  };

  const guardarLote = e => {
    e.preventDefault();
    setMensaje('Lote registrado correctamente en la demostración.');
  };

  const guardarEvento = e => {
    e.preventDefault();
    setMensaje('Evento de trazabilidad registrado correctamente.');
  };

  if (!autenticado) {
  return (
    <div style={contenedor}>
      <section
        style={{
          maxWidth: '1120px',
          margin: '24px auto 0',
          background: 'linear-gradient(135deg, #16344D 0%, #24506E 100%)',
          borderRadius: '30px',
          padding: '54px',
          boxShadow: '0 24px 60px rgba(16, 40, 60, 0.18)'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 460px',
            gap: '38px',
            alignItems: 'start'
          }}
        >
          <div>
            <span style={{ ...etiqueta, color: '#EF8D9E' }}>
              ACCESO RESTRINGIDO
            </span>

            <h1 style={{ ...titulo, color: 'white' }}>
              Acceso institucional
            </h1>

            <p style={{ ...texto, color: 'rgba(255,255,255,0.78)', maxWidth: '560px' }}>
              Este espacio está destinado a actores autorizados que participan
              en la cadena de suministro de medicamentos.
            </p>

            <div
              style={{
                marginTop: '28px',
                display: 'grid',
                gap: '14px'
              }}
            >
              <div style={bloqueOscuro}>
                Laboratorios, distribuidores, transportistas, farmacias y autoridades registran eventos de trazabilidad.
              </div>

              <div style={bloqueOscuro}>
                El ciudadano solo consulta y verifica. La escritura de datos está restringida.
              </div>
            </div>
          </div>

          <form
            onSubmit={iniciarSesion}
            style={{
              ...tarjeta,
              background: 'rgba(255,255,255,0.96)',
              border: '1px solid rgba(255,255,255,0.65)',
              boxShadow: '0 18px 40px rgba(10, 20, 30, 0.15)'
            }}
          >
            <label style={label}>
              Rol de demostración
            </label>

            <select
              value={rol}
              onChange={e => setRol(e.target.value)}
              style={input}
            >
              <option>Laboratorio</option>
              <option>Distribuidor</option>
              <option>Transportista</option>
              <option>Farmacia</option>
              <option>Hospital o centro de salud</option>
              <option>Autoridad sanitaria</option>
            </select>

            <label style={label}>
              Usuario
            </label>

            <input
              defaultValue="demo"
              style={input}
            />

            <label style={label}>
              Contraseña
            </label>

            <input
              type="password"
              defaultValue="demo"
              style={input}
            />

            <button type="submit" style={botonPrincipal}>
              Ingresar al modo demostración
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

  return (
    <div style={contenedor}>
      <section style={{ marginBottom: '28px' }}>
        <span style={etiqueta}>
          PANEL INSTITUCIONAL
        </span>

        <h1 style={titulo}>
          Gestión de trazabilidad
        </h1>

        <p style={texto}>
          Sesión de demostración como <strong>{rol}</strong>.
        </p>
      </section>

      <section style={panel}>
        <aside style={menu}>
          <button
            onClick={() => {
              setVista('inicio');
              setMensaje('');
            }}
            style={botonMenu(vista === 'inicio')}
          >
            Resumen
          </button>

          <button
            onClick={() => {
              setVista('lote');
              setMensaje('');
            }}
            style={botonMenu(vista === 'lote')}
          >
            Registrar lote
          </button>

          <button
            onClick={() => {
              setVista('evento');
              setMensaje('');
            }}
            style={botonMenu(vista === 'evento')}
          >
            Registrar evento
          </button>

          <button
            onClick={() => setAutenticado(false)}
            style={botonSalir}
          >
            Cerrar sesión
          </button>
        </aside>

        <main>
          {vista === 'inicio' && (
            <section style={tarjeta}>
              <h2 style={{ marginTop: 0 }}>
                Funciones disponibles
              </h2>

              <p style={texto}>
                Los actores autorizados pueden registrar información que
                construye la cadena de custodia del medicamento.
              </p>

              <div style={grid}>
                <Bloque
                  numero="01"
                  titulo="Registrar lote"
                  texto="Crea la identidad inicial de un medicamento y relaciona fabricante, lote y registro sanitario."
                />

                <Bloque
                  numero="02"
                  titulo="Registrar evento"
                  texto="Agrega movimientos de recepción, transporte, almacenamiento o dispensación."
                />

                <Bloque
                  numero="03"
                  titulo="Mantener trazabilidad"
                  texto="Cada evento amplía el historial que posteriormente consulta el consumidor."
                />
              </div>
            </section>
          )}

          {vista === 'lote' && (
            <form onSubmit={guardarLote} style={tarjeta}>
              <span style={etiqueta}>
                NUEVO REGISTRO
              </span>

              <h2>
                Registrar lote
              </h2>

              <div style={gridDos}>
                <Campo titulo="Identificador único">
                  <input
                    required
                    placeholder="MED-GT-2026-X8A73M92L"
                    style={input}
                  />
                </Campo>

                <Campo titulo="Lote">
                  <input
                    required
                    placeholder="GT-240926-01"
                    style={input}
                  />
                </Campo>

                <Campo titulo="Medicamento">
                  <input
                    required
                    placeholder="Paracetamol 500 mg"
                    style={input}
                  />
                </Campo>

                <Campo titulo="Fabricante">
                  <input
                    required
                    placeholder="Laboratorio autorizado"
                    style={input}
                  />
                </Campo>

                <Campo titulo="Registro sanitario">
                  <input
                    required
                    placeholder="Registro sanitario"
                    style={input}
                  />
                </Campo>

                <Campo titulo="Fecha de vencimiento">
                  <input
                    type="date"
                    required
                    style={input}
                  />
                </Campo>
              </div>

              <button type="submit" style={botonPrincipal}>
                Registrar lote
              </button>
            </form>
          )}

          {vista === 'evento' && (
            <form onSubmit={guardarEvento} style={tarjeta}>
              <span style={etiqueta}>
                CADENA DE CUSTODIA
              </span>

              <h2>
                Registrar evento
              </h2>

              <div style={gridDos}>
                <Campo titulo="Identificador">
                  <input
                    required
                    placeholder="MED-GT-2026-X8A73M92L"
                    style={input}
                  />
                </Campo>

                <Campo titulo="Tipo de evento">
                  <select style={input}>
                    <option>Fabricación</option>
                    <option>Recepción</option>
                    <option>Despacho</option>
                    <option>Transporte</option>
                    <option>Almacenamiento</option>
                    <option>Dispensación</option>
                  </select>
                </Campo>

                <Campo titulo="Ubicación">
                  <input
                    required
                    placeholder="Quetzaltenango, Guatemala"
                    style={input}
                  />
                </Campo>

                <Campo titulo="Responsable">
                  <input
                    required
                    placeholder="Actor autorizado"
                    style={input}
                  />
                </Campo>

                <Campo titulo="Temperatura">
                  <input
                    placeholder="Ej. 4.8 °C"
                    style={input}
                  />
                </Campo>

                <Campo titulo="Fecha y hora">
                  <input
                    type="datetime-local"
                    required
                    style={input}
                  />
                </Campo>
              </div>

              <Campo titulo="Observaciones">
                <textarea
                  rows="4"
                  style={{
                    ...input,
                    resize: 'vertical'
                  }}
                  placeholder="Información adicional del evento"
                />
              </Campo>

              <button type="submit" style={botonPrincipal}>
                Registrar evento
              </button>
            </form>
          )}

          {mensaje && (
            <div style={exito}>
              <strong>{mensaje}</strong>

              <p style={{ marginBottom: 0 }}>
                En una implementación real esta información sería enviada al
                backend y asociada al historial del producto.
              </p>
            </div>
          )}
        </main>
      </section>
    </div>
  );
}

function Bloque({ numero, titulo, texto }) {
  return (
    <div style={bloque}>
      <span style={etiqueta}>
        {numero}
      </span>

      <h3>{titulo}</h3>

      <p style={{ ...textoStyle, marginBottom: 0 }}>
        {texto}
      </p>
    </div>
  );
}

function Campo({ titulo, children }) {
  return (
    <label style={{ display: 'block', marginBottom: '17px' }}>
      <span style={label}>
        {titulo}
      </span>

      {children}
    </label>
  );
}

const contenedor = {
  maxWidth: '1180px',
  margin: '0 auto',
  padding: '42px 24px 70px'
};

const titulo = {
  fontSize: '2.5rem',
  margin: '8px 0 12px',
  color: '#24313A'
};

const texto = {
  color: '#65737E',
  lineHeight: '1.7'
};

const textoStyle = {
  color: '#65737E',
  lineHeight: '1.6'
};

const etiqueta = {
  color: '#C92D52',
  fontWeight: '800',
  fontSize: '13px'
};

const tarjeta = {
  background: 'white',
  border: '1px solid #DDE7E8',
  borderRadius: '18px',
  padding: '26px'
};

const aviso = {
  background: '#FFF1F4',
  border: '1px solid #F5CED8',
  borderRadius: '14px',
  padding: '18px',
  color: '#65737E',
  lineHeight: '1.6',
  marginTop: '18px'
};

const input = {
  width: '100%',
  padding: '13px 14px',
  border: '1px solid #CBD8DA',
  borderRadius: '9px',
  background: 'white',
  color: '#24313A',
  outline: 'none',
  marginBottom: '14px'
};

const label = {
  display: 'block',
  fontWeight: '700',
  marginBottom: '7px',
  color: '#24313A'
};

const botonPrincipal = {
  border: 'none',
  background: '#C92D52',
  color: 'white',
  padding: '13px 20px',
  borderRadius: '9px',
  fontWeight: '800',
  cursor: 'pointer'
};

const panel = {
  display: 'grid',
  gridTemplateColumns: '230px 1fr',
  gap: '22px',
  alignItems: 'start'
};

const menu = {
  background: 'white',
  border: '1px solid #DDE7E8',
  borderRadius: '16px',
  padding: '14px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
};

const botonMenu = activo => ({
  border: 'none',
  background: activo ? '#FFF1F4' : 'white',
  color: activo ? '#C92D52' : '#536169',
  padding: '12px',
  borderRadius: '9px',
  textAlign: 'left',
  fontWeight: '700',
  cursor: 'pointer'
});

const botonSalir = {
  border: 'none',
  background: '#F5F7F7',
  color: '#65737E',
  padding: '12px',
  borderRadius: '9px',
  textAlign: 'left',
  fontWeight: '700',
  cursor: 'pointer',
  marginTop: '10px'
};

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
  gap: '15px',
  marginTop: '22px'
};

const gridDos = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '0 18px'
};

const bloque = {
  background: '#F8FBFB',
  border: '1px solid #E3EBEC',
  borderRadius: '14px',
  padding: '20px'
};

const exito = {
  background: '#EAF7EF',
  border: '1px solid #BFDCC9',
  borderRadius: '14px',
  padding: '18px',
  color: '#1E6D3B',
  marginTop: '18px'
};

const bloqueOscuro = {
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '16px',
  padding: '18px',
  color: 'rgba(255,255,255,0.84)',
  lineHeight: '1.6'
};