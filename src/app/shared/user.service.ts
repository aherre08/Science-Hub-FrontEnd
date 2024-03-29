import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly SESSION_STORAGE_KEY = 'user_data';

  constructor() {
    const storedData = JSON.parse(sessionStorage.getItem(this.SESSION_STORAGE_KEY) || '{}');

    this.userId = storedData.userId;
    this.userUuid = storedData.userUuid || '';
    this.name = storedData.name || '';
    this.email = storedData.email || '';
    
    this.idProject = storedData.idProject || 0;
    this.orcid = storedData.orcid || '';
    this.profession = storedData.profession || '';
    this.available = storedData.available;
    
    this.orgId = storedData.orgId || '';
    this.location = storedData.location || '';
    this.area = storedData.area || '';
  }

  // Attributes in common
  private userId: number | undefined;
  private userUuid: string;
  private name: string;
  private email: string;

  // Scientist
  private idProject:number;
  private orcid: string;
  private profession: string;
  private publicationId: string | undefined;
  private available:boolean;

  // Organization 
  private orgId: string;
  private location: string;
  private area: string;

  // Getters & Setters
  setUserId(id: number | undefined) {
    this.userId = id;
    this.saveToSessionStorage();
  }

  getUserId(): number | undefined {
    return this.userId;
  }

  setUserUuid(userUuid: string) {
    this.userUuid = userUuid;
    this.saveToSessionStorage();
  }

  getUserUuid(): string {
    return this.userUuid;
  }

  setName(name: string) {
    this.name = name;
    this.saveToSessionStorage();
  }

  getName(): string {
    return this.name;
  }

  setEmail(email: string) {
    this.email = email;
    this.saveToSessionStorage();
  }

  getEmail(): string {
    return this.email;
  }


  setIdProject(id: number) {
    this.idProject = id;
    this.saveToSessionStorage();
  }

  getIdProject(): number | undefined {
    return this.idProject;
  }


  setOrcid(orcid: string) {
    this.orcid = orcid;
    this.saveToSessionStorage();
  }

  getOrcid(): string {
    return this.orcid;
  }

  setProfession(profession: string) {
    this.profession = profession;
    this.saveToSessionStorage();
  }

  getProfession(): string {
    return this.profession;
  }

  setPublicationId(id: number | undefined) {
    this.publicationId = id?.toString();
    this.saveToSessionStorage();
  }

  getPublicationId(): string | undefined{
    return this.publicationId;
  }

  setAvailable(available:boolean){
    this.available = available;
    this.saveToSessionStorage();
  }

  getAvailable():boolean{
    return this.available;
  }

  setOrgId(orgId: string) {
    this.orgId = orgId;
    this.saveToSessionStorage();
  }

  getOrgId(): string {
    return this.orgId;
  }

  setLocation(location: string) {
    this.location = location;
    this.saveToSessionStorage();
  }

  getLocation(): string {
    return this.location;
  }

  setArea(area: string) {
    this.area = area;
    this.saveToSessionStorage();
  }

  getArea(): string {
    return this.area;
  }

  private saveToSessionStorage() {
    const dataToStore = {
      userId: this.userId,
      userUuid: this.userUuid,
      name: this.name,
      email: this.email,
      idProject: this.idProject,
      available: this.available,
      orcid: this.orcid,
      profession: this.profession,
      orgId: this.orgId,
      location: this.location,
      area: this.area,
    };

    sessionStorage.setItem(this.SESSION_STORAGE_KEY, JSON.stringify(dataToStore));
  }
}
