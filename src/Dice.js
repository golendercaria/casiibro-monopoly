import React, { Component } from 'react';

class Dice extends Component{

	state = {
		number:null
	}

	diceHandler = () => { 

		let randomNumber = Math.floor(Math.random() * (6)) + 1
		this.props.movePlayer(randomNumber)
		this.setState({ number: randomNumber})

	}

	render() { 

		return (
			<div className="wrapper-dice">
				<button onClick={this.diceHandler}>random</button>
				<div>
				{
					(this.state.number !== null) && this.state.number
				}
				</div>
			</div>
		)

	}

}

export default Dice;
