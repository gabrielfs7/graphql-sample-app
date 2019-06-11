import React, { Component } from 'react';
import Modal from '../components/Modal/Modal';
import TaskList from '../components/Task/TaskList';
import Backdrop from '../components/Backdrop/Backdrop';
import AuthContext from './../context/auth-context';
import ManageTaskService from '../services/ManageTaskService';

import './Form.css';
import './TasksPage.css';

class TasksPage extends Component {
    state = {
        creatingTask: false,
        taskList: []
    };

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.taskRef = React.createRef();
        this.doAtRef = React.createRef();
        this.statusRef = React.createRef();
        this.manageTaskService = new ManageTaskService();
    }

    componentDidMount() {
        this.fetchEvents();
    }

    fetchEvents() {
        this.manageTaskService.list(this.context).then(
            result => {
                this.setState({ 
                    creatingTask: false,  
                    taskList: result.data.tasks
                });

                console.log('STATE');
                console.log(this.state);
            }
        );
    }

    startCreateEventHandler = () => {
        this.setState({ creatingTask: true });
    }

    modalConfirmHandler = () => {
        this.manageTaskService.create(
            this.context,
            this.taskRef.current.value,
            this.doAtRef.current.value,
            this.statusRef.current.value
        ).then(
            result => {
                this.fetchEvents();
            }
        );
    }

    modalCancelHandler = () => {
        this.setState({ creatingTask: false });
    }

    /**
     * Render JSX component.
     */
    render() {
        return (
            <React.Fragment>
                {
                    /**
                     * Only open modal when creating task.
                     */
                    this.state.creatingTask && (
                        <React.Fragment>
                            <Backdrop />
                            <Modal
                                title="Add Task"
                                canCancel
                                canConfirm
                                onCancel={this.modalCancelHandler}
                                onConfirm={this.modalConfirmHandler}>
                                <form className="tasks-page__form form" onSubmit={this.submitHandler}>
                                    <div className="form-control">
                                        <label htmlFor="task">Task</label>
                                        <input type="text" required id="task" ref={this.taskRef} />
                                    </div>
                                    <div className="form-control">
                                        <label htmlFor="doAt">Do at</label>
                                        <input type="datetime-local" required id="doAt" ref={this.doAtRef} />
                                    </div>
                                    <div className="form-control">
                                        <label htmlFor="status">Status</label>
                                        <select required id="doAt" ref={this.statusRef} >
                                            <option value="pending">Pending</option>
                                            <option value="complete">Complete</option>
                                            <option value="canceled">Canceled</option>
                                        </select>
                                    </div>
                                </form>
                            </Modal>
                        </React.Fragment>
                    )}
                <div className="actions">
                    <button className="btn" onClick={this.startCreateEventHandler}>Create Task</button>
                </div>
                <TaskList tasks={this.state.taskList} currentUserId={this.context.userId} />
            </React.Fragment>
        );
    }
}

export default TasksPage;