import React, {useState} from 'react';
import { connect } from 'react-redux';
import { getCatsFromApi } from '../../redux/CatsReducer';
import Preloader from './../common/Preloader/Preloader';
import { compose } from 'redux';
import { withAuthRedirect } from './../../hoc/withAuthRedirec';




class CatsContainer extends React.Component {

    render(){
        return <Cats {...this.props} />
    }
    
 }

const Cats = (props)=>{

const [inpValue,setInpValue] = useState(1);
const [load,setLoad] = useState(false)

    const TakeACat =  ()=>{
        setLoad(true);
        props.getCatsFromApi(inpValue).then(res=>{
            setLoad(false)
        });

    }
    if(load){return(<Preloader/>)}
    
    return(<div>
        <button onClick={TakeACat}>Take new Cat</button>
        <input type="number" onChange={e=>{setInpValue(e.target.value)}} value={inpValue}/>
        {props.cats.cats.map(res=>
            <div  style={{border:' 2px solid lightblue'}} key={res.id}>
                <h1>ID:{res.id}</h1>
                <a href={res.url}><img alt="Cats" style={{"width":"60%"}} src={res.url} /></a>
            </div>
        )}

    </div>)
}

let mapStateToProps = (state)=>({
    cats:state.cats
})


export default compose(
    connect(mapStateToProps,{getCatsFromApi}),
    withAuthRedirect,
)(CatsContainer);