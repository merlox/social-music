import React from 'react'
import ReactDOM from 'react-dom'
import web3 from 'web3'
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
                <div ref="general-recommendations">
                    <Recommendation
                        name="John"
                        address="0x5912d3e530201d7B3Ff7e140421F03A7CDB386a3"
                        song="Regulate - Nate Dogg"
                    />
                    <Recommendation
                        name="Martha"
                        address="0x1034403ad2f8e9da55272CEA16ec1f2cBdae0E5c"
                        song="X - Xzibit"
                    />
                    <Recommendation
                        name="Maria"
                        address="0x15D59aF5c4CE1fF5e2c45B2047930d41A837Cd74"
                        song="Red Lights - Ghost'n'ghost"
                    />
                    <Recommendation
                        name="Tomas"
                        address="0x809E1D7895B930f638dFe37a110078036062E5C9"
                        song="Yalla - INNA"
                    />
                    <Recommendation
                        name="Winston"
                        address="0x2f6ccd575FA71e2912a31b65F7aFF45C8bf91155"
                        song="Casanova - Thomas Hayden"
                    />
                </div>
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
            <div className="recommendation">
                <div className="recommendation-name">{this.props.name}</div>
                <div className="recommendation-address">{this.props.address}</div>
                <div className="recommendation-song">{this.props.song}</div>
            </div>
        )
    }
}

ReactDOM.render(<Main />, document.querySelector('#root'))
