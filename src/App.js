import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import UsersContainer from './components/Users/UsersContainer';
import LoginPage from './components/Login/Login';
import Preloader from './components/common/Preloader/Preloader';
import Cats from './components/Cats/Cats';
import {Route,BrowserRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { initializeApp } from './redux/AppReducer';
import { withSuspens } from './hoc/withSuspens';
import Albums from './components/Albums/Albums';
import PostsJson from './components/PostsJSON/PostsJson';
import Welcome from './components/Welcome/Welcome';
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));


class App extends React.Component {

    componentDidMount(){
        this.props.initializeApp();
    }
    render() {
        if(!this.props.initialized){
            return <Preloader/>
        }
        return(
            <BrowserRouter>
                <div className="app-wrapper">
                    <HeaderContainer/>
                    <NavBar/>
                    <div className="app-wrapper-content">
                        <Route path='/profile/:userId?' render={withSuspens(ProfileContainer)} />
                        <Route path='/messages'         render={withSuspens(DialogsContainer)}/>
                        <Route path='/users'            render={()=><UsersContainer pageTitle="Samurai"/>} />
                        <Route path='/login'            render={()=><LoginPage/>} />
                        <Route path='/cats'             render={()=><Cats/>} />
                        <Route path='/albums'           render={()=><Albums/>} />
                        <Route path='/posts_json'       render={()=><PostsJson/>} />
                        <Route path='/' exact           render={()=><Welcome/>} />

                    </div>
                    <Footer/>
                </div>
            </BrowserRouter>
        )
    };
}

const mapStateToProps = (state)=>({
    initialized: state.app.initialized
})

export default connect(mapStateToProps,{initializeApp})(App);

