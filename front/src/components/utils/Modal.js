import React, { Fragment, useRef } from "react";
import PropTypes from "prop-types";
import { useTransition, animated as a } from "react-spring";

const Modal = ({
	display,
	title,
	children,
	btnCancelTxt,
	onCancel,
	btn1,
	onAction1
}) => {
	const modalBg = useRef();

	const transitionBg = useTransition(display, null, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 }
	});

	const transitionModal = useTransition(display, null, {
		from: { opacity: 0, transform: "translate(-50%, -70%)" },
		enter: { opacity: 1, transform: "translate(-50%, -50%)" },
		leave: { opacity: 0, transform: "translate(-50%, -70%)" }
	});

	const handleClick = (e) => {
		if (e.target === modalBg.current) onCancel();
	};

	return (
		<Fragment>
			{transitionBg.map(
				({ item, props, key }) =>
					item && (
						<a.div
							style={props}
							key={key}
							className="modal--bg"
							ref={modalBg}
							onClick={handleClick}
						/>
					)
			)}
			{transitionModal.map(
				({ item, props, key }) =>
					item && (
						<a.div style={props} key={key} className="modal">
							<div className="modal--content">
								<h2 className="modal--title">{title}</h2>
								<section className="modal__main">
									{children ? (
										<Fragment>{children}</Fragment>
									) : (
										<p className="modal__main--text">
											Ops, algo salió mal!
										</p>
									)}
								</section>
								<section className="modal__cta">
									{btn1 !== undefined && (
										<button
											className={`btn ${btn1.className}`}
											onClick={onAction1}
										>
											<span>{btn1.text}</span>
										</button>
									)}
									<button
										className="btn btn--black"
										onClick={onCancel}
									>
										<span>
											{btnCancelTxt
												? btnCancelTxt
												: "Cancelar"}
										</span>
									</button>
								</section>
							</div>
						</a.div>
					)
			)}
		</Fragment>
	);
};

Modal.propTypes = {
	display: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	btnCancelTxt: PropTypes.string,
	onCancel: PropTypes.func.isRequired,
	btn1: PropTypes.object,
	onAction1: PropTypes.func
};

export default Modal;
