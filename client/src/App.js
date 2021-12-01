import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'
import Homepage from './pages/HomePage';

import Login from './pages/Login';
import Signup from './pages/Signup';
import CourseRegistered from '../src/pages/CourseRegisteredPage'
import TeacherLogin from '../src/pages/TeacherLoginPage';
import TeacherHome from '../src/pages/TeacherHomePage';
import TeacherStudentList from '../src/pages/TeacherStudentList';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setCurrentUser, setAuth } from './store/store';
import host from './config/host';
function App() {

  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    const authorizationField = "JWT " + localStorage.getItem('TOKEN') 
    const fetchUser = async () => {
      // GETTING AUTH USER DATA

      const userRes = await fetch(`${host}/api/auth`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': authorizationField
        }
      })

      const userData = await userRes.json()
      if (userRes.status === 200) {
        dispatch(setCurrentUser(userData));
        dispatch(setAuth(true));
      }
    }
    if(!localStorage.getItem('TOKEN')){
      dispatch(setCurrentUser({}));
      dispatch(setAuth(false));
    }
    else
      fetchUser()
  }, [dispatch,history])


  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Signup} />
        <Route exact path='/course-registered' component={CourseRegistered} />
        <Route exact path='/teacher/login' component={TeacherLogin} />
        <Route exact path='/teacher' component={TeacherHome} />
        <Route exact path='/teacher/course/:id' component={TeacherStudentList} />
      </Switch>
    </Router>
  );
}

export default App;
