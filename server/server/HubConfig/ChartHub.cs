
using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Threading.Tasks;
using server.Models;

namespace server.HubConfig
{
    public class ChartHub : Hub
    {
        public async Task BroadcastChartData(List<ChartModel> data) => await Clients.All.SendAsync("broadcastchartdata", data);
    }
}
