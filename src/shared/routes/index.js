import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from 'shared/components/layouts/App'
import Main from 'shared/containers/Main'
import Repo from 'shared/containers/Repo'
import NotFound from 'shared/containers/NotFound'

export default(
    <Route path="/" component={App}>
        <IndexRoute component={Main}/>
        <Route path="repos/:user/:repo" component={Repo}/>
        <Route path="repos/:user/:repo/:path" component={Repo}/>
        <Route path="*" component={NotFound} status="404"/>
    </Route>
)
