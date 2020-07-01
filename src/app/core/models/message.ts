export interface Message {
    type: messageType;
    text: string;
    icon?: messageIcon;
    timeout?: number;
    isStayForever?: boolean;
}

export type messageType = 'success' | 'info' | 'warning' | 'danger';

export type messageIcon = 'success' | 'info' | 'warning' | 'danger';

export const messageIconMap = {
    success: 'check',
    info: 'info-circle',
    warning: 'exclamation-circle',
    danger: 'exclamation-triangle'
}