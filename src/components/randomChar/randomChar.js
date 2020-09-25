import React, {Component} from 'react';
import gotService from '../../services/gotServices';
import Spinner from '../spinner/spinner';
import './randomChar.css';
import { Button } from 'reactstrap';
import ErrorMessage from '../errorMessage';

export default class RandomChar extends Component {

    gotService = new gotService();

    state = {
        char : {},
        loading : true,
        error : false
    }

    updateChar =() => {
        this.setState({loading: true});
        const id = Math.floor(Math.random()*140 + 30);
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onError = (error) => {
        this.setState ({
            error: true,
            loading : false
        })
    }

    onCharLoaded = (char) => {
        this.setState({
            error: false,
            char,
            loading: false
            
        });
    }

    componentDidMount() {
        this.updateChar();
        this.timerid = setInterval(this.updateChar,105000);  
    }

    componentWillUnmount() {
        clearInterval(this.timerid);      
    }


    render() {

        const {char, loading, error}=this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <Character char={char}/> : null; 
        
        return (
            <div className="random-block rounded">  
            {errorMessage}
            {spinner}
            {content}
            <Button onClick={()=>this.updateChar()} color="danger" className="d-block mx-auto" >RELOAD</Button>{' '}
            </div>
        );
    }
}



const Character = ({char}) => {
    const {name,gender,born,died,culture} = char;
  
    return(
      <React.Fragment>
                <h4>Random Character: {name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender </span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born </span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died </span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture </span>
                        <span>{culture}</span>
                    </li>
                </ul>            
      </React.Fragment>
      
    )
}