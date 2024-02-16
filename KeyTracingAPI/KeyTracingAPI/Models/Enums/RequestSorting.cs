using System.Text.Json.Serialization;

namespace KeyTracingAPI.Models.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum RequestSorting
    {
        DateAsc = 1,
        DateDesc = 2,
        AuditoryAsc = 3,
        AuditoryDesc = 4
    }
}
