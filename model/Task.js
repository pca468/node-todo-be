const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = Schema({
    task : {
        type : String,
        required : true,

    },
    isComplete : {
        type : Boolean,
        required : true,
    },
},{timestamps : true}) // 스키마 설정 완료 스키마는 작업 지시서 정도 , 그렇기 때문에 model을 만들어줘야 함
//스키마를 만든 후에 중괄호 뒤에 옵션을 추가할 수 있다.
// 만약 언제 생성됐는지에 대한 데이터를 보내고 싶을 때 사용할 수 있는 기능이 timestemps

const Task = mongoose.model("Task", taskSchema) // 모델을 만들어주고 이 모델은 taskSchema 를 참고해서 만들겠다의 코드

module.exports = Task;