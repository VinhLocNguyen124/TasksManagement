import React from 'react';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import { findIndex } from "lodash";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: '',
        status: -1
      },
      keyword: '',
      sortBy: 'name',
      sortValue: 1
    }
  }

  //App vừa chạy thì lấy dữ liệu trong localStorage ra gán cho state
  async componentDidMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      var tasks = await JSON.parse(localStorage.getItem('tasks'));
      await this.setState({
        tasks: tasks
      });
      await console.log(this.state.tasks);
    }
  }

  //Hàm này tạo dữ liệu mẫu để đưa vào đầu tiên 
  // onGenerateData = () => {
  //   var tasks = [
  //     {
  //       id: this.generateID(),
  //       name: 'Học lập trình',
  //       status: true,
  //     },
  //     {
  //       id: this.generateID(),
  //       name: 'Đi bơi',
  //       status: false,
  //     },
  //     {
  //       id: this.generateID(),
  //       name: 'Ngủ',
  //       status: true,
  //     },
  //   ]

  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  // }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  generateID() {
    return this.s4() + this.s4() + '-' + this.s4() + this.s4() + '-' + this.s4() + this.s4() + '-' + this.s4();
  }

  onToggleForm = () => {
    if (this.state.isDisplayForm && this.state.taskEditing !== null) {
      console.log('th1');
      this.setState({
        isDisplayForm: true,
        taskEditing: null
      });
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing: null
      });
    }

  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false
    });
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    });
  }

  onSubmit = (data) => {
    // console.log(data);
    var { tasks } = this.state;

    if (data.id === '') {
      //Trường hợp thêm mới 
      data.id = this.generateID();
      tasks.push(data);
    } else {
      //Trường hợp chỉnh sửa
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }


    this.setState({
      tasks: tasks,
      taskEditing: null
    });

    console.log(this.state.tasks);

    //Lưu vào localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  findIndex = (id) => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  }

  onUpdateStatus = (id) => {
    // Nhận taskid từ Comp TaskItem
    var { tasks } = this.state;
    // var index = this.findIndex(id);
    var index = findIndex(tasks, task => {
      return task.id === id;
    })

    console.log(index);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

  }

  onDelete = (id) => {
    // Nhận taskid từ Comp TaskItem
    var { tasks } = this.state;
    var index = this.findIndex(id);

    console.log(index);

    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    this.onCloseForm();
  }

  onUpdate = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);

    // console.log(index);
    var taskEditing = tasks[index];

    this.setState({
      taskEditing: taskEditing
    });

    this.onShowForm();

    console.log(this.state.taskEditing)
  }

  onFilter = (filterName, filterStatus) => {
    // console.log(filterName + " - " + filterStatus);
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus,
      }
    })
  }

  onSearch = (keyword) => {
    // console.log(keyword);
    this.setState({
      keyword: keyword
    })
  }

  onSort = (sortBy, sortValue) => {
    // console.log(sortBy + " " + sortValue);
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue,
    });
    // console.log(this.state.sort);
  }

  render() {
    var { tasks, isDisplayForm, taskEditing, filter, keyword, sortBy, sortValue } = this.state;
    // console.log(sortBy, sortValue);
    //Lọc dữ liệu trong bảng 
    if (filter) {
      //Lọc qua tên
      if (filter.name) { // !==nul !==undefined !==0
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }

      //Lọc qua trạng thái
      tasks = tasks.filter(task => {
        if (filter.status === -1) {
          return task;
        } else {
          return task.status === (filter.status === 1 ? true : false);
        }
      })
    }

    //Chức năng Search
    if (keyword) {
      tasks = tasks.filter(task => {
        return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      })
    }

    //Chức năng sort
    if (sortBy === 'name') {
      tasks.sort((a, b) => {
        if (a.name > b.name) return sortValue;
        else if (a.name < b.name) return -sortValue;
        else return 0;
      })
    } else {
      tasks.sort((a, b) => {
        if (a.status > b.status) return -sortValue;
        else if (a.status < b.status) return sortValue;
        else return 0;
      })
    }

    var elmTaskForm = isDisplayForm ?
      <TaskForm
        onSubmit={this.onSubmit}
        onCloseForm={this.onCloseForm}
        task={taskEditing}
      ></TaskForm>
      :
      '';

    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản lý công việc</h1>
        </div>
        <hr />

        <div className="row">
          <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ''}>
            {elmTaskForm}
          </div>

          <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>

            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onToggleForm}>
              <span className="fa fa-plus mr-5"></span> Thêm công việc
            </button>
            &nbsp;
            {/* <button
              type="button"
              className="btn btn-danger ml-5"
              onClick={this.onGenerateData}>
              Tạo dữ liệu
            </button> */}

            {/* Phần Search và Sort */}
            <Control
              onSearch={this.onSearch}
              onSort={this.onSort}
              sortBy={sortBy}
              sortValue={sortValue}
            />

            {/* Phần list */}
            <TaskList
              tasks={tasks}
              onUpdateStatus={this.onUpdateStatus}
              onDelete={this.onDelete}
              onUpdate={this.onUpdate}
              onFilter={this.onFilter}
            ></TaskList>

          </div>

        </div>
      </div>
    );
  }
}

export default App;
