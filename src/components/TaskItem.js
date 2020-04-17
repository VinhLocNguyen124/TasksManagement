import React from 'react';
import '../App.css';

class TaskItem extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    onUpdateStatus = () => {
        //Truyền taskid qua TaskList -> App.js
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDelete = () => {
        this.props.onDelete(this.props.task.id);
    }

    onUpdate = () => {
        this.props.onUpdate(this.props.task.id);
    }

    render() {
        var { task, index } = this.props;
        return (
            <tr>
                <td className="text-center text-danger text">{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span
                        className={task.status ? "label label-danger" : "label label-primary"}
                        onClick={this.onUpdateStatus}>{task.status ? 'Kích hoạt' : 'Ẩn'}</span>
                </td>
                <td className="text-center">

                    <button 
                    type="button" 
                    className="btn btn-warning"
                    onClick={this.onUpdate}>
                        <span className="fa fa-pencil mr-5"></span> Sửa
                </button>
                &nbsp;
                &nbsp;
                <button
                        type="button"
                        className="btn btn-danger"
                        onClick={this.onDelete}
                    >
                        <span className="fa fa-trash mr-5"></span> Xóa
                </button>

                </td>
            </tr>
        );
    }
}

export default TaskItem;