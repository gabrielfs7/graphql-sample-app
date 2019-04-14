import React, { Component } from 'react';
import Modal from '../components/Modal/Modal'
import Backdrop from '../components/Backdrop/Backdrop';

import './Form.css';

class TasksPage extends Component {
    state = {
        creatingTask: false
    };

    startCreateEventHandler = () => {
        this.setState({ creatingTask: true });
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
                                canConfirm>
                                <p>My Modal content</p>
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