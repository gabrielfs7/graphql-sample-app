import React, { Component } from 'react';
import Modal from '../components/Modal/Modal';
import TaskList from '../components/Task/TaskList';
import Backdrop from '../components/Backdrop/Backdrop';
import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';
import ManageTaskService from '../services/ManageTaskService';

import './Form.css';
import './Tasks.css';

class Tasks extends Component {
    state = {
        isLoading: false,
        creatingTask: false,
        selectedTask: null,
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

    /**
     * When React loads the component or every time change its state.
     */
    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks() {
        this.setState({ isLoading: true });

        this.manageTaskService.list(this.context).then(
            result => {
                this.setState({ 
                    creatingTask: false,  
                    isLoading: false,
                    taskList: result.data.tasks
                });
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
        ).then(result => {
            this.fetchTasks();
        }).catch(err => {
            alert(err);
        });
    }

    modalWatchHandler = () => {
        if (!this.context.userId) {
            alert('You must be logged in to watch the task!');

            return;
        }

        this.manageTaskService.watch(
            this.context,
            this.state.selectedTask._id
        ).then(result => {
            alert('You are watching the task!');

            this.setState({ creatingTask: false, selectedTask: null });
            this.fetchTasks();
        }).catch(err => {
            alert(err);
        });
    }

    modalCancelHandler = () => {
        this.setState({ creatingTask: false, selectedTask: null });
    }

    /**
     * Find task by id in the list and change the component state to display it.
     */
    showTaskDetails = (taskId) => {
        this.setState(prevState => {
            const existentTask = prevState.taskList.find(task => task._id === taskId);

            return { selectedTask: existentTask };
        });
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
                                onConfirm={this.modalConfirmHandler}
                                onConfirmText="Confirm">
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
                { this.state.selectedTask && (
                    <React.Fragment>
                        <Backdrop />
                        <Modal
                            title="Task Details"
                            canCancel
                            onCancel={this.modalCancelHandler}
                            canConfirm
                            onConfirm={this.modalWatchHandler}
                            onConfirmText="Watch">
                            <form className="tasks-page__form form" onSubmit={this.submitHandler}>
                                <h2>{ this.state.selectedTask.task }</h2>
                                <p>Do At: { new Date(this.state.selectedTask.doAt).toLocaleDateString() }</p>
                                <p>Status: { this.state.selectedTask.status }</p>
                            </form>
                        </Modal>
                    </React.Fragment>
                )}
                { this.context.userId && (
                <div className="actions">
                    <button className="btn" onClick={this.startCreateEventHandler}>Create Task</button>
                </div>
                )}
                { this.state.isLoading ? (
                <Spinner>Loading</Spinner>
                ) : (
                <TaskList 
                    tasks={this.state.taskList} 
                    currentUserId={this.context.userId} 
                    onViewDetail={this.showTaskDetails}
                />
                )}
            </React.Fragment>
        );
    }
}

export default Tasks;