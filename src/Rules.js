import React, { Component } from 'react';

class Rule extends Component{

	state = {
		colors: {
			"blue": {
				stack: 0,
				parties: 0
			},
			"green": {
				stack: 0,
				parties: 0
			},
			"yellow": {
				stack: 0,
				parties: 0
			},
			"orange": {
				stack: 0,
				parties: 0
			},
			"purple": {
				stack: 0,
				parties: 0
			},
			"darkgreen": {
				stack: 0,
				parties: 0
			},
			"darkblue": {
				stack: 0,
				parties: 0
			},
			"red": {
				stack: 0,
				parties: 0
			}
		}
	}

	saveRules = () => { 
		localStorage.setItem("monopoly_rules", JSON.stringify(this.state.colors))
	}

	restoreRules = () => { 
		let colors = JSON.parse(localStorage.getItem("monopoly_rules"))
		if (colors !== null ) { 
			this.setState({colors})
		}
	}

	componentDidMount() { 
		this.restoreRules()
	}

	changeStack = (event, color) => { 
		let colors = this.state.colors
		colors[color].stack = event.target.value
		this.setState({ colors }, () => { 
			this.saveRules()
		})
	}

	changeParties = (event, color) => { 
		let colors = this.state.colors
		colors[color].parties = event.target.value
		this.setState({ colors }, () => { 
			this.saveRules()
		})
	}

	render() { 
		
		return (
			<div className="wrapper-rule">
				<div className="wrapper-jeton">
					{
						Object.keys(this.state.colors).map((color, key) => { 

							const activeClass = (this.props.color === color) ? "active" : ""

							return <div
								className={"jeton " + color + " " + activeClass}
								key={"color_" + key}
							>
								<input
									className="stack"
									type="text"
									value={this.state.colors[color].stack}
									onChange={ (e) => this.changeStack(e, color) }
								/>

								<input
									className="parties"
									type="text"
									value={this.state.colors[color].parties}
									onChange={ (e) => this.changeParties(e, color) }
								/>

								
								
							</div>
						})
					}
				</div>
			</div>
		)

	}

}

export default Rule;
