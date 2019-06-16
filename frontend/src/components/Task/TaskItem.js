import React from 'react';

import './TaskItem.css';

const taskItem = (props) => {
    let isWatched = false;

    if (props.currentUserId) {
        for (let i in props.taskWatchers) {
            let taskWatcher = props.taskWatchers[i];

            if (taskWatcher.user._id === props.currentUserId) {
                isWatched = true;

                break;
            }
        }
    }

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
            { isWatched && (
                <p>WATCHING!!!!</p>
            )}
        </div>
    </li>
};

export default taskItem;