import React, {useState} from 'react';
import ReactFlow, {Node, Elements, ElementId} from 'react-flow-renderer';

const basicElements = [
  { id: "1", data: { label: "Parent" }, position: { x: 500, y: 150 } },
  { id: "2", data: { label: "First child" }, position: { x: 400, y: 250 } },
  { id: "e1-2", source: "1", target: "2", animated: true }
];

const graphStyles = { width: "100%", height: "500px" };

function App() {
  const [elements, setElements] = useState<Elements>(basicElements);

  const addNode = () => {
    const nodeId: ElementId = (elements.length + 1).toString();
    const newNode: Node = {
      id: nodeId,
      data: { label: `Node: ${nodeId}` },
      position: { x: 10, y: 50 },
    };
    setElements((els) => els.concat(newNode));
  };

  const BasicGraph = () => <ReactFlow elements={elements} style={graphStyles}>
      <button type="button" onClick={addNode} style={{ position: 'absolute', left: 10, top: 10, zIndex: 4 }}>
        add node
      </button>
  </ReactFlow>;

  return <BasicGraph />;
}

export default App;
