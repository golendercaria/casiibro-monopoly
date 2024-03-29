import React, { Component } from 'react';

class Pieces extends Component{

	render() { 

		return (
			<div className="pieces">
				{
					Object.keys(this.props.players).map(
						(player, key) => {
							//this.props.players[ player ]
							return (
								<div
									ref={this.props.players[player].ref}
									id={player}
									className="piece"
									key={"piece-" + key}>{/*this.props.players[ player ].name*/}</div>
							)
						}
					)
				}
			</div>
		)

	}

}

export default Pieces;
