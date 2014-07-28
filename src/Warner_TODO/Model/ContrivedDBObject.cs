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

        #region Construction
        private ContrivedDBOBject() { }

        public static ContrivedDBOBject Instance
        {
            get
            {
                if (instance == null)
                {
                    ToDoTasks = new Dictionary<int, TODOTask();
                    _taskIdNonce = 0;
                    instance = new ContrivedDBOBject();
                }

                return instance;
            }
        }
        
        
        
        #endregion

        #region Crud Operations

        public void AddTask(TODOTask taskToAddParam)
        {
            ToDoTasks.Add(taskToAddParam.ID, taskToAddParam);
        }

        public void RemoveTask(TODOTask taskToRemoveParam)
        {
            ToDoTasks.Remove(taskToRemoveParam.ID);
        }

        public void UpdateTask(TODOTask taskToUpdateParam)
        {
            ToDoTasks.Add(taskToUpdateParam.ID, taskToUpdateParam);
        }
   
        #endregion

        #region Public Facing Non-CRUD operation

        public Dictionary<int, TODOTask> GetTasks()
        {
            return ToDoTasks;
        }

        public int GenerateNewID()
        {
            //Potentially look at viability of java secure. Random - equivalent / nonce number for index.
            //For now, I'll use a simple incrimentation just to get the proof of concept accross.

            return _taskIdNonce++;
        }
        
        
        #endregion
        
    }


}