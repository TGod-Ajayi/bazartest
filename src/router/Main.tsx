import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import ShipmentDetailsPage from '../pages/shipmentDetails';
import ShipmentListPage from '../pages/shipmentList';
import RouteNames from './routes';

const MainAppRouter: FC = () => {
	return (
		<Routes>
			<Route path={RouteNames.HOME} element={<ShipmentListPage />} />
			<Route path={RouteNames.DETAILS} element={<ShipmentDetailsPage />} />
		</Routes>
	);
};
export default MainAppRouter;
