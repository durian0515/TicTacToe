import React from "react";
import { Card, ListGroup } from "react-bootstrap";

export function HowTo() {
	return (
		<>
			<Card className="howToCard" border="primary">
				<Card.Header>
					<Card.Title>How to play?</Card.Title>
				</Card.Header>
				<Card.Body>
					<Card.Text className="mb-4">
						This is on-chain tictactoe. In this game, every move is recorded in a Smart Contract, which is created using optimized bitwise operators.
					</Card.Text>
					<ListGroup className="list-group-flush">
						<ListGroup.Item className="d-flex align-items-center">
							<span className="me-2 badge bg-primary rounded-circle">1</span>
							First, connect your Metamask wallet
						</ListGroup.Item>
						<ListGroup.Item className="d-flex align-items-center">
							<span className="me-2 badge bg-primary rounded-circle">2</span>
							If you have already created a game, "Choose" that game from the table to continue.
						</ListGroup.Item>
						<ListGroup.Item className="d-flex align-items-center">
							<span className="me-2 badge bg-primary rounded-circle">3</span>
							If want to start a New Game, enter the address of the second player.
						</ListGroup.Item>
					</ListGroup>
				</Card.Body>
				<Card.Footer className="text-muted">
					<small>Powered by Ethereum Smart Contracts</small>
				</Card.Footer>
			</Card>
		</>
	);
}
