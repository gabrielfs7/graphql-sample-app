import React from 'react';

import './TaskItem.css';

const taskItem = (props) => {
    return <li className="tasks-page__list-item">
        <div>
            <h1>{props.taskName}</h1>
            <h2>{props.taskDoAt}</h2>
        </div>
        <div>
        <button className="btn" onClick={props.onDetail.bind(this, props.taskId)}>View details</button> 
            { props.currentUserId !== props.ownerId && (
                <p>
                    You are not the owner of this task
                </p>
            )}
        </div>
    </li>
};

export default taskItem;