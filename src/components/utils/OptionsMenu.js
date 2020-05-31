import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import SVG from "./SVG";

const OptionsMenu = ({ id, options, setOption, blackDots, special }) => {
	const [chosenOption, setChosenOption] = useState({
		option: "",
		itemId: ""
	});
	const [checked, setChecked] = useState(false);
	const label = useRef();
	const checkbox = useRef();
	const menu = useRef();

	useEffect(() => {
		document.addEventListener("mousedown", handleClick);
		return () => {
			document.removeEventListener("mousedown", handleClick);
		};
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		setOption(chosenOption);
		// eslint-disable-next-line
	}, [chosenOption]);

	const handleClick = (e) => {
		if (menu.current.contains(e.target)) {
			// clicked inside
			if (e.target.dataset.option) onSelect(e);
			if (e.target.dataset.link) return;
		}
		if (!label.current.contains(e.target)) setChecked(false);
	};

	const onSelect = (e) => {
		setChosenOption({
			itemId: id,
			option: e.target.dataset.option
		});
	};

	return (
		<div className="omenu">
			<input
				type="checkbox"
				id={`omenu-input-${id}`}
				ref={checkbox}
				checked={checked}
				onChange={() => setChecked(!checked)}
				className="omenu--checkbox"
			/>
			<label
				htmlFor={`omenu-input-${id}`}
				className={!special ? "omenu__toggle " : "btn btn--black"}
				ref={label}
			>
				{!special ? (
					<SVG
						icon="dots"
						className={"omenu--icon" + (blackDots ? " omenu--icon--black" : "")}
					/>
				) : (
					<span>Opciones</span>
				)}
			</label>

			<CSSTransition in={checked} timeout={200} classNames="transition3">
				<div
					className={
						!special
							? "omenu__options"
							: "omenu__options omenu__options--special"
					}
					ref={menu}
				>
					{options.map((option) =>
						!option.link ? (
							<div
								className="omenu__options--link"
								onClick={onSelect}
								key={uuidv4()}
								data-option={option.text}
							>
								<span
									className="omenu__options--text"
									data-option={option.text}
								>
									{option.text}
								</span>
							</div>
						) : (
							<Link
								to={option.link}
								className="omenu__options--link"
								key={uuidv4()}
								data-link={true}
							>
								<span className="omenu__options--text" data-link={true}>
									{option.text}
								</span>
							</Link>
						)
					)}
				</div>
			</CSSTransition>
		</div>
	);
};

OptionsMenu.propTypes = {
	options: PropTypes.array.isRequired,
	id: PropTypes.string.isRequired,
	blackDots: PropTypes.bool,
	special: PropTypes.bool
};

export default OptionsMenu;
