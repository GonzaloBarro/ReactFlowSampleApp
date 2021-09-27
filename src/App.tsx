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
  { id: "1", data: { label: "Playbook Entry" }, position: { x: 10, y: 50 }, draggable: false }
];

const graphStyles = { width: "100%", height: "500px" };

const isAdder = (value: any): value is Node => !!value.position && value.type === 'adder';

const AdderControl: FC<NodeProps> = () => {
  return <div className="Adder">+</div>;
};

const SendEmailControl: FC<NodeProps> = () => {
  return <div className="Email">EMail</div>
}

function App() {
  const [elements, setElements] = useState<Elements>(basicElements);
  const [lastNode, setLastNode] = useState<ElementId | null>(null);
  const [nodes, setNodes] = useState<number>(0);
    
  const onConnect = (params: Connection | Edge): void => setElements((els) => addEdge(params, els));

  const onElementClick = (_: MouseEvent, element: FlowElement): void => {
    if (!isAdder(element)) {
      return;
    }

    const newElements = elements.filter(flowElement => flowElement.id !== element.id);

    const controlId: ElementId = `${element.position.x}-${element.position.y}`;
    const newControl: FlowElement = {
      ...element,
      type: 'email',
      id: controlId,
      data: { label: `Control ${controlId}` },
    }
    delete newControl.style;

    const newAdder: FlowElement = {
      ...element,
      position: { x: element.position.x + 70, y: element.position.y }
    }
    newElements.push(newControl, newAdder);
    setElements(newElements);
  };

  const addNode = () => {
    const nodeId: ElementId = (elements.length + 1).toString();
    const topPosition: number = (nodes + 1) * 50;

    const newElements: Elements = [];

    const newNode: Node = {
      id: nodeId,
      data: { label: `Campaign ${nodeId}` },
      type: 'default',
      position: { x: 200, y: topPosition },
      draggable: false
    };

    const newAddNode: Node = {
      id: `~${nodeId}`,
      data: { label: '+' },
      type: 'adder',
      position: { x: 400, y: topPosition },
      draggable: false
    };

    newElements.push(newNode, newAddNode);

    if (lastNode) {
      const edgeId: ElementId = (elements.length + 1).toString();
      const newEdge: Edge = {
        id: edgeId,
        source: lastNode,
        target: nodeId
      };
      newElements.push(newEdge);
    }

    setNodes(nodes + 1);
    setLastNode(nodeId);
    setElements((els) => els.concat( ...newElements ));
  };

  const BasicGraph = () => <ReactFlow
    elements={elements}
    style={graphStyles}
    onConnect={(p) => onConnect(p)}
    onElementClick={onElementClick}
    nodeTypes={{adder: AdderControl, email: SendEmailControl}}
  >
    <button type="button" onClick={addNode} style={{ position: 'absolute', left: 10, top: 10, zIndex: 4 }}>
      add Campaign
    </button>
  </ReactFlow>;

  return <BasicGraph />;
}

export default App;
