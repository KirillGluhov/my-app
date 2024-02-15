namespace KeyTracingAPI.Models.Enums
{   
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum RequestStatus
    {
        Approved = 1,
        InProcess = 2,
        Declined = 3
    }
}
