import React, {Component} from 'react'

class App extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <div id="in-app" className="container">
                    <div className="row">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = App
