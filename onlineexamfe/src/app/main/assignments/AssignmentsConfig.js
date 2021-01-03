import React from 'react';
import { Redirect } from 'react-router-dom';

const AssignmentsConfig = {
	settings: {
		layout: {}	},
	routes: [
		// {
		// 	path: '/apps/academy/courses/:courseId/:courseHandle?',
		// 	component: React.lazy(() => import('./course/Course'))
		// },
		
		{
			path: '/assignments',
			component: React.lazy(() => import('./courses/Assignments'))
		}
	]
};

export default AssignmentsConfig;
