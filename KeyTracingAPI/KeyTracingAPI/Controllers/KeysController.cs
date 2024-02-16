using Microsoft.AspNetCore.Mvc;

namespace KeyTracingAPI.Controllers
{
    public class KeysController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
