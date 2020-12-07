import React from "react";
const ListConfig = {
	settings: {
		layout: {}
	},
	routes: [
		// {
		// 	path: "/operatorform/:id?",
		// 	component: React.lazy(() => import("./admin-owner/components/Operator-Form"))
		// },
		{
			path: "/teachers/view",
			component: React.lazy(() => import("./teachersList/OperatorsList"))
		},
		// {
		// 	path: "/operatorform/new",
		// 	component: React.lazy(() => import("./admin-owner/components/Operator-Form"))
		// },
		{
			path: "/students",
			component: React.lazy(() => import("./studentsList/Operator"))
		},
		// {
		// 	path: "/teams",
		// 	component: React.lazy(() => import("./teams/TeamList"))
		// }
	]
};

export const AdminNavConfig = {
	id: "Admins",
	title: "Operators",
	translate: "Operators",
	type: "group",
	icon: "people",
	children: [
		{
			id: "Admins",
			title: "Operators",
			translate: "Operators",
			type: "item",
			icon: "people",
			url: "/operators"
		},
		{
			id: "Teams",
			title: "Teams",
			translate: "Teams",
			type: "item",
			icon: "group",
			url: "/teams"
		}
	]
};

export default ListConfig;
