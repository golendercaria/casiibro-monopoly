import React, { Component } from 'react';

let colors = ["blue","green","yellow","orange","pink","darkgreen","purple","red"]

class Rule extends Component{

	render() { 
		
		return (
			<div className="wrapper-rule">
				<div className="wrapper-jeton">
					{
						colors.map((color, key) => { 
							return <div
								className={"jeton " + color}
								key={"color_" + key}
							>
								<input type="text" value="" />
							</div>
						})
					}
				</div>
			</div>
		)

	}

}

export default Rule;
