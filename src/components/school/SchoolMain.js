import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSchool } from "../../redux/actions/schoolActions";
import SVG from "../utils/SVG";
import Btn from "../utils/Btn";
import Preloader from "../utils/Preloader";
import { useTransition, animated as a } from "react-spring";

const SchoolMain = ({ loading, obj, history, getSchool }) => {
	const [schoolItems, setSchoolItems] = useState([]);
	const transitions = useTransition(loading, null, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 }
	});

	useEffect(() => {
		let subscribed = true;
		if (subscribed) getSchool();
		return () => (subscribed = false);
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (!loading && obj === null) {
			history.push("/school/add");
		} else if (obj !== null) {
			setSchoolItems([
				{ icon: "school", text: obj.desc },
				{ icon: "pin", text: obj.address },
				{ icon: "at", text: obj.email },
				{ icon: "phone", text: obj.phone1 },
				{ icon: "phone", text: obj.phone1 },
				{ icon: "people", text: "278 estudiantes" },
				{ icon: "mortarboard", text: "12 grados" },
				{ icon: "exam", text: "32 examenes" },
				{ icon: "book", text: "18 cursos" }
			]);
		}
		// eslint-disable-next-line
	}, [loading, obj]);

	const onSchoolEdit = () => history.push("/school/edit");

	return transitions.map(({ item, key, props }) =>
		item ? (
			<a.div style={props} key={key}>
				<Preloader loading={loading} />
			</a.div>
		) : (
			<a.div style={props} key={key} className="section">
				<div className="section__heading--container">
					<div className="section__heading">
						{obj !== null ? (
							<Fragment>
								<h1>{obj.name}</h1>
								{obj.period && <h3>{obj.period}</h3>}
							</Fragment>
						) : (
							<h1>-</h1>
						)}
					</div>
					<div className="btn--container">
						<Btn
							classNames="btn--primary"
							onClick={onSchoolEdit}
							text="Editar escuela"
						/>
					</div>
				</div>
				<div className="school__main">
					<div className="u-upload__img school__main--img">
						{obj !== null &&
						obj.logo !== null &&
						obj.logo.filePath !== "" ? (
							<img
								src={obj.logo.filePath}
								alt="Logo"
								className="u-upload__img--content"
							/>
						) : (
							<p className="u-upload--text">Sin logo</p>
						)}
					</div>

					{schoolItems.map((item, i) => (
						<div className="school__info" key={i}>
							<SVG
								icon={item.icon}
								className="school__info--icon"
							/>
							<p className="school__info--text">{item.text}</p>
						</div>
					))}
				</div>
			</a.div>
		)
	);
};

SchoolMain.propTypes = {
	loading: PropTypes.bool.isRequired,
	history: PropTypes.object.isRequired,
	obj: PropTypes.object,
	getSchool: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	obj: state.school.obj,
	loading: state.school.loading
});

export default connect(
	mapStateToProps,
	{ getSchool }
)(SchoolMain);
