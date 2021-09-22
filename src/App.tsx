import React, {useState} from 'react';
import ReactFlow, {
  addEdge,
  Node,
  Elements,
  ElementId,
  Connection,
  Edge
} from 'react-flow-renderer';

const basicElements = [
  { id: "1", data: { label: "Parent" }, position: { x: 500, y: 150 } },
  { id: "2", data: { label: "First child" }, position: { x: 400, y: 250 } },
  { id: "e1-2", source: "1", target: "2", animated: true }
];

const graphStyles = { width: "100%", height: "500px" };

function App() {
  const [elements, setElements] = useState<Elements>(basicElements);

  const onConnect = (params: Connection | Edge) => setElements((els) => addEdge(params, els));

  const addNode = () => {
    const nodeId: ElementId = (elements.length + 1).toString();
    const newNode: Node = {
      id: nodeId,
      data: { label: `Node: ${nodeId}` },
      position: { x: 10, y: 50 },
    };
    setElements((els) => els.concat(newNode));
  };

  const BasicGraph = () => <ReactFlow
    elements={elements}
    style={graphStyles}
    onConnect={(p) => onConnect(p)}
  >
    <button type="button" onClick={addNode} style={{ position: 'absolute', left: 10, top: 10, zIndex: 4 }}>
      add node
    </button>
  </ReactFlow>;

  return <BasicGraph />;
}

export default App;
