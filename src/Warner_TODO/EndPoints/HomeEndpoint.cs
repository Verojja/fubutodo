namespace Warner_TODO
{
	public class HomeEndpoint
	{
		public HomeModel Index(HomeModel model)
		{
            return new HomeModel { Message = "Testing Standard get_Method in a secondary Endpoint:" };
		}
	}
}