import React from 'react';
import './ListarRegistro.css'; // Importa el archivo CSS de estilos

function ListarRegistro(props) {
  const ListarEstudios = props.listarInformacionEstudios.map(item => (
    <div key={item.id} className="card">
      <h3>Lugar: {item.lugarDeFormacion}</h3>
      <h3>Categoría: {item.categoria}</h3>
      <h3>Título: {item.tituloEstudio}</h3>
      <h3>Fecha de inicio: {item.fechaInicio}</h3>
      <h3>Fecha fin: {item.fechaFin}</h3>
    </div>
  ));

  return (
    <section>
      <div className="card-container">
        {ListarEstudios}
      </div>
    </section>
  );
}

export default ListarRegistro;