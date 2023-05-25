const db = require("../models/index")

const listTask = async () => {
 try{   const result = await db.getAllTask();
    const arr = [];
    for (var i = 0; i < result.length; i++) {
        var task = {
            "id": 0,
            "No": 0,
            "event": '',
            "priority": '',
            "status": ''
        }
        task.No = i + 1;
        task.id = result[i]._id;
        task.event = result[i].task;
        task.priority = result[i].priority;
        task.status = await statusLogo(result[i].status);
        arr.push(task);
    }
    // console.log(arr)
    return{
        status:200,
        data:arr
    } }
    catch(err){
        console.log(err)
        return(err)
    }


}
// listTask()

const statusLogo = async (status) => {
    if (status == "completed")
        return ("[✓]");
    else if ((status == "cancelled"))
        return ("[✕]");
    else
        return ("[]");
}

module.exports = { listTask }