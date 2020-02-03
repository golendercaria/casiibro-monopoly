import React, { Component, createRef } from 'react';


    let keyframes = {
        '1': [{
            transform: 'rotate3d(1, 1, 1, 360deg) rotateX(0deg) scale3d(1, 1, 1)'
        }, {
            transform: 'rotate3d(1, 1, 1, 0deg) rotateX(0deg) scale3d(1, 1, 1)'
        }],
        '2': [{
            transform: 'rotate3d(1, 1, 1, -180deg) rotateX(0deg) scale3d(1, 1, 1)'
        }, {
            transform: 'rotate3d(1, 1, 1, 0deg) rotateX(180deg) scale3d(1, 1, 1)'
        }],
        '3': [{
            transform: 'rotate3d(1, 1, 1, 270deg) rotateX(0deg) scale3d(1, 1, 1)'
        }, {
            transform: 'rotate3d(1, 1, 1, 0deg) rotateX(-90deg) scale3d(1, 1, 1)'
        }],
        '4': [{
            transform: 'rotate3d(1, 1, 1, -270deg) rotateX(0deg) scale3d(1, 1, 1)'
        }, {
            transform: 'rotate3d(1, 1, 1, 0deg) rotateX(90deg) scale3d(1, 1, 1)'
        }],
        '5': [{
            transform: 'rotate3d(1, 1, 1, 270deg) rotateY(0deg) scale3d(1, 1, 1)'
        }, {
            transform: 'rotate3d(1, 1, 1, 0deg) rotateY(-90deg) scale3d(1, 1, 1)'
        }],
        '6': [{
            transform: 'rotate3d(1, 1, 1, -270deg) rotateY(0deg) scale3d(1, 1, 1)'
        }, {
            transform: 'rotate3d(1, 1, 1, 0deg) rotateY(90deg) scale3d(1, 1, 1)'
        }],
    }


class Dice extends Component{

	state = {
		number: null,
		dice1Ref:createRef(),
		dice2Ref: createRef(),
		dice1Value:0,
		dice2Value: 0,
		isRolling: false,
		rollingQty:0
	}

	playbackRate = (timeout, diceAnimate) => {
		diceAnimate.playbackRate *= 0.93;
		timeout = setTimeout( () => this.playbackRate(timeout, diceAnimate), 300);
		if (diceAnimate.playbackRate <= 0.7) {
			clearTimeout(timeout);
				
			
			/*
			let total_value = this.state.dice1Value + this.state.dice2Value
			let is_double = false
			if (this.state.dice1Value === this.state.dice2Value) { 
				let is_double = true
			}*/
			let rollingQty = this.state.rollingQty
			rollingQty++
			if (rollingQty === 1) {
				this.setState({ rollingQty })
			} else if (rollingQty === 2) { 
				this.setState({ rollingQty: 0, isRolling: false }, () => { 
					let total_value = this.state.dice1Value + this.state.dice2Value
					//this.props.movePlayer(20)
					this.props.movePlayer(total_value)
				})
			}
		}
	}

	roll = (diceWrap, number) => {
		let timeout = null;
		let diceAnimate = diceWrap.animate(
			keyframes[number],
			{
				duration: 300,
				iterations: 3,
				fill: 'forwards'
			}
		);

		this.playbackRate(timeout, diceAnimate);
	}

	diceHandler = () => { 
		let randomNumber_dice1 = Math.floor(Math.random() * (6)) + 1
		let randomNumber_dice2 = Math.floor(Math.random() * (6)) + 1
		
		if (this.state.isRolling === false && this.props.pieceIsMoving === false) {
			this.setState({ isRolling: true, dice1Value: randomNumber_dice1, dice2Value: randomNumber_dice2 }, () => {
				this.roll(this.state.dice1Ref.current, randomNumber_dice1)
				this.roll(this.state.dice2Ref.current, randomNumber_dice2)
			})
		}
	}

	gameHandler = () => { 
		if (this.state.isRolling === false && this.props.pieceIsMoving === "finish") { 
			this.props.liberateDice()
		}
	}

	render() { 

		let game = this.props.currentGame

		let url_img = null
		//console.log(process.env)
		if (process.env.NODE_ENV === "development") {
			url_img = "/imagesGames/" + game
		} else { 
			url_img = process.env.PUBLIC_URL + "/imagesGames/" + game
		}

		let dice_class = (this.props.pieceIsMoving === true || this.props.pieceIsMoving === "finish") ? "separate" : ""

		return (
			<div className={"wrapper-dice " + dice_class}>

				<div id="dice1" className="diceWrap" ref={this.state.dice1Ref} onClick={this.diceHandler}>
					<div className="dice dice1">
						<div className="dot"></div>
					</div>
					<div className="dice dice1 inner"></div>
					<div className="dice dice2">
						<div className="dot"></div>
						<div className="dot"></div>
					</div>
					<div className="dice dice2 inner"></div>
					<div className="dice dice3">
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
					</div>
					<div className="dice dice3 inner"></div>
					<div className="dice dice4">
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
					</div>
					<div className="dice dice4 inner"></div>
					<div className="dice dice5">
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
					</div>
					<div className="dice dice5 inner"></div>
					<div className="dice dice6">
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
					</div>
					<div className="dice dice6 inner"></div>
				</div>


				<div id="dice2" className="diceWrap" ref={this.state.dice2Ref} onClick={this.diceHandler}>
					<div className="dice dice1">
						<div className="dot"></div>
					</div>
					<div className="dice dice1 inner"></div>
					<div className="dice dice2">
						<div className="dot"></div>
						<div className="dot"></div>
					</div>
					<div className="dice dice2 inner"></div>
					<div className="dice dice3">
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
					</div>
					<div className="dice dice3 inner"></div>
					<div className="dice dice4">
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
					</div>
					<div className="dice dice4 inner"></div>
					<div className="dice dice5">
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
					</div>
					<div className="dice dice5 inner"></div>
					<div className="dice dice6">
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
					</div>
					<div className="dice dice6 inner"></div>
				</div>

				<div>
					{
						(this.state.number !== null) && this.state.number
					}
				</div>
				<div className="picture" onClick={this.gameHandler}>
					{
						(game !== null) && <img src={url_img} alt="" />
					}
				</div>
			</div>
		)

	}

}

export default Dice;
