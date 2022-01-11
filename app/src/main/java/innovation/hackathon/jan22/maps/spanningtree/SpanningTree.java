package innovation.hackathon.jan22.maps.spanningtree;

import java.util.Arrays;

public class SpanningTree {
    private final int noOfVertex;
    public Edge[] edge;
    public SpanningTree(int noOfVertex, int numberOfEdges) {
        this.noOfVertex = noOfVertex;
        edge = new Edge[numberOfEdges];
        for (int i = 0; i < numberOfEdges; ++i)
            edge[i] = new Edge();
    }

    int find(subset[] subsets, int i) {
        if (subsets[i].parent != i)
            subsets[i].parent
                    = find(subsets, subsets[i].parent);

        return subsets[i].parent;
    }

    void Union(subset[] subsets, int x, int y) {
        int xroot = find(subsets, x);
        int yroot = find(subsets, y);

        if (subsets[xroot].rank
                < subsets[yroot].rank)
            subsets[xroot].parent = yroot;
        else if (subsets[xroot].rank
                > subsets[yroot].rank)
            subsets[yroot].parent = xroot;

        else {
            subsets[yroot].parent = xroot;
            subsets[xroot].rank++;
        }
    }

    public Edge[] KruskalMST() {
        Edge[] result = new Edge[noOfVertex];

        int edgeIndex = 0;

        int i;
        for (i = 0; i < noOfVertex; ++i)
            result[i] = new Edge();

        // Step 1: Sort all the edges in non-decreasing
        // order of their weight. If we are not allowed to
        // change the given graph, we can create a copy of
        // array of edges
        Arrays.sort(edge);

        // Allocate memory for creating V subsets
        subset[] subsets = new subset[noOfVertex];
        for (i = 0; i < noOfVertex; ++i)
            subsets[i] = new subset();

        // Create V subsets with single elements
        for (int v = 0; v < noOfVertex; ++v) {
            subsets[v].parent = v;
            subsets[v].rank = 0;
        }

        i = 0; // Index used to pick next edge

        // Number of edges to be taken is equal to V-1
        while (edgeIndex < noOfVertex - 1) {
            // Step 2: Pick the smallest edge. And increment
            // the index for next iteration
            Edge next_edge = edge[i++];

            int x = find(subsets, next_edge.src);
            int y = find(subsets, next_edge.dest);

            // If including this edge does't cause cycle,
            // include it in result and increment the index
            // of result for next edge
            if (x != y) {
                result[edgeIndex++] = next_edge;
                Union(subsets, x, y);
            }
            // Else discard the next_edge
        }

//        int minimumCost = 0;
//        for (i = 0; i < edgeIndex; ++i) {
//            minimumCost += result[i].weight;
//        }
        return result;
    }

    static class subset {
        int parent, rank;
    }
}