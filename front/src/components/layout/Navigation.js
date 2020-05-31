import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../redux/actions/authActions";
import SVG from "../utils/SVG";
import logo1 from "../../media/img/examilo_logo1.png";
import logo2 from "../../media/img/examilo_logo2.png";
import { useSpring, animated } from "react-spring";

const Navigation = ({ logout, access }) => {
	const navItems = [
		{ linkTo: "/school", icon: "school", text: "Escuela" },
		{ linkTo: "/courses", icon: "book", text: "Cursos" },
		{ linkTo: "/groups", icon: "mortarboard", text: "Grados" },
		{ linkTo: "/students", icon: "people", text: "Estudiantes" },
		{ linkTo: "/exams", icon: "exam", text: "Exámen" },
		{ linkTo: "/reports", icon: "report", text: "Reportes" },
		{ linkTo: "/options", icon: "cog", text: "Opciones" }
	];
	const navMain = useSpring({
		opacity: access === "private" ? 1 : 0,
		transform: access === "private" ? "translateX(0)" : "translateX(-100%)"
	});
	const navTop = useSpring({
		opacity: access === "public" ? 1 : 0,
		transform: access === "public" ? "translateY(0)" : "translateY(-100%)"
	});
	const onLogout = () => logout();

	if (access === "public") {
		return (
			<animated.div style={navTop} className="navp">
				<div className="navp--content">
					<div className="navp__logo">
						<img
							src={logo1}
							alt="Examilo logo"
							className="navp__logo--content"
						/>
					</div>
					<ul className="navp__menu">
						<li className="navp__menu--item">
							<Link to="/login" className="navp__menu--link">
								Iniciar sesión
							</Link>
						</li>
						<li className="navp__menu--item">
							<Link to="/register" className="navp__menu--link">
								Crear cuenta
							</Link>
						</li>
					</ul>
				</div>
			</animated.div>
		);
	}

	return (
		<animated.div style={navMain} className="navm">
			<div className="navm--content">
				<div className="navm__logo">
					<img
						src={logo2}
						alt="Examilo logo"
						className="navm__logo--content"
					/>
				</div>

				<div className="navm__menu">
					{navItems.map((item) => (
						<NavLink
							key={item.linkTo}
							to={item.linkTo}
							className="navm__menu__item"
							activeClassName="navm__menu__item--active"
						>
							<SVG
								icon={item.icon}
								className="navm__menu__item--icon"
							/>
							<p className="navm__menu__item--text">
								{item.text}
							</p>
						</NavLink>
					))}
				</div>

				<div className="navm__foot">
					<div className="navm__foot__item" onClick={onLogout}>
						<SVG icon="out" className="navm__foot__item--icon" />
						<p className="navm__foot__item--text">Cerrar sesión</p>
					</div>

					<p className="navm__foot--copy">&copy; 2019 Examilo</p>
				</div>
			</div>
		</animated.div>
	);
};

Navigation.propTypes = {
	access: PropTypes.string.isRequired,
	logout: PropTypes.func.isRequired
};

export default connect(
	null,
	{ logout }
)(Navigation);
