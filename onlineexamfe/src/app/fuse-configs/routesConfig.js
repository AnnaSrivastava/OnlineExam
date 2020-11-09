import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import StudentConfig from 'app/main/student/StudentConfig';
import TeacherConfig from 'app/main/teacher/TeacherConfig';

const routeConfigs = [StudentConfig, TeacherConfig];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/question/new" />
	}
];

export default routes;
