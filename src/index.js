import React from 'react'
import ReactDOM from 'react-dom'
import myWEB3 from 'web3'
import './index.css'
import ABI from './SocialMusic.json'

class Main extends React.Component {
    constructor() {
        super()

        window.myWeb3 = new myWEB3(myWEB3.givenProvider)
        this.state = {
            isFormHidden: true
        }

        this.setContractInstance()
    }

    async getAccount() {
        return (await myWeb3.eth.getAccounts())[0]
    }

    async setContractInstance() {
        const contractAddress = '0x0217ED41bC271a712f91477c305957Da44f91068'
        const abi = ABI.abi
        const contractInstance = new myWeb3.eth.Contract(abi, contractAddress, {
            from: await this.getAccount(),
            gasPrice: 2e9
        })
        await this.setState({contractInstance: contractInstance})
    }

    async setupAccount(name, age, status) {
        await this.state.contractInstance.methods.setup(this.fillBytes32WithSpaces(name), age, status).send({from: '0x2f6ccd575FA71e2912a31b65F7aFF45C8bf91155'})
    }

    fillBytes32WithSpaces(name) {
        let nameHex = myWeb3.utils.toHex(name)
        for(let i = nameHex.length; i < 66; i++) {
            nameHex = nameHex + '0'
        }
        return nameHex
    }

    render() {
        return (
            <div>
                <h1>Welcome to Decentralized Social Music!</h1>
                <p>Setup your account, start adding musical recommendations for your friends and follow people that may interest you</p>
                <div className="buttons-container">
                    <button onClick={() => {
                        if(this.state.isFormHidden) this.setState({isFormHidden: false})
                        else this.setState({isFormHidden: true})
                    }}>Setup Account</button>
                    <button>Add Music</button>
                    <button>Follow People</button>
                </div>

                <Form
                    className={this.state.isFormHidden ? 'hidden' : ''}
                    cancel={() => {
                        this.setState({isFormHidden: true})
                    }}
                    setupAccount={(name, age, status) => {
                        this.setupAccount(name, age, status)
                    }}
                />

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

class Form extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <form className={this.props.className}>
                <input className="form-input" type="text" ref="form-name" placeholder="Your name" />
                <input className="form-input" type="number" ref="form-age" placeholder="Your age" />
                <textarea className="form-input form-textarea" ref="form-state" placeholder="Your state, a description about yourself"></textarea>
                <div>
                    <button onClick={event => {
                        event.preventDefault()
                        this.props.cancel()
                    }} className="cancel-button">Cancel</button>
                    <button onClick={event => {
                        event.preventDefault()
                        this.props.setupAccount(this.refs['form-name'].value, this.refs['form-age'].value, this.refs['form-state'].value)
                    }}>Submit</button>
                </div>
            </form>
        )
    }
}

ReactDOM.render(<Main />, document.querySelector('#root'))
