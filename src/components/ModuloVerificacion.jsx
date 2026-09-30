import { useEffect, useState } from 'react';
import datosIniciales from '../data/trazabilidad.json';

export default function ModuloVerificacion() {
  const [productos, setProductos] = useState([]);
  const [codigo, setCodigo] = useState('GT-240926-01');
  const [productoEncontrado, setProductoEncontrado] = useState(null);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);

  useEffect(() => {
    const guardados = localStorage.getItem('trazabilidad_estricta_v2');

    if (guardados) {
      const data = JSON.parse(guardados);
      setProductos(data);
      const inicial = data.find(p => p.lote === 'GT-240926-01');

      if (inicial) {
        setProductoEncontrado(inicial);
        setBusquedaRealizada(true);
      }
    } else {
      setProductos(datosIniciales);
      localStorage.setItem(
        'trazabilidad_estricta_v2',
        JSON.stringify(datosIniciales)
      );

      const inicial = datosIniciales.find(
        p => p.lote === 'GT-240926-01'
      );

      if (inicial) {
        setProductoEncontrado(inicial);
        setBusquedaRealizada(true);
      }
    }
  }, []);

  const buscarProducto = e => {
    e.preventDefault();

    const codigoLimpio = codigo.trim().toLowerCase();

    const encontrado = productos.find(
      p =>
        p.lote?.toLowerCase() === codigoLimpio ||
        p.identificador?.toLowerCase() === codigoLimpio
    );

    setBusquedaRealizada(true);

    if (!encontrado) {
      setProductoEncontrado(null);
      return;
    }

    const actualizado = {
      ...encontrado,
      vecesEscaneado: (encontrado.vecesEscaneado || 0) + 1
    };

    const nuevaLista = productos.map(p =>
      p.lote === encontrado.lote ? actualizado : p
    );

    setProductos(nuevaLista);
    setProductoEncontrado(actualizado);

    localStorage.setItem(
      'trazabilidad_estricta_v2',
      JSON.stringify(nuevaLista)
    );
  };

  const obtenerEstado = producto => {
    if (!producto) return null;

    if (producto.estadoGeneral?.toLowerCase().includes('destruido')) {
      return {
        titulo: 'Producto retirado',
        texto: 'Este producto registra un estado de retiro o destrucción.',
        fondo: '#FDEBEC',
        borde: '#C73B3B',
        color: '#A52A2A',
        icono: '!'
      };
    }

    if (producto.alertaReportada) {
      return {
        titulo: 'Verificado con advertencia',
        texto: 'El identificador existe, pero presenta una alerta registrada.',
        fondo: '#FFF6E5',
        borde: '#D99B27',
        color: '#9A6811',
        icono: '!'
      };
    }

    return {
      titulo: 'Producto reconocido',
      texto: 'El identificador existe y cuenta con información de trazabilidad.',
      fondo: '#EAF7EF',
      borde: '#27864A',
      color: '#1E6D3B',
      icono: '✓'
    };
  };

  const obtenerActividad = producto => {
    const escaneos = producto?.vecesEscaneado || 0;

    if (escaneos >= 20) {
      return {
        titulo: 'Actividad inusual',
        texto: 'Este identificador registra una cantidad alta de consultas. Se recomienda revisar su historial.',
        color: '#C73B3B',
        fondo: '#FDEBEC'
      };
    }

    if (escaneos >= 10) {
      return {
        titulo: 'Actividad moderada',
        texto: 'El identificador ha sido consultado varias veces. Esto no significa automáticamente que sea falso.',
        color: '#9A6811',
        fondo: '#FFF6E5'
      };
    }

    return {
      titulo: 'Actividad normal',
      texto: 'No se observan patrones inusuales de consulta en esta demostración.',
      color: '#1E6D3B',
      fondo: '#EAF7EF'
    };
  };

  const estado = obtenerEstado(productoEncontrado);
  const actividad = obtenerActividad(productoEncontrado);

  return (
    <div
      style={{
        maxWidth: '1180px',
        margin: '0 auto',
        padding: '42px 24px 70px'
      }}
    >
      <section
        style={{
          marginBottom: '30px'
        }}
      >
        <span
          style={{
            color: '#C92D52',
            fontSize: '14px',
            fontWeight: '800'
          }}
        >
          VERIFICACIÓN DE MEDICAMENTOS
        </span>

        <h1
          style={{
            fontSize: '2.5rem',
            margin: '8px 0 12px',
            color: '#24313A'
          }}
        >
          Comprueba la procedencia de tu medicamento
        </h1>

        <p
          style={{
            color: '#65737E',
            maxWidth: '760px',
            lineHeight: '1.7',
            fontSize: '1.05rem'
          }}
        >
          Ingresa el identificador del producto para consultar su lote,
          fabricante, registro sanitario y recorrido dentro de la cadena de
          distribución.
        </p>
      </section>

      <section
  style={{
    background: 'linear-gradient(135deg, #C92D52 0%, #E25379 100%)',
    border: '1px solid rgba(255,255,255,0.18)',
    borderRadius: '22px',
    padding: '28px',
    marginBottom: '26px',
    boxShadow: '0 22px 42px rgba(201, 45, 82, 0.18)'
  }}
>
  <div style={{ marginBottom: '12px' }}>
    <span
      style={{
        display: 'inline-block',
        background: 'rgba(255,255,255,0.16)',
        color: 'white',
        padding: '7px 12px',
        borderRadius: '999px',
        fontSize: '12px',
        fontWeight: '800'
      }}
    >
      BÚSQUEDA PRINCIPAL
    </span>
  </div>

  <form
    onSubmit={buscarProducto}
    style={{
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap'
    }}
  >
    <input
      type="text"
      value={codigo}
      onChange={e => setCodigo(e.target.value)}
      placeholder="Ejemplo: MED-GT-2026-X8A73M92L"
      style={{
        flex: '1 1 500px',
        padding: '15px 16px',
        border: '1px solid rgba(255,255,255,0.35)',
        borderRadius: '12px',
        fontSize: '16px',
        outline: 'none',
        background: 'rgba(255,255,255,0.96)',
        color: '#24313A'
      }}
    />

    <button
      type="submit"
      style={{
        background: 'white',
        color: '#C92D52',
        border: 'none',
        borderRadius: '12px',
        padding: '15px 24px',
        fontWeight: '800',
        cursor: 'pointer',
        boxShadow: '0 10px 24px rgba(0,0,0,0.10)'
      }}
    >
      Verificar medicamento
    </button>
  </form>

  <p
    style={{
      color: 'rgba(255,255,255,0.82)',
      fontSize: '13px',
      margin: '14px 0 0'
    }}
  >
    
  </p>
</section>

      {busquedaRealizada && !productoEncontrado && (
        <section
          style={{
            background: '#FFF3F5',
            border: '1px solid #F1C5D0',
            borderRadius: '18px',
            padding: '30px'
          }}
        >
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '15px',
              background: '#C92D52',
              color: 'white',
              display: 'grid',
              placeItems: 'center',
              fontSize: '25px',
              fontWeight: '800',
              marginBottom: '18px'
            }}
          >
            !
          </div>

          <h2
            style={{
              margin: '0 0 10px',
              color: '#9B2341'
            }}
          >
            No podemos verificar este producto
          </h2>

          <p
            style={{
              color: '#65737E',
              lineHeight: '1.7',
              maxWidth: '780px'
            }}
          >
            El identificador no se encuentra registrado en el sistema de
            demostración. Esto no significa automáticamente que el medicamento
            sea falso, pero su procedencia no puede comprobarse con la
            información disponible.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              marginTop: '20px'
            }}
          >
            <a
              href="/denuncias"
              style={{
                background: '#C92D52',
                color: 'white',
                padding: '11px 18px',
                borderRadius: '9px',
                textDecoration: 'none',
                fontWeight: '700'
              }}
            >
              Reportar irregularidad
            </a>

            <a
              href="/ubicaciones"
              style={{
                background: 'white',
                color: '#C92D52',
                padding: '11px 18px',
                borderRadius: '9px',
                textDecoration: 'none',
                border: '1px solid #C92D52',
                fontWeight: '700'
              }}
            >
              Buscar punto autorizado
            </a>
          </div>
        </section>
      )}

      {productoEncontrado && (
        <>
          <section
            style={{
              background: estado.fondo,
              border: `1px solid ${estado.borde}`,
              borderRadius: '18px',
              padding: '24px',
              marginBottom: '22px',
              display: 'flex',
              gap: '18px',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                width: '52px',
                height: '52px',
                minWidth: '52px',
                borderRadius: '15px',
                background: estado.borde,
                color: 'white',
                display: 'grid',
                placeItems: 'center',
                fontSize: '25px',
                fontWeight: '800'
              }}
            >
              {estado.icono}
            </div>

            <div>
              <h2
                style={{
                  margin: '0 0 5px',
                  color: estado.color
                }}
              >
                {estado.titulo}
              </h2>

              <p
                style={{
                  margin: 0,
                  color: '#536169'
                }}
              >
                {estado.texto}
              </p>
            </div>
          </section>

          <section
            style={{
              background: 'white',
              border: '1px solid #DDE7E8',
              borderRadius: '18px',
              padding: '28px',
              marginBottom: '22px'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '20px',
                flexWrap: 'wrap',
                marginBottom: '24px'
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
                  MEDICAMENTO
                </span>

                <h2
                  style={{
                    margin: '6px 0 8px',
                    fontSize: '2rem'
                  }}
                >
                  {productoEncontrado.nombreMedicamento}
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: '#65737E'
                  }}
                >
                  Fabricante: <strong>{productoEncontrado.fabricante}</strong>
                </p>
              </div>

              <div
                style={{
                  background: '#F6FAFA',
                  borderRadius: '12px',
                  padding: '15px 18px',
                  minWidth: '230px'
                }}
              >
                <span
                  style={{
                    color: '#65737E',
                    fontSize: '12px'
                  }}
                >
                  Estado de distribución
                </span>

                <strong
                  style={{
                    display: 'block',
                    marginTop: '5px',
                    color: '#24313A'
                  }}
                >
                  {productoEncontrado.estadoGeneral}
                </strong>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                gap: '18px',
                borderTop: '1px solid #E7EEEE',
                paddingTop: '22px'
              }}
            >
              <Dato
                titulo="Identificador"
                valor={productoEncontrado.identificador || productoEncontrado.lote}
              />

              <Dato
                titulo="Lote"
                valor={productoEncontrado.lote}
              />

              <Dato
                titulo="Registro sanitario"
                valor={productoEncontrado.registroSanitario}
              />

              <Dato
                titulo="Fecha de fabricación"
                valor={productoEncontrado.fechaFabricacion || 'No disponible'}
              />

              <Dato
                titulo="Fecha de vencimiento"
                valor={productoEncontrado.fechaVencimiento}
              />

              <Dato
                titulo="Distribuidor autorizado"
                valor={
                  productoEncontrado.distribuidorAutorizado ||
                  'No disponible'
                }
              />

              <Dato
                titulo="Establecimiento receptor"
                valor={
                  productoEncontrado.establecimientoReceptor ||
                  'No disponible'
                }
              />

              <Dato
                titulo="Cadena de frío requerida"
                valor={productoEncontrado.cadenaDeFrioRequerida}
              />
            </div>
          </section>

          <section
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '18px',
              marginBottom: '32px'
            }}
          >
            <div
              style={{
                background: actividad.fondo,
                borderRadius: '16px',
                padding: '22px'
              }}
            >
              <span
                style={{
                  color: '#65737E',
                  fontSize: '13px',
                  fontWeight: '700'
                }}
              >
                ACTIVIDAD DEL IDENTIFICADOR
              </span>

              <h3
                style={{
                  color: actividad.color,
                  margin: '8px 0'
                }}
              >
                {actividad.titulo}
              </h3>

              <strong
                style={{
                  fontSize: '1.8rem',
                  color: '#24313A'
                }}
              >
                {productoEncontrado.vecesEscaneado || 0} consultas
              </strong>

              <p
                style={{
                  color: '#65737E',
                  lineHeight: '1.6',
                  marginBottom: 0
                }}
              >
                {actividad.texto}
              </p>
            </div>

            <div
              style={{
                background: '#E8F8FA',
                borderRadius: '16px',
                padding: '22px'
              }}
            >
              <span
                style={{
                  color: '#65737E',
                  fontSize: '13px',
                  fontWeight: '700'
                }}
              >
                CADENA DE FRÍO
              </span>

              <h3
                style={{
                  color: '#287980',
                  margin: '8px 0'
                }}
              >
                Rango requerido
              </h3>

              <strong
                style={{
                  fontSize: '1.8rem',
                  color: '#24313A'
                }}
              >
                {productoEncontrado.cadenaDeFrioRequerida}
              </strong>

              <p
                style={{
                  color: '#65737E',
                  lineHeight: '1.6',
                  marginBottom: 0
                }}
              >
                Las temperaturas mostradas en esta demostración provienen de
                registros simulados de cada evento logístico.
              </p>
            </div>
          </section>

          <section>
            <div
              style={{
                marginBottom: '20px'
              }}
            >
              <span
                style={{
                  color: '#C92D52',
                  fontSize: '13px',
                  fontWeight: '800'
                }}
              >
                CADENA DE CUSTODIA
              </span>

              <h2
                style={{
                  margin: '7px 0 5px'
                }}
              >
                Ruta de trazabilidad
              </h2>

              <p
                style={{
                  color: '#65737E',
                  margin: 0
                }}
              >
                Eventos registrados desde la fabricación hasta la entrega.
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}
            >
              {productoEncontrado.fases.map((fase, index) => (
                <div
                  key={fase.id || index}
                  style={{
                    background: 'white',
                    border: '1px solid #DDE7E8',
                    borderRadius: '16px',
                    padding: '22px',
                    display: 'grid',
                    gridTemplateColumns: '58px 1fr',
                    gap: '18px'
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      background: index === 0 ? '#C92D52' : '#E4F8FA',
                      color: index === 0 ? 'white' : '#287980',
                      display: 'grid',
                      placeItems: 'center',
                      fontWeight: '800'
                    }}
                  >
                    {index + 1}
                  </div>

                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '15px',
                        flexWrap: 'wrap'
                      }}
                    >
                      <h3
                        style={{
                          margin: '0 0 5px'
                        }}
                      >
                        {fase.estacion}
                      </h3>

                      <span
                        style={{
                          color: '#7A878F',
                          fontSize: '13px'
                        }}
                      >
                        {fase.fecha}
                      </span>
                    </div>

                    <p
                      style={{
                        color: '#65737E',
                        margin: '0 0 15px'
                      }}
                    >
                      {fase.lugar}
                    </p>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns:
                          'repeat(auto-fit, minmax(210px, 1fr))',
                        gap: '12px'
                      }}
                    >
                      <DatoPequeno
                        titulo="Responsable"
                        valor={fase.despachador}
                      />

                      <DatoPequeno
                        titulo="Transporte / almacenamiento"
                        valor={fase.tipoTransporte}
                      />

                      <DatoPequeno
                        titulo="Tiempo registrado"
                        valor={fase.tiempoEstancia}
                      />

                      <DatoPequeno
                        titulo="Temperatura"
                        valor={fase.temperatura}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section
            style={{
              marginTop: '30px',
              background: '#FFF1F4',
              border: '1px solid #F5CED8',
              borderRadius: '16px',
              padding: '22px'
            }}
          >
            <strong
              style={{
                color: '#C92D52'
              }}
            >
              ¿Detectaste algo extraño?
            </strong>

            <p
              style={{
                color: '#65737E',
                lineHeight: '1.6'
              }}
            >
              Puedes reportar un código sospechoso, problemas de cadena de
              frío, establecimientos no autorizados u otras irregularidades.
            </p>

            <a
              href="/denuncias"
              style={{
                color: '#C92D52',
                fontWeight: '800',
                textDecoration: 'none'
              }}
            >
              Reportar irregularidad →
            </a>
          </section>
        </>
      )}
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
          fontSize: '12px',
          marginBottom: '4px'
        }}
      >
        {titulo}
      </span>

      <strong
        style={{
          color: '#24313A',
          lineHeight: '1.4'
        }}
      >
        {valor}
      </strong>
    </div>
  );
}

function DatoPequeno({ titulo, valor }) {
  return (
    <div>
      <span
        style={{
          display: 'block',
          color: '#7A878F',
          fontSize: '11px',
          marginBottom: '3px'
        }}
      >
        {titulo}
      </span>

      <span
        style={{
          color: '#34424A',
          fontSize: '13px'
        }}
      >
        {valor || 'No disponible'}
      </span>
    </div>
  );
}