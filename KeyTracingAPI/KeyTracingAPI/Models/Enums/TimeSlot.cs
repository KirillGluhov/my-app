using System.Text.Json.Serialization;

namespace KeyTracingAPI.Models.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum TimeSlot
    {
        S8E10 = 1,
        S10E12 = 2,
        S12E14 = 3,
        S14E16 = 4,
        S16E18 = 5,
        S18E20 = 6,
        S20E21 = 7
    }
}
