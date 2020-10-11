import React, { Suspense, useEffect } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer } from '@coreui/react'
import { Loader } from 'reusable'
import { useSelector, useDispatch } from 'react-redux'
// routes config
import routes from 'router'
import { filterModule, plotArray } from 'utils/helpers'
import Page404 from 'modules/placeholder/page404/Page404';
import api from 'utils/api';
import { ActionTypes, actionCreator } from 'utils/actions';
const loading = (
  <Loader bg="transparent" />
)

const AppContent = (_props) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.appState.auth.user)
  const { employeeId, roleId } = user
  const payload = { employeeId, roleId };
  const accessedRoutes = filterModule(routes, roleId)
  const retrieveLeaveRequests = async () => {
    let res = await api.post("/getLeaveRequest", payload)
    // if (!res.error) {

    // }
    console.log(res)
  }


  const fetchTickets = async () => {
    let response = await api.get('/retrieve_tickets')
    if (response.error) {
      console.log('error');
    }
    else {
      var temp = response.data.ticket_information;
      temp = plotArray(temp)
      dispatch(actionCreator(ActionTypes.FETCH_TICKETS, temp))
    }
  }

  useEffect(() => {
    retrieveLeaveRequests()
    fetchTickets()
  }, [])
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {accessedRoutes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => (
                    <route.component {...{ ..._props, ...props }} />
                  )
                  }
                />
              )
            })}
            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
            <Redirect from="/" to="/dashboard" />
            <Redirect from="*" to="/404" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(AppContent)
