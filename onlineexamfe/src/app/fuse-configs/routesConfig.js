import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import StudentConfig from 'app/main/student/StudentConfig';
import TeacherConfig from 'app/main/teacher/TeacherConfig';
import ListConfig from 'app/main/lists/ListConfig';
const routeConfigs = [StudentConfig, TeacherConfig, ListConfig];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/answer/new" />
	}
];

export default routes;
