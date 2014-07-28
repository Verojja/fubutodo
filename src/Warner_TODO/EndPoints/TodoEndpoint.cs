using FubuMVC.Core;
using FubuMVC.Core.Continuations;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Warner_TODO.Endpoints
{
    public class TodoEndpoint
    {

        public ToDoListViewModel get_toDoListView(ToDoInputModel inputParam)
        {
            var temp = ContrivedDBOBject.Instance.GetTasks() as Dictionary<int,TODOTask>;
            var tasks = temp.Values.ToList();

            return new ToDoListViewModel {
              Tasks = tasks  
            };
        }


        public FubuContinuation post_addToDo(ToDoInputModel input)
        {
            TODOTask taskToAdd = new TODOTask();
            taskToAdd.TaskName = input.TaskName;
            taskToAdd.TaskDate = input.TaskDate;

            ContrivedDBOBject.Instance.AddTask(taskToAdd);

            return FubuContinuation.RedirectTo<TodoEndpoint>(x => x.get_toDoListView(input), "GET");
        }

        public FubuContinuation post_removeFromToDo(ToDoInputModel input)
        {
            //Potential logic check to confirm the task exists in the contrivedDB -- possible fastFail if it doesn't.

            #region - Long Explanation of why/ What I'm doing with persistence -
            /*
             * The following line of code is.... unfortunate, since it spoils the efficency
             * of the ContrivedDBObject's Dictionary (waists the instant lookup) by converting
             * the values to a list and performing linq on the collection to 'find' the correct taks.
             * -- This is the product of not storing the TaskID int he TODoInputMOdel (a clone of task in every other way)
             * 
             * And the reason for not storing the TaskID int he ToDoInputModel is for "uniform user experience":
             *   To Elaborate, I 'create' the taskID outsideof the script file (trying to more closely mimic a DB which would
             *   probably generate the primary keys for it's task objects); and whicle my SparkFile will more of less add the
             *   TaskID to each Task upon refresh, my dynamic Page Update for Immediate adding doesn't include the not-yet-created ID.
             *   It Goes back to the probelm of "hot to dynamically update the page without hitting refresh; but while still executing code in
             *   3 or so different classes.
             *   
             * If I am able to dynamically update the page off of pure ContrivedDB-Object data, then I will revert to using the hidden-id
             * method and efficenty of my Dictionary implementation will be restored.
             * 
             */



            #endregion
            //TODO: Discover way to dynamically update the page off of pure ContrivedDB-Object darta, for reasons explained above.
            
            var tasks = ContrivedDBOBject.Instance.GetTasks();
            var taskToBeRemoved = tasks.Values.ToList().Find(x=> x.TaskName.Equals(input.TaskName) && x.TaskDate.Equals(input.TaskDate));

            if (taskToBeRemoved != null)
            {
                ContrivedDBOBject.Instance.RemoveTask(taskToBeRemoved);
            }
            return FubuContinuation.RedirectTo<TodoEndpoint>(x => x.get_toDoListView(input), "GET");        
        }


    }
}