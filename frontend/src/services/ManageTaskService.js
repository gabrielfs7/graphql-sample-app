import ApiRequestService from './ApiRequestService';

class ManageTaskService {
    constructor() {
        this.apiRequestService = new ApiRequestService();
    }

    list = (authContext) => {
        const requestQueryBody = `
            query {
                tasks {
                    _id,
                    task,
                    doAt,
                    status,
                    owner {
                        _id,
                        email
                    }
                }
            }
        `;

        return this.apiRequestService.post(authContext, requestQueryBody);
    }

    create = (authContext, task, doAt, status) => {
        if (
            task.trim().length === 0 ||
            doAt.trim().length === 0 ||
            status.trim().length === 0
        ) {
            throw new Error('Invalid task fields');
        }

        const requestQueryBody = `
            mutation {
                createTask(input: { task: "${task}", doAt: "${doAt}" })
                {
                    _id,
                    task,
                    doAt
                }
            }
        `;

        return this.apiRequestService.post(authContext, requestQueryBody);
    }

    watch = (authContext, taskId) => {
        const requestQueryBody = `
            mutation {
                watchTask(input: { taskId: "${taskId}", userId: "${authContext.userId}" })
                {
                     _id,
                    createdAt,
                    updatedAt,
                    user {
                        _id,
                        email
                    },
                    task {
                        _id,
                        task
                    }
                }
            }
        `;

        return this.apiRequestService.post(authContext, requestQueryBody);
    }
}

export default ManageTaskService;