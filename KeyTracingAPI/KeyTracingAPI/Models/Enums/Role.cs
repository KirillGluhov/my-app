using System.Text.Json.Serialization;

namespace KeyTracingAPI.Models.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Role
    {
        Student = 1,
        Teacher = 2,
        Principal = 3,
        Admin = 4
    }
}
