import React from 'react';
import TaskItem from './TaskItem';

import './TaskList.css';

const taskList = (props) => {
    const tasks = props.tasks.map(task => {
        return <TaskItem taskId={task._id} taskName={task.task}/>
    });

    return <ul className="tasks-page__list">{tasks}</ul>;
};

export default taskList;