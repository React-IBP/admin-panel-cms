import React from 'react'

const emailTemplateForgetPassword = ({ firstName, linkToken }) => {

  const inlineStyles = {
    backgroundColor: '#007bff', // Color de fondo del botón primary de Bootstrap
    borderColor: '#007bff',      // Color del borde
    color: '#fff',               // Color del texto
    padding: '0.375rem 0.75rem', // Padding de Bootstrap
    fontSize: '1rem',            // Tamaño de fuente
    borderRadius: '0.25rem',     // Borde redondeado
    cursor: 'pointer',           // Cambia el cursor al pasar sobre el botón
  };

  return (
    <div>
      {' '} Hola {firstName} <br /> Solcitaste un cambio de clave  ingresa aqui para  <a  style={inlineStyles}  href={linkToken} >continuar</a>
      <br />
    </div>
  )
}

export default emailTemplateForgetPassword
