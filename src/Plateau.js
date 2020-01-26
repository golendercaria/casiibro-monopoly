import React, { Component, createRef } from 'react';
import defaultCases from './defaultCases';
import Card from './Card.js'
import Dice from './Dice.js'
import Versus from './Versus.js';
import Pieces from './Pieces.js';
//import Rules from './Rules.js';

import gsap from 'gsap';

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
				ref: createRef(),
				score: 0,
				inPrison: false
			},
			playerTwo: {
				display: "right",
				name: "",
				walk: 0,
				position: 0,
				ref: createRef(),
				score: 0,
				inPrison: false
			}
		},
		whoIsTurn: "playerOne",
		currentGame: null,
		pieceIsMoving:false
	}

	savePartie = () => { 
		let data = {
			playerOne: {
				name:this.state.players.playerOne.name,
				position: this.state.players.playerOne.position,
				score: this.state.players.playerOne.score,
			},
			playerTwo: {
				name:this.state.players.playerTwo.name,
				position: this.state.players.playerTwo.position,
				score: this.state.players.playerTwo.score,
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

			//get player one
			const playerOne = this.state.players["playerOne"]
			playerOne.name = data.playerOne.name
			playerOne.position = data.playerOne.position
			//playerOne.position = 30
			playerOne.score = data.playerOne.score
			playerOne.inPrison = data.playerOne.inPrison

			//get player two
			const playerTwo = this.state.players["playerTwo"]
			playerTwo.name = data.playerTwo.name
			playerTwo.position = data.playerTwo.position
			//playerTwo.position = playerOne.position 
			playerTwo.score = data.playerTwo.score
			playerTwo.inPrison = data.playerTwo.inPrison

			this.setState({
				isStart: data.isStart,
				whoIsTurn: data.whoIsTurn,
				players: {
					playerOne,
					playerTwo
				}
			}, () => {
				//repositionne les pieces
				if (playerOne.position !== 0) {
					let [ bottom, left ] = [...this.getLeftAndBottomByPosition(playerOne.position - 1)]
					gsap.to(playerOne.ref.current, { bottom: bottom, left: left, duration:0 })
				}
				if (playerTwo.position !== 0) {
					let [ bottom, left ] = [...this.getLeftAndBottomByPosition(playerTwo.position - 1)]
					gsap.to(playerTwo.ref.current, { bottom: bottom, left: left, duration:0 })
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

			if (cards[i] === undefined ) {
				cards[i] = {
					type: "game",
					game: "",
					position: i
				}
			}

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
				color = "red"
			}

			cards[i].color = color
		}

		this.setState({ cards })
	}

	updatePlayerName = (player, name) => {
		const players = this.state.players
		players[player].name = name
		this.setState({ players });
	}

	updatePlayerScore = (player, score) => { 
		const players = this.state.players
		players[player].score = score
		this.setState({ players }, () => { 
			this.savePartie()
		});
	}

	startGame() {
		if (this.state.players.playerOne.name === "" || this.state.players.playerTwo.name === "") {
		//	alert("Player is missing");
		}

		//affiche dice
		this.setState({ isStart: true })
	}

	getLeftAndBottomByPosition(position) { 

		let bottom = 0;
		let left = 0;
		

		//console.log("getLeftAndBottomByPosition");
		//console.log(position)

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

		if (player.position >= 40) {
			player.position = 0
		}

		let [ bottom, left ] = [...this.getLeftAndBottomByPosition(player.position)]
		
		const tl = gsap.timeline();

		let scaleFactor = 1.2 //1.2
		let animationBeginTime = .3 //.3
		let animationOutTime = .25 //.25
		


		
		if (player.position >= 0 && player.position <= 9) {
			tl.to(refToMove, { bottom: bottom + 45, left: left, scale: scaleFactor, duration:animationBeginTime });
			tl.to(refToMove, { bottom: bottom, left: left, scale: 1, duration: animationOutTime });
		} else if (player.position > 9 && player.position <= 19) {
			tl.to(refToMove, { bottom: bottom + 25 , left: left - 35, scale: scaleFactor, duration:animationBeginTime });
			tl.to(refToMove, { bottom: bottom, left: left, scale: 1, duration: animationOutTime });
		} else if (player.position > 19 && player.position <= 29) {
			tl.to(refToMove, { bottom: bottom + 20, left: left, scale: scaleFactor, duration:animationBeginTime });
			tl.to(refToMove, { bottom: bottom, left: left, scale: 1, duration: animationOutTime });
		} else if (player.position > 29) { 
			tl.to(refToMove, { bottom: bottom + 45, left: left + 25, scale: scaleFactor, duration:animationBeginTime });
			tl.to(refToMove, { bottom: bottom, left: left, scale: 1, duration: animationOutTime });
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
			let nextPlayer = ""

			//potential next player
			if (this.state.whoIsTurn === "playerOne") {
				nextPlayer = "playerTwo"
			} else {
				nextPlayer = "playerOne"
			}

			//s'il n'est pas en prison inversion
			if (!players[nextPlayer].inPrison) {
				whoIsTurn = nextPlayer
			} else { 
				//le joueur courant reste en prison
				whoIsTurn = this.state.whoIsTurn
				//sort le joueur de prison
				players[nextPlayer].inPrison = false
			}

			//pour prison
			if (player.position === 10 || player.position === 30) {
				players[this.state.whoIsTurn].inPrison = true
				//c'est forcement au prochain joueur de joueur (cas de deux personnes en prison)
				if (this.state.whoIsTurn === "playerOne") {
					whoIsTurn = "playerTwo"
				} else {
					whoIsTurn = "playerOne"
				}
			} else { 
				players[this.state.whoIsTurn].inPrison = false
			}
	
			//case depart
			if (player.position === 40) { 
				player.position = 0
			}

			let currentGame = ""	
			if (defaultCases[player.position].type === "chance") {
				currentGame = "card_chance.jpg"
			} else if (defaultCases[player.position].type === "prison") {
				currentGame = "card_prison.jpg"
			} else { 
				currentGame = defaultCases[player.position].game
			}

			this.setState({ players, whoIsTurn, currentGame, pieceIsMoving: "finish" }, () => { 
				this.savePartie()
			})
		}
	}

	movePlayer = (number, is_double) => { 

		//console.log("calling")
		//console.clear()
		
		const player = this.state.players[this.state.whoIsTurn]
		let refToMove = player.ref.current

		this.setState({ pieceIsMoving: true }, () => { 
			this.movePiece(refToMove, player, 1, number);
		})

		
		/*if (this.state.whoIsTurn == "playerOne") {
			this.movePiece(refToMove, player, 1, number, is_double);
		} else { 
			this.movePiece(refToMove, player, 1, 6, is_double);
		}*/
		//this.movePiece(refToMove, player, 1, 43);
	}

	liberateDice = () => { 
		this.setState({pieceIsMoving:false})
	}


	render() {

		if (this.state.cards == null) {
			return (
				<div id="plateau">Loading</div>
			)
		}
		
		return (
			<div className="monopoly">
				
				{/*<Rules />*/}

				<div id="plateau" ref={this.maref}>

					<Versus
						players={this.state.players}
						updatePlayerName={this.updatePlayerName}
						updatePlayerScore={this.updatePlayerScore} />

					{
						this.state.cards.map(
							(card, key) => { 
								//console.log(card)
								return <Card
									key={"card_" + key}
									properties={card}
									positionPlayerOne={this.state.players.playerOne.position}
									positionPlayerTwo={this.state.players.playerTwo.position} />
							}
						)	
					}

					{
						this.state.isStart
							?
							<Dice
								movePlayer={this.movePlayer}
								currentGame={this.state.currentGame}
								pieceIsMoving={this.state.pieceIsMoving}
								liberateDice={this.liberateDice} />						
							:
							<button className="start" onClick={() => this.startGame()}>Start</button>
					}

					{
						this.state.isStart &&
							<Pieces players={this.state.players}/>
					}

				</div>
			</div>
		)

	}

}

export default Plateau;
