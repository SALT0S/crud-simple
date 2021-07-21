import React, { useState } from 'react';
import shortid from 'shortid';
function App() {
	const [tarea, setTarea] = useState('');
	const [tareas, setTareas] = useState([]);
	const [edicion, setEdicion] = useState(false);
	const [id, setId] = useState('');
	const [error, setError] = useState(null);

	const agregarTarea = e => {
		e.preventDefault();
		if (!tarea.trim()) {
			setError('Ingrese una tarea por favor...');
			return;
		}
		setTareas([...tareas, { id: shortid.generate(), nombreTarea: tarea }]);
		setTarea('');
		setError(null);
	};

	const eliminarTarea = id => {
		const arrayFiltrado = tareas.filter(item => item.id !== id);
		setTareas(arrayFiltrado);
	};

	const editar = item => {
		setEdicion(true);
		setTarea(item.nombreTarea);
		setId(item.id);
	};

	const editarTarea = e => {
		e.preventDefault();
		if (!tarea.trim()) {
			setError('Ingrese una tarea por favor...');
			return;
		}
		const arrayEditado = tareas.map(item =>
			item.id === id ? { id, nombreTarea: tarea } : item
		);
		setTareas(arrayEditado);
		setEdicion(false);
		setTarea('');
		setId('');
		setError(null);
	};

	return (
		<div className='container mt-5'>
			<h1 className='text-center'>CRUD Simple</h1>
			<hr />
			<div className='row'>
				<div className='col-8'>
					<h4 className='text-center'>Lista de Tareas</h4>
					<ul className='list-group'>
						{tareas.length === 0 ? (
							<li className='list-group-item'>No hay tareas</li>
						) : (
							tareas.map(item => (
								<li
									className='list-group-item d-flex justify-content-between'
									key={item.id}
								>
									{
										<span className='lead'>
											{item.nombreTarea}
										</span>
									}
									<div>
										<button
											className='btn btn-warning btn-sm mx-2'
											onClick={() => editar(item)}
										>
											Editar
										</button>

										<button
											className='btn btn-danger btn-sm'
											onClick={() =>
												eliminarTarea(item.id)
											}
										>
											Eliminar
										</button>
									</div>
								</li>
							))
						)}
					</ul>
				</div>

				<div className='col-4'>
					<h4 className='text-center'>
						{edicion ? 'Editar tarea' : 'Agregar tarea'}
					</h4>
					<form onSubmit={edicion ? editarTarea : agregarTarea}>
						{error ? (
							<span className='text-danger'>{error}</span>
						) : null}
						<input
							type='text'
							className='form-control mb-2'
							placeholder='Ingrese tarea'
							onChange={e => setTarea(e.target.value)}
							value={tarea}
						/>
						{edicion ? (
							<button
								className='btn btn-warning btn-block w-100'
								type='submit'
							>
								Editar
							</button>
						) : (
							<button
								className='btn btn-dark btn-block w-100'
								type='submit'
							>
								Agregar
							</button>
						)}
					</form>
				</div>
			</div>
		</div>
	);
}

export default App;
