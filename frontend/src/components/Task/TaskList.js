import React from 'react';
import TaskItem from './TaskItem';

import './TaskList.css';

const taskList = (props) => {
    const tasks = props.tasks.map(task => {
        return <TaskItem 
            key={task._id} 
            currentUserId={props.currentUserId} 
            ownerId={task.owner._id}
            taskId={task._id} 
            taskWatchers={task.taskWatchers}
            taskDoAt={task.doAt} 
            taskName={task.task}
            onDetail={props.onViewDetail}
        />
    });

    return <ul className="tasks-page__list">{tasks}</ul>;
};

export default taskList;