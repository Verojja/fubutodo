using System.Collections.Generic;
using System.Linq;
using System.Text;
using System;

namespace Warner_TODO
{
    public class ToDoInputModel
    {
        public string TaskName { get; set; }
        public DateTime TaskDate { get; set; }
        public string UpdateTaskName { get; set; }
        public DateTime UpdateTaskDate { get; set; }
    }


}