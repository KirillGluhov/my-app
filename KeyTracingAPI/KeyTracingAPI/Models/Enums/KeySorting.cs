using System.Text.Json.Serialization;

namespace KeyTracingAPI.Models.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum KeySorting
    {
        AuditoryAsc = 1,
        AuditoryDesc = 2
    }
}
