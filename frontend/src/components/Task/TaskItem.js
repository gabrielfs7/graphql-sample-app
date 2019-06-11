import React from 'react';

import './TaskItem.css';

const taskItem = (props) => {
    return <li className="tasks-page__list-item">
        <div>
            <h1>{props.taskName}</h1>
            <h2>{props.taskDoAt}</h2>
        </div>
        <div>
            { props.currentUserId === props.ownerId ? (
                <button className="btn">View details</button> 
            ) : (
                <p>
                    You are not the owner of this task
                </p>
            )
            }
        </div>
    </li>
};

export default taskItem;