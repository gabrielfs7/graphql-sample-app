import ApiRequestService from './ApiRequestService';

class ManageTaskService {
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
        const response = apiRequestService.post(authContext, requestQueryBody);

        console.log(response);
    }
}

export default ManageTaskService;