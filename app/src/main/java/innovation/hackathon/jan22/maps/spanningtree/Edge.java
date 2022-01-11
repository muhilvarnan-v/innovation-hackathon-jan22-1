package innovation.hackathon.jan22.maps.spanningtree;

public class Edge implements Comparable<Edge> {
    public int src, dest, weight;

    public Edge() {
    }

    public Edge(int src, int dest, int weight) {
        this.src = src;
        this.dest = dest;
        this.weight = weight;
    }

    // Comparator function used for
    // sorting edgesbased on their weight
    public int compareTo(Edge compareEdge) {
        return this.weight - compareEdge.weight;
    }
}