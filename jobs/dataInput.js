const Board = require('../models/Board')
const Flow = require('../models/Flow')

const handler = async (data, jobId, flowId) => {
    const flow = await Flow.findById(flowId);

    //name, description, userEmail, flow, node
    const board = await Board.createBoard(
        data.results.boardName,
        data.results.boardDescription,
        flow.userEmail,
        flow._id,
        jobId
    );
}

module.exports = {
    handler
}