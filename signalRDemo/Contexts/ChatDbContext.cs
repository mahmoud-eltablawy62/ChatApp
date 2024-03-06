using Microsoft.EntityFrameworkCore;
using signalRDemo.Models;

namespace signalRDemo.Contexts
{
    public class ChatDbContext : DbContext
    {
        public ChatDbContext(DbContextOptions<ChatDbContext> options) : base(options)
        {

        }

        public DbSet<Message> Messages { get; set; }
    }
}
