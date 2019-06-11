import ApiRequestService from './ApiRequestService';

class ManageTaskService {
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

        const apiRequestService = new ApiRequestService();
        
        return apiRequestService.post(authContext, requestQueryBody);
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

        const apiRequestService = new ApiRequestService();

        return apiRequestService.post(authContext, requestQueryBody);
    }
}

export default ManageTaskService;