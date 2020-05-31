import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import validate from "../../utilFuncs/validate";
import Input from "../utils/Input";
import Btn from "../utils/Btn";
import SVG from "../utils/SVG";
import { useSpring, animated as a } from "react-spring";

const SchoolForm = ({
	isUpdateForm,
	obj,
	logo,
	handleUpload,
	handleCancel,
	handleSubmit
}) => {
	const initialImgObj = {
		file: null,
		name: "",
		path: "",
		readyToUpload: false,
		btnClass: "disabled"
	};
	const [newObj, setObj] = useState({
		logo: {
			fileName: "",
			filePath: ""
		},
		name: "",
		abrev: "",
		desc: "",
		period: "",
		address: "",
		email: "",
		phone1: "",
		phone2: ""
	});
	const [img, setImg] = useState(initialImgObj);
	const [btnText, setBtnText] = useState("Registrar escuela");
	const spring = useSpring({
		opacity: 1,
		from: { opacity: 0 }
	});

	useEffect(() => {
		if (logo !== null) {
			setImg(initialImgObj);
			setObj({
				...newObj,
				logo: {
					fileName: img.name,
					filePath: logo.filePath
				}
			});
		}
		// eslint-disable-next-line
	}, [logo]);

	useEffect(() => {
		if (!isUpdateForm) setBtnText("Registrar escuela");
		else if (obj !== null) {
			setBtnText("Actualizar escuela");
			setObj({
				_id: obj._id,
				logo: obj.logo,
				name: obj.name,
				abrev: obj.abrev,
				desc: obj.desc,
				period: obj.period,
				address: obj.address,
				email: obj.email,
				phone1: obj.phone1,
				phone2: obj.phone2
			});
		}
		// eslint-disable-next-line
	}, [isUpdateForm, obj]);

	useEffect(() => {
		if (img.file === null) {
			setImg({ ...img, readyToUpload: false, btnClass: "disabled" });
		} else {
			setImg({ ...img, readyToUpload: true, btnClass: "able" });
		}
		// eslint-disable-next-line
	}, [img.file]);

	const onFileSelect = (e) => {
		const file = e.target.files[0];

		if (file !== null && file !== undefined) {
			setImg({ ...img, file, name: file.name });
		}
	};

	const onFileUpload = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("file", img.file);
		handleUpload(formData);
	};

	const onInputChange = (e) => {
		let value = e.target.value;
		const key = e.target.dataset.key;
		const inputType = e.target.dataset.type;

		if (inputType === undefined) {
			setObj({ ...newObj, [key]: value });
		} else {
			const limit = e.target.dataset.limit;
			const input = validate(inputType, value, limit);

			if (input.isValid && inputType === "ABREV6") {
				setObj({ ...newObj, [key]: input.newValue.toUpperCase() });
			} else if (input.isValid && inputType) {
				setObj({ ...newObj, [key]: input.newValue });
			}
		}
	};

	return (
		<a.div style={spring} className="section">
			<div className="section__heading">
				<h1>
					{isUpdateForm ? "Actualizar" : "Registrar"}
					<span className="text--primary"> escuela</span>
				</h1>
			</div>
			<div className="school__form">
				<div className="u-upload school__form--upload">
					<div className="u-upload__img">
						{newObj.logo !== null && newObj.logo.filePath !== "" ? (
							<img
								src={newObj.logo.filePath}
								alt="Logo"
								className="u-upload__img--content"
							/>
						) : (
							<p className="u-upload--text">Sin logo</p>
						)}
					</div>

					<label
						className="u-upload__label"
						htmlFor="u-upload--input1"
					>
						<p className="u-upload--text u-upload__label--text">
							{img.name !== ""
								? img.name
								: newObj.logo !== null &&
								  newObj.logo.filePath !== ""
								? "Seleccionar otro logo"
								: "Seleccionar logo"}
						</p>
					</label>

					<button
						className={`u-upload__btn u-upload__btn--${img.btnClass}`}
						onClick={onFileUpload}
						disabled={!img.readyToUpload}
					>
						<SVG icon="upload" className="u-upload__btn--icon" />
						<p className="u-upload--text">Subir logo</p>
					</button>

					<input
						type="file"
						className="u-upload--input"
						id="u-upload--input1"
						onChange={onFileSelect}
					/>
				</div>

				<Input
					objKey="name"
					title="Nombre de la escuela"
					placeHolder="Insertar nombre de la escuela"
					value={newObj.name}
					onChange={onInputChange}
					dataType={"SHORT_DESC"}
				/>

				<Input
					objKey="abrev"
					title="Abreviación de la escuela"
					placeHolder="Insertar abreviación de la escuela"
					value={newObj.abrev}
					onChange={onInputChange}
					dataType={"ABREV6"}
				/>

				<Input
					objKey="desc"
					title="Descripción de la escuela"
					placeHolder="Insertar descripción de la escuela"
					value={newObj.desc}
					onChange={onInputChange}
					dataType={"SHORT_DESC"}
				/>

				<Input
					objKey="period"
					title="Periodo de la escuela"
					placeHolder="Insertar periodo de la escuela"
					value={newObj.period}
					onChange={onInputChange}
					dataType={"SHORT_DESC"}
				/>

				<Input
					objKey="address"
					title="Dirección de la escuela"
					placeHolder="Insertar dirección de la escuela"
					value={newObj.address}
					onChange={onInputChange}
					dataType={"SHORT_DESC"}
				/>

				<Input
					objKey="email"
					title="Email de la escuela"
					placeHolder="Insertar email de la escuela"
					value={newObj.email}
					onChange={onInputChange}
					dataType={"SHORT_DESC"}
				/>

				<Input
					objKey="phone1"
					title="Teléfono 1"
					placeHolder="Insertar teléfono 1 de la escuela"
					value={newObj.phone1}
					onChange={onInputChange}
					dataType={"SHORT_DESC"}
				/>

				<Input
					objKey="phone2"
					title="Teléfono 2"
					placeHolder="Insertar teléfono 2 de la escuela"
					value={newObj.phone2}
					onChange={onInputChange}
					dataType={"SHORT_DESC"}
				/>

				<div className="btn--container">
					<Btn
						classNames="btn--primary"
						text={btnText}
						onClick={() => handleSubmit(newObj)}
					/>
					{isUpdateForm && (
						<Btn
							classNames="btn--red"
							text="Cancelar"
							onClick={handleCancel}
						/>
					)}
				</div>
			</div>
		</a.div>
	);
};

SchoolForm.propTypes = {
	isUpdateForm: PropTypes.bool.isRequired,
	obj: PropTypes.object,
	logo: PropTypes.object,
	handleUpload: PropTypes.func.isRequired,
	handleCancel: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired
};

export default SchoolForm;
