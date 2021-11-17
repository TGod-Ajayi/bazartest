/**
 * This file handles getting & updating a shipment
 * also persisting a shipment
 */
import { axiosInstance } from '../networking/axiosClient';
import { IShipmentData } from '../components/Shipmentlist/types';

class ShipmentService {
	static async getShipments() {
		try {
			const dataFromCache = this.retrieveFromCache();
			if (dataFromCache) {
				const result: IResult = {
					hasError: false,
					data: dataFromCache,
					error: null,
				};
				return result;
			} else {
				const data = await (await axiosInstance.get('/shipments')).data;
				this.saveDataToCache(data);

				const result: IResult = {
					data: data,
					hasError: false,
					error: null,
				};
				return result;
			}
		} catch (error: any) {
			console.log(error);
			const result: IResult = {
				data: null,
				hasError: true,
				error: error.response.data,
			};
			return result;
		}
	}
	static retrieveFromCache() {
		const dataRaw = localStorage.getItem('shipmentData');
		if (dataRaw) {
			return JSON.parse(dataRaw);
		} else {
			return null;
		}
	}
	static saveDataToCache(data: IShipmentData[]) {
		const dataStringy = JSON.stringify(data);
		localStorage.setItem('shipmentData', dataStringy);
	}
	static updateShipment(shipment: IShipmentData) {
		//console.log(shipment, 'saved data');
		const shipmentCache = this.retrieveFromCache();
		if (shipmentCache) {
			const removedShipment = shipmentCache.filter((x: IShipmentData) => x.id !== shipment.id);
			//console.log('removedShip', removedShipment);
			const newShipment = [...removedShipment, shipment];

			this.saveDataToCache(newShipment);
		}
	}
	static getShipment(id: string) {
		const shipmentCache = this.retrieveFromCache();
		if (shipmentCache) {
			const shipment = shipmentCache.filter((x: IShipmentData) => x.id === id);
			return shipment;
		}
	}
}
interface IResult {
	data: any;
	hasError: boolean;
	error: null;
}

const updateShipment = async () => {};
const saveDataToCache = (data: IShipmentData[]) => {
	const dataStringy = JSON.stringify(data);
	localStorage.setItem('shipmentData', dataStringy);
};
const retrieveFromCache = () => {
	const dataRaw = localStorage.getItem('shipmentData');
	if (dataRaw) {
		return JSON.parse(dataRaw);
	}
	return null;
};
export default ShipmentService;
