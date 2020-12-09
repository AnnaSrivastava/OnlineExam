import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import StudentConfig from 'app/main/student/StudentConfig';
import TeacherConfig from 'app/main/teacher/TeacherConfig';
import ListConfig from 'app/main/lists/ListConfig';
import questionBankConfig from 'app/main/questionBank/QuestionBankConfig'
const routeConfigs = [StudentConfig, TeacherConfig, ListConfig, questionBankConfig];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/createQuestion" />
	}
];

export default routes;
