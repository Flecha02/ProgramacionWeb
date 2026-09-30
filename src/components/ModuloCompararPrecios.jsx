import { useMemo, useState } from 'react';

const medicamentos = [
  {
    id: 1,
    nombre: 'Paracetamol',
    principioActivo: 'Paracetamol',
    concentracion: '500 mg',
    presentacion: '20 tabletas',
    forma: 'Tabletas',
    opciones: [
      {
        establecimiento: 'Farmacia Central',
        pais: 'Guatemala',
        precio: 32.5,
        moneda: 'GTQ',
        autorizada: true,
        actualizado: '29/09/2026'
      },
      {
        establecimiento: 'Farmacia Los Altos',
        pais: 'Guatemala',
        precio: 29.75,
        moneda: 'GTQ',
        autorizada: true,
        actualizado: '29/09/2026'
      },
      {
        establecimiento: 'Farmacia Regional',
        pais: 'El Salvador',
        precio: 24.9,
        moneda: 'GTQ',
        autorizada: true,
        actualizado: '28/09/2026'
      }
    ]
  },
  {
    id: 2,
    nombre: 'Ibuprofeno',
    principioActivo: 'Ibuprofeno',
    concentracion: '400 mg',
    presentacion: '20 tabletas',
    forma: 'Tabletas',
    opciones: [
      {
        establecimiento: 'Farmacia Central',
        pais: 'Guatemala',
        precio: 44.5,
        moneda: 'GTQ',
        autorizada: true,
        actualizado: '29/09/2026'
      },
      {
        establecimiento: 'Farmacia Los Altos',
        pais: 'Guatemala',
        precio: 40.25,
        moneda: 'GTQ',
        autorizada: true,
        actualizado: '29/09/2026'
      },
      {
        establecimiento: 'Farmacia Regional',
        pais: 'El Salvador',
        precio: 35.8,
        moneda: 'GTQ',
        autorizada: true,
        actualizado: '28/09/2026'
      }
    ]
  },
  {
    id: 3,
    nombre: 'Amoxicilina',
    principioActivo: 'Amoxicilina',
    concentracion: '500 mg',
    presentacion: '21 cápsulas',
    forma: 'Cápsulas',
    opciones: [
      {
        establecimiento: 'Farmacia Central',
        pais: 'Guatemala',
        precio: 82,
        moneda: 'GTQ',
        autorizada: true,
        actualizado: '29/09/2026'
      },
      {
        establecimiento: 'Farmacia Los Altos',
        pais: 'Guatemala',
        precio: 77.5,
        moneda: 'GTQ',
        autorizada: true,
        actualizado: '29/09/2026'
      },
      {
        establecimiento: 'Farmacia Regional',
        pais: 'El Salvador',
        precio: 65.4,
        moneda: 'GTQ',
        autorizada: true,
        actualizado: '28/09/2026'
      }
    ]
  }
];

export default function ModuloCompararPrecios() {
  const [busqueda, setBusqueda] = useState('');
  const [pais, setPais] = useState('Todos');
  const [seleccionado, setSeleccionado] = useState(medicamentos[0]);

  const resultados = useMemo(() => {
    const texto = busqueda.toLowerCase();

    return medicamentos.filter(medicamento => {
      return (
        medicamento.nombre.toLowerCase().includes(texto) ||
        medicamento.principioActivo.toLowerCase().includes(texto) ||
        medicamento.concentracion.toLowerCase().includes(texto)
      );
    });
  }, [busqueda]);

  const opcionesFiltradas = useMemo(() => {
    if (!seleccionado) return [];

    return seleccionado.opciones
      .filter(opcion => pais === 'Todos' || opcion.pais === pais)
      .sort((a, b) => a.precio - b.precio);
  }, [seleccionado, pais]);

  const precioMinimo =
    opcionesFiltradas.length > 0
      ? Math.min(...opcionesFiltradas.map(opcion => opcion.precio))
      : 0;

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
          COMPARACIÓN DE PRECIOS
        </span>

        <h1
          style={{
            fontSize: '2.5rem',
            margin: '8px 0 12px',
            color: '#24313A'
          }}
        >
          Compara antes de comprar
        </h1>

        <p
          style={{
            color: '#65737E',
            maxWidth: '800px',
            lineHeight: '1.7',
            fontSize: '1.05rem'
          }}
        >
          Consulta opciones.
        </p>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          gap: '24px',
          alignItems: 'start'
        }}
      >
        <aside
  style={{
    background: 'linear-gradient(135deg, #F4D7DF 0%, #FFF4F7 100%)',
    border: '1px solid #F0C6D1',
    borderRadius: '22px',
    padding: '24px',
    boxShadow: '0 22px 42px rgba(201, 45, 82, 0.08)'
  }}
>
  <div style={{ marginBottom: '12px' }}>
    <span
      style={{
        display: 'inline-block',
        background: 'rgba(201, 45, 82, 0.10)',
        color: '#C92D52',
        padding: '7px 12px',
        borderRadius: '999px',
        fontSize: '12px',
        fontWeight: '800'
      }}
    >
      BÚSQUEDA DE MEDICAMENTOS
    </span>
  </div>

  <h3 style={{ marginTop: 0 }}>
    Buscar medicamento
  </h3>

  <input
    value={busqueda}
    onChange={e => setBusqueda(e.target.value)}
    placeholder="Ej. Paracetamol 500 mg"
    style={{
      ...inputStyle,
      background: 'white',
      border: '1px solid #EAB4C3'
    }}
  />

  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      marginTop: '16px'
    }}
  >
    {resultados.map(medicamento => {
      const activo = seleccionado?.id === medicamento.id;

      return (
        <button
          key={medicamento.id}
          onClick={() => setSeleccionado(medicamento)}
          style={{
            textAlign: 'left',
            border: activo
              ? '1px solid #C92D52'
              : '1px solid #E7D6DC',
            background: activo
              ? 'linear-gradient(135deg, #C92D52 0%, #DE567A 100%)'
              : 'rgba(255,255,255,0.9)',
            color: activo ? 'white' : '#24313A',
            borderRadius: '14px',
            padding: '14px',
            cursor: 'pointer',
            boxShadow: activo
              ? '0 14px 28px rgba(201, 45, 82, 0.16)'
              : 'none'
          }}
        >
          <strong
            style={{
              display: 'block',
              color: activo ? 'white' : '#24313A'
            }}
          >
            {medicamento.nombre}
          </strong>

          <span
            style={{
              display: 'block',
              color: activo ? 'rgba(255,255,255,0.86)' : '#65737E',
              fontSize: '13px',
              marginTop: '4px'
            }}
          >
            {medicamento.concentracion} · {medicamento.presentacion}
          </span>
        </button>
      );
    })}
  </div>

  {resultados.length === 0 && (
    <p
      style={{
        color: '#65737E',
        lineHeight: '1.6'
      }}
    >
      No encontramos medicamentos con ese criterio.
    </p>
  )}
</aside>

        <main>
          {seleccionado && (
            <>
              <section
                style={{
                  background: 'white',
                  border: '1px solid #DDE7E8',
                  borderRadius: '18px',
                  padding: '26px',
                  marginBottom: '20px'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '20px',
                    flexWrap: 'wrap'
                  }}
                >
                  <div>
                    <span
                      style={{
                        color: '#C92D52',
                        fontWeight: '800',
                        fontSize: '13px'
                      }}
                    >
                      MEDICAMENTO EQUIVALENTE
                    </span>

                    <h2
                      style={{
                        margin: '6px 0 8px',
                        fontSize: '2rem'
                      }}
                    >
                      {seleccionado.nombre}
                    </h2>

                    <p
                      style={{
                        margin: 0,
                        color: '#65737E'
                      }}
                    >
                      {seleccionado.principioActivo} ·{' '}
                      {seleccionado.concentracion} ·{' '}
                      {seleccionado.presentacion}
                    </p>
                  </div>

                  <select
                    value={pais}
                    onChange={e => setPais(e.target.value)}
                    style={{
                      ...inputStyle,
                      width: '190px',
                      height: 'fit-content'
                    }}
                  >
                    <option value="Todos">Todos los países</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="El Salvador">El Salvador</option>
                  </select>
                </div>
              </section>

              <section
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px'
                }}
              >
                {opcionesFiltradas.map((opcion, index) => {
                  const ahorro = opcion.precio - precioMinimo;
                  const mejorPrecio = index === 0;

                  return (
                    <article
                      key={`${opcion.establecimiento}-${opcion.pais}`}
                      style={{
                        background: 'white',
                        border: mejorPrecio
                          ? '1px solid #64D5DE'
                          : '1px solid #DDE7E8',
                        borderRadius: '16px',
                        padding: '22px'
                      }}
                    >
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1.5fr 0.8fr 0.7fr',
                          gap: '20px',
                          alignItems: 'center'
                        }}
                      >
                        <div>
                          <div
                            style={{
                              display: 'flex',
                              gap: '8px',
                              alignItems: 'center',
                              flexWrap: 'wrap'
                            }}
                          >
                            <h3
                              style={{
                                margin: 0
                              }}
                            >
                              {opcion.establecimiento}
                            </h3>

                            {opcion.autorizada && (
                              <span
                                style={{
                                  background: '#EAF7EF',
                                  color: '#1E6D3B',
                                  borderRadius: '20px',
                                  padding: '5px 8px',
                                  fontSize: '11px',
                                  fontWeight: '800'
                                }}
                              >
                                ✓ Autorizado
                              </span>
                            )}

                            {mejorPrecio && (
                              <span
                                style={{
                                  background: '#E8F8FA',
                                  color: '#287980',
                                  borderRadius: '20px',
                                  padding: '5px 8px',
                                  fontSize: '11px',
                                  fontWeight: '800'
                                }}
                              >
                                Precio más bajo
                              </span>
                            )}
                          </div>

                          <p
                            style={{
                              color: '#65737E',
                              margin: '7px 0 0'
                            }}
                          >
                            {opcion.pais}
                          </p>
                        </div>

                        <div>
                          <span
                            style={{
                              display: 'block',
                              color: '#7A878F',
                              fontSize: '11px'
                            }}
                          >
                            Precio
                          </span>

                          <strong
                            style={{
                              fontSize: '1.6rem',
                              color: '#24313A'
                            }}
                          >
                            Q{opcion.precio.toFixed(2)}
                          </strong>
                        </div>

                        <div>
                          <span
                            style={{
                              display: 'block',
                              color: '#7A878F',
                              fontSize: '11px'
                            }}
                          >
                            Diferencia
                          </span>

                          <strong
                            style={{
                              color:
                                ahorro === 0
                                  ? '#1E6D3B'
                                  : '#65737E'
                            }}
                          >
                            {ahorro === 0
                              ? 'Menor precio'
                              : `+ Q${ahorro.toFixed(2)}`}
                          </strong>
                        </div>
                      </div>

                      <div
                        style={{
                          borderTop: '1px solid #E7EEEE',
                          marginTop: '16px',
                          paddingTop: '14px',
                          color: '#7A878F',
                          fontSize: '12px'
                        }}
                      >
                        Última actualización: {opcion.actualizado}
                      </div>
                    </article>
                  );
                })}

                {opcionesFiltradas.length === 0 && (
                  <div
                    style={{
                      background: '#FFF1F4',
                      border: '1px solid #F5CED8',
                      borderRadius: '16px',
                      padding: '22px'
                    }}
                  >
                    <strong style={{ color: '#C92D52' }}>
                      No hay precios disponibles
                    </strong>

                    <p
                      style={{
                        color: '#65737E',
                        marginBottom: 0
                      }}
                    >
                      No existen datos para el país seleccionado.
                    </p>
                  </div>
                )}
              </section>
            </>
          )}
        </main>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '18px',
          marginTop: '30px'
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
            COMPARACIÓN CORRECTA
          </span>

          <h3 style={{ margin: '8px 0 10px' }}>
            No comparamos solo por nombre
          </h3>

          <p
            style={{
              color: '#65737E',
              lineHeight: '1.6',
              marginBottom: 0
            }}
          >
            Para evitar resultados engañosos se considera principio activo,
            concentración, forma farmacéutica y cantidad de unidades.
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
          <span
            style={{
              color: '#C92D52',
              fontWeight: '800',
              fontSize: '13px'
            }}
          >
            ORIGEN DE LOS PRECIOS
          </span>

          <h3 style={{ margin: '8px 0 10px' }}>
            Datos simulados en esta fase
          </h3>

          <p
            style={{
              color: '#65737E',
              lineHeight: '1.6',
              marginBottom: 0
            }}
          >
            Una implementación real podría integrar fuentes oficiales,
            establecimientos participantes o servicios de consulta de precios.
          </p>
        </div>

        <div
          style={{
            background: '#F8F9F4',
            border: '1px solid #E1E1C7',
            borderRadius: '16px',
            padding: '22px'
          }}
        >
          <span
            style={{
              color: '#7C7C43',
              fontWeight: '800',
              fontSize: '13px'
            }}
          >
            OBJETIVO
          </span>

          <h3 style={{ margin: '8px 0 10px' }}>
            Más opciones de compra
          </h3>

          <p
            style={{
              color: '#65737E',
              lineHeight: '1.6',
              marginBottom: 0
            }}
          >
            El comparador complementa la trazabilidad ayudando al usuario a
            encontrar alternativas formales y comparar precios antes de
            recurrir a canales informales.
          </p>
        </div>
      </section>
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