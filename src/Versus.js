import React, { Component } from 'react';
import Player from './Player'

class Versus extends Component{

	render() { 

		return (
			<div className="wrapper-versus">
				{
					Object.keys(this.props.players).map(
						(player, key) => { 
							console.log(this.props.players[player], key)
							return <Player
								key={"player-" + key}
								player={ player }
								updatePlayerName={ this.props.updatePlayerName }
								properties={this.props.players[player]} />
						}
					)
				}
			</div>
		)

	}

}

export default Versus;