import { setAlert } from "../redux/actions/alertActions";

const setError = (id) => {
	let msg = "Algo salió mal, por favor intente nuevamente. (error id: -1)";

	switch (id) {
		case 0:
			msg = "Error: Acción no autorizada.";
			break;
		case 1:
			msg = "Error del servidor.";
			break;
		case 2:
			msg = "Error: No se encontró objeto para este usuario.";
			break;
		case 3:
			msg = "Error: El objeto no se pudo encontrar.";
			break;
		case 4:
			msg = "El objeto no se pudo encontrar por un error inesperado.";
			break;
		case 5:
			msg =
				"Error: Algunos campos obligatorios estan vacios o invalidos.";
			break;
		case 6:
			msg =
				"Error: Un objeto no tiene la información completa requerida.";
			break;
		case 7:
			msg = "Error: Objeto eliminado.";
			break;
		case 8:
			msg = "Error: El archivo no pudo ser cargado.";
			break;
		case 9:
			msg = "Error: El objeto ya existe.";
			break;
		default:
			break;
	}

	setAlert(msg, "danger");
};

export default setError;
