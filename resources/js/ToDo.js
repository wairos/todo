import React from 'react';
import List from './List'

export default class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
            ],
            inputValue: "",
            error: false
        };
        this.errorBorder = "1px solid red"
        this.normalBorder = "1px solid grey"
    }


    handleOnClick = () => {
        if (this.state.inputValue !== "") {
            let newList = this.state.list;
            newList.push({
                item: this.state.inputValue,
                checked: false
            });
            this.setState({
                list: newList,
                inputValue: "",
                error: false
            });
        } else {
            this.setState({
                error: true
            })
        }
    }

    handleOnChange = (e) => {
        this.setState({
            inputValue: e.target.value,
            error: false
        });
    }

    handleDelete = (index) => {
        index = parseInt(index, 10);
        let list = this.state.list;
        list = list.filter((item, i) => {
            return i !== index;
        });

        this.setState({
            list: list
        });

    }

    handleKeyPress = (e) => {
        if (e.key === "Enter") {
            this.handleOnClick()
        }
    }

    handleChecked = (index) => {
        const isChecked = this.state.list[index].checked;
        let newList = this.state.list;
        newList[index].checked = !isChecked;
        this.setState({
            list: newList
        })
    }

    updateList = (newList) => {
        this.setState({
            list: newList
        })
    }


    render() {
        return (
            <div className="todo">
                <List
                    updateList={this.updateList}
                    handleDelete={this.handleDelete}
                    list={this.state.list}
                    handleChecked={this.handleChecked}
                />
                <div className="pt-2 input-group">
                    <input
                        className="form-control"
                        type="text"
                        style={{border: this.state.error ? this.errorBorder : this.normalBorder}}
                        onChange={(e) => this.handleOnChange(e)}
                        onKeyPress={this.handleKeyPress}
                        value={this.state.inputValue}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-success"
                            onClick={this.handleOnClick}>Add ToDo
                        </button>
                    </div>
                </div>

            </div>
        );
    }
}