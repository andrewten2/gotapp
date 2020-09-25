import React,{Component} from 'react';
import ItemList from '../../itemList';
import ItemDetails,{Field} from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import gotService from '../../../services/gotServices';
import RowBLock from '../../rowBlock';

export default class CharacterPage extends Component {

    gotService = new gotService();

    state = {
        selectedChar : null,
        error : false
    }

    componentDidCatch(){
        console.log('error character');
        this.setState({error: true});
    }

    onItemSelected = (id) => {
        console.log(id);
        this.setState({
            selectedChar: id
        });
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }    

        const itemList = (
            <ItemList 
                        onItemSelected={this.onItemSelected}
                        getData = {this.gotService.getAllCharacters}
                        renderItem = {({name,gender})=>`${name} (${gender})`}
                        />
        );

        const charDetails = (
            <ItemDetails getData = {this.gotService.getCharacter} itemId={this.state.selectedChar}>
                <Field  field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
                <Field field='died' label='Died'/>
                <Field field='culture' label='Culture'/>
            </ItemDetails>
        );

        return (
            <RowBLock left={itemList} right={charDetails}/>
        );
    }
}