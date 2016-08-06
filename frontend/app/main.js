import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers/index'
import AppPage from './containers/AppPage'
import CoursesIndex from './containers/courses/Index'
import CoursesEdit from './containers/courses/Edit'

import { Router, Route, browserHistory, IndexRoute } from 'react-router'

require('./assets/styles/main.scss')

let store = createStore(reducers,
                        compose(applyMiddleware(thunk),
                        window.devToolsExtension ? window.devToolsExtension() : f => f))

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/">
        <Route component={AppPage}>
          <IndexRoute component={CoursesIndex}/>
          <Route path="courses">
            <IndexRoute component={CoursesIndex} />
            <Route path="register(/:courseId)" component={CoursesEdit} />
          </Route>
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
