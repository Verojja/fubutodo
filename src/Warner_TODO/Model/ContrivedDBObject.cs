using FubuMVC.Core.Continuations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Warner_TODO
{
    public sealed class ContrivedDBOBject
    {
        #region Instance Memebers
        private static volatile int _taskIdNonce;

        private static volatile ContrivedDBOBject instance;

        private static Dictionary<int, TODOTask> ToDoTasks { get; set; }

        #endregion


        int somethingChanged = 234234;


    }


}