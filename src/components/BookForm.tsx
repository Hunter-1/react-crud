import React, {Component} from 'react';
import { Button } from '@material-ui/core';
import { TextField} from "@material-ui/core";

interface IBookProps {
    onAddOrEdit?: any
    currentIndex?: number
    list?: any
}

class BookForm extends Component<IBookProps> {
    state = {...this.returnStateObject()}

    returnStateObject(){
        if(this.props.currentIndex === -1) {
            return {
                name: "",
                author: ""
            }
        } else if (this.props.currentIndex !== undefined) {
            return this.props.list[this.props.currentIndex]
        }
    }

    componentDidUpdate(
        prevProps: Readonly<IBookProps>,
        prevState: Readonly<{}>,
        snapshot?: any) {
        if(prevProps.currentIndex !== this.props.currentIndex ||
            prevProps.list.length !== this.props.list.length)
        this.setState({...this.returnStateObject()})
    }

    handleInputChange = (e: { target: { name: string; value: string; }; }) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e: { preventDefault: () => void; }) =>{
        e.preventDefault();
        this.props.onAddOrEdit(this.state)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} autoComplete="off">
                <TextField id="standard-basic" label="name"
                           value={this.state.name} onChange={this.handleInputChange}/>
                <TextField id="standard-basic" label="author"
                           value={this.state.author} onChange={this.handleInputChange}/>
                <Button type="submit">Submit</Button>
            </form>
        );
    }
}

export default BookForm;