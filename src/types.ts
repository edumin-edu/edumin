export interface Course {
  id: string;
  title: string;
  category: 'Geología' | 'Minas' | 'Procesamiento' | 'Seguridad' | 'Gestión';
  instructor: string;
  duration: string;
  level: string;
  rating: number;
  lessonsCount: string;
  description: string;
  syllabus: string[];
  image: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  discipline: 'Geología' | 'Minas' | 'Procesamiento' | 'Seguridad' | 'Gestión';
  salaryRange: string;
  type: string;
  description: string;
  requirements: string[];
  datePosted: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  stars: number;
  text: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
