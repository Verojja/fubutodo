(function () {
    //--------------------------------------------------------------------------
    //------------------------Fucntion / Vars / ETC-----------------------------
    //--------------------------------------------------------------------------

    //function for checking tha validity of dateTime inputs
    function isValidDate(d) {
        if (Object.prototype.toString.call(d) !== "[object Date]") {
            return false;
        }
        return !isNaN(d.getTime());
    }


    //--------------------------------------------------------------------------
    //------------------------------Create--------------------------------------
    //--------------------------------------------------------------------------
    function addWithAjax() {

        //Assign Task-Name & Task-Date to vars
        var toAddName = $('input[name=toDoName]').val(),
            toAddDate = $('input[name=toDoDateTime]').val();
        if (!isValidDate(toAddDate)) {
            $('input[name=toDoDateTime]').val(Date.now);
            toAddDate = $('input[name=toDoDateTime]').val();
        }

        //Perform redundant but professional business check against null or harmfull field
        //in username.(I feel that a null value in the dateTime can be defaulted to 
        //date.now as a quality of life feature.)

        //Create regex var for parsing the item
        var parse_un = /(.*$)($.*)/;
        var checkUserNameForDangerousChar = parse_un.exec($(toAddName).text());
        var redundantProtectionParseVarOne = checkUserNameForDangerousChar[1],
            redundantProtectionParseVarTwo = checkUserNameForDangerousChar[2];
        if (redundantProtectionParseVarOne.length > 0 || redundantProtectionParseVarTwo.length > 0 || toAddName.length === 0) {
            alert("Blank UserNames an use of special characters in the UserName are strictly prohibited.")
        } //If There was no problem with the username, proceed to parse and invoke the ajax function for posting new ToDo items
        else {
            $.ajax({
                type: "POST",
                url: "/addToDo",
                data: JSON.stringify({
                    TaskName: toAddName,
                    TaskDate: toAddDate
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",    //<------------- QUESTION!! is the final trailing comma to the left of this comment convention?
            })
            //Dynamically update the page with the newly created Task.
            $newItem = $('<li class="item">' + toAddName + ':  do on:  ' + toAddDate + '<div class="taskText"></div><div class="taskbody"></div></li>');
            $clickField = $($newItem).children(".taskText");
            $clickField.click(function () {
                expandTask($newItem);
            });
            $(".taskList").append($newItem);
        }
        //Clear old input fields and reset focus to provide user with good feedback / quality of life change
        $('input[name=toDoDateTime]').val(Date.now);
        $('input[name=toDoName').val("").focus();
    };                                          //<------------- QUESTION!! is the final trailing semi colon to the right of this currly brace convention?



    //--------------------------------------------------------------------------
    //------------------------------Expand Item---------------------------------
    //--------------------------------------------------------------------------
    //
    //Idea really cool but deadline approaching so I have to make it less... dynamically updating. so sad :(
    //
    function expandTask(taskDiv) {
        var that = $(taskDiv).children(".taskbody");
        //make sure all other items are currently hidden:
        //(function () {
        //    $('.taskbody').each(function (index, element) {
        //        if ($(element).is(':visible')) {
        //            $(element).click();
        //        }
        //    })
        //})();
        $updateNameInput = $('<input type="text" name="toUpName"/>');
        $updateDateInput = $('<input type="date" name="toUpDateTime" value="DateTime.now();"/>');

        $deleteDiv = $('<div id="button" class="delete">Delete</div>');
        $deleteDiv.click(function () {
            deleteWithAjax(taskDiv);
        });
        $deleteDiv
        .mouseover(function () {
            $(this).fadeTo("slow", 1);
        })
        .mouseout(function () {
            $(this).fadeTo("slow", .44);
        });
        $updateDiv = $('<div id="button" class="update">Update</div>');
        $updateDiv.click(function () {
            updateWithAjax(taskDiv);
        });
        $updateDiv
        .mouseover(function () {
            $(this).fadeTo("slow", 1);
        })
        .mouseout(function () {
            $(this).fadeTo("slow", .44);
        });
          
            
        if ($(that).is(':visible')) {
            //add the delete and update methods
            $(that).empty();
        }
        else {
            $(that).append($deleteDiv);
            $(that).append($updateNameInput);
            $(that).append($updateDateInput);
            $(that).append($updateDiv);
        }
        $(that).toggle();
        
    };                                          //<------------- QUESTION!! is the final trailing semi colon to the right of this currly brace convention?

    //--------------------------------------------------------------------------
    //---------------------------------Update-----------------------------------
    //--------------------------------------------------------------------------
    function updateWithAjax(item) {

        //Assign New-Task-Name & New-Task-Date to vars
        var toUpdateName = $('input[name=toUpName]').val(),
            toUpdateDate = $('input[name=toUpDateTime]').val();

        if (!isValidDate(toUpdateDate)) {
            $('input[name=toUpDateTime]').val(Date.now);
            toUpdateDate = $('input[name=toUpDateTime]').val();
        }

        //Perform redundant but professional business check against null or harmfull field
        //in username.(I feel that a null value in the dateTime can be defaulted to 
        //date.now as a quality of life feature.)
        //Create regex var for parsing the item
        var parse_un = /(.*$)($.*)/;
        var checkUserNameForDangerousChar = parse_un.exec($(toUpdateName).text());
        var redundantProtectionParseVarOne = checkUserNameForDangerousChar[1],
            redundantProtectionParseVarTwo = checkUserNameForDangerousChar[2];
        if (redundantProtectionParseVarOne.length > 0 || redundantProtectionParseVarTwo.length > 0 || toUpdateName.length === 0) {
            alert("Blank UserNames an use of special characters in the UserName are strictly prohibited.")
        } //If There was no problem with the username, proceed to parse and invoke the ajax function for posting new ToDo items
        else {

            //I need to grab the original name from the div:
            var parse_task = /([A-Za-z].*)([A-Za-z]?:.*:) (.*)D/;
            var parseReslt = parse_.exec($(item).text());
            var originalName = parseReslt[1],
                origianDate = parseReslt[3];

            $.ajax({
                type: "POST",
                url: "/updateToDo",
                data: JSON.stringify({
                    TaskName: originalName,
                    TaskDate: origianDate,
                    UpdateTaskName: toUpdateName,
                    UpdateTaskDate: toUpdateDate
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",    //<------------- QUESTION!! is the final trailing comma to the left of this comment convention?
            })
            //Dynamically update the page with the newly updated Task.
            $(item).text(toUpdateName + ':  do on:  ' + toAdtoUpdateDatedDate);
        }
        //Clear old input fields and reset focus to provide user with good feedback / quality of life change
        $('input[name=toUpDateTime]').val(Date.now);
        $('input[name=toUpName').val("").focus();
    };                                          //<------------- QUESTION!! is the final trailing semi colon to the right of this currly brace convention?


    //--------------------------------------------------------------------------
    //-------------------------------Delete Item--------------------------------
    //--------------------------------------------------------------------------
    function deleteWithAjax(item) {
        //I need to grab the name from the div:
        var parse_task = /([A-Za-z].*)([A-Za-z]?:.*:) (.*)D/;
        var parseReslt = parse_task.exec($(item).text());
        var name = parseReslt[1],
            date = parseReslt[3];

        $.ajax({
            type: "POST",
            url: "/removeFromToDo",
            data: JSON.stringify({
                TaskName: name,
                TaskDate: date,
                UpdateTaskName: name,
                UpdateTaskDate: date
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",    //<------------- QUESTION!! is the final trailing comma to the left of this comment convention?
        })
        //Dynamically update the page with the newly updated Task.
        $(item).remove();
    };                                          //<------------- QUESTION!! is the final trailing semi colon to the right of this currly brace convention?};



    //--------------------------------------------------------------------------
    //--------------------------Document Ready Call-----------------------------
    //--------------------------------------------------------------------------
    $(document).ready(function () {
        $("#TODObutton")
        .mouseover(function () {
            $(this).fadeTo("slow", 1);
        })
        .mouseout(function () {
            $(this).fadeTo("slow", .44);
        });

        $('.item').click(function () {
            expandTask(this);
        });


        $('.newTaskButton').click(addWithAjax);

        $('form[name = checkListForm]').submit(function (e) {
            e.preventDefault();
            addWithAjax();
        });
    })


    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
}());