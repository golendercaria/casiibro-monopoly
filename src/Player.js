import React, { Component } from 'react';

class Player extends Component{

	updateName = event => { 
		this.setState({ name: event.target.value });
	}

	render() { 

		//className={this.props.players[player].position}
		
		let { display, name, score } = this.props.properties

		return (
			<form className={"player " + display}>
				<input
					className="name"
					type="text"
					value={name}
					onChange={(event) => this.props.updatePlayerName(this.props.player, event.target.value)} />
			
				<input
					className="score"
					type="text"
					value={score}
					onChange={(event) => this.props.updatePlayerScore(this.props.player, event.target.value)} />
			
			</form>
		)

	}

}

export default Player;
