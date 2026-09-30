import { useMemo, useState } from 'react';

const establecimientos = [
  {
    id: 1,
    nombre: 'Farmacia Central',
    tipo: 'Farmacia',
    departamento: 'Guatemala',
    municipio: 'Ciudad de Guatemala',
    direccion: 'Zona 1, Ciudad de Guatemala',
    autorizada: true,
    horario: '08:00 - 20:00',
    telefono: '2222-1001'
  },
  {
    id: 2,
    nombre: 'Farmacia Los Altos',
    tipo: 'Farmacia',
    departamento: 'Quetzaltenango',
    municipio: 'Quetzaltenango',
    direccion: 'Zona 3, Quetzaltenango',
    autorizada: true,
    horario: '07:30 - 21:00',
    telefono: '7761-2040'
  },
  {
    id: 3,
    nombre: 'Centro de Salud Demo',
    tipo: 'Centro de salud',
    departamento: 'Quetzaltenango',
    municipio: 'Salcajá',
    direccion: 'Centro de Salcajá',
    autorizada: true,
    horario: '08:00 - 16:00',
    telefono: '7768-1130'
  },
  {
    id: 4,
    nombre: 'Farmacia Occidente',
    tipo: 'Farmacia',
    departamento: 'San Marcos',
    municipio: 'San Marcos',
    direccion: 'Zona 1, San Marcos',
    autorizada: true,
    horario: '08:00 - 19:00',
    telefono: '7760-4402'
  }
];

export default function ModuloUbicaciones() {
  const [busqueda, setBusqueda] = useState('');
  const [departamento, setDepartamento] = useState('Todos');

  const departamentos = [
    'Todos',
    ...new Set(establecimientos.map(item => item.departamento))
  ];

  const resultados = useMemo(() => {
    return establecimientos.filter(item => {
      const coincideBusqueda =
        item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.municipio.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.direccion.toLowerCase().includes(busqueda.toLowerCase());

      const coincideDepartamento =
        departamento === 'Todos' ||
        item.departamento === departamento;

      return coincideBusqueda && coincideDepartamento;
    });
  }, [busqueda, departamento]);

  return (
    <div
      style={{
        maxWidth: '1180px',
        margin: '0 auto',
        padding: '42px 24px 70px'
      }}
    >
      <section style={{ marginBottom: '30px' }}>
        <span
          style={{
            color: '#C92D52',
            fontWeight: '800',
            fontSize: '14px'
          }}
        >
          PUNTOS DE VENTA AUTORIZADOS
        </span>

        <h1
          style={{
            fontSize: '2.5rem',
            margin: '8px 0 12px',
            color: '#24313A'
          }}
        >
          Encuentra dónde comprar de forma segura
        </h1>

        <p
          style={{
            color: '#65737E',
            maxWidth: '760px',
            lineHeight: '1.7',
            fontSize: '1.05rem'
          }}
        >
          Consulta establecimientos que representan
          puntos de venta o atención autorizados.
        </p>
      </section>

     <section
  style={{
    background: 'linear-gradient(135deg, #64D5DE 0%, #8EDFE5 100%)',
    border: '1px solid rgba(255,255,255,0.30)',
    borderRadius: '22px',
    padding: '28px',
    marginBottom: '24px',
    boxShadow: '0 22px 42px rgba(44, 139, 150, 0.16)'
  }}
>
  <div style={{ marginBottom: '12px' }}>
    <span
      style={{
        display: 'inline-block',
        background: 'rgba(255,255,255,0.20)',
        color: '#16344D',
        padding: '7px 12px',
        borderRadius: '999px',
        fontSize: '12px',
        fontWeight: '800'
      }}
    >
      BÚSQUEDA DE ESTABLECIMIENTOS
    </span>
  </div>

  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 260px',
      gap: '14px'
    }}
  >
    <input
      type="text"
      value={busqueda}
      onChange={e => setBusqueda(e.target.value)}
      placeholder="Buscar por nombre, municipio o dirección"
      style={{
        ...inputStyle,
        background: 'rgba(255,255,255,0.95)',
        border: '1px solid rgba(255,255,255,0.45)'
      }}
    />

    <select
      value={departamento}
      onChange={e => setDepartamento(e.target.value)}
      style={{
        ...inputStyle,
        background: 'rgba(255,255,255,0.95)',
        border: '1px solid rgba(255,255,255,0.45)'
      }}
    >
      {departamentos.map(item => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  </div>
</section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: '24px',
          alignItems: 'start'
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}
          >
            <h2
              style={{
                margin: 0,
                color: '#24313A'
              }}
            >
              Establecimientos
            </h2>

            <span
              style={{
                color: '#65737E',
                fontSize: '14px'
              }}
            >
              {resultados.length} resultados
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}
          >
            {resultados.map(item => (
              <article
                key={item.id}
                style={{
                  background: 'white',
                  border: '1px solid #DDE7E8',
                  borderRadius: '16px',
                  padding: '22px'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '16px',
                    flexWrap: 'wrap'
                  }}
                >
                  <div>
                    <span
                      style={{
                        color: '#C92D52',
                        fontSize: '12px',
                        fontWeight: '800'
                      }}
                    >
                      {item.tipo.toUpperCase()}
                    </span>

                    <h3
                      style={{
                        margin: '6px 0 6px',
                        fontSize: '1.25rem'
                      }}
                    >
                      {item.nombre}
                    </h3>

                    <p
                      style={{
                        margin: 0,
                        color: '#65737E'
                      }}
                    >
                      {item.direccion}
                    </p>
                  </div>

                  <div
                    style={{
                      background: '#EAF7EF',
                      color: '#1E6D3B',
                      borderRadius: '20px',
                      padding: '7px 11px',
                      fontSize: '12px',
                      fontWeight: '800',
                      height: 'fit-content'
                    }}
                  >
                    ✓ Autorizado
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns:
                      'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '14px',
                    borderTop: '1px solid #E7EEEE',
                    marginTop: '18px',
                    paddingTop: '18px'
                  }}
                >
                  <Dato
                    titulo="Departamento"
                    valor={item.departamento}
                  />

                  <Dato
                    titulo="Municipio"
                    valor={item.municipio}
                  />

                  <Dato
                    titulo="Horario"
                    valor={item.horario}
                  />

                  <Dato
                    titulo="Teléfono"
                    valor={item.telefono}
                  />
                </div>
              </article>
            ))}

            {resultados.length === 0 && (
              <div
                style={{
                  background: '#FFF1F4',
                  border: '1px solid #F5CED8',
                  borderRadius: '16px',
                  padding: '24px'
                }}
              >
                <strong style={{ color: '#C92D52' }}>
                  No encontramos establecimientos
                </strong>

                <p
                  style={{
                    color: '#65737E',
                    marginBottom: 0
                  }}
                >
                  Intenta con otro nombre, municipio o departamento.
                </p>
              </div>
            )}
          </div>
        </div>

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
              ORIGEN DE LOS DATOS
            </span>

            <h3 style={{ margin: '8px 0 10px' }}>
              Integración con registros oficiales
            </h3>

            <p
              style={{
                color: '#65737E',
                lineHeight: '1.6',
                margin: 0
              }}
            >
              En una implementación real, los establecimientos se consultarían
              mediante registros oficiales o mecanismos de interoperabilidad
              con las instituciones responsables.
            </p>
          </div>

          <div
            style={{
              background: '#FFF1F4',
              border: '1px solid #F5CED8',
              borderRadius: '16px',
              padding: '22px'
            }}
          >
            <strong style={{ color: '#C92D52' }}>
              ¿El lugar no aparece?
            </strong>

            <p
              style={{
                color: '#65737E',
                lineHeight: '1.6'
              }}
            >
              Si encontraste un establecimiento que genera dudas, puedes
              reportarlo para revisión.
            </p>

            <a
              href="/denuncias"
              style={{
                color: '#C92D52',
                fontWeight: '800',
                textDecoration: 'none'
              }}
            >
              Reportar establecimiento →
            </a>
          </div>

         
        </aside>
      </section>
    </div>
  );
}

function Dato({ titulo, valor }) {
  return (
    <div>
      <span
        style={{
          display: 'block',
          color: '#7A878F',
          fontSize: '11px',
          marginBottom: '4px'
        }}
      >
        {titulo}
      </span>

      <strong
        style={{
          color: '#34424A',
          fontSize: '14px'
        }}
      >
        {valor}
      </strong>
    </div>
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