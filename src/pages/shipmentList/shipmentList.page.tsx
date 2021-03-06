import React, { FC, useEffect, useState } from 'react';
import ShipmentService from '../../services/shipment';
import ShipmentListComp from '../../components/Shipmentlist/index';
import { IShipmentData } from '../../components/Shipmentlist/types';
import SearchBar from 'material-ui-search-bar';
import _ from 'lodash';

const ShipmentListPage: FC = () => {
	const [apiData, setApiData] = useState<IShipmentData[]>([]);
	const [data, setData] = useState<IShipmentData[]>([]);
	const [searched, setSearched] = useState<string>('');
	const getDataFromServer = async () => {
		const result = await ShipmentService.getShipments();
		if (result.data) {
			const sortedData = _.sortBy(result.data, 'id', 'asc');
			setApiData(sortedData);
			setData(sortedData);
		} else {
			console.log('some error occured');
		}
	};
	useEffect(() => {
		getDataFromServer();
	}, []);
	const requestSearch = (searchedVal: string) => {
		//console.log(searchedVal);
		const filteredRows = apiData.filter((row) => {
			return row.name.toLowerCase().includes(searchedVal.toLowerCase());
		});

		setData(filteredRows);
	};
	const cancelSearch = () => {
		setSearched('');
		requestSearch(searched);
	};

	return (
		<div>
			<SearchBar value={searched} onChange={(searchVal) => requestSearch(searchVal)} onCancelSearch={() => cancelSearch()} />
			<ShipmentListComp data={data} />;
		</div>
	);
};

export default ShipmentListPage;
