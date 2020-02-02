import React, { Component } from 'react';

//const images = require.context('./img/games/', true);

//const images = require.context('./../public/images', true);



class Card extends Component{

	render() { 

		let { type, game, color, position } = this.props.properties
		let positionPlayerOne = this.props.positionPlayerOne
		let positionPlayerTwo = this.props.positionPlayerTwo

		let classes = ["card"]
		classes.push( "position-" + position )
		classes.push( "color-" + color )
		classes.push("type-" + type)

		if (position === positionPlayerOne || position === positionPlayerTwo) { 
			classes.push("active")
		}

		/*if (game) { 
			console.log(game)
			game = images(`${game}`);
		}*/

		let url_img = null
		if (process.env.NODE_ENV === "development") {
			//url_img = "../public/imagesGames/" + game
			url_img = process.env.PUBLIC_URL + "/imagesGames/" + game
		} else { 
			url_img = process.env.PUBLIC_URL + "/imagesGames/" + game
		}

		return (
			<div className={classes.join(" ")}>
				{
					(type === "start" || type === "chance" || type === "prison") ?
						"" :

						<img src={url_img} alt="" />
				}		
			</div>
		)

	}

}

export default Card;
