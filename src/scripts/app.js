import React from 'react'
import ReactDOM from 'react-dom'	

const app = function() {

	const getCurrentYear = function(){
		var d = new Date()
		return d.getFullYear()
	}

	const TimeMachine = React.createClass({
		getInitialState: function(){
			return {
				year: getCurrentYear(),
				activeButton: ''
			}
		},

		_increaseYear: function (){
				this.state.activeButton = "forward"
				this.state.year += 1
				this.setState({
					year: this.state.year,
					activeButton: this.state.activeButton
				})
		},

		_decreaseYear: function (){
			this.state.activeButton = "backward"
			this.state.year -= 1
			this.setState({
				year: this.state.year,
				activeButton: this.state.activeButton
			})
		},

		_stop: function(){
			this.state.activeButton = "stop"
			this.setState({
				activeButton: this.state.activeButton
			})
			clearInterval(this.future)
			clearInterval(this.past)
		},

		_backward: function(){
			this.future = setInterval(this._decreaseYear,1000)
		}, 

		_forward: function(){
			this.future = setInterval(this._increaseYear,1000)
		},

		render: function(){
			var forwardButton = ''
			var backwardButton = ''
			var stopButton = ''
			if(this.state.activeButton === "forward"){
				forwardButton = 'forward'
			}
			else if(this.state.activeButton === 'backward'){
				backwardButton = 'backward'
			}
			else if (this.state.activeButton === 'stop'){
				stopButton = 'stop'
			}
			
			return (
					<div id="wrapper">
						<h1>Jumper</h1>
						<div className="year-box">The year is: {this.state.year} </div>
						<div className="nav-bar"> 
							<button id={backwardButton} onClick={this._backward}>Go Past</button>
							<button id={stopButton} onClick={this._stop}>Stop</button>
							<button id={forwardButton} onClick={this._forward}>Go Future</button>
						</div>

					</div>
				)
		}
	})

	ReactDOM.render(<TimeMachine/>,document.querySelector('.container'))
}

app()