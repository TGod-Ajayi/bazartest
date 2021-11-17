import React, { FC, useState } from 'react';
import { IProps } from './types';
import { useNavigate } from 'react-router-dom';

import { IHeadCell } from '.';
import { TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Table, Paper, Box, TableBody } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import { IEnhancedTableProps } from '../ShipmentList/types';
import { visuallyHidden } from '@mui/utils';

const ShipmentListComp: FC<IProps> = ({ data }) => {
	const [page, setPage] = useState(0);
	const [order, setOrder] = React.useState<Order>('asc');
	const [rowsPerPage, setRowsPerPage] = useState(20);
	const [orderBy, setOrderBy] = React.useState<string>('id');
	const navigate = useNavigate();

	type Order = 'asc' | 'desc';

	function dynamicSort(property: string, order: string) {
		var sortOrder = 1;

		return function (a: any, b: any) {
			var result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
			return order === 'desc' ? -result * sortOrder : result * sortOrder;
		};
	}
	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
		///console.log('property');
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};
	const goToDetails = (id: string) => {
		navigate(`/shipment/${id}`);
	};

	const headCells: readonly IHeadCell[] = [
		{
			id: 'id',
			label: 'ID',
			disablePadding: true,
			numeric: false,
		},
		{
			id: 'name',
			label: 'Name',
			disablePadding: true,
			numeric: false,
		},

		{
			id: 'origin',
			label: 'Origin',
			disablePadding: true,
			numeric: false,
		},
		{
			id: 'destination',
			label: 'Destination',
			disablePadding: true,
			numeric: false,
		},

		{
			id: 'status',
			label: 'Status',
			disablePadding: true,
			numeric: false,
		},
		{
			id: 'total',
			label: 'Total',
			disablePadding: true,
			numeric: false,
		},
	];
	function EnhancedTableHead(props: IEnhancedTableProps) {
		const { onRequestSort } = props;
		const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
			//console.log(property, 'seaw');
			onRequestSort(event, property);
		};
		return (
			<TableHead>
				<TableRow>
					{headCells.map((headCell) => (
						<TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
							<TableSortLabel onClick={createSortHandler(headCell.id)} active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'}>
								{headCell.label}
								{orderBy === headCell.id ? (
									<Box component="span" sx={visuallyHidden}>
										{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
									</Box>
								) : null}
							</TableSortLabel>
						</TableCell>
					))}
				</TableRow>
			</TableHead>
		);
	}
	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 2 }}>
				<TableContainer>
					<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
						<EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} rowCount={data.length} />
						<TableBody>
							{data
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.sort(dynamicSort(orderBy, order))
								.map((shipment, index) => (
									<TableRow key={index} sx={{ cursor: 'pointer' }} onClick={() => goToDetails(shipment.id)}>
										<TableCell component="th" scope="row">
											{shipment.id}
										</TableCell>
										<TableCell align="left">{shipment.name}</TableCell>
										<TableCell align="left">{shipment.origin}</TableCell>
										<TableCell align="left">{shipment.destination}</TableCell>

										<TableCell align="left">{shipment.status}</TableCell>
										<TableCell>{shipment.total}</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination component="div" count={data.length} rowsPerPage={rowsPerPage} rowsPerPageOptions={[20, 25, 50]} page={page} onPageChange={handleChangePage} />
			</Paper>
		</Box>
	);
};
export default ShipmentListComp;
