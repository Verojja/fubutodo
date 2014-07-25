using FubuMVC.Core;
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
    }
}