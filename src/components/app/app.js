import React,{Component} from 'react';
import {Col, Row, Container,Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotServices';
import BooksPage from '../pages/BooksPage';
import HousesPage from '../pages/HousesPage';
import CharacterPage from '../pages/characterPage';

export default class App extends Component {

    gotService = new gotService();

    
    state = {
        showRandomChar : true,
        error: false        
    }

    componentDidCatch(){
        console.log('error');
        this.setState({error: true});
    }

    onError = () => {
        this.setState({error: !this.state.error});
    }

    toggleChar = () => { 
        this.setState({showRandomChar : !this.state.showRandomChar});
    }

    onItemSelected = (id) => {
        console.log(id);
        this.setState({selectedChar: id});
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }

        const char = this.state.showRandomChar ? <RandomChar/> : null;
       

        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 6, offset: 3}}>
                            {char}
                            <Row>
                                <Button color="primary" className="mx-auto mb-4 d-block" onClick={this.toggleChar}>Toggle Random Character</Button>{' '}
                                <Button color="danger" className="mx-auto mb-4 d-block" onClick={this.onError}>Error</Button>{' '}
                            </Row>
                        </Col>
                    </Row>
                   <CharacterPage/>
                   <BooksPage/>
                   <HousesPage/>
                                
                </Container>
            </>
        );
    }
};
