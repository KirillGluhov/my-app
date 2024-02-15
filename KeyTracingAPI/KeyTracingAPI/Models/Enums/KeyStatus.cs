using System.Text.Json.Serialization;

namespace KeyTracingAPI.Models.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum KeyStatus
    {
        Free = 1,
        InProcess = 2,
        Booked = 3
    }
}
