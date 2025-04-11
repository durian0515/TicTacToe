import React from "react";
import { useState, useEffect } from "react";
import { Container, NavDropdown, Nav, Navbar } from "react-bootstrap";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import truncateEthAddress from "truncate-eth-address";
import { ToastContainer, toast } from "react-toastify";

export function NavBarConnect() {
	const { active, account, library, connector, activate, deactivate } = useWeb3React();

	const connectWallet = async () => {
		try {
			const injected = await new InjectedConnector({
				supportedChainIds: [11155111, 534353, 5, 534352, 137],
			});
			await activate(injected);
		} catch (e) {
			console.log("Error connecting to metamask", e);
		}
	};
	const disconnectWallet = async () => {
		try {
			await deactivate();
		} catch (e) {
			console.log("Error while disconnecting metamask");
		}
	};

	return (
		<Navbar bg="white" fixed="top" expand="lg" className="border-bottom">
			<Container>
				<Navbar.Brand href="#home" className="d-flex align-items-center">
					<svg 
						xmlns="http://www.w3.org/2000/svg" 
						width="24" 
						height="24" 
						fill="currentColor" 
						className="bi bi-grid-3x3-gap-fill me-2" 
						viewBox="0 0 16 16"
						style={{ color: 'var(--primary-color)' }}
					>
						<path d="M1 2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V2zm5 0a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V2zm5 7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V9zM1 7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7zm5 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-2z"/>
					</svg>
					<span>TicTacToe</span>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link 
							href="https://github.com/durian0515/TicTacToe" 
							target="_blank"
							className="d-flex align-items-center"
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
								<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
							</svg>
						</Nav.Link>
						{account ? (
							<NavDropdown 
								id="nav-dropdown-dark-example" 
								title={
									<span className="d-flex align-items-center">
										<span className="me-2" style={{ 
											width: '8px', 
											height: '8px', 
											borderRadius: '50%', 
											backgroundColor: '#28a745' 
										}}></span>
										{truncateEthAddress(account)}
									</span>
								}
							>
								<NavDropdown.Item href="#action/3.1" onClick={disconnectWallet}>
									Disconnect
								</NavDropdown.Item>
							</NavDropdown>
						) : (
							<Nav.Item as="button" className="btn btn-primary btn-sm" onClick={connectWallet}>
								Connect Wallet
							</Nav.Item>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

