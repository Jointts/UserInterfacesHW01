$( document ).ready(function() {
    renderAssignments();
    $('.newAssignment').magnificPopup({
        type:'inline',
        midClick: true
    });
});

function renderAssignments(){
    var renderOutput = "";
    var assignments = getAssignments();
    for(var x = 0; x < assignments.length; x++){
        var assignmentObject = assignments[x];
        var assignmentParsed = "<tr><td>" + assignmentObject.subject + "</td><td>" + assignmentObject.assigned + "</td><td>" + assignmentObject.deadline + "</td><td><button class='btn btn-default' type='button' onclick='editAssignmentRender(" + x + ")'><span class='glyphicon glyphicon-edit'></span> Edit</button></td></tr>";
        renderOutput = renderOutput.concat(assignmentParsed);
    }
    $(".assignments").html(renderOutput);
}

function registerAssignment(){
    var assignmentForm = document.forms["assignmentForm"];
    var name = assignmentForm.subject.value;
    var assigned = assignmentForm.assigned.value;
    var deadline = assignmentForm.deadline.value;
    createAssignment(name, assigned, deadline);
}

function createAssignment(subject, assigned, deadline){
    var assignments = getAssignments();
    var assignment = {};
    assignment.subject = subject;
    assignment.assigned = assigned;
    assignment.deadline = deadline;
    assignments.push(assignment);

    localStorage.setItem('assignments', JSON.stringify(assignments));
}

function getAssignments(){
    if (localStorage.getItem("assignments") == null) {
        return [];
    } else {
        //  alert("Accessed localStorage");
        return JSON.parse(localStorage.getItem("assignments"));
    }
}

function editAssignmentRender(id){
    var assignments = JSON.parse(localStorage.getItem("assignments"));
    var subject = assignments[id].subject;
    var assigned = assignments[id].assigned;
    var deadline = assignments[id].deadline;

    var renderOutput = "<h2>Edit Assignment</h2>" +
        "<form name='assignmentEditForm'>" +
        "<label>Subject</label>" +
        "<input name='subject' class='form-control' value='" + subject + "'>" +
        "<label>Assigned</label>" +
        "<textarea name='assigned' class='form-control'>" + assigned + "</textarea>" +
        "<label>Deadline</label>" +
        "<input data-provide='datepicker' value='" + deadline + "' name='deadline' class='form-control' required>" +
        "<div class='button-group'>" +
        "<input type='button' class='btn btn-primary' onclick='editAssignment(" + id + ")' value='Edit'>" +
        "<button onclick='closeEditForm()' class='btn btn-default'>Cancel</button>" +
        "</div>" +
        "</form>";
    $(".editForm").html(renderOutput);
    $.magnificPopup.open({
        items: {
            src: '.editForm-container',
            type: 'inline'
        }
    });
}

function closeEditForm(){
    $.magnificPopup.close({
        items: {
            src: '.editForm-container',
            type: 'inline'
        }
    });
}

function closeNewAssignmentForm(){
    $.magnificPopup.close({
        items: {
            src: '.newAssignment',
            type: 'inline'
        }
    });
}

function editAssignment(id){
    var assignments = JSON.parse(localStorage.getItem("assignments"));
    var assignmentEditForm = document.forms["assignmentEditForm"];
    var subject = assignmentEditForm.subject.value;
    var assigned = assignmentEditForm.assigned.value;
    var deadline = assignmentEditForm.deadline.value;
    assignments[id].subject = subject;
    assignments[id].assigned = assigned;
    assignments[id].deadline = deadline;
    localStorage.setItem('assignments', JSON.stringify(assignments));
    location.reload();
}

$('.datepicker').datepicker();