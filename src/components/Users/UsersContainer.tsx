import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow,requestUsers } from '../../redux/UsersReducer';
import userPhoto from './../../assets/images/user.png';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';
import { getPageSize,getTotalUsersCount,getCurrentPage,getIsFetching,getFollowingInProgress,getUsers } from '../../redux/UsersSelectors';
import { AppStateType } from '../../redux/ReduxStore';
import { UserType } from '../../types/types';

type MapStatePropsType={
    currentPage:number
    pageSize:number
    isFetching:boolean
    totalUsersCount:number
    users:Array<UserType>
    followingInProgress: Array<number>

}
type MapDispatchPropsType={
    unfollow:(userId:number)=>void
    follow:(userId:number)=>void
    requestUsers:(currentPage:number,pageSize:number,userPhoto:any)=>void
}
type OwnPropsType={
    pageTitle:string
}
type PropType=MapStatePropsType & MapDispatchPropsType & OwnPropsType


class UsersContainer extends React.Component<PropType> {

    componentDidMount(){
        this.props.requestUsers(this.props.currentPage,this.props.pageSize,userPhoto)

    }
    onPageChanged = (pageNumber:number)=>{
        this.props.requestUsers(pageNumber,this.props.pageSize,userPhoto)

    }


    render(){
        return(<>
            <h3>{this.props.pageTitle}</h3>
            {this.props.isFetching?<Preloader></Preloader>:null} 
            <Users  onPageChanged={this.onPageChanged}
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize} 
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    unfollow={this.props.unfollow}
                    follow={this.props.follow}
                    followingInProgress={this.props.followingInProgress}

                    ></Users>
            </>
        )
    }


}

let mapStateToProps = (state:AppStateType):MapStatePropsType=>{
        return{
            users: getUsers(state),
            pageSize: getPageSize(state),
            totalUsersCount: getTotalUsersCount(state),
            currentPage: getCurrentPage(state),
            isFetching: getIsFetching(state),
            followingInProgress: getFollowingInProgress(state)
        }
    }


export default compose(
    connect < MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType >(mapStateToProps,{ follow, unfollow,requestUsers})
)(UsersContainer)

