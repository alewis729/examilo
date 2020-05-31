import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";
import { setAlert } from "../../redux/actions/alertActions";
import { clearMsg } from "../../redux/actions/messageActions";
import PropTypes from "prop-types";
import Btn from "../utils/Btn";
import Input from "../utils/Input";
import { useSpring, animated } from "react-spring";

const Login = ({
	auth: { isAuthenticated },
	msgs,
	errId,
	loginUser,
	setAlert,
	clearMsg,
	history
}) => {
	const [user, setUser] = useState({
		email: "",
		password: ""
	});

	const { email, password } = user;
	const spring = useSpring({
		opacity: 1,
		transform: "translateX(0)",
		from: {
			opacity: 0,
			transform: "translateX(-15rem)"
		}
	});

	useEffect(() => {
		if (msgs.includes("AUTH_LOADUSER_ERROR")) {
			clearMsg("AUTH_LOADUSER_ERROR");
			setAlert(
				"El usuario no se encontró. Complete los campos correctamente para iniciar sesión de nuevo."
			);
		} else if (msgs.includes("AUTH_LOGIN_ERROR")) {
			clearMsg("AUTH_LOGIN_ERROR");
			let msg = "Error al iniciar sesión.";

			if (errId === 3) {
				msg =
					"No existe un usuario registrado con el email proporcionado.";
			} else if (errId === 5) {
				msg = "La contraseña es incorrecta.";
			} else if (errId === 5.1) {
				msg += " Campos invalidos.";
			}

			setAlert(msg, "danger", 3);
		}
		// eslint-disable-next-line
	}, [msgs]);

	useEffect(() => {
		if (isAuthenticated) history.push("/");
		// eslint-disable-next-line
	}, [isAuthenticated, history]);

	const onChange = (e) => {
		let value = e.target.value;
		const key = e.target.dataset.key;

		setUser({ ...user, [key]: value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (email === "") setAlert("El email no fue proporcionado.");
		else if (password === "")
			setAlert("La contraseña no fue proporcionada.");
		else {
			loginUser({
				email,
				password
			});
		}
	};

	return (
		<animated.div style={spring}>
			<div className="form">
				<div className="form--content">
					<h2>
						Ingresar a{" "}
						<span className="text--primary">examilo</span>
					</h2>
					<form onSubmit={onSubmit}>
						<Input
							boxStyle={true}
							type="email"
							value={email}
							title="Email"
							placeHolder="Email"
							onChange={onChange}
							objKey="email"
							autoFocus={true}
						/>

						<Input
							boxStyle={true}
							type="password"
							value={password}
							title="Contraseña"
							placeHolder="Contraseña"
							onChange={onChange}
							objKey="password"
						/>

						<Btn
							classNames="btn--primary form--btn"
							type="submit"
							text="Iniciar sesión"
						/>
					</form>
				</div>
			</div>
		</animated.div>
	);
};

Login.propTypes = {
	auth: PropTypes.object.isRequired,
	msgs: PropTypes.array.isRequired,
	errId: PropTypes.number,
	loginUser: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
	clearMsg: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	msgs: state.messages,
	errId: state.auth.error
});

export default connect(
	mapStateToProps,
	{ loginUser, setAlert, clearMsg }
)(Login);
