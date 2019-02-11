import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class Main extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <h1>Welcome to Decentralized Social Music!</h1>
                <p>Setup your account, start adding musical recommendations for your friends and follow people that may interest you</p>
                <div className="buttons-container">
                    <button>Setup Account</button>
                    <button>Add Music</button>
                    <button>Follow People</button>
                </div>
                <h3>Latest musical recommendations from people using the dApp</h3>
                <div ref="general-recommendations"></div>
            </div>
        )
    }
}

class Recommendation extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

ReactDOM.render(<Main />, document.querySelector('#root'))
