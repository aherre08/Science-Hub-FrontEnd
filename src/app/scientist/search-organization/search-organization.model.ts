export interface Organismo {
  id:number,
  idOrganization: number;
  userUuid: string;
  name: string;
  email:string;
  location: string;
  area:string;
  active:boolean;
}

export interface Proyecto{
  id: number,
  idOrganization: string,
  title: string,
  description: string,
  size: number,
  duration: string,
  capacity: number,
  scope: string,
  subscope: string,
  full: boolean,
  active: boolean,
  initLifeDate: string,
  updateLife: string
}
