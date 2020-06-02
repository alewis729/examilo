import React from "react";
import PropTypes from "prop-types";
import {
	Drawer,
	Toolbar,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@material-ui/core";
import {
	AccountBalanceRounded as IconSchool,
	ImportContactsRounded as IconCourses,
	ClassRounded as IconGroups,
	PeopleRounded as IconStudents,
	DescriptionRounded as IconExams,
	TimelineRounded as IconReports,
	SettingsRounded as IconSettings,
} from "@material-ui/icons";

import { useStyles } from "./style";

const Navigation = ({ open, onNavigate, onClose }) => {
	const classes = useStyles();

	const items = [
		{ value: "school", label: "School", icon: <IconSchool /> },
		{ value: "courses", label: "Courses", icon: <IconCourses /> },
		{ value: "groups", label: "Groups", icon: <IconGroups /> },
		{ value: "students", label: "Students", icon: <IconStudents /> },
		{ value: "exams", label: "Exams", icon: <IconExams /> },
		{ value: "reports", label: "Reports", icon: <IconReports /> },
		{ value: "settings", label: "Settings", icon: <IconSettings /> },
	];

	return (
		<Drawer
			open={open}
			anchor="left"
			onClose={onClose}
			ModalProps={{ BackdropProps: { invisible: true } }}
		>
			<Toolbar />

			<List className={classes.list}>
				{items.map(({ label, value, icon }) => (
					<ListItem
						button
						key={value}
						className={classes.item}
						onClick={() => onNavigate(value)}
					>
						<ListItemIcon>{icon}</ListItemIcon>
						<ListItemText primary={label} />
					</ListItem>
				))}
			</List>
		</Drawer>
	);
};

Navigation.propTypes = {
	open: PropTypes.bool.isRequired,
	onNavigate: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
};

Navigation.defaultProps = {
	onNavigate: () => {},
	onClose: () => {},
};

export default Navigation;
