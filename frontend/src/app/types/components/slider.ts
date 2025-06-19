import { JSX } from 'react';
export interface slider {
  itemArray: any[];
  RenderItem: (props: { item: any }) => JSX.Element;
  itemPerView?: number;
  dots?: boolean;
  autoplay?: boolean;
  centerMode?:boolean;
  className?:string;
  speed?:number;
}