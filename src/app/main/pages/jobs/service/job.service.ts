import { Injectable, signal, WritableSignal } from '@angular/core';
import { Job } from '../types/job.type';
import { PaginationSearchCriteria } from '../../../shared/types/shared.type';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private _jobs = signal<Job[]>([
    {
      id: 1,
      title: {
        nameEn: 'Software Engineer',
        nameAr: 'مهندس برمجيات',
      },
      location: {
        nameEn: 'Cairo, Egypt',
        nameAr: 'القاهرة، مصر',
      },
      company: {
        nameEn: 'Google',
        nameAr: 'جوجل',
      },
      salary: 10000,
    },
    {
      id: 2,
      title: {
        nameEn: 'Data Scientist',
        nameAr: 'عالم بيانات',
      },
      location: {
        nameEn: 'New York, USA',
        nameAr: 'نيويورك، الولايات المتحدة الأمريكية',
      },
      company: {
        nameEn: 'Facebook',
        nameAr: 'فيسبوك',
      },
      salary: 15000,
    },
    {
      id: 3,
      title: {
        nameEn: 'Product Manager',
        nameAr: 'مدير منتج',
      },
      location: {
        nameEn: 'London, UK',
        nameAr: 'لندن، المملكة المتحدة',
      },
      company: {
        nameEn: 'Amazon',
        nameAr: 'أمازون',
      },
      salary: 20000,
    },
    {
      id: 4,
      title: {
        nameEn: 'DevOps Engineer',
        nameAr: 'مهندس ديف أوبس',
      },
      location: {
        nameEn: 'Berlin, Germany',
        nameAr: 'برلين، ألمانيا',
      },
      company: {
        nameEn: 'Microsoft',
        nameAr: 'مايكروسوفت',
      },
      salary: 12000,
    },
    {
      id: 5,
      title: {
        nameEn: 'QA Engineer',
        nameAr: 'مهندس ضمان الجودة',
      },
      location: {
        nameEn: 'Paris, France',
        nameAr: 'باريس، فرنسا',
      },
      company: {
        nameEn: 'Apple',
        nameAr: 'أبل',
      },
      salary: 8000,
    },
    {
      id: 6,
      title: {
        nameEn: 'UI/UX Designer',
        nameAr: 'مصمم واجهة المستخدم وتجربة المستخدم',
      },
      location: {
        nameEn: 'Tokyo, Japan',
        nameAr: 'طوكيو، اليابان',
      },
      company: {
        nameEn: 'Sony',
        nameAr: 'سوني',
      },
      salary: 11000,
    },
    {
      id: 7,
      title: {
        nameEn: 'Backend Developer',
        nameAr: 'مطور الواجهة الخلفية',
      },
      location: {
        nameEn: 'San Francisco, USA',
        nameAr: 'سان فرانسيسكو، الولايات المتحدة الأمريكية',
      },
      company: {
        nameEn: 'Twitter',
        nameAr: 'تويتر',
      },
      salary: 13000,
    },
    {
      id: 8,
      title: {
        nameEn: 'Frontend Developer',
        nameAr: 'مطور الواجهة الأمامية',
      },
      location: {
        nameEn: 'Sydney, Australia',
        nameAr: 'سيدني، أستراليا',
      },
      company: {
        nameEn: 'Atlassian',
        nameAr: 'أتلاسيان',
      },
      salary: 9000,
    },
    {
      id: 9,
      title: {
        nameEn: 'System Administrator',
        nameAr: 'مسؤول النظام',
      },
      location: {
        nameEn: 'Dubai, UAE',
        nameAr: 'دبي، الإمارات العربية المتحدة',
      },
      company: {
        nameEn: 'Emirates',
        nameAr: 'طيران الإمارات',
      },
      salary: 9500,
    },
    {
      id: 10,
      title: {
        nameEn: 'Network Engineer',
        nameAr: 'مهندس شبكات',
      },
      location: {
        nameEn: 'Toronto, Canada',
        nameAr: 'تورونتو، كندا',
      },
      company: {
        nameEn: 'Cisco',
        nameAr: 'سيسكو',
      },
      salary: 10500,
    },
  ]);

  getJobs(criteria: PaginationSearchCriteria): {
    jobs: Job[];
    totalCount: number;
  } {
    return {
      jobs: this._jobs().slice(criteria.skip, criteria.take + criteria.skip),
      totalCount: this._jobs().length,
    };
  }

  getJobById(id: number): Job | undefined {
    return this._jobs().find((job) => job.id === id);
  }

  addJob(job: Job) {
    this._jobs.update((jobs) => [...jobs, job]);
  }
}
