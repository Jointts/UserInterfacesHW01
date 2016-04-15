/**
 * Created by pagulane on 30.03.16.
 */

//  Login Data
var usernames;
var passwords;

//  Grade Data
var grade;
var subject;

function loadJSONFile(jsonFile, callback) {

    jsonFile = "data/" + jsonFile + ".json";
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', jsonFile, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function saveJSONFile(jsonFile, data){
    jsonFile = "data/" + jsonFile + ".json";
    var fso  = new ActiveXObject("Scripting.FileSystemObject");
    var fh = fso.OpenTextFile("E:\\Training Asslab\\Advance\\Write to File\\Test.txt", 8, True);
    fh.WriteLine(x+"#"+y);
    fh.Close();
}



