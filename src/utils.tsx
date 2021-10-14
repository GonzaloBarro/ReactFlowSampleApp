import {MouseEvent} from 'react';
import {
    Edge,
    ElementId,
    Elements,
    FlowElement,
    Node
  } from 'react-flow-renderer';

export interface NodesCount {
    campaigns: number;
    emails: number;
    adders: number;
    total: number;
}

export interface GraphData {
    nodes: NodesCount;
    elements: Elements;
    lastCampaign: ElementId | null;
}

const nodeTypes = {
    ADDER: 'adder',
    EMAIL: 'email',
    SMS: 'sms',
    CAMPAIGN: 'campaign'
};

const isAdder = (value: any): value is Node => !!value.position && value.type === nodeTypes.ADDER;

const setActionLabel = (nodeType: string, nodeId: ElementId | null): string => {
    const actionLabels = {
        [nodeTypes.ADDER]: '+',
        [nodeTypes.EMAIL]: `Send email ${nodeId}`,
        [nodeTypes.SMS]: `Send SMS ${nodeId}`,
        [nodeTypes.CAMPAIGN]: `Campaign ${nodeId}`
    };
    return actionLabels[nodeType];
};
  
const addActionNode = (_: MouseEvent, actionNode: FlowElement, elements: Elements, nodes: NodesCount, nodeType: string): GraphData | null => {
    if (!isAdder(actionNode)) {
      return null;
    }

    const newElements: Elements = elements.filter(flowElement => flowElement.id !== actionNode.id);
    const actionNodeId: ElementId = `${actionNode.data.campaign}-${nodes.emails}`;
    const newActionNode: FlowElement = {
        ...actionNode,
        type: nodeType,
        id: actionNodeId,
        data: {
            label: setActionLabel(nodeType, actionNodeId),
            tabindex: nodes.total,
            campaign: actionNode.data.campaign
        }
    }
    
    const newAdder: FlowElement = {
      ...actionNode,
      position: { x: actionNode.position.x + 70, y: actionNode.position.y },
      data: {...actionNode.data, tabindex: nodes.total + 1}
    }

    return {
        nodes: {
            campaigns: nodes.campaigns,
            emails: nodes.emails + 1,
            adders: nodes.adders,
            total: nodes.total + 1
        },
        elements: [...newElements, newActionNode, newAdder],
        lastCampaign: null
    };
};

const addCampaign = (elements: Elements, nodes: NodesCount, lastCampaign: ElementId | null): GraphData => {
    const campaignId: ElementId = (nodes.campaigns + 1).toString();
    const topPosition: number = (nodes.campaigns + 1) * 50;

    const newEdges: Elements = [];

    const newCampaign: Node = {
        id: campaignId,
        data: {
            label: setActionLabel(nodeTypes.CAMPAIGN, campaignId),
            tabindex: nodes.total,
            campaign: campaignId
        },
        type: nodeTypes.CAMPAIGN,
        position: { x: 200, y: topPosition },
        draggable: false
    };

    const newAddNode: Node = {
        id: `~${campaignId}`,
        data: {
            label: setActionLabel(nodeTypes.ADDER, null),
            tabindex: nodes.total + 1,
            campaign: campaignId
        },
        type: nodeTypes.ADDER,
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

    return {
        nodes: {
            campaigns: nodes.campaigns + 1,
            emails: nodes.emails,
            adders: nodes.adders + 1,
            total: nodes.total + 2
        },
        lastCampaign: campaignId,
        elements: [...elements, ...newEdges, newCampaign, newAddNode]
    };
  };


export {
    addActionNode,
    addCampaign,
    isAdder
};