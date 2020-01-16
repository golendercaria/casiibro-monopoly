import React, { Component } from 'react';

class Player extends Component{

	updateName = event => { 
		this.setState({ name: event.target.value });
	}

	render() { 

		//className={this.props.players[player].position}
		
		let { display, name } = this.props.properties

		return (
			<form className={"player " + display}>
				<input
					type="text"
					value={name}
					onChange={(event) => this.props.updatePlayerName(this.props.player, event.target.value)} />
			</form>
		)

	}

}

export default Player;
