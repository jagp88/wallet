import React, { useState } from 'react';
import './Formulario.css';

const Formulario = (props) => {
  
  const [formulario, setFormulario] = useState({
    lugar: '',
    categoria: '',
    titulo: '',
    fechaInicio: '',
    fechaFinalizacion: '',
  });


  const [formErrors, setFormErrors] = useState({
    lugar: '',
    categoria: '',
    titulo: '',
    fechaInicio: '',
    fechaFinalizacion: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar campos antes de enviar
    const newFormErrors = {
      lugar: formulario.lugar ? (formulario.lugar.length >= 8 ? '' : 'Ingrese al menos 8 caracteres') : 'Este campo es requerido',
      categoria: formulario.categoria ? (formulario.categoria.length >= 8 ? '' : 'Ingrese al menos 8 caracteres') : 'Este campo es requerido',
      titulo: formulario.titulo ? (formulario.titulo.length >= 8 ? '' : 'Ingrese al menos 8 caracteres') : 'Este campo es requerido',
      fechaInicio: formulario.fechaInicio ? '' : 'Este campo es requerido',
      fechaFinalizacion: formulario.fechaFinalizacion ? '' : 'Este campo es requerido',
    };

    // Actualizar los errores en el estado
    setFormErrors(newFormErrors);

    // Verificar si hay errores antes de enviar
    if (
      newFormErrors.lugar ||
      newFormErrors.categoria ||
      newFormErrors.titulo ||
      newFormErrors.fechaInicio ||
      newFormErrors.fechaFinalizacion
    ) {
      console.log('El formulario tiene errores. No se puede enviar.');
      return;
    }

    // Envío exitoso del formulario, ahora limpiar campos
    setFormulario({
      lugar: '',
      categoria: '',
      titulo: '',
      fechaInicio: '',
      fechaFinalizacion: '',
    });

    // Mostrar alerta de envío exitoso
    alert('¡El formulario ha sido enviado exitosamente!');

    console.log('Formulario enviado:', formulario);

    try {
      const result = await props.contrato.methods.crearRegistro(
        formulario.categoria,
        formulario.fechaInicio,
        formulario.fechaFinalizacion,
        formulario.lugar,
        formulario.titulo
      ).send({ from: props.direccion });
    
      console.log(result);
    
      if (result.status) {
        alert('¡El formulario ha sido enviado exitosamente y registrado en la cadena de bloques!');
        setFormulario({
          lugar: '',
          categoria: '',
          titulo: '',
          fechaInicio: '',
          fechaFinalizacion: '',
        });
      } else {
        console.error('La transacción no se completó correctamente.');
      }
    } catch (error) {
      console.error('Error al realizar la transacción:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);

    // Validar longitud mínima solo para los campos específicos
    const isMinLengthValid = ['lugar', 'categoria', 'titulo'].includes(name) ? value.length >= 8 : true;

    setFormulario({ ...formulario, [name]: value });

    // Validación y actualización de errores
    setFormErrors({
      ...formErrors,
      [name]: value ? (isMinLengthValid ? '' : 'Ingrese al menos 8 caracteres') : 'Este campo es requerido',
    });
  };  

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>Lugar de formación:</label>
        <input type="text" id="lugar" name="lugar" onChange={handleInputChange} value={formulario.lugar} />
        <span className="error-message">{formErrors.lugar}</span>
        {/* {formulario.lugar.length >= 8 ? "" : "Campo requerido"} */}

        <label>Categoría:</label>
        <input type="text" id="categoria" name="categoria" value={formulario.categoria} onChange={handleInputChange} />
        <span className="error-message">{formErrors.categoria}</span>

        <label>Título:</label>
        <input type="text" id="titulo" name="titulo" value={formulario.titulo} onChange={handleInputChange} />
        <span className="error-message">{formErrors.titulo}</span>

        <label>Fecha de inicio:</label>
        <input type="date" id="fechaInicio" name="fechaInicio" value={formulario.fechaInicio} onChange={handleInputChange} />
        <span className="error-message">{formErrors.fechaInicio}</span>

        <label>Fecha de finalización:</label>
        <input type="date" id="fechaFinalizacion" name="fechaFinalizacion" value={formulario.fechaFinalizacion} onChange={handleInputChange} />
        <span className="error-message">{formErrors.fechaFinalizacion}</span>

        <br /><br />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Formulario;