import React from 'react';
import '../App.css';

class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false,
            lastid: '',
            lastname: '',
            laststatus: false,
        }
    }

    componentDidMount() {
        var { task } = this.props;
        if (task) {
            this.setState({
                id: task.id,
                name: task.name,
                status: task.status,
            })
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.task) {
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status,
            })
        } else if (!nextProps.task) {
            console.log(nextProps.task);
            this.setState({
                id: '',
                name: '',
                status: false,
            })
        }
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     // console.log('NextProp'+ nextProps);
    //     //  console.log('PrevState');
    //     //  console.log( prevState.name);
    //     //  console.log('NextProp');
    //     //  console.log( nextProps.task.name);
    //      //
    //     if (nextProps.task.name !== prevState.lastname) {
    //         return {
    //             id: nextProps.task.id,
    //             name: nextProps.task.name,
    //             status: nextProps.task.status,
    //             lastid: nextProps.task.id,
    //             lastname: nextProps.task.name,
    //             laststatus: nextProps.task.status,
    //         }
    //     }else{
    //         return null;
    //     }
    // }

    onCloseForm = () => {
        this.props.onCloseForm();
    }


    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        //kiểm tra trong cái select 'status' và ép kiểu string về boolean 'true' -> true
        if (name === 'status') {
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name]: value
        });
    }


    onSubmit = (event) => {
        //Hàm này ngăn submit của form khi ấn submit, 
        event.preventDefault();
        this.props.onSubmit(this.state);
        //console.log(this.state);
        //Sau khi submit thì refresh lại ô input
        this.onClear();
        //Sau khi submit thì đóng form
        this.onCloseForm();
    }

    onClear = () => {
        this.setState({
            name: '',
            status: false
        })
    }

    render() {
        var { id } = this.state;

        return (
            <div className="panel panel-warning">
                <div className="panel-heading" >
                    <h3
                        className="panel-title">
                        {id !== '' ? 'Cập nhật công việc' : 'Thêm công việc'} <span className="fa fa-times-circle text-right" onClick={this.onCloseForm} />
                    </h3>

                </div>
                <div className="panel-body">

                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Tên: </label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                placeholder="Nhập tên ..."
                                value={this.state.name}
                                onChange={this.onChange} />
                        </div>

                        <label>Trạng thái: </label>
                        <select
                            name="status"
                            className="form-control"
                            value={this.state.status}
                            onChange={this.onChange} >
                            <option value={true}>Kích hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select><br />

                        <div className="text-center">
                            <button type="submit" className="btn btn-warning" style={{ marginRight: 20 }}>
                                <span className="fa fa-plus mr-5"></span>  Lưu lại
                            </button>&nbsp;
                            <button type='button' className="btn btn-danger" onClick={this.onClear}>
                                <span className="fa fa-close mr-5"></span>  Hủy bỏ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default TaskForm;