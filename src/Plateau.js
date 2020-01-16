import React, { Component, createRef } from 'react';
import defaultCases from './defaultCases';
import Card from './Card.js'
import Dice from './Dice.js'
import Versus from './Versus.js';
import Pieces from './Pieces.js';

import { TimelineMax, TweenMax } from 'gsap';

class Plateau extends Component {

	state = {
		isStart: false,
		cards: null,
		players: {
			playerOne: {
				display: "left",
				name: "",
				walk: 0,
				position: 0,
				ref: createRef()
			},
			playerTwo: {
				display: "right",
				name: "",
				walk: 0,
				position: 0,
				ref: createRef()
			}
		},
		whoIsTurn: "playerOne",
	}

	//let options = JSON.parse(localStorage.getItem("tetris_options"))

	/*
	componentWillUnmount() {
		localStorage.setItem("tetris_options", JSON.stringify(this.state.options))
		window.removeEventListener("keydown", this.keydownActions)
	}*/

	savePartie = () => { 
		let data = {
			playerOne: {
				name:this.state.players.playerOne.name,
				position:this.state.players.playerOne.position,
			},
			playerTwo: {
				name:this.state.players.playerTwo.name,
				position:this.state.players.playerTwo.position,
			},
			whoIsTurn: this.state.whoIsTurn,
			isStart:this.state.isStart
		}

		localStorage.setItem("monopoly_data", JSON.stringify(data))
	}

	restorePartie = () => {
		let data = JSON.parse(localStorage.getItem("monopoly_data"))
		//console.log("data restored")
		//console.log(data)
		if (data !== null) { 

			console.log("RESTORATION");

			//get player one
			const playerOne = this.state.players["playerOne"]
			playerOne.name = data.playerOne.name
			playerOne.position = data.playerOne.position

			//get player two
			const playerTwo = this.state.players["playerTwo"]
			playerTwo.name = data.playerTwo.name
			playerTwo.position = data.playerTwo.position

			console.log("who is turn ", data.whoIsTurn)

			this.setState({
				isStart: data.isStart,
				whoIsTurn: data.whoIsTurn,
				players: {
					playerOne,
					playerTwo
				}
			}, () => {
				//repositionne les pieces
				if (playerOne.position != 0) {
					let [ bottom, left ] = [...this.getLeftAndBottomByPosition(playerOne.position - 1)]
					TweenMax.to(playerOne.ref.current, 0, { bottom: bottom, left: left })
				}
				if (playerTwo.position != 0) {
					let [ bottom, left ] = [...this.getLeftAndBottomByPosition(playerTwo.position - 1)]
					TweenMax.to(playerTwo.ref.current, 0, { bottom: bottom, left: left })
				}
			})
		}
	}

	componentDidMount() {
		this.prepareCard()
		this.restorePartie()
	}


	
	//merge default card with random card
	prepareCard() {

		let cards = []
		for (let i in defaultCases) {
			cards[defaultCases[i].position] = defaultCases[i]
		}

		for (let i = 0; i < 40; i++) {
			if (cards[i] === undefined) {

				let color = null
				if (i < 5) {
					color = "blue"
				} else if (i > 5 && i < 10) {
					color = "green"
				} else if (i > 10 && i < 15) {
					color = "yellow"
				} else if (i > 15 && i < 20) {
					color = "orange"
				} else if (i > 20 && i < 25) {
					color = "purple"
				} else if (i > 25 && i < 30) {
					color = "darkgreen"
				} else if (i > 30 && i < 35) {
					color = "darkblue"
				} else if (i > 35 && i < 40) {
					color = "brown"
				}

				cards[i] = {
					type: "game",
					game: "test",
					color: color,
					position: i
				}
			}
		}

		this.setState({ cards })
	}

	updatePlayerName = (player, name) => {
		const players = this.state.players
		players[player].name = name
		this.setState({ players });
	}

	startGame() {
		if (this.state.players.playerOne.name === "" || this.state.players.playerTwo.name === "") {
			alert("Player is missing");
		}

		//affiche dice
		this.setState({ isStart: true })
	}

	getLeftAndBottomByPosition(position) { 

		let bottom = 0;
		let left = 0;

		if (position >= 0 && position <= 9) {
			bottom = (position + 1) * 90 + 45
			left = 45
		} else if (position > 9 && position <= 19) {
			bottom = 10 * 90 + 45
			left = (position - 9) * 90 + 45
		} else if (position > 19 && position <= 29) {
			bottom = (29 - position) * 90 + 45
			left = 10 * 90 + 45
		} else if (position > 29) { 
			bottom = 45
			left = (40 - position) * 90 - 45
		}
		
		return [bottom, left]
	}

	getBottomByPosition(position) { 

	}

	movePiece = (refToMove, player, nbrMove, maxMove) => {


		console.log("position :", player.position)

		if (player.position >= 40) {
			player.position = 0
		}

		let [ bottom, left ] = [...this.getLeftAndBottomByPosition(player.position)]
		
		const tl = new TimelineMax();

		if (player.position >= 0 && player.position <= 9) {
			tl.to(refToMove, .1, { bottom: bottom - 45, left: left, scale: 2 });
			tl.to(refToMove, .2, { bottom: bottom, left: left, scale: 1 });
		} else if (player.position > 9 && player.position <= 19) {
			tl.to(refToMove, .1, { bottom: bottom, left: left - 45, scale: 2 });
			tl.to(refToMove, .2, { bottom: bottom, left: left, scale: 1 });
		} else if (player.position > 19 && player.position <= 29) {
			tl.to(refToMove, .1, { bottom: bottom + 45, left: left, scale: 2 });
			tl.to(refToMove, .2, { bottom: bottom, left: left, scale: 1 });
		} else if (player.position > 29) { 
			tl.to(refToMove, .1, { bottom: bottom, left: left + 45, scale: 2 });
			tl.to(refToMove, .2, { bottom: bottom, left: left, scale: 1 });
		}
	
		//if( player.position )
		const players = this.state.players
		players[this.state.whoIsTurn].position++

		if (nbrMove < maxMove) {
			this.setState({ players })
			nbrMove++
			tl.eventCallback("onComplete", this.movePiece, [refToMove, player, nbrMove, maxMove]);
		} else {
			let whoIsTurn = ""
			if (this.state.whoIsTurn == "playerOne") {
				whoIsTurn = "playerTwo"
			} else {
				whoIsTurn = "playerOne"
			}

			console.log(players)

			this.setState({ players, whoIsTurn }, () => { 
				this.savePartie()
			})
		}
	}

	movePlayer = (number) => { 

		console.clear()
		
		const player = this.state.players[this.state.whoIsTurn]
		let refToMove = player.ref.current

		this.movePiece(refToMove, player, 1, number);
		//this.movePiece(refToMove, player, 1, 43);
	}


	render() {

		if (this.state.cards == null) {
			return (
				<div id="plateau">Loading</div>
			)
		}
		
		return (
			<div id="plateau" ref={this.maref}>

				<Versus
					players={this.state.players}
					updatePlayerName={this.updatePlayerName} />

				{
					this.state.cards.map(
						(card, key) => { 
							//console.log(card)
							return <Card
								key={"card_" + key}
								properties={card} />
						}
					)	
				}

				{
					this.state.isStart
						?
							<Dice movePlayer={this.movePlayer} />						
						:
						<button className="start" onClick={() => this.startGame()}>Start</button>
				}

				{
					this.state.isStart &&
						<Pieces players={this.state.players}/>
				}

			</div>
		)

	}

}

export default Plateau;
