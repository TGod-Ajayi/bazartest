import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import ShipmentDetailsPage from '../pages/shipmentdetails';

import RouteNames from './routes';
import ShipmentListPage from '../pages/shipmentlist';

const MainAppRouter: FC = () => {
	return (
		<Routes>
			<Route path={RouteNames.HOME} element={<ShipmentListPage />} />
			<Route path={RouteNames.DETAILS} element={<ShipmentDetailsPage />} />
		</Routes>
	);
};
export default MainAppRouter;
