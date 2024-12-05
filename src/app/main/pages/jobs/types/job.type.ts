import { AbstractResponseData } from '../../../shared/types/shared.type';

export interface Job {
  id: number;
  title: AbstractResponseData;
  location: AbstractResponseData;
  company: AbstractResponseData;
  salary: number;
}
