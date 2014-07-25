using System;

namespace Warner_TODO
{
    public class TODOTask
    {
        public int ID { get; set; }
        public string  TaksName { get; set; }
        public DateTime TaskDate { get; set; }
    

    public TODOTask()
    {
        this.id = ContrivedDBObject.Instance.GetNewID();
    }


}