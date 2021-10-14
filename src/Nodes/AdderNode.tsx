import React, { FC } from 'react';
import { NodeProps } from 'react-flow-renderer';

import './Nodes.css';

export const AdderNode: FC<NodeProps> = props => (
    <div
        className="Adder"
        tabIndex={props.data.tabindex}
    >
        {props.data.label}
    </div>
);
  