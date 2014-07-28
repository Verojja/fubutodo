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
            toAddDate.val(Date.now);
        }
           
        //Perform redundant but professional business check against null or harmfull field
        //in username.(I feel that a null value in the dateTime can be defaulted to 
        //date.now as a quality of life feature.)
        
        //Create regex var for parsing the item
        var parse_un = /(.*$)($.*)/;
        var checkUserNameForDangerousChar = parse_un.exec($(toAddName).text());
        var redundantProtectionParseVarOne = checkUserNameForDangerousChar[1],
            redundantProtectionParseVarTwo = checkUserNameForDangerousChar[2];
        if (checkUserNameForDangerousChar.length > 0 || toAddName.length === 0) {
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
            $newItem = $('<li class="item"><div class="taskbody">' + toAddName + ':  do on:  ' + toAddDate + '</div></li>');
            $newItem.click(function () {
                expandTask(this);
            });
            $(".taskList").append($newItem);
        }
        //Clear old input fields and reset focus to provide user with good feedback / quality of life change
        $('input[name=toDoDateTime]').val(Date.now);
        $('input[name=toDoName').val("").focus();
    }



    //--------------------------------------------------------------------------
    //------------------------------Expand Item---------------------------------
    //--------------------------------------------------------------------------
    function expandTask(taskDiv) {
        var
        $(taskDiv).click( function(){
            var that = this;
            $(that).toggle( function(that){
                if ($(that).is(':visible'));
            });
        });
    }

    //--------------------------------------------------------------------------
    //---------------------------------Update-----------------------------------
    //--------------------------------------------------------------------------



    //--------------------------------------------------------------------------
    //-------------------------------Delete Item--------------------------------
    //--------------------------------------------------------------------------




    //--------------------------------------------------------------------------
    //--------------------------Document Ready Call-----------------------------
    //--------------------------------------------------------------------------



    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
}());