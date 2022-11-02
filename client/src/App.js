import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from "react-helmet";
import Header from './components/Header/Header'
import Body from './components/Body/Body'
import axios from 'axios'
import ACTIONS from './redux/actions/index'
import { dispatchLoginUser, dispatchLoginTrainer, dispatchLoginAdmin, fetchUser, fetchAdmin, dispatchGetUser, dispatchGetAdmin, fetchTrainer, dispatchGetTrainer } from './redux/actions/authAction'
import Footer from './components/Footer/Footer'
import HomeAcademy from './page/HomeAcademy'
import ClassCourse from './page/User/ClassCourse'
import Login from './page/User/Login'

export default function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)
  const { tokenUser, tokenTrainer, tokenAdmin } = token
  const { isUser, isTrainer, isAdmin } = auth
  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    const secondLogin = localStorage.getItem('secondLogin')
    const adminLogin = localStorage.getItem('admin')
    if (firstLogin && !secondLogin && !adminLogin) {
      // console.log('firstLogin', tokenUser);
      const getToken = async () => {
        const res = await axios.post('/user/refresh_token', null)
        dispatch({ type: ACTIONS.GET_TOKEN_USER, payload: res.data.access_token })
      }
      getToken()
    }
    if (secondLogin && !adminLogin) {
      const getTokenTrainer = async () => {
        const res = await axios.post('/trainer/refresh_token', null)
        dispatch({ type: ACTIONS.GET_TOKEN_TRAINER, payload: res.data.access_token })
      }
      getTokenTrainer()
    }
    if (adminLogin) {
      const getTokenAdmin = async () => {
        const res = await axios.post('/admin/refresh_token', null)
        dispatch({ type: ACTIONS.GET_TOKEN_ADMIN, payload: res.data.access_token })
      }
      getTokenAdmin()
    }
  }, [dispatch, isUser, isTrainer, isAdmin])

  useEffect(() => {
    if (tokenUser) {
      const getUser = () => {
        dispatch(dispatchLoginUser())
        return fetchUser(tokenUser).then(res => {
          dispatch(dispatchGetUser(res))
        })
      }
      getUser()
    }
    if (tokenTrainer) {
      const getTrainer = () => {
        dispatch(dispatchLoginTrainer())
        return fetchTrainer(tokenTrainer).then(res => {
          dispatch(dispatchGetTrainer(res))
        })
      }
      getTrainer()
    }
    if (tokenAdmin) {
      const getAdmin = () => {
        dispatch(dispatchLoginAdmin())
        return fetchAdmin(tokenAdmin).then(res => {
          dispatch(dispatchGetAdmin(res))
        })
      }
      getAdmin()
    }

  }, [token, dispatch, tokenUser, tokenTrainer, tokenAdmin])
  return (
    <Router>
      {/* <div className="App">
        <Header />
        <div style={{ marginTop: "70px" }}>
          <Body />
          <Footer />
        </div>
      </div> */}
      <Switch>
        {/* <Route path="/login" component={isUser || isTrainer ? NotFound : Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/login/user" component={isUser ? NotFound : LoginUser} exact />
        <Route path="/login/trainer" component={isTrainer ? NotFound : LoginTrainer} exact />
        <Route path="/admin" component={isAdmin ? NotFound : LoginAdmin} exact />
        <Route path="/register/user" component={isUser ? NotFound : RegisterUser} exact />
        <Route path="/register/trainer" component={isUser ? NotFound : RegisterTrainer} exact />
        <Route path="/forgot_password_user" component={isUser ? NotFound : ForgotPassword} exact />
        <Route path="/forgot_password_trainer" component={isTrainer ? NotFound : ForgotPasswordTrainer} exact />
        <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />
        <Route path="/admin/activate/:activation_token" component={ActivationEmailTrainer} exact />
        <Route path="/user/reset/:token" component={isUser ? NotFound : ResertPassword} exact />
        <Route path="/trainer/reset/:token" component={isTrainer ? NotFound : ReserPasswordTrainer} exact />
        <Route path="/edit_user/:id" component={isAdmin ? EditUser : ResertPassword} exact />
        <Route path="/profile/trainer" component={isTrainer ? ProfileTrainer : NotFound} exact />
        <Route path="/admin/profile" component={isAdmin ? ProfileAdmin : NotFound} exact />
        <Route path="/admin/managerTrainer" component={isAdmin ? ManagerTrainer : NotFound} exact />
        <Route path="/admin/dashboard" component={isAdmin ? DashBoardAdmin : NotFound} exact />
        <Route path="/admin/managerUser" component={isAdmin ? ManagerUser : NotFound} exact />
        <Route path="/admin/managerCate" component={isAdmin ? ManagerCate : NotFound} exact />
        <Route path="/tutorial" component={isTrainer ? TutorialManager : NotFound} exact />
        <Route path="/tutorial/:id" component={isTrainer ? CoursesManager : NotFound} exact />
        <Route path="/courses/" component={isTrainer ? DashBoardTrainer : NotFound} exact />
        <Route path="/courses/:name" component={isUser ? TutorialDetail : NotFound} exact />
        <Route path="/learning/:name" component={isUser ? DetailCourses : NotFound} exact />
        <Route path="/checkBody" component={isUser ? CheckBody : NotFound} exact />
        <Route path="/profile/user" component={isUser ? ProfileUser : NotFound} exact />
        <Route path="/courseOwner" component={isUser ? CoursesOwner : NotFound} exact />
        <Route path="/favorite" component={isUser ? Favorite : NotFound} exact />
        <Route path="/discovery" component={isUser ? Discovery : NotFound} exact />
        <Route path="/messenger" component={isUser || isTrainer ? Messenger : NotFound} exact /> */}
        <Route path="/classCourses" component={ClassCourse} exact />
        <Route path="/home" component={HomeAcademy} exact />
        <Route path="/login" component={Login} exact />

      </Switch>
      {/* <Helmet>
      <script src="./js/owl.carousel.min.js"></script>
        <script src=
          "./js/main.js" />
      </Helmet> */}
    </Router>
  )
}
