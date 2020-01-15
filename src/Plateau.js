import React, { Component, createRef } from 'react';
import defaultCases from './defaultCases';
import Card from './Card.js'
import Dice from './Dice.js'
import Versus from './Versus.js';
import Pieces from './Pieces.js';

import { gsap, TimelineMax } from 'gsap';

/*
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';*/


console.log(gsap);

class Plateau extends Component {

	state = {
		isStart: false,
		cards: null,
		players: {
			playerOne: {
				display: "left",
				name: "alex",
				walk: 0,
				position: 0,
				ref: createRef()
			},
			playerTwo: {
				display: "right",
				name: "lucas",
				walk: 0,
				position: 0,
				ref: createRef()
			}
		},
		whoIsTurn: "playerOne",
	}

	componentDidMount() {
		this.prepareCard()
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

	movePiece = (refToMove, player, nbrMove, maxMove) => {

		let bottom = 0
		let left = 0
		console.log("position :", player.position)

		if (player.position >= 40) { 
			player.position = 0
		}
		
		const tl = new TimelineMax();

		if (player.position >= 0 && player.position <= 9) {
			bottom = (player.position + 1) * 90 + 45
			left = 45

			tl.to(refToMove, .1, { bottom: bottom - 45, left: left, scale: 2 });
			tl.to(refToMove, .2, { bottom: bottom, left: left, scale: 1 });
			
		} else if (player.position > 9 && player.position <= 19) {
			bottom = 10 * 90 + 45
			left = (player.position - 9) * 90 + 45

			tl.to(refToMove, .1, { bottom: bottom, left: left - 45, scale: 2 });
			tl.to(refToMove, .2, { bottom: bottom, left: left, scale: 1 });

		} else if (player.position > 19 && player.position <= 29) {
			bottom = (29 - player.position) * 90 + 45
			left = 10 * 90 + 45

			tl.to(refToMove, .1, { bottom: bottom + 45, left: left, scale: 2 });
			tl.to(refToMove, .2, { bottom: bottom, left: left, scale: 1 });

		} else if (player.position > 29) { 
			bottom = 45
			left = (40 - player.position) * 90 - 45

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
			/*let whoIsTurn = ""
			if (this.state.whoIsTurn == "playerOne") {
				whoIsTurn = "playerTwo"
			} else {
				whoIsTurn = "playerOne"
			}*/
			this.setState({ players/*, whoIsTurn*/ })
		}

		


		/*
		gsap.to(refToMove, { duration: 1, css: { bottom: bottom, scale: 2 } }, 0 + nbrMove - 1)
		gsap.to(refToMove, {
			duration: 2,
			css: { bottom: bottom, scale: 1 },
			onComplete: () => {
					if (nbrMove < maxMove) {
						nbrMove = nbrMove + 1
						//recursif nbrMove++
						this.movePiece(refToMove, player, nbrMove, maxMove)
					} else {
						player.position += maxMove
						let whoIsTurn = null
						if (this.state.whoIsTurn == "playerOne") {
							whoIsTurn = "playerTwo"
						} else {
							whoIsTurn = "playerOne"
						}
						//this.setState({ whoIsTurn })
					}
				}
			},
			2 + nbrMove - 1
		);*/

	}

	movePlayer = (number) => { 

		//créer une variable piece moving

		console.clear()
		
		//console.log(this.state.whoIsTurn);
	
		const player = this.state.players[this.state.whoIsTurn]
		let refToMove = player.ref.current

		//console.clear()
		//console.log(player)

		//this.movePiece(refToMove, player, 1, number);
		this.movePiece(refToMove, player, 1, 43);

		/*
		for (let i = 1; i <= number; i++) { 
			console.log(i)
			setTimeout(function () { console.log("time")},1000)
		}

		animPiece()*/
		//bottom = 45 + 

		//gsap.to(refToMove, { duration: 0.2, css: { bottom: 135, scale: 1.5 } })
		//gsap.fromTo(refToMove, 0.2, {scale:1.5},{ scale:1 }, 1);

		//this.setState({ player })

		//animation.to(refToMove, 1,{ left: "100px" } )
		//TweenMax(refToMove, 1, { left: "100px" }, 0)

		/*
		if (this.state.whoIsTurn == "playerOne") { 
			console.log(this.playerOneRef)
		}*/
		/*
		const players = this.state.players
		players[this.state.whoIsTurn].walk = number
		this.setState({ players });*/

		/*
		//order move piece
		
		//set state position for player
		console.log("move player to " + number)
		
		console.log( this.state.whoIsTurn)
		*/
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
