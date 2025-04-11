import React from "react";

export function Square(props) {
	return (
		<button 
			className="square" 
			onClick={props.onClick}
			style={{
				position: 'relative',
				overflow: 'hidden'
			}}
		>
			{props.value && (
				<span style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					fontSize: '3rem',
					color: props.value === 'X' ? '#4a6bff' : '#ff6b6b'
				}}>
					{props.value}
				</span>
			)}
		</button>
	);
}
