import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import ECommerceAppConfig from 'app/main/product/ECommerceAppConfig';

const routeConfigs = [ECommerceAppConfig];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/answer/new" />
	}
];

export default routes;
