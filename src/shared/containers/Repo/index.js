import React, {Component} from 'react'
import Game from 'shared/game'

class Repo extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var params = this.props.params
        Game.start(params.user, params.repo, params.path)
    }

    render() {
        return (
            <div>
                <div id='repo' className='col-md-12'>
                    <canvas id='canvas'></canvas>
                </div>
                <p>User: {this.props.params.user}</p>
                <p>Repo: {this.props.params.repo}</p>
                <p>Path: {this.props.params.path}</p>

            </div>
        )
    }
}

module.exports = Repo
