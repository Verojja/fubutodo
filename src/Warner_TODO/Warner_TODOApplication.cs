using FubuMVC.Core;
using FubuMVC.StructureMap;
using StructureMap;

namespace Warner_TODO
{
	public class Warner_TODOApplication : IApplicationSource
	{
	    public FubuApplication BuildApplication()
	    {
            return FubuApplication.For<Warner_TODOFubuRegistry>()
				.StructureMap<Warner_TODORegistry>();
	    }
	}
}