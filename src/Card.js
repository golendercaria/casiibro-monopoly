import React, { Component } from 'react';

class Card extends Component{

	render() { 

		let { type, game, color, position } = this.props.properties

		let classes = ["card"]
		classes.push( "position-" + position )
		classes.push( "color-" + color )
		classes.push( "type-" + type )

		return (
			<div className={classes.join(" ")}>
				{
					(type === "start" || type === "chance" || type === "prison") ?
						type :
						"card"
				}		
			</div>
		)

	}

}

export default Card;
