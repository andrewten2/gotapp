import React, {Component} from 'react';
import Spinner from '../spinner/spinner';
import './itemList.css';
export default class ItemList extends Component {   

    state = {
        itemList : null
    }

    componentDidMount() {
        const {getData} = this.props;

        getData()
            .then((itemList)=>{
                this.setState({itemList});
            })
    }

    componentDidCatch(){
        console.log('error');
        this.setState({error: true});
    }

    renderItems = (arr) => {
        return arr.map((item) => {
            const label = this.props.renderItem(item);
            const index = item.id;
            return (
                <li 
                key={index} 
                className="list-group-item"
                onClick={() => this.props.onItemSelected(index)} >
                    {label}
                </li>
            )
        });
    }

    render() {
      

        const {itemList} = this.state;
        

        if(!itemList) {
            return <Spinner/>
        }

        const items = this.renderItems(itemList);

        return (
            <ul className="item-list list-group">
               {items}                
            </ul>
        );
    }
}