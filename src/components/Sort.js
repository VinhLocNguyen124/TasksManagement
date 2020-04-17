import React from 'react';
import '../App.css';

class Sort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sort: {
                by: 'name',
                value: 1,
            }
        }
    }

    onClick = (sortBy, sortValue) => {
        // console.log(sortBy + " - " + sortValue);
        this.setState({
            sort: {
                by: sortBy,
                value: sortValue,
            }
        })
        this.props.onSort(sortBy, sortValue);
    }

    render() {
        var { sort } = this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">

                    <button
                        type="button"
                        className="btn btn-primary dropdown-toggle"
                        id="dropdownMenu1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                    >Sắp xếp <span className="fa fa-caret-square-o-down ml-5"></span>
                    </button>

                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">

                        <li onClick={() => this.onClick('name', 1)}>
                            <a
                                role="button"
                                className={sort.by === 'name' && sort.value === 1 ? "sort_selected" : ""} >
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    Tên A - Z
                                </span>
                            </a>
                        </li>
                        <li onClick={() => this.onClick('name', -1)}>
                            <a
                                role="button"
                                className={sort.by === 'name' && sort.value === -1 ? "sort_selected" : ""}
                            >
                                <span className="fa fa-sort-alpha-desc pr-5">
                                    Tên Z - A
                                    </span>
                            </a>
                        </li>
                        <li role="separator" className="divider"></li>
                        <li onClick={() => this.onClick('status', 1)}>
                            <a
                                role="button"
                                className={sort.by === 'status' && sort.value === 1 ? "sort_selected" : ""}
                            >
                                Trạng thái kích hoạt
                            </a>
                        </li>
                        <li onClick={() => this.onClick('status', -1)}>
                            <a
                                role="button"
                                className={sort.by === 'status' && sort.value === -1 ? "sort_selected" : ""}
                            >
                                Trạng thái ẩn
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sort;