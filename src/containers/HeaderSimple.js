import React, { useState } from "react";
import { useModal } from "react-modal-hook";

import { Header, Navigation } from "@/components/organisms";

const HeaderSimple = ({ ...props }) => {
	const [isNavigationOpen, setIsNavigationOpen] = useState(false);

	const handleMenuClick = () => {
		if (isNavigationOpen) hideNavigation();
		else showNavigation();
		setIsNavigationOpen(!isNavigationOpen);
	};

	const handleClose = () => {
		setIsNavigationOpen(false);
		hideNavigation();
	};

	const [showNavigation, hideNavigation] = useModal(({ in: open }) => (
		<Navigation open={open} onClose={handleClose} />
	));

	return <Header onMenuClick={handleMenuClick} {...props} />;
};

export default HeaderSimple;
