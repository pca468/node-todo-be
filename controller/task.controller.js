const Task = require("../model/Task");

const taskController = {};

taskController.createTask = async (req, res) => {
  try {
    const { task, isComplete } = req.body; // task와 isComplete 를 읽어올건데 이 데이터는 request body에 있다 그래서 bodyParser를 설치해준 이유
    const newTask = new Task({ task, isComplete });
    await newTask.save();
    res.status(200).json({ status: "ok", data: newTask }); // json은 보내는 데이터
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

taskController.getTask = async (req, res) => {
  try {
    const taskList = await Task.find({}).select("-__v");
    res.status(200).json({ status: "ok", data: taskList });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

taskController.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id); // req.params를 활용하여 URL 경로에서 ID 추출 // findById는 Mongoose에서 해당 id를 찾는 코드
    if (!task) {
      throw new Error("App can not find the task"); // task가 존재하지 않는다면 해당 메세지 출력 이는 catch문에서 실행된다.
    }
    const fields = Object.keys(req.body); // req.body 객체에 전달 된 모든 필드의 키를 배열로 추출
    fields.map((item) => (task[item] = req.body[item])); // fields 배열의 각 키(item) 에 반복하면서 task객제 속성을 req.body의 값으로 업데이트한다.
    await task.save();
    res.status(200).json({ status: "ok", data: task });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

taskController.deleteTask = async (req, res) => {
  try {
    const deleteItem = await Task.findByIdAndDelete(req.params.id); // Mongoose 로 주어진 id에 해당하는 작업을 데이터베이스에서 찾아 삭제하는 코드
    res.status(200).json({ status: "ok", data: deleteItem });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

module.exports = taskController;
