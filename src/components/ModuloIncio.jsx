export default function ModuloInicio() {
  return (
    <div style={{
      maxWidth: '1180px',
      margin: '0 auto',
      padding: '48px 24px 70px'
    }}>

      <section style={{
  display: 'grid',
  gridTemplateColumns: '1.3fr 0.7fr',
  gap: '35px',
  alignItems: 'center',
  padding: '56px',
  background: 'rgba(255, 255, 255, 0.78)',
  border: '1px solid rgba(255, 255, 255, 0.75)',
  borderRadius: '30px',
  boxShadow: '0 24px 60px rgba(22, 52, 77, 0.10)',
  backdropFilter: 'blur(12px)',
  position: 'relative',
  overflow: 'hidden'
}}>
  <div style={{
    position: 'absolute',
    width: '220px',
    height: '220px',
    borderRadius: '999px',
    background: 'rgba(100, 213, 222, 0.18)',
    top: '-70px',
    right: '33%',
    filter: 'blur(5px)'
  }} />

  <div style={{
    position: 'absolute',
    width: '180px',
    height: '180px',
    borderRadius: '999px',
    background: 'rgba(239, 141, 158, 0.16)',
    bottom: '-55px',
    left: '-35px',
    filter: 'blur(4px)'
  }} />

  <div style={{ position: 'relative', zIndex: 2 }}>
    <div style={{
      display: 'inline-block',
      background: '#DFF7F9',
      color: '#287980',
      padding: '8px 14px',
      borderRadius: '999px',
      fontSize: '14px',
      fontWeight: '700',
      marginBottom: '18px',
      boxShadow: '0 8px 20px rgba(100, 213, 222, 0.16)'
    }}>
      Trazabilidad y seguridad farmacéutica
    </div>

    <h1 style={{
      fontSize: '4rem',
      lineHeight: '1.02',
      margin: '0 0 20px',
      color: '#24313A',
      maxWidth: '650px'
    }}>
      Verifica antes de consumir
    </h1>

    <p style={{
      color: '#65737E',
      fontSize: '1.18rem',
      lineHeight: '1.8',
      maxWidth: '700px',
      marginBottom: '30px'
    }}>
      Consulta la procedencia, trazabilidad y estado de un medicamento
      mediante su identificador y detecta posibles irregularidades en
      su cadena de distribución.
    </p>

    <div style={{
      display: 'flex',
      gap: '14px',
      flexWrap: 'wrap'
    }}>
      <a
        href="/verificacion"
        style={{
          background: 'linear-gradient(135deg, #C92D52 0%, #DB4F74 100%)',
          color: 'white',
          textDecoration: 'none',
          padding: '15px 24px',
          borderRadius: '14px',
          fontWeight: '700',
          boxShadow: '0 12px 24px rgba(201, 45, 82, 0.20)'
        }}
      >
        Verificar medicamento
      </a>

      <a
        href="/ubicaciones"
        style={{
          background: 'rgba(255,255,255,0.9)',
          color: '#C92D52',
          textDecoration: 'none',
          padding: '15px 24px',
          borderRadius: '14px',
          border: '1px solid rgba(201, 45, 82, 0.25)',
          fontWeight: '700',
          boxShadow: '0 10px 22px rgba(20, 30, 40, 0.05)'
        }}
      >
        Encontrar punto autorizado
      </a>
    </div>
  </div>

  <div style={{
    background: 'linear-gradient(180deg, #91D9DF 0%, #7FD0D8 100%)',
    borderRadius: '28px',
    padding: '34px',
    minHeight: '320px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(36, 80, 110, 0.14)'
  }}>
    <div style={{
      position: 'absolute',
      width: '150px',
      height: '150px',
      borderRadius: '999px',
      background: 'rgba(255,255,255,0.18)',
      top: '-25px',
      right: '-15px'
    }} />

    <div style={{
      position: 'absolute',
      width: '100px',
      height: '100px',
      borderRadius: '999px',
      background: 'rgba(255,255,255,0.16)',
      bottom: '-10px',
      left: '-10px'
    }} />

    <div style={{
      width: '70px',
      height: '70px',
      borderRadius: '22px',
      background: 'linear-gradient(135deg, #C92D52 0%, #DD5478 100%)',
      color: 'white',
      display: 'grid',
      placeItems: 'center',
      fontSize: '38px',
      marginBottom: '24px',
      position: 'relative',
      zIndex: 2,
      boxShadow: '0 12px 28px rgba(201, 45, 82, 0.22)'
    }}>
      ✓
    </div>

    <h2 style={{
      margin: '0 0 14px',
      color: '#16344D',
      fontSize: '2.1rem',
      position: 'relative',
      zIndex: 2
    }}>
      Una identidad para cada medicamento
    </h2>

    <p style={{
      color: '#244B57',
      lineHeight: '1.7',
      margin: 0,
      fontSize: '1.05rem',
      position: 'relative',
      zIndex: 2
    }}>
      El sistema relaciona un identificador único con su lote,
      fabricante, registro sanitario y eventos de distribución.
    </p>
  </div>
</section>

      <section style={{
        marginTop: '60px'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          <span style={{
            color: '#C92D52',
            fontWeight: '700',
            fontSize: '14px'
          }}>
            ¿CÓMO FUNCIONA?
          </span>

          <h2 style={{
            fontSize: '2rem',
            margin: '8px 0'
          }}>
            Del laboratorio al consumidor
          </h2>

          <p style={{
            color: '#65737E',
            margin: 0
          }}>
            Cada evento ayuda a construir la cadena de custodia del producto.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '16px'
        }}>

          {[
  {
    numero: '01',
    titulo: 'Fabricación',
    texto: 'El laboratorio registra el lote y la identidad del producto.',
    fondo: '#FFF1F4',
    borde: '#F5CED8'
  },
  {
    numero: '02',
    titulo: 'Distribución',
    texto: 'Los actores autorizados registran recepción y traslado.',
    fondo: '#EAF9FB',
    borde: '#CFEFF2'
  },
  {
    numero: '03',
    titulo: 'Dispensación',
    texto: 'La farmacia o centro de salud registra la entrega.',
    fondo: '#F8F9F1',
    borde: '#E3E5C9'
  },
  {
    numero: '04',
    titulo: 'Verificación',
    texto: 'El consumidor consulta el historial antes de utilizarlo.',
    fondo: '#F9EEF6',
    borde: '#EDD9E8'
  }
].map(({ numero, titulo, texto, fondo, borde }) => (
  <div
    key={numero}
    style={{
      background: fondo,
      border: `1px solid ${borde}`,
      borderRadius: '18px',
      padding: '24px',
      boxShadow: '0 16px 30px rgba(22, 52, 77, 0.05)'
    }}
  >
    <span style={{
      color: '#C92D52',
      fontWeight: '800'
    }}>
      {numero}
    </span>

    <h3 style={{
      margin: '12px 0 8px'
    }}>
      {titulo}
    </h3>

    <p style={{
      color: '#65737E',
      lineHeight: '1.6',
      margin: 0
    }}>
      {texto}
    </p>
  </div>
))}

        </div>
      </section>
<section
  style={{
    marginTop: '60px',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px'
  }}
>
  {[
    {
      href: '/verificacion',
      icono: '✓',
      titulo: 'Verificar medicamento',
      texto: 'Consulta identidad, lote, fabricante y trazabilidad.',
      accion: 'Verificar →',
      fondo: 'linear-gradient(180deg, #EAF9FB 0%, #FFFFFF 100%)'
    },
    {
      href: '/ubicaciones',
      icono: '⌖',
      titulo: 'Puntos autorizados',
      texto: 'Encuentra establecimientos registrados para adquirir medicamentos.',
      accion: 'Buscar →',
      fondo: 'linear-gradient(180deg, #F8F9F1 0%, #FFFFFF 100%)'
    },
    {
      href: '/denuncias',
      icono: '!',
      titulo: 'Reportar irregularidad',
      texto: 'Reporta productos, lotes o establecimientos sospechosos.',
      accion: 'Reportar →',
      fondo: 'linear-gradient(180deg, #FFF1F4 0%, #FFFFFF 100%)'
    },
    {
      href: '/comparar-precios',
      icono: 'Q',
      titulo: 'Comparar precios',
      texto: 'Consulta opciones de compra y compara medicamentos equivalentes.',
      accion: 'Comparar →',
      fondo: 'linear-gradient(180deg, #F9EEF6 0%, #FFFFFF 100%)'
    }
  ].map(item => (
    <a
      key={item.titulo}
      href={item.href}
      style={{
        ...cardStyle,
        background: item.fondo
      }}
    >
      <div style={iconStyle}>
        {item.icono}
      </div>

      <h3
        style={{
          margin: '20px 0 10px',
          fontSize: '1.15rem'
        }}
      >
        {item.titulo}
      </h3>

      <p
        style={{
          color: '#65737E',
          lineHeight: '1.6',
          minHeight: '76px',
          margin: '0 0 18px'
        }}
      >
        {item.texto}
      </p>

      <strong
        style={{
          color: '#C92D52'
        }}
      >
        {item.accion}
      </strong>
    </a>
  ))}
</section>
      

     

    </div>
  );
}

const cardStyle = {
  background: 'rgba(255, 255, 255, 0.88)',
  border: '1px solid rgba(255, 255, 255, 0.75)',
  borderRadius: '20px',
  padding: '26px',
  textDecoration: 'none',
  color: '#24313A',
  boxShadow: '0 18px 35px rgba(22, 52, 77, 0.07)',
  backdropFilter: 'blur(8px)'
};

const iconStyle = {
  width: '50px',
  height: '50px',
  borderRadius: '16px',
  background: 'linear-gradient(135deg, #DDF7F9 0%, #BDECF1 100%)',
  color: '#C92D52',
  display: 'grid',
  placeItems: 'center',
  fontWeight: '800',
  fontSize: '22px',
  boxShadow: '0 10px 18px rgba(100, 213, 222, 0.14)'
};