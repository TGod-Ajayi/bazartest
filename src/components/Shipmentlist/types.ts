export interface IPartialProps {}

export interface IProps extends Partial<IPartialProps> {
	data: Array<IShipmentData>;
}
export interface IShipmentData {
	id: string | string;
	name: string;
	cargo: Array<ICargo>;
	origin: string;
	destination: string;
	total: number;
	status: string;
	userId: string;
	type: string;
	services: Array<IServices>;
}
export interface IHeadCell {
	disablePadding: boolean;
	id: string;
	label: string;
	numeric: boolean;
}
type Order = 'asc' | 'desc';
export interface IEnhancedTableProps {
	onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

export interface ICargo {
	type: string;
	description: string;
	volume: number;
}
export interface IServices {
	type: string;
}
