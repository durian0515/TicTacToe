import React from "react";
import { Form, Button, Table, Container, Row, Col, Card } from "react-bootstrap";
import { tictactoe_abi, tictactoe_bytecode, registry_abi } from "../lib/contract_config";
import { ethers, BigNumber } from "ethers";
import { useEffect, useState } from "react";
import truncateEthAddress from "truncate-eth-address";
import { useWeb3React } from "@web3-react/core";
import { registry_address } from "../lib/contract_config";

export function AllGames({ selectedGameFunc }) {
	const [games, setGames] = useState([]);
	const [selectedGame, setSelectedGame] = useState(null);
	const { account } = useWeb3React();

	const findGames = async () => {
		try {
			const { ethereum } = window;
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				let register_address;
				let chainId = await ethereum.request({ method: "eth_chainId" });
				const scroll_chainid = "0x82750";
				const goerli_chainid = "0x5";
				const sepolia_chainid = "0xaa36a7"; // Sepolia chain ID in hex
				
				if (chainId == scroll_chainid) {
					register_address = registry_address;
				} else if (chainId == goerli_chainid) {
					register_address = "0xfD446a9c488bd5b4A4A1CB5a014179fC3b178DaA6";
				} else if (chainId == sepolia_chainid) {
					register_address = "0x3d1f680e46641135bca62cc68cbcb7117ebaf9bb";
				}
				let registry_contract = new ethers.Contract(register_address, registry_abi, signer);
				if (account) {
					let tx = await registry_contract.getGameList(account);

					setGames(tx);
				}
			}
		} catch (e) {
			console.log("Error while finding games", e);
		}
	};

	const resetGame = async (event) => {
		const selectedGameContract = event.target.dataset.id;
		try {
			const { ethereum } = window;
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				let gameContractObj = new ethers.Contract(selectedGameContract, tictactoe_abi, signer);
				if (account) {
					let tx = await gameContractObj.newGame();
				}
			}
		} catch (e) {
			console.log("Error while resetting the game", e);
		}
	};

	const setGame = async (event) => {
		const selectedGameContract = event.target.dataset.id;
		setSelectedGame(selectedGameContract);
		selectedGameFunc(selectedGameContract);
	};

	useEffect(() => {
		if (account) {
			findGames();
		}
	}, [account]);

	return (
		<Card className="mb-4 shadow-sm">
			<Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
				<Card.Title className="mb-0">Your Games</Card.Title>
				<Button variant="light" size="sm" onClick={findGames}>
					Refresh
				</Button>
			</Card.Header>
			<Card.Body>
				{games.length > 0 ? (
					<Table responsive hover className="align-middle">
						<thead className="table-light">
							<tr>
								<th>Game ID</th>
								<th>First Player</th>
								<th>Second Player</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{games.map((game, index) => (
								<tr key={index} className={selectedGame === game.gameAddress ? "table-primary" : ""}>
									<td>{truncateEthAddress(game.gameAddress)}</td>
									<td>{truncateEthAddress(game.firstPlayer)}</td>
									<td>{truncateEthAddress(game.secondPlayer)}</td>
									<td>
										<Button
											variant="outline-primary"
											size="sm"
											className="me-2"
											data-id={game.gameAddress}
											onClick={setGame}
										>
											Choose
										</Button>
										<Button
											variant="outline-danger"
											size="sm"
											data-id={game.gameAddress}
											onClick={resetGame}
										>
											Reset
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				) : (
					<div className="text-center py-4">
						<p className="text-muted mb-0">No games found. Start a new game to begin playing!</p>
					</div>
				)}
			</Card.Body>
		</Card>
	);
}

