import React, { FC } from 'react';
import { NodeProps } from 'react-flow-renderer';

import './Nodes.css';

export const SendSmsNode: FC<NodeProps> = ({ data }) => (
    <div
        className="Sms"
        tabIndex={data.tabindex}
    >
        {data.label}
    </div>
);
