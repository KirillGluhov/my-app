using System.Text.Json.Serialization;

namespace KeyTracingAPI.Models.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum KeyStatus
    {
        Free = 1,
        InProcess = 2, //zachem status y klyhcha? status uze est u zaiavki, a klych libo lezit v kabinete dekanata libo net. daze esli para konchilas, klych prinadlezit predidushemi uchastniku, poka ne peredal sleduushemu.
        Booked = 3
            //edinstvenniy variant vizu kak klych poterian, vse, no v takom sluchae on toze ne v kabite dekanata (a daze esli tam to ob etom ne znayut)
    }
}
