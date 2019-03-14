import {Component} from 'react';

interface YMInitializerProps {
    accounts: number[];
    containerElement?: string;
    options?: {[name: string]: any};
    version?: '1' | '2';
    attrs?: Record<string, string | number>;
}

export class YMInitializer extends Component<YMInitializerProps> {}

declare const ym: (methodName: string, ...args: any[]) => void;

export default ym;
