import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useModal } from "react-modal-hook";

import { Header, Navigation } from "@/components/organisms";

const HeaderSimple = ({ ...props }) => {
	const history = useHistory();
	const [isNavigationOpen, setIsNavigationOpen] = useState(false);

	const handleShowNavigation = () => {
		if (isNavigationOpen) hideNavigation();
		else showNavigation();
		setIsNavigationOpen(!isNavigationOpen);
	};

	const handleNavigation = value => {
		history.push(value);
	};

	const handleClose = () => {
		setIsNavigationOpen(false);
		hideNavigation();
	};

	const [showNavigation, hideNavigation] = useModal(({ in: open }) => (
		<Navigation
			open={open}
			onNavigate={handleNavigation}
			onClose={handleClose}
		/>
	));

	return <Header onMenuClick={handleShowNavigation} {...props} />;
};

export default HeaderSimple;
