const tagDiv = document.querySelector(".tag-group");
const tagBtn = document.querySelector("#tag_btn");
const subtaskDiv = document.querySelector(".subtask-group");
const subtaskBtn = document.querySelector("#subtask_btn");

const createNewTags = () => {
    let inputBox = document.createElement("input");
    [inputBox.id, inputBox.name, inputBox.placeholder] = ["tags", "tags", "new tag..."];
    tagDiv.appendChild(inputBox)
    tagDiv.appendChild(document.createElement("br"))
}
tagBtn.addEventListener("click", createNewTags)

const createNewSubtasks = () => {
    let inputBox = document.createElement("input");
    [inputBox.id, inputBox.name, inputBox.placeholder] = ["subtasks", "subtasks", "new subtask..."];
    subtaskDiv.appendChild(inputBox)
    subtaskDiv.appendChild(document.createElement("br"))
}
subtaskBtn.addEventListener("click", createNewSubtasks)