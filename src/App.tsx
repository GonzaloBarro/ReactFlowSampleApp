import React from 'react';
import ReactFlow from 'react-flow-renderer';

const elements = [
  { id: "1", data: { label: "Parent" }, position: { x: 500, y: 150 } },
  { id: "2", data: { label: "First child" }, position: { x: 400, y: 250 } },
  { id: "e1-2", source: "1", target: "2", animated: true }
];

const graphStyles = { width: "100%", height: "500px" };

const BasicGraph = () => <ReactFlow elements={elements} style={graphStyles} />;

function App() {
  return <BasicGraph />;
}

export default App;
