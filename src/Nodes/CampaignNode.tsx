import React, { FC } from 'react';
import { NodeProps } from 'react-flow-renderer';

import './Nodes.css';

export const CampaignNode: FC<NodeProps> = ({data}) => (
    <div
        className="Campaign"
        tabIndex={data.tabindex}
    >
        {data.label}
    </div>
);
