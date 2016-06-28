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
                User {this.props.params.user}
                / Repo {this.props.params.repo}
                / Path {this.props.params.path}

                <div id='repo' className='col-md-12'>
                    <canvas id='canvas' width={900} height={400} style={{
                        backgroundColor: '#eee'
                    }}></canvas>
                </div>
            </div>
        )
    }
}

module.exports = Repo
