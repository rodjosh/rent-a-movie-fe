const CreateMovie = () => {
  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="movieName">Nombre de la Pelicula</label>

          <input
            type="text"
            className="form-control"
            id="movieName"
            placeholder="Nombre de la pelicula"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripcion</label>
          <textarea className="form-control" id="description" rows={3} />
        </div>

        <div className="form-group">
          <label htmlFor="image">URL de Imagen</label>

          <input
            type="text"
            className="form-control"
            id="image"
            placeholder="Confirmar Contraseña"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Crear
        </button>
      </form>
    </div>
  );
};

export default CreateMovie;
