import React from 'react';
// import { Redirect } from 'react-router-dom';

const TeacherConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/answer/:sheetID?',
			// '/apps/e-commerce/products/:productId/:productHandle?',
			component: React.lazy(() => import('./Teacher'))
		}
		// {
		// 	path: '/apps/e-commerce/products',
		// 	component: React.lazy(() => import('./products/Products'))
		// },
		// {
		// 	path: '/apps/e-commerce/orders/:orderId',
		// 	component: React.lazy(() => import('./order/Order'))
		// },
		// {
		// 	path: '/apps/e-commerce/orders',
		// 	component: React.lazy(() => import('./orders/Orders'))
		// },
		// {
		// 	path: '/apps/e-commerce',
		// 	component: () => <Redirect to="/apps/e-commerce/products" />
		// }
	]
};

export default TeacherConfig;
