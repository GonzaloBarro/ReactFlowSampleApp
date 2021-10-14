import { AdderNode } from './AdderNode';
import { CampaignNode } from './CampaignNode';
import { SendEmailNode } from './SendEmailNode';
import { SendSmsNode } from './SendSmsNode';

export const nodeTypes = {
    EMAIL: 'email',
    SMS: 'sms',
    ADDER: 'adder',
    CAMPAIGN: 'campaign'
};

export const nodeElements = {
    adder: AdderNode,
    email: SendEmailNode,
    sms: SendSmsNode,
    campaign: CampaignNode
};
