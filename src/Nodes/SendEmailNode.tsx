import React, { FC } from 'react';
import { NodeProps } from 'react-flow-renderer';

import './Nodes.css';

export const SendEmailNode: FC<NodeProps> = ({ data }) => (
    <div
        className="Email"
        tabIndex={data.tabindex}
    >
        {data.label}
    </div>
);
