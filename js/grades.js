$( document ).ready(function() {
    getStudents();
    renderStudents();
});

function getStudents(){
    var users = JSON.parse(localStorage.getItem('users'));
    var students = [];
    for(var x = 0; x < users.length; x++){
        if(!users[x].admin){
            users[x].id = x;
            students.push(users[x]);
        }
    }
    localStorage.setItem('students', JSON.stringify(students));
    return students;
}

function renderStudents(){
    var renderOutput = "";
    var students = JSON.parse(localStorage.getItem('students'));
    for(var x = 0; x < students.length; x++){
        var studentObject = students[x];
        var studentParsed = "<tr><td>" + studentObject.username + "</td><td><button class='btn btn-default' type='button' onclick='getStudentAssignments(" + studentObject.id + ")'><span class='glyphicon glyphicon-edit'></span> Grades</button></td></tr>";
        renderOutput = renderOutput.concat(studentParsed);
    }
    $(".students").html(renderOutput);
}

function editStudentGrade(userId, assignmentId){
    var element = "gradeForm" + assignmentId;
    var gradeForm = document.forms[element];
    var grade = gradeForm.grade.value;
    var users = JSON.parse(localStorage.getItem('users'));
    users[userId].assignment[assignmentId].grade = grade;
    localStorage.setItem('users', JSON.stringify(users));
}

function getStudentAssignments(id){
    var renderOutput = "";
    var assignments = JSON.parse(localStorage.getItem('assignments'));
    var students = JSON.parse(localStorage.getItem('users'));
    var currentUser = students[id];
    if(currentUser.assignment == null){currentUser.assignment = []}
    for(var y = 0; y < assignments.length; y++){
        if(currentUser.assignment[y] == null){
            currentUser.assignment[y] = assignments[y];
            currentUser.assignment[y].grade = -1;
        }
    }
    var users = JSON.parse(localStorage.getItem('users'));
    users[id] = currentUser;
    localStorage.setItem('users', JSON.stringify(students));
    for(var x = 0; x < currentUser.assignment.length; x++){
        var assignmentObject = currentUser.assignment[x];
        if(assignmentObject.grade == -1){
            assignmentObject.grade = "-";
        }
        var assignmentParsed = "<tr>" +
            "<td>" + assignmentObject.subject + "</td>" +
            "<td><form name='gradeForm" + x + "'><input name='grade' type='number' min='1' value='" + assignmentObject.grade + "' max='5'></form></td>" +
            "<td>" + assignmentObject.deadline + "</td>" +
            "<td>" +
            "<button class='btn btn-default' type='button' onclick='editStudentGrade(" + id + " ," + x + ")'>" +
            "<span class='glyphicon glyphicon-edit'>" +
            "</span> Save" +
            "</button>" +
            "</td>" +
            "</tr>" +
            "<button onclick='closeGradeForm()' class='btn btn-default'>Cancel</button>";
        renderOutput = renderOutput.concat(assignmentParsed);
        $(".assignments-container h2").html("Grades for: " + currentUser.username);
    }
    $(".assignments").html(renderOutput);
    $.magnificPopup.open({
        items: {
            src: '.assignments-container',
            type: 'inline'
        }
    });

}

function closeGradeForm(){
    $.magnificPopup.close({
        items: {
            src: '.assignments-container',
            type: 'inline'
        }
    });
}