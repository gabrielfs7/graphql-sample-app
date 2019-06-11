import React from 'react';

import './TaskItem.css';

const taskItem = (props) => {
    return <li key={props.taskId} className="tasks-page__list-item">{props.taskName}</li>
};

export default taskItem;