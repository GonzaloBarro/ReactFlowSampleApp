import React, {FC, MouseEvent, useState} from 'react';
import ReactFlow, {
  addEdge,
  Connection,
  Edge,
  ElementId,
  Elements,
  FlowElement,
  Node,
  NodeProps
} from 'react-flow-renderer';

import './App.css';

const basicElements = [
  { id: "0", data: { label: "Playbook Entry" }, position: { x: 10, y: 50 }, draggable: false }
];

const graphStyles = { width: "100%", height: "500px" };

const isAdder = (value: any): value is Node => !!value.position && value.type === 'adder';

const AdderControl: FC<NodeProps> = props => {
  return <div className="Adder" tabIndex={props.data.tabindex}>+</div>;
};

const SendEmailControl: FC<NodeProps> = props => {
  return <div className="Email" tabIndex={props.data.tabindex}>EMail</div>
}

const CampaignNode: FC<NodeProps> = ({data}) => {
  return <div className="Campaign" tabIndex={data.tabindex}>{data.label}</div>
}

const nodeTypes = {
  adder: AdderControl,
  email: SendEmailControl,
  campaign: CampaignNode
};

interface ElementIndex {
  element: ElementId;
  index: number;
}

interface TabIndex {
  campaign: ElementId;
  index: number;
  controls: ElementIndex[]
}

type TabIndexes = Array<TabIndex>;

interface Nodes {
  campaigns: number,
  emails: number,
  adders: number,
  total: number
}

function App() {
  const [elements, setElements] = useState<Elements>(basicElements);
  const [lastCampaign, setLastCampaign] = useState<ElementId | null>(null);
  const [nodes, setNodes] = useState<Nodes>({
    campaigns: 0,
    emails: 0,
    adders: 0,
    total: 0
  })

  const handleSelectionChange = (e: any) => console.log(e);

  const onConnect = (params: Connection | Edge): void => setElements((els) => addEdge(params, els));

  const onElementClick = (_: MouseEvent, element: FlowElement): void => {
    console.log('onElementClick:');

    if (!isAdder(element)) {
      return;
    }

    const newElements = elements.filter(flowElement => flowElement.id !== element.id);
    const controlId: ElementId = `${element.data.campaign}-${nodes.emails}`;
    const newControl: FlowElement = {
      ...element,
      type: 'email',
      id: controlId,
      data: { label: `Control ${controlId}`, tabindex: nodes.total, campaign: element.data.campaign },
    }
    
    const newAdder: FlowElement = {
      ...element,
      position: { x: element.position.x + 70, y: element.position.y },
      data: {...element.data, tabindex: nodes.total + 1}
    }
    setNodes({
      campaigns: nodes.campaigns,
      emails: nodes.emails + 1,
      adders: nodes.adders,
      total: nodes.total + 1
    });
    setElements([...newElements, newControl, newAdder]);
  };

  const addCampaign = () => {
    const campaignId: ElementId = (nodes.campaigns + 1).toString();
    const topPosition: number = (nodes.campaigns + 1) * 50;

    const newEdges: Elements = [];

    const newNode: Node = {
      id: campaignId,
      data: { label: `Campaign ${campaignId}`, tabindex: nodes.total, campaign: campaignId },
      type: 'campaign',
      position: { x: 200, y: topPosition },
      draggable: false
    };

    const newAddNode: Node = {
      id: `~${campaignId}`,
      data: { label: '+', tabindex: nodes.total + 1, campaign: campaignId },
      type: 'adder',
      position: { x: 400, y: topPosition },
      draggable: false
    };


    if (lastCampaign) {
      const edgeId: ElementId = `_${campaignId}`;
      const newEdge: Edge = {
        id: edgeId,
        source: lastCampaign,
        target: campaignId
      };
      newEdges.push(newEdge);
    }

    setNodes({
      campaigns: nodes.campaigns + 1,
      emails: nodes.emails,
      adders: nodes.adders + 1,
      total: nodes.total + 2
    })

    setLastCampaign(campaignId);
    setElements([...elements, ...newEdges, newNode, newAddNode]);

    console.log(elements);
  };

  const BasicGraph = () => <ReactFlow
    elements={elements}
    style={graphStyles}
    onConnect={(p) => onConnect(p)}
    onElementClick={onElementClick}
    nodeTypes={nodeTypes}
    onSelectionChange={handleSelectionChange}
  >
    <button type="button" onClick={addCampaign} className="CampaignButton">
      add Campaign
    </button>
  </ReactFlow>;

  return <BasicGraph />;
}

export default App;
