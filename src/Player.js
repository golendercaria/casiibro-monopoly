import React, { Component } from 'react';

class Player extends Component{

	
	state = {
		score:this.props.properties.score
	}

	updateName = event => { 
		this.setState({ name: event.target.value });
	}

	calculatriceHanler = event => { 
		let score = event.target.value	
		score = score.replace(" ", "")
		try {
			let calculated_score = eval(score)
			this.props.updatePlayerScore(this.props.player,calculated_score)
		} catch (exception) { 

		}
		this.setState({score})
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
				<input
					className="calculatrice"
					type="text"
					value={this.state.score}
					onChange={this.calculatriceHanler} />
				

			</form>
		)

	}

}

export default Player;
