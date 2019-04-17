import React, { Component } from 'react';
import Modal from '../components/Modal/Modal'
import Backdrop from '../components/Backdrop/Backdrop';
import AuthContext from './../context/auth-context';

import './Form.css';
import './TasksPage.css';

class TasksPage extends Component {
    state = {
        creatingTask: false
    };

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.taskRef = React.createRef();
        this.doAtRef = React.createRef();
        this.statusRef = React.createRef();
    }

    startCreateEventHandler = () => {
        this.setState({ creatingTask: true });
    }

    modalConfirmHandler = () => {
        const task = this.taskRef.current.value;
        const doAt = this.doAtRef.current.value;
        const status = this.statusRef.current.value;

        if (
            task.trim().length === 0 ||
            doAt.trim().length === 0 ||
            status.trim().length === 0
        ) {
            return; //@TODO Display error to user...
        }

        const taskObject = {task, doAt, status};

        console.log(taskObject);

        const requestBody = {
            query: `
                mutation {
                    createTask(input: { task: "${task}", doAt: "${doAt}" })
                    {
                        _id,
                        task,
                        doAt
                    }
                }
            `
        };

        const jwtToken = this.context.token;

        fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwtToken
            },
            body: JSON.stringify(requestBody)
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }

            console.log(res.json()); //@TODO This should be listed now.
        }).catch(err => {
            console.log(err);
        });
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
                                <form className="tasks-page form" onSubmit={this.submitHandler}>
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
            </React.Fragment>
        );
    }
}

export default TasksPage;