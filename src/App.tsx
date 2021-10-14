import React, {MouseEvent, useState} from 'react';
import ReactFlow, {
  addEdge,
  Connection,
  Edge,
  ElementId,
  Elements,
  FlowElement
} from 'react-flow-renderer';

import { addActionNode, addCampaign, GraphData, NodesCount } from './utils';
import './App.css';
import { nodeElements, nodeTypes } from './Nodes';

const basicElements = [
  { id: "0", data: { label: "Playbook Entry" }, position: { x: 10, y: 50 }, draggable: false }
];

const graphStyles = { width: "100%", height: "500px" };

function App() {
  const [elements, setElements] = useState<Elements>(basicElements);
  const [lastCampaign, setLastCampaign] = useState<ElementId | null>(null);
  const [nodes, setNodes] = useState<NodesCount>({
    campaigns: 0,
    emails: 0,
    adders: 0,
    total: 0
  })

  const handleSelectionChange = (e: any) => console.log(e);

  const onConnect = (params: Connection | Edge): void => setElements((els) => addEdge(params, els));

  const handleElementClick = (mouseEvent: MouseEvent, element: FlowElement): void => {
    const nodeKeys: string[] = Object.keys(nodeTypes);
    const nodeKey: number = Math.random() * nodeKeys.length - 3;
    const nodeType = nodeKey > 0 ? nodeTypes.SMS : nodeTypes.EMAIL;

    const graphData: GraphData | null = addActionNode(mouseEvent, element, elements, nodes, nodeType);

    if (graphData) {
      setNodes(graphData.nodes);
      setElements(graphData.elements);
    }
  };

  const handleCampaignClick = () => {
    const graphData = addCampaign(elements, nodes, lastCampaign);
    setNodes(graphData.nodes);
    setLastCampaign(graphData.lastCampaign);
    setElements(graphData.elements);
  };

  const BasicGraph = () => <ReactFlow
    elements={elements}
    style={graphStyles}
    onConnect={(p) => onConnect(p)}
    onElementClick={handleElementClick}
    nodeTypes={nodeElements}
    onSelectionChange={handleSelectionChange}
  >
    <button type="button" onClick={handleCampaignClick} className="CampaignButton">
      add Campaign
    </button>
  </ReactFlow>;

  return <BasicGraph />;
}

export default App;
