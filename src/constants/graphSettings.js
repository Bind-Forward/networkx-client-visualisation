export default {
	nodeShapes: "def", // "def" | "pacman" | "star" | "equilateral" | "cross" | "diamond" | "circle" | "square"
	edgeShapes: "arrow", // "line" | "arrow" | "curve" | "curvedArrow" | "dashed" | "dotted" | "parallel" | "tapered"
	drawEdges: true, 
	drawLabels: true, 
	minEdgeSize: 0.5, 
	maxEdgeSize: 5, 
	minNodeSize: 1,
	maxNodeSize: 8,
	clone: false, 
	defaultNodeType: "def",
	defaultEdgeType: "def",
	defaultLabelColor: "#000",
	defaultEdgeColor: "#cfd2d6",
	defaultNodeColor: "#000",
	defaultLabelSize: 14,
	borderSize: 1, 
	edgeColor: "default",
	labelColor: "default",
	labelSize: "proportional",
	labelSizeRatio: 2,
	nodeBorderColor: "default",
	labelThreshold: 5, // The minimum size a node must have on screen to see its label displayed. This does not affect hovering behavior.
	defaultNodeBorderColor: "#000",//Any color of your choice
	defaultBorderView: "always", //apply the default color to all nodes always (normal+hover)
	minArrowSize: 5,
	// appearance of hovered nodes
	nodeHoverColor: "#000",
	scalingMode: "outside" // inside
}