import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, getStatus, updateStatus,savePhoto,saveProfile } from './../../redux/ProfileReducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class ProfileContainer extends React.Component {

    refreshProfile(){
        let userId = this.props.match.params.userId || this.props.authtorizedUserId;
        if(!userId){
           this.props.history.push('/login');
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount(){
        this.refreshProfile()
    }
    componentDidUpdate(prevProps){
        if(this.props.match.params.userId!== prevProps.match.params.userId){

            this.refreshProfile()
        }
    }
    render(){
        return(
            <div className="content"> 
              <Profile {...this.props} isOwner={!this.props.match.params.userId} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
            </div>
        
        )
    }
}

let mapStateToProps = (state)=>({
    profile:state.profilePage.profile,
    status:state.profilePage.status,
    authtorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});
export default compose(connect(mapStateToProps,{getUserProfile,getStatus,updateStatus,savePhoto,saveProfile}),withRouter)(ProfileContainer)

// let AuthRedirectComponent =  withAuthRedirect(ProfileContainer);

// let mapStateToPropsForRedirect = (state)=>({isAuth: state.auth.isAuth});
// AuthRedirectComponent = connect(mapStateToPropsForRedirect)(AuthRedirectComponent);





// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)


// export default connect(mapStateToProps,{getUserProfile})(WithUrlDataContainerComponent);
