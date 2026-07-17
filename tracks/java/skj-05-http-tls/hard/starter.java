import java.net.*;import java.net.http.*;class Solution{static HttpRequest request(URI uri){return HttpRequest.newBuilder(uri).GET().build();}}
