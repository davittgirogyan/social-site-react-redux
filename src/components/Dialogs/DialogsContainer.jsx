import {addMessageActionCreater} from '../../redux/DialogsReducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from './../../hoc/withAuthRedirec';
import { compose } from 'redux';

let mapStateToProps =(state)=>{
    return{
        dial : state.dialogsPage.dialogs,
        msg  : state.dialogsPage.messages,
        newMessageText : state.dialogsPage.newMessageText,
        isAuth : state.auth.isAuth,
    }
}
let mapDispatchTooProps = (dispatch)=>{
    return{
        sendMsg : (text)=>{dispatch(addMessageActionCreater(text))},
    }
}

export default compose(withAuthRedirect,connect(mapStateToProps,mapDispatchTooProps))(Dialogs)

// let AuthRedirectComponent = withAuthRedirect(Dialogs);


// const DialogsContainer = connect(mapStateToProps,mapDispatchTooProps)(AuthRedirectComponent);

// export default DialogsContainer;