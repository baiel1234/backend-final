export class CreateJobDto {
    title: string;
    description: string;
    employerId: number;
  }
  
  export class UpdateJobDto {
    title?: string;
    description?: string;
  }
  