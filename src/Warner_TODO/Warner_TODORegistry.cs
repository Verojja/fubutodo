using StructureMap.Configuration.DSL;

namespace Warner_TODO
{
	public class Warner_TODORegistry : Registry
	{
		public Warner_TODORegistry()
		{
			// make any StructureMap configuration here
			
            // Sets up the default "IFoo is Foo" naming convention
            // for auto-registration within this assembly
            Scan(x => {
                x.TheCallingAssembly();
                x.WithDefaultConventions();
            });
		}
	}
}