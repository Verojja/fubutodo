using System;

namespace Warner_TODO
{
    public class TODOTask
    {
        public int ID { get; set; }
        public string TaskName { get; set; }
        public DateTime TaskDate { get; set; }


        public TODOTask()
        {
            this.ID = ContrivedDBOBject.Instance.GetNewID();
        }


    }
}