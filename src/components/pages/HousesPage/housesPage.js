import React,{Component} from 'react';
import ItemList from '../../itemList';
import ItemDetails,{Field} from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import gotService from '../../../services/gotServices';
import RowBLock from '../../rowBlock';

export default class HousesPage extends Component {

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
                        getData = {this.gotService.getAllHouses}
                        renderItem = {({name})=>`${name}`}
                        />
        );

        const charDetails = (
            <ItemDetails getData = {this.gotService.getHouse} itemId={this.state.selectedChar}>
                <Field  field='name' label='Name'/>
                <Field  field='region' label='Region'/>                
                <Field  field='words' label='Words'/>                
            </ItemDetails>
        );

        return (
            <RowBLock left={itemList} right={charDetails}/>
        );
    }
}