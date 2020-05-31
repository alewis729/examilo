import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions/authActions";
import { setAlert } from "../../redux/actions/alertActions";
import { clearMsg } from "../../redux/actions/messageActions";
import validate from "../../utilFuncs/validate";
import { correctText } from "../../utilFuncs/other";
import PropTypes from "prop-types";
import Btn from "../utils/Btn";
import Input from "../utils/Input";
import { useSpring, animated as a } from "react-spring";

const Register = ({
	auth: { error, isAuthenticated },
	msgs,
	registerUser,
	setAlert,
	clearMsg,
	history
}) => {
	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
		productKey: ""
	});

	const { name, email, password, password2, productKey } = user;
	const spring = useSpring({
		opacity: 1,
		transform: "translateX(0)",
		from: {
			opacity: 0,
			transform: "translateX(15rem)"
		}
	});

	useEffect(() => {
		if (msgs.includes("AUTH_REGISTER_ERROR")) {
			clearMsg("AUTH_REGISTER_ERROR");
			error === 9
				? setAlert(`Ya existe un usuario con el email ${email}.`)
				: setAlert(
						"Error inesperado al registrar. Intente nuevamente en unos instantes."
				  );
		}
		// eslint-disable-next-line
	}, [msgs, error]);

	useEffect(() => {
		if (isAuthenticated) history.push("/");
	}, [isAuthenticated, history]);

	const onChange = (e) => {
		let value = e.target.value;
		const key = e.target.dataset.key;
		const inputType = e.target.dataset.type;

		if (inputType === undefined) {
			setUser({ ...user, [key]: e.target.value });
		} else {
			const limit = e.target.dataset.limit;
			const input = validate(inputType, value, limit);

			if (input.isValid) {
				let newVal = input.newValue;
				if (key === "name") newVal = correctText(newVal, true);
				setUser({ ...user, [key]: newVal });
			}
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (
			name === "" ||
			email === "" ||
			password === "" ||
			productKey === ""
		) {
			setAlert("Debe completar todas las celdas.");
		} else if (password.toString().length < 6) {
			setAlert("La contraseña debe tener más de 5 (cinco) caracteres!");
		} else if (password !== password2) {
			setAlert("Las contraseñas no son iguales!");
		} else {
			registerUser({
				name,
				email,
				password,
				productKey
			});
		}
	};

	return (
		<a.div style={spring}>
			<div className="form">
				<div className="form--content">
					<h2>
						Crear una <span className="text--primary">cuenta</span>
					</h2>
					<form onSubmit={onSubmit} className="form__list">
						<Input
							boxStyle={true}
							value={name}
							title="Nombre"
							placeHolder="Nombre"
							onChange={onChange}
							objKey="name"
							dataType="NAMES"
							autoFocus={true}
						/>

						<Input
							boxStyle={true}
							type="email"
							value={email}
							title="Email"
							placeHolder="Email"
							onChange={onChange}
							objKey="email"
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

						<Input
							boxStyle={true}
							type="password"
							value={password2}
							title="Confirmar contraseña"
							placeHolder="Confirmar contraseña"
							onChange={onChange}
							objKey="password2"
						/>

						<Input
							boxStyle={true}
							value={productKey}
							title="Código de producto"
							placeHolder="Código de producto"
							onChange={onChange}
							objKey="productKey"
						/>

						<Btn
							classNames="btn--primary form--btn"
							type="submit"
							text="Crear cuenta"
						/>
					</form>
				</div>
			</div>
		</a.div>
	);
};

Register.propTypes = {
	auth: PropTypes.object.isRequired,
	msgs: PropTypes.array.isRequired,
	registerUser: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
	clearMsg: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	msgs: state.messages
});

export default connect(
	mapStateToProps,
	{ registerUser, setAlert, clearMsg }
)(Register);
