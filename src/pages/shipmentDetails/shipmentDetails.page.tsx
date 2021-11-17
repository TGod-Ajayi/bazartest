import React, { FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IShipmentData } from '../../components/Shipmentlist/types';
import ShipmentService from '../../services/shipment';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

const ShipmentDetailsPage: FC = () => {
	let { id } = useParams();
	const navigate = useNavigate();
	const [shipment, setShipment] = useState<IShipmentData[]>([]);

	const getShipment = () => {
		const shipmentData = ShipmentService.getShipment(`${id}`);
		setShipment(shipmentData);
		//console.log(shipmentData);
	};
	const saveData = () => {
		if (shipment && shipment.length > 0) {
			ShipmentService.updateShipment(shipment[0]);
			navigate('/');
		}
	};

	console.log(shipment);
	useEffect(() => {
		getShipment();
	}, []);
	return (
		<div>
			<Box
				component="form"
				sx={{
					'& > :not(style)': { m: 1, width: '25ch' },
				}}
				style={{ marginLeft: '4em' }}
				noValidate
				autoComplete="off"
			>
				{shipment && shipment.length > 0 ? (
					<>
						<FormLabel style={{ marginLeft: '4em', fontSize: '2rem ' }}>Shipment Details</FormLabel>
						<br></br>
						<TextField label="Shipment ID" disabled={true} id="outlined-basic" variant="outlined" value={shipment[0].id} />

						<TextField
							id="outlined-basic"
							label="Shipment Name"
							variant="outlined"
							onChange={(event) => setShipment(shipment.map((item) => (item != null ? { ...item, name: event.target.value } : item)))}
							value={shipment[0].name}
						/>

						<TextField
							id="outlined-basic"
							label="Shipment Origin"
							variant="outlined"
							value={shipment[0].origin}
							onChange={(event) => setShipment(shipment.map((item) => (item != null ? { ...item, origin: event.target.value } : item)))}
						/>
						<br></br>
						<TextField
							id="outlined-basic"
							onChange={(event) => setShipment(shipment.map((item) => (item != null ? { ...item, destination: event.target.value } : item)))}
							label="Shipment Destination"
							variant="outlined"
							value={shipment[0].destination}
						/>
						<TextField
							value={shipment[0].status}
							label="Shipment Status"
							onChange={(event) => setShipment(shipment.map((item) => (item != null ? { ...item, status: event.target.value } : item)))}
						/>

						<TextField
							value={shipment[0].type}
							label="Shipment Type"
							onChange={(event) => setShipment(shipment.map((item) => (item != null ? { ...item, type: event.target.value } : item)))}
						/>

						<br></br>
						<FormLabel style={{ marginLeft: '10em', fontSize: '1.2rem' }}>Cargos Details</FormLabel>
						<br></br>
						{shipment[0].cargo.map((cargo, index) => (
							<React.Fragment key={index}>
								<TextField
									id="outlined-basic"
									label="Cargo Description"
									onChange={(event) =>
										setShipment(
											shipment.map((item) =>
												item != null
													? {
															...item,
															cargo: item.cargo.map((cargoItem, cargoIndex) => (cargoIndex === index ? { ...cargoItem, description: event.target.value } : cargoItem)),
													  }
													: item,
											),
										)
									}
									variant="outlined"
									value={cargo.description}
								/>
								<TextField
									id="outlined-basic"
									onChange={(event) =>
										setShipment(
											shipment.map((item) =>
												item != null
													? {
															...item,
															cargo: item.cargo.map((cargoItem, cargoIndex) => (cargoIndex === index ? { ...cargoItem, type: event.target.value } : cargoItem)),
													  }
													: item,
											),
										)
									}
									label="Cargo Type"
									variant="outlined"
									value={cargo.type}
								/>
								<TextField
									onChange={(event) =>
										setShipment(
											shipment.map((item) =>
												item != null
													? {
															...item,
															cargo: item.cargo.map((cargoItem, cargoIndex) =>
																cargoIndex === index ? { ...cargoItem, volume: parseInt(event.target.value) } : cargoItem,
															),
													  }
													: item,
											),
										)
									}
									id="outlined-basic"
									type={'number'}
									label="Cargo Volume"
									variant="outlined"
									value={cargo.volume}
								/>
								<br></br>
							</React.Fragment>
						))}

						<br></br>
						<Button disableElevation variant="contained" onClick={saveData}>
							Save
						</Button>
					</>
				) : null}
			</Box>
		</div>
	);
};

export default ShipmentDetailsPage;
