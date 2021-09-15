import React, {Component} from 'react';
import BookForm from "./BookForm";
import { Button } from '@material-ui/core';
const listName = "books"



class BookList extends Component {
    returnList() {
        if(localStorage.getItem(listName)==null){
            localStorage.setItem(listName,JSON.stringify([]))
        }
        return JSON.parse(localStorage.getItem(listName) as string)
    }

    state = {
        currentIndex: -1,
        list: this.returnList()
    }

    onAddOrEdit =(data: any) =>{
        const list = this.returnList();
        if(this.state.currentIndex === -1){
            list.push(data)
        }else{
            list[this.state.currentIndex] = data
        }
        localStorage.setItem(listName,JSON.stringify(list))
        this.setState({list,currentIndex: -1})
    }

    handleEdit = (index: number) =>{
        this.setState({
            currentIndex:index
        })
    }

    handleDelete = (index: number) =>{
        const list = this.returnList()
        list.splice(index,1)
        localStorage.setItem(listName,JSON.stringify(list))
        this.setState({list,currentIndex: -1})
    }

    render() {
        return (
            <div>
                <div className="block">
                    <BookForm
                     onAddOrEdit ={this.onAddOrEdit}
                     currentIndex ={this.state.currentIndex}
                     list = {this.state.list}
                    />
                </div>
                <div className="block">
                    <p>list of Books</p>
                    <table>
                        <thead>
                        <td>Index</td>
                        <td>Name</td>
                        <td>Author</td>
                        </thead>
                        <tbody>
                        {
                            this.state.list.map((item:any,index: number)=>{
                                return <tr key={index}>
                                    <td>{index}</td>
                                    <td>{item.name}</td>
                                    <td>{item.author}</td>
                                    <td><Button onClick={() => this.handleEdit(index)}>Edit</Button></td>
                                    <td><Button onClick={() => this.handleDelete(index)}>Delete</Button></td>
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default BookList;