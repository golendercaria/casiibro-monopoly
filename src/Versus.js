import React, { Component } from 'react';
import Player from './Player'

class Versus extends Component{

	render() { 

		return (
			<div className="wrapper-versus">
				{
					Object.keys(this.props.players).map(
						(player, key) => { 
							return <Player
								key={"player-" + key}
								player={ player }
								updatePlayerName={this.props.updatePlayerName}
								updatePlayerScore={this.props.updatePlayerScore}
								properties={this.props.players[player]} />
						}
					)
				}
			</div>
		)

	}

}

export default Versus;