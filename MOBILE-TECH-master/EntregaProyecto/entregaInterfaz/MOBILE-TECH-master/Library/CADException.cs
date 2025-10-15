using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace library
{
    class CADException : Exception
    {
        public CADException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
