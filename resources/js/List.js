import React from 'react'

export default class List extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
    }

    handleKeyPress = (e) => {
        if(e.key === "Enter") {
            this.props.handleChecked(e.target.dataset.place)
        }
    }

    handleDragStart = (e) => {
        e.dataTransfer.setData('text/plain', e.target.dataset.place);
        e.target.style.cursor = 'move';
    }

    handleDragLeave = (e) => {
        e.preventDefault();
        e.target.style.opacity = '1';
        e.target.style.cursor = 'default';
        e.target.style.left = '0px';
    }

    handleDragEnter = (e) => {
        e.preventDefault();
        e.target.style.opacity = '0.4';
        e.target.style.cursor = 'move';
    }

    handleDragOver = (e) => {
        e.preventDefault();
        e.target.style.cursor = 'move';
        console.log('target');
        console.log(e.target.dataset.place);
        console.log('data');
        console.log(e.currentTarget.dataset.place);
        e.target.style.left = '10px';


    }

    handleDrop = (e) => {
        e.preventDefault();
        e.target.style.opacity = '1';
        e.target.style.left = '0px';
        e.currentTarget.style.opacity = '1';
        e.currentTarget.style.cursor = 'default';
        let newList = this.props.list;
        var targetPlace = Number(e.dataTransfer.getData('text'));
        var currentPlace = Number(e.currentTarget.dataset.place);
        if(isNaN(targetPlace) === false && isNaN(currentPlace) === false){
            let target =  newList[targetPlace];
            newList = this.array_move(newList, targetPlace, currentPlace);
            this.props.updateList(newList);
        }
    }

    array_move(arr, old_index, new_index) {
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr; // for testing
    };

    render() {
        return (
            <ul className="todo__list">
                {this.props.list.map((item, index) => {
                    return (
                        <li className={item.checked === true ? 'todo__list-item todo__complete' : 'todo__list-item todo__incomplete'}
                            draggable
                            key={index}
                            data-place={index}
                            onDrop={this.handleDrop}
                            onDragEnter={this.handleDragEnter}
                            onDragLeave={this.handleDragLeave}
                            onDragStart={this.handleDragStart}
                            onDragEnd={this.handleDragEnd}
                            onDragOver={this.handleDragOver}>
                            <input className="todo__checkbox" type="checkbox"
                                   key={index + "Done"}
                                   data-place={index}
                                   checked={item.checked === true ? 'checked' : ''}
                                   onChange={() => this.props.handleChecked(index)}
                                   onKeyPress={this.handleKeyPress}
                            />
                            <span>{item.item}</span>
                            <button className="btn btn-danger float-right" onClick={() => this.props.handleDelete(index)}>&#10006;</button>
                        </li>
                    );
                })}
            </ul>
        );
    }
}