import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

// --- Mock Data ---

const jobsData: Job[] = [
  // FAANG & Major Tech
  {
    id: 1,
    title: 'Software Engineer Intern',
    company: 'Google',
    logo: 'https://logo.clearbit.com/google.com',
    location: 'Bengaluru',
    stipend: '₹1,00,000/month',
    ctc: 'N/A',
    type: 'Internship',
    description: 'Join Google\'s core engineering team to work on scalable, distributed systems. This is an opportunity to work on products that impact billions of users.',
    requirements: ['Proficiency in C++, Java, or Python', 'Strong understanding of data structures and algorithms', 'Experience with distributed systems is a plus'],
    eligibleBranches: ['Computer Science', 'Information Technology', 'Electronics'],
    minCGPA: 8.5,
    rounds: [{ name: 'Online Coding', date: '2024-08-10' }, { name: 'Technical Interviews (2 rounds)', date: '2024-08-20' }, { name: 'Hiring Committee Review', date: '2024-08-25' }],
    lastDateToApply: '2024-09-10',
  },
  {
    id: 2,
    title: 'Software Development Engineer (SDE)',
    company: 'Amazon',
    logo: 'https://logo.clearbit.com/amazon.com',
    location: 'Hyderabad',
    stipend: 'N/A',
    ctc: '2800000',
    type: 'Full-time',
    description: 'As an SDE at Amazon, you will build and own services that power one of the world\'s largest e-commerce platforms. Focus on high availability, low latency, and scalability.',
    requirements: ['B.Tech in CS/IT or related fields', 'Excellent problem-solving skills', 'Knowledge of cloud computing concepts (AWS preferred)'],
    eligibleBranches: ['Computer Science', 'Information Technology'],
    minCGPA: 8.0,
    rounds: [{ name: 'Online Assessment', date: '2024-08-12' }, { name: 'Technical Phone Screen', date: '2024-08-18' }, { name: 'On-site Interviews (3 rounds)', date: '2024-08-26' }],
    lastDateToApply: '2024-09-05',
  },
  {
    id: 3,
    title: 'Explore Program (Internship)',
    company: 'Microsoft',
    logo: 'https://logo.clearbit.com/microsoft.com',
    location: 'Pune',
    stipend: '₹85,000/month',
    ctc: 'N/A',
    type: 'Internship',
    description: 'A 12-week internship program for students in their second year. Rotate between program management, software engineering, and design.',
    requirements: ['Currently enrolled in a B.Tech program', 'Passion for technology and software', 'Strong communication and teamwork skills'],
    eligibleBranches: ['Any'],
    minCGPA: 7.5,
    rounds: [{ name: 'Online Coding Challenge', date: '2024-08-11' }, { name: 'Virtual Interview', date: '2024-08-19' }],
    lastDateToApply: '2024-09-15',
  },
  {
    id: 4,
    title: 'Product Analyst',
    company: 'Meta',
    logo: 'https://logo.clearbit.com/meta.com',
    location: 'Gurugram',
    stipend: 'N/A',
    ctc: '2200000',
    type: 'Full-time',
    description: 'Use data to understand user behavior, identify product opportunities, and drive strategic decisions for products like Facebook, Instagram, and WhatsApp.',
    requirements: ['Proficiency in SQL and a data analysis language (Python/R)', 'Strong analytical and communication skills', 'Experience with data visualization tools like Tableau'],
    eligibleBranches: ['Computer Science', 'Information Technology', 'Mathematics', 'Statistics'],
    minCGPA: 8.0,
    rounds: [{ name: 'SQL & Product Sense Test', date: '2024-08-14' }, { name: 'Case Study Interview', date: '2024-08-22' }, { name: 'Final Round with Product Manager', date: '2024-08-28' }],
    lastDateToApply: '2024-09-20',
  },
  {
    id: 5,
    title: 'iOS Developer Intern',
    company: 'Apple',
    logo: 'https://logo.clearbit.com/apple.com',
    location: 'Hyderabad',
    stipend: '₹1,20,000/month',
    ctc: 'N/A',
    type: 'Internship',
    description: 'Work on the core apps and frameworks that power millions of Apple devices. Develop user-facing features in Swift and Objective-C.',
    requirements: ['Experience with Swift or Objective-C', 'A portfolio of personal projects or apps on the App Store', 'Understanding of Apple\'s design principles'],
    eligibleBranches: ['Computer Science', 'Information Technology'],
    minCGPA: 8.2,
    rounds: [{ name: 'Portfolio Review', date: '2024-08-15' }, { name: 'Technical Interviews (2 rounds)', date: '2024-08-23' }],
    lastDateToApply: '2024-09-18',
  },
  // SaaS & Enterprise
  {
    id: 6,
    title: 'Graduate Software Engineer',
    company: 'Atlassian',
    logo: 'https://logo.clearbit.com/atlassian.com',
    location: 'Bengaluru',
    stipend: 'N/A',
    ctc: '3500000',
    type: 'Full-time',
    description: 'Join the team building products like Jira and Confluence. Focus on teamwork, clean code, and agile methodologies to solve complex problems for our customers.',
    requirements: ['Strong Java or JavaScript skills', 'Understanding of Agile development', 'A passion for building great products'],
    eligibleBranches: ['Computer Science', 'Information Technology'],
    minCGPA: 8.0,
    rounds: [{ name: 'Online Coding (HackerRank)', date: '2024-08-13' }, { name: 'System Design Interview', date: '2024-08-21' }, { name: 'Values & Management Interview', date: '2024-08-27' }],
    lastDateToApply: '2024-09-22',
  },
  {
    id: 7,
    title: 'Member of Technical Staff',
    company: 'Adobe',
    logo: 'https://logo.clearbit.com/adobe.com',
    location: 'Noida',
    stipend: 'N/A',
    ctc: '2000000',
    type: 'Full-time',
    description: 'Work on Adobe\'s Creative Cloud or Experience Cloud products. Develop high-performance, reliable, and scalable software.',
    requirements: ['Proficiency in C++ or JavaScript', 'Strong computer science fundamentals', 'Experience with imaging or graphics is a plus'],
    eligibleBranches: ['Computer Science', 'Information Technology', 'Electronics'],
    minCGPA: 7.8,
    rounds: [{ name: 'Technical Assessment', date: '2024-08-16' }, { name: 'Technical Interviews (3 rounds)', date: '2024-08-24' }],
    lastDateToApply: '2024-09-25',
  },
  {
    id: 8,
    title: 'Technical Consultant Intern',
    company: 'Salesforce',
    logo: 'https://logo.clearbit.com/salesforce.com',
    location: 'Hyderabad',
    stipend: '₹70,000/month',
    ctc: 'N/A',
    type: 'Internship',
    description: 'Work with customers to understand their business needs and implement solutions on the Salesforce platform. A mix of technical and client-facing skills.',
    requirements: ['Understanding of object-oriented programming', 'Excellent communication and presentation skills', 'Ability to learn new technologies quickly'],
    eligibleBranches: ['Any'],
    minCGPA: 7.0,
    rounds: [{ name: 'Aptitude & Technical Test', date: '2024-08-18' }, { name: 'Case Interview', date: '2024-08-25' }, { name: 'HR Interview', date: '2024-08-30' }],
    lastDateToApply: '2024-10-01',
  },
  {
    id: 9,
    title: 'Backend Engineer',
    company: 'Twilio',
    logo: 'https://logo.clearbit.com/twilio.com',
    location: 'Bengaluru',
    stipend: 'N/A',
    ctc: '3200000',
    type: 'Full-time',
    description: 'Build the APIs that power communication for millions of developers around the world. Focus on reliability, scalability, and developer experience.',
    requirements: ['Experience with Java, Python, or Go', 'Understanding of microservices architecture', 'Familiarity with REST APIs and cloud infrastructure'],
    eligibleBranches: ['Computer Science', 'Information Technology'],
    minCGPA: 7.5,
    rounds: [{ name: 'Online Coding', date: '2024-08-20' }, { name: 'System Design Round', date: '2024-08-27' }, { name: 'Bar Raiser Interview', date: '2024-09-02' }],
    lastDateToApply: '2024-09-12',
  },
  {
    id: 10,
    title: 'Frontend Engineer',
    company: 'Slack',
    logo: 'https://logo.clearbit.com/slack.com',
    location: 'Pune',
    stipend: 'N/A',
    ctc: '2500000',
    type: 'Full-time',
    description: 'Develop the user interface for the Slack desktop and web clients. Focus on performance, accessibility, and creating a delightful user experience.',
    requirements: ['Deep expertise in JavaScript, HTML, and CSS', 'Experience with React or another modern frontend framework', 'A keen eye for design and detail'],
    eligibleBranches: ['Computer Science', 'Information Technology'],
    minCGPA: 7.5,
    rounds: [{ name: 'JavaScript Challenge', date: '2024-08-21' }, { name: 'UI/Component Building Interview', date: '2024-08-28' }, { name: 'Final Interview', date: '2024-09-04' }],
    lastDateToApply: '2024-09-08',
  },
  // Indian Startups & Unicorns
  {
    id: 11,
    title: 'SDE Intern',
    company: 'Swiggy',
    logo: 'https://logo.clearbit.com/swiggy.com',
    location: 'Bengaluru',
    stipend: '₹50,000/month',
    ctc: 'N/A',
    type: 'Internship',
    description: 'Work on core services for Swiggy, from logistics and delivery to the consumer-facing app. Solve real-world problems at a massive scale.',
    requirements: ['Good coding skills in any language', 'Eagerness to learn and work in a fast-paced environment', 'Basic understanding of APIs and databases'],
    eligibleBranches: ['Computer Science', 'Information Technology'],
    minCGPA: 7.0,
    rounds: [{ name: 'Online Test', date: '2024-08-22' }, { name: 'Technical Interview', date: '2024-08-29' }],
    lastDateToApply: '2024-09-14',
  },
  {
    id: 12,
    title: 'Business Analyst',
    company: 'Zomato',
    logo: 'https://logo.clearbit.com/zomato.com',
    location: 'Gurugram',
    stipend: 'N/A',
    ctc: '1500000',
    type: 'Full-time',
    description: 'Analyze data to generate insights that will drive business growth. Work with product, marketing, and operations teams.',
    requirements: ['Strong analytical skills and proficiency in SQL', 'Experience with Excel and data visualization', 'Good business acumen'],
    eligibleBranches: ['Any'],
    minCGPA: 7.0,
    rounds: [{ name: 'Case Study', date: '2024-08-23' }, { name: 'Interviews (2 rounds)', date: '2024-08-30' }],
    lastDateToApply: '2024-09-01',
  },
  {
    id: 13,
    title: 'Data Science Intern',
    company: 'Paytm',
    logo: 'https://logo.clearbit.com/paytm.com',
    location: 'Noida',
    stipend: '₹60,000/month',
    ctc: 'N/A',
    type: 'Internship',
    description: 'Work on machine learning models for fraud detection, recommendation engines, and user personalization across the Paytm ecosystem.',
    requirements: ['Proficiency in Python (pandas, scikit-learn)', 'Knowledge of machine learning algorithms', 'Experience with SQL'],
    eligibleBranches: ['Computer Science', 'Information Technology', 'Mathematics'],
    minCGPA: 8.0,
    rounds: [{ name: 'ML Quiz & Coding Test', date: '2024-08-24' }, { name: 'Technical Interview', date: '2024-08-31' }],
    lastDateToApply: '2024-09-28',
  },
  {
    id: 14,
    title: 'Full Stack Developer',
    company: 'Razorpay',
    logo: 'https://logo.clearbit.com/razorpay.com',
    location: 'Bengaluru',
    stipend: 'N/A',
    ctc: '2400000',
    type: 'Full-time',
    description: 'Build end-to-end features for Razorpay\'s payment gateway and business banking products. Work with a modern tech stack (React, Node.js).',
    requirements: ['Experience with JavaScript (React, Node.js)', 'Understanding of financial systems is a plus', 'Ability to write clean, maintainable code'],
    eligibleBranches: ['Computer Science', 'Information Technology'],
    minCGPA: 7.5,
    rounds: [{ name: 'Machine Coding Round', date: '2024-08-25' }, { name: 'Technical Interviews (2 rounds)', date: '2024-09-01' }],
    lastDateToApply: '2024-09-19',
  },
  {
    id: 15,
    title: 'Product Design Intern',
    company: 'CRED',
    logo: 'https://logo.clearbit.com/cred.club',
    location: 'Bengaluru',
    stipend: '₹75,000/month',
    ctc: 'N/A',
    type: 'Internship',
    description: 'Design beautiful, intuitive, and delightful user experiences for the CRED app. Work on everything from user flows to pixel-perfect UI.',
    requirements: ['A strong portfolio showcasing your UI/UX skills', 'Proficiency in Figma or Sketch', 'Deep appreciation for good design'],
    eligibleBranches: ['Any'],
    minCGPA: 6.5,
    rounds: [{ name: 'Portfolio Review', date: '2024-08-26' }, { name: 'Design Task', date: '2024-09-02' }, { name: 'Interview', date: '2024-09-06' }],
    lastDateToApply: '2024-09-03',
  },
  // More Roles
  ...Array.from({ length: 35 }, (_, i) => {
    const companies = [
      { name: 'Uber', logo: 'https://logo.clearbit.com/uber.com' },
      { name: 'Netflix', logo: 'https://logo.clearbit.com/netflix.com' },
      { name: 'Airbnb', logo: 'https://logo.clearbit.com/airbnb.com' },
      { name: 'Spotify', logo: 'https://logo.clearbit.com/spotify.com' },
      { name: 'Flipkart', logo: 'https://logo.clearbit.com/flipkart.com' },
      { name: 'Ola Cabs', logo: 'https://logo.clearbit.com/olacabs.com' },
      { name: 'Oracle', logo: 'https://logo.clearbit.com/oracle.com' },
      { name: 'SAP', logo: 'https://logo.clearbit.com/sap.com' },
      { name: 'Intel', logo: 'https://logo.clearbit.com/intel.com' },
      { name: 'Nvidia', logo: 'https://logo.clearbit.com/nvidia.com' },
      { name: 'Qualcomm', logo: 'https://logo.clearbit.com/qualcomm.com' },
      { name: 'Cisco', logo: 'https://logo.clearbit.com/cisco.com' },
      { name: 'VMware', logo: 'https://logo.clearbit.com/vmware.com' },
      { name: 'Dell', logo: 'https://logo.clearbit.com/dell.com' },
      { name: 'HP', logo: 'https://logo.clearbit.com/hp.com' },
    ];
    const jobTypes = [
      { title: 'Backend Engineer', type: 'Full-time', baseCtc: 18, stipend: null, branches: ['Computer Science', 'IT'] },
      { title: 'Frontend Intern', type: 'Internship', baseCtc: null, stipend: 45, branches: ['Computer Science', 'IT', 'Electronics'] },
      { title: 'Data Analyst', type: 'Full-time', baseCtc: 12, stipend: null, branches: ['Any'] },
      { title: 'Cloud Engineer', type: 'Full-time', baseCtc: 16, stipend: null, branches: ['Computer Science', 'IT'] },
      { title: 'DevOps Intern', type: 'Internship', baseCtc: null, stipend: 40, branches: ['Computer Science', 'IT'] },
      { title: 'Cybersecurity Analyst', type: 'Full-time', baseCtc: 14, stipend: null, branches: ['Computer Science', 'IT'] },
      { title: 'AI/ML Engineer', type: 'Full-time', baseCtc: 25, stipend: null, branches: ['Computer Science', 'IT', 'Mathematics'] },
    ];
    const locations = ['Bengaluru', 'Pune', 'Hyderabad', 'Gurugram', 'Noida', 'Remote'];
    const company = companies[i % companies.length];
    const jobType = jobTypes[i % jobTypes.length];
    const location = locations[i % locations.length];
    
    // Generate a date between yesterday and 30 days from now
    const today = new Date();
    const randomDay = Math.floor(Math.random() * 32) - 1;
    const applyDate = new Date(new Date().setDate(today.getDate() + randomDay));

    return {
      id: 16 + i,
      title: jobType.title,
      company: company.name,
      logo: company.logo,
      location: location,
      stipend: jobType.type === 'Internship' ? `₹${jobType.stipend * 1000}/month` : 'N/A',
      ctc: jobType.type === 'Full-time' ? `${jobType.baseCtc * 100000 + (i % 5) * 100000}` : 'N/A',
      type: jobType.type,
      description: `Seeking a talented ${jobType.title} to join our dynamic team at ${company.name}. You will work on challenging projects and contribute to our core products.`,
      requirements: ['Strong problem-solving skills', 'Relevant technical knowledge', 'Good communication skills'],
      eligibleBranches: jobType.branches,
      minCGPA: 7.0 + (i % 15) / 10,
      rounds: [{ name: 'Online Test', date: '2024-09-01' }, { name: 'Technical Interview', date: '2024-09-08' }],
      lastDateToApply: applyDate.toISOString().split('T')[0],
    };
  }),
];

const studentUser: Student = {
  id: 's1',
  name: 'Priya Sharma',
  email: 'priya.sharma@university.edu',
  branch: 'Computer Science',
  cgpa: '8.75',
  resumeUrl: 'priya_sharma_resume.pdf',
  avatarUrl: `https://api.dicebear.com/8.x/initials/svg?seed=Priya%20Sharma`,
};

const adminUser: AdminUser = {
  id: 'a1',
  name: 'Dr. R. Gupta',
  email: 'placement.office@university.edu',
  role: 'Placement Officer',
  avatarUrl: `https://api.dicebear.com/8.x/initials/svg?seed=R%20Gupta`,
};

// --- Data Generation for 200 Students ---
const firstNames = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Ayaan", "Krishna", "Ishaan", "Saanvi", "Aadhya", "Kiara", "Diya", "Pari", "Ananya", "Riya", "Sitara", "Avni", "Priya"];
const lastNames = ["Sharma", "Verma", "Gupta", "Singh", "Kumar", "Patel", "Reddy", "Mehta", "Jain", "Khan"];
const branches = ["Computer Science", "Information Technology", "Electronics", "Mechanical", "Civil"];

const allStudentsData: Student[] = Array.from({ length: 200 }, (_, i) => {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[Math.floor(i / firstNames.length) % lastNames.length];
    const name = `${firstName} ${lastName}`;
    const branch = branches[i % branches.length];
    const cgpa = (6.5 + Math.random() * 3.5).toFixed(2);
    return {
        id: `s${i + 1}`,
        name,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@university.edu`,
        branch,
        cgpa,
        resumeUrl: `${firstName}_${lastName}_resume.pdf`,
        avatarUrl: `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(name)}`,
    };
});
allStudentsData[0] = studentUser; // Ensure our main user is in the list

const generateApplications = (): Application[] => {
    const apps: Application[] = [];
    let appCount = 1;
    allStudentsData.forEach(student => {
        const numApplications = Math.floor(Math.random() * 5); // 0 to 4 applications per student
        for (let i = 0; i < numApplications; i++) {
            const job = jobsData[Math.floor(Math.random() * jobsData.length)];
            
            // Basic eligibility check to make data more realistic
            const isEligibleCGPA = parseFloat(student.cgpa) >= job.minCGPA;
            const isEligibleBranch = job.eligibleBranches.includes('Any') || job.eligibleBranches.includes(student.branch);

            if (isEligibleCGPA && isEligibleBranch && !apps.some(a => a.studentId === student.id && a.jobId === job.id)) {
                const statuses: Application['status'][] = ['Applied', 'Shortlisted', 'Selected', 'Rejected'];
                const status = statuses[Math.floor(Math.random() * statuses.length)];
                
                let currentRound = job.rounds[0]?.name || 'Pending Review';
                const timeline: ApplicationTimelineEvent[] = [
                    { name: 'Applied', date: new Date().toISOString().split('T')[0], status: 'Completed', result: 'Passed' }
                ];

                if (status !== 'Applied') {
                    currentRound = job.rounds[Math.floor(Math.random() * job.rounds.length)].name;
                }
                if(status === 'Selected') {
                    currentRound = 'Offer Released';
                }

                apps.push({
                    id: `app${appCount++}`,
                    jobId: job.id,
                    studentId: student.id,
                    status,
                    currentRound,
                    appliedOn: new Date(new Date().getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    timeline: [
                      ...timeline,
                      ...job.rounds.map(r => ({ ...r, status: 'Upcoming' as const, result: 'Awaiting' as const }))
                    ]
                });
            }
        }
    });
    return apps;
};

const initialApplications: Application[] = generateApplications();


// --- Interfaces ---
interface Job {
  id: number;
  title: string;
  company: string;
  logo: string;
  location: string;
  stipend: string;
  ctc: string;
  type: string;
  description: string;
  requirements: string[];
  eligibleBranches: string[];
  minCGPA: number;
  rounds: { name: string; date: string }[];
  lastDateToApply: string;
}

interface ApplicationTimelineEvent {
    name: string;
    date: string;
    status: 'Completed' | 'Upcoming' | 'Pending';
    result?: 'Passed' | 'Rejected' | 'Awaiting';
}

interface Application {
    id: string;
    jobId: number;
    studentId: string;
    status: 'Applied' | 'Shortlisted' | 'Selected' | 'Rejected';
    currentRound: string;
    appliedOn: string;
    timeline: ApplicationTimelineEvent[];
}

interface Student {
    id: string;
    name: string;
    email: string;
    branch: string;
    cgpa: string;
    resumeUrl: string;
    avatarUrl: string;
}

interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: string;
    avatarUrl: string;
}

interface EligibilityCriterion {
    name: string;
    requirement: string;
    userValue: string;
    met: boolean;
}

interface EligibilityResult {
    isEligible: boolean;
    criteria: EligibilityCriterion[];
}

type View = 'jobs' | 'profile' | 'applications';
type AdminView = 'dashboard' | 'students' | 'jobs' | 'stats';
type UserRole = 'student' | 'admin';

// --- Components ---

const SuccessAnimationOverlay = () => (
    <div className="success-overlay">
        <div className="success-checkmark">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                <circle className="checkmark-circle" fill="none" stroke="var(--success)" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
                <polyline className="checkmark-tick" fill="none" stroke="var(--success)" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
            </svg>
        </div>
    </div>
);

const JobCard: React.FC<{ job: Job; onSelect: (job: Job) => void; hasApplied?: boolean }> = ({ job, onSelect, hasApplied }) => {
  
  const getDaysRemaining = () => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const deadline = new Date(job.lastDateToApply);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { text: 'Deadline Passed', className: 'deadline-passed' };
    if (diffDays === 0) return { text: 'Apply Today!', className: 'deadline-today' };
    if (diffDays === 1) return { text: '1 day left', className: 'deadline-soon' };
    return { text: `${diffDays} days left`, className: 'deadline-normal' };
  };

  const deadlineInfo = getDaysRemaining();

  return (
    <article className="job-card" aria-labelledby={`job-title-${job.id}`}>
      {hasApplied && (
        <div className="job-card-applied-badge" aria-label="Applied for this job">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg>
        </div>
      )}
      <div className="job-card-header">
        <img src={job.logo} alt={`${job.company} logo`} className="company-logo" />
        <div>
            <h3 id={`job-title-${job.id}`} className="job-card-title">{job.title}</h3>
            <p className="job-card-company">{job.company}</p>
        </div>
      </div>
      <div className="job-card-details">
        <div className="detail-tag">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>
            <span>{job.location}</span>
        </div>
        <div className="detail-tag">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17,18H7V16H17M19,12H5V6H19M19,4H5C3.89,4 3,4.9 3,6V12C3,13.1 3.9,14 5,14H6V16C6,17.1 6.9,18 8,18H16C17.1,18 18,17.1 18,16V14H19C20.1,14 21,13.1 21,12V6C21,4.9 20.1,4 19,4Z" /></svg>
            <span>{job.type === 'Internship' ? `${job.stipend}` : `₹${(parseInt(job.ctc, 10)/100000).toFixed(1)} LPA`}</span>
        </div>
        <div className={`detail-tag ${deadlineInfo.className}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/></svg>
            <span>{deadlineInfo.text}</span>
        </div>
      </div>
      <button className="view-details-button" onClick={() => onSelect(job)}>View Details</button>
    </article>
  );
};

const EligibilityResultCard: React.FC<{ result: EligibilityResult; onApply: () => void; hasApplied: boolean; }> = ({ result, onApply, hasApplied }) => {
    return (
      <div className={`eligibility-result-card ${result.isEligible ? 'eligible' : 'ineligible'}`}>
        <h3 className={`eligibility-status ${result.isEligible ? 'status-pass' : 'status-fail'}`}>
          {result.isEligible ? '✅ You are eligible to apply!' : '❌ You are not eligible to apply.'}
        </h3>
        <ul className="eligibility-criteria-list">
          {result.criteria.map((criterion, index) => (
            <li key={index} className="criterion">
              <span className={`criterion-icon ${criterion.met ? 'met' : 'not-met'}`}>{criterion.met ? '✔' : '✖'}</span>
              <div className="criterion-details">
                <span className="criterion-name">{criterion.name}</span>
                <span className="criterion-info">
                  (Required: {criterion.requirement} | Your: {criterion.userValue})
                </span>
              </div>
            </li>
          ))}
        </ul>
        {result.isEligible && (
          <button 
            className="apply-button"
            onClick={onApply} 
            disabled={hasApplied}
          >
            {hasApplied ? 'Already Applied' : 'Apply Now'}
          </button>
        )}
      </div>
    );
};

const JobDetailModal: React.FC<{ job: Job; user: Student; onClose: () => void; onApply: (jobId: number) => void; hasApplied: boolean; }> = ({ job, user, onClose, onApply, hasApplied }) => {
    const [eligibilityResult, setEligibilityResult] = useState<EligibilityResult | null>(null);

    const handleCheckEligibility = () => {
        const isEligibleCGPA = parseFloat(user.cgpa) >= job.minCGPA;
        const isEligibleBranch = job.eligibleBranches.includes('Any') || job.eligibleBranches.includes(user.branch);
        
        setEligibilityResult({
          isEligible: isEligibleCGPA && isEligibleBranch,
          criteria: [
            { 
              name: 'Minimum CGPA', 
              requirement: `≥ ${job.minCGPA}`, 
              userValue: user.cgpa, 
              met: isEligibleCGPA 
            },
            { 
              name: 'Eligible Branch', 
              requirement: job.eligibleBranches.includes('Any') ? 'Any' : job.eligibleBranches.join(', '),
              userValue: user.branch, 
              met: isEligibleBranch 
            },
          ]
        });
    };

    const isDeadlinePassed = new Date(job.lastDateToApply) < new Date(new Date().toDateString());
      
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close dialog">&times;</button>
        <div className="modal-header">
            <img src={job.logo} alt={`${job.company} logo`} className="company-logo-large" />
            <div>
                <h2 className="job-card-title">{job.title}</h2>
                <p className="job-card-company">{job.company}</p>
            </div>
        </div>
        <div className="modal-details">
            <div className="details-grid">
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Type:</strong> {job.type}</p>
                <p><strong>Min CGPA:</strong> {job.minCGPA}</p>
                <p><strong>Package:</strong> {job.type === 'Internship' ? job.stipend : `₹${(parseInt(job.ctc, 10)/100000).toFixed(1)} LPA`}</p>
                <p><strong>Apply By:</strong> {new Date(job.lastDateToApply).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>

            <h4 className="section-title">Eligible Branches</h4>
            <div className="tag-container">
                {job.eligibleBranches.includes('Any') 
                    ? <span className="tag">Any Branch</span>
                    : job.eligibleBranches.map((branch, index) => <span key={index} className="tag">{branch}</span>)
                }
            </div>
            
            <h4 className="section-title">Job Description</h4>
            <p>{job.description}</p>

            <h4 className="section-title">Requirements</h4>
            <ul>
                {job.requirements.map((req, index) => <li key={index}>{req}</li>)}
            </ul>
            
            <h4 className="section-title">Recruitment Rounds</h4>
            <ol className="rounds-list">
                {job.rounds.map((round, index) => <li key={index}><strong>{round.name}:</strong> {new Date(round.date).toLocaleDateString()}</li>)}
            </ol>
        </div>
        <div className="modal-footer">
            {user && !eligibilityResult ? (
                <button 
                    className="apply-button" 
                    onClick={handleCheckEligibility}
                    disabled={isDeadlinePassed}
                    title={isDeadlinePassed ? "Application deadline has passed" : "Check your eligibility"}
                >
                    {isDeadlinePassed ? 'Deadline Passed' : 'Check Eligibility'}
                </button>
            ) : eligibilityResult ? (
                <EligibilityResultCard 
                    result={eligibilityResult}
                    onApply={() => onApply(job.id)}
                    hasApplied={hasApplied}
                />
            ) : null}
        </div>
      </div>
    </div>
  );
};

const ProfileScreen: React.FC<{user: Student; onUpdateProfile: (updatedUser: Student) => void;}> = ({user, onUpdateProfile}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState<Student>(user);

    useEffect(() => {
        setProfileData(user);
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => ({...prev, [name]: value }));
    };

    const handleSave = () => {
        onUpdateProfile(profileData);
        setIsEditing(false);
    };

    return (
        <section className="page-content" aria-labelledby="profile-heading">
            <div className="page-header">
                <h2 id="profile-heading" className="page-title">My Profile</h2>
                <button 
                    className={isEditing ? 'primary-button' : 'secondary-button'} 
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                >
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
            </div>
            <div className="profile-card">
                <div className="profile-card-header">
                    <img src={profileData.avatarUrl} alt="User avatar" className="profile-avatar"/>
                    <div>
                        {isEditing ? <input type="text" className="profile-name-input" name="name" value={profileData.name} onChange={handleInputChange} /> : <h3>{profileData.name}</h3>}
                        {isEditing ? <input type="text" name="branch" value={profileData.branch} onChange={handleInputChange} /> : <p>{profileData.branch}</p>}
                    </div>
                </div>
                <div className="profile-details-grid">
                    <div className="profile-field">
                        <label>Email</label>
                        {isEditing ? <input type="email" name="email" value={profileData.email} onChange={handleInputChange} /> : <p>{profileData.email}</p>}
                    </div>
                    <div className="profile-field">
                        <label>CGPA</label>
                        {isEditing ? <input type="text" name="cgpa" value={profileData.cgpa} onChange={handleInputChange} /> : <p>{profileData.cgpa}</p>}
                    </div>
                </div>
                 <div className="resume-section">
                    <h4>Resume</h4>
                    <div className="resume-info">
                        <p>{profileData.resumeUrl}</p>
                        <div className="button-group">
                            <button className="secondary-button">Download</button>
                            <button className="primary-button">Upload New</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const MyApplicationsScreen: React.FC<{ applications: Application[], onSelectApplication: (app: Application) => void }> = ({ applications, onSelectApplication }) => {
    const getStatusClassName = (status: Application['status']) => {
        switch (status) {
            case 'Selected': return 'status-selected';
            case 'Shortlisted': return 'status-shortlisted';
            case 'Rejected': return 'status-rejected';
            default: return 'status-applied';
        }
    };
    
    return (
        <section className="page-content" aria-labelledby="applications-heading">
            <h2 id="applications-heading" className="page-title">My Applications</h2>
            <div className="applications-table-container">
                <table className="applications-table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Job Title</th>
                            <th>Status</th>
                            <th>Current Round</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.length > 0 ? applications.map(app => {
                            const job = jobsData.find(j => j.id === app.jobId);
                            if (!job) return null;
                            return (
                                <tr key={app.id} onClick={() => onSelectApplication(app)} title="Click to view details">
                                    <td className="company-cell">
                                        <img src={job.logo} alt={`${job.company} logo`} className="company-logo-small"/>
                                        {job.company}
                                    </td>
                                    <td>{job.title}</td>
                                    <td><span className={`status-badge ${getStatusClassName(app.status)}`}>{app.status}</span></td>
                                    <td>{app.currentRound}</td>
                                </tr>
                            );
                        }) : (
                            <tr>
                                <td colSpan={4} className="no-applications-message">You haven't applied to any jobs yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

const initialFiltersState = {
    branch: '',
    cgpa: '6.0',
    ctc: '0',
    type: '',
    location: '',
    company: '',
};

const JobListScreen: React.FC<{ onSelectJob: (job: Job) => void; applications?: Application[] }> = ({ onSelectJob, applications }) => {
    const [filters, setFilters] = useState(initialFiltersState);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleResetFilters = () => {
        setFilters(initialFiltersState);
    };

    const sortedAndFilteredJobs = useMemo(() => {
        const getSortValue = (job: Job) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const deadline = new Date(job.lastDateToApply);
            const diffTime = deadline.getTime() - today.getTime();
            if (diffTime < 0) return Infinity; // Passed deadlines go to the end
            return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Days remaining
        };

        return jobsData
            .filter(job => {
                const ctcNum = parseInt(job.ctc, 10);
                const filterCtcNum = parseInt(filters.ctc, 10);

                const branchMatch = !filters.branch || job.eligibleBranches.includes(filters.branch) || job.eligibleBranches.includes('Any');
                const cgpaMatch = job.minCGPA <= parseFloat(filters.cgpa);
                const ctcMatch = job.type === 'Internship' || isNaN(ctcNum) || ctcNum >= filterCtcNum;
                const typeMatch = !filters.type || job.type === filters.type;
                const locationMatch = !filters.location || job.location === filters.location;
                const companyMatch = !filters.company || job.company.toLowerCase().includes(filters.company.toLowerCase()) || job.title.toLowerCase().includes(filters.company.toLowerCase());

                return branchMatch && cgpaMatch && ctcMatch && typeMatch && locationMatch && companyMatch;
            })
            .sort((a, b) => getSortValue(a) - getSortValue(b));
    }, [filters]);
    
    const allBranches = useMemo(() => [...new Set(jobsData.flatMap(j => j.eligibleBranches).filter(b => b !== 'Any'))].sort(), []);
    const allLocations = useMemo(() => [...new Set(jobsData.map(j => j.location))].sort(), []);
    const allTypes = useMemo(() => [...new Set(jobsData.map(j => j.type))].sort(), []);

    return (
     <section aria-labelledby="job-listings-heading">
        <h2 id="job-listings-heading" className="page-title">Current Job Openings</h2>
        
        <div className="filters-container">
            <div className="filter-item search-filter">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="filter-icon" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>
                <input type="text" id="company" name="company" placeholder="Search Job or Company..." value={filters.company} onChange={handleFilterChange} />
            </div>
            <div className="filter-item">
                <select id="branch" name="branch" value={filters.branch} onChange={handleFilterChange}>
                    <option value="">All Branches</option>
                    {allBranches.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
            </div>
            <div className="filter-item">
                <select id="type" name="type" value={filters.type} onChange={handleFilterChange}>
                    <option value="">All Types</option>
                    {allTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
            </div>
            <div className="filter-item">
                <select id="location" name="location" value={filters.location} onChange={handleFilterChange}>
                    <option value="">All Locations</option>
                    {allLocations.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
            </div>
            <div className="filter-item range-filter">
                <label htmlFor="cgpa">CGPA: {filters.cgpa}</label>
                <input type="range" id="cgpa" name="cgpa" min="6" max="10" step="0.1" value={filters.cgpa} onChange={handleFilterChange} />
            </div>
            <div className="filter-item range-filter">
                <label htmlFor="ctc">CTC: {filters.ctc === '0' ? 'Any' : `≥ ${(parseInt(filters.ctc, 10)/100000)} LPA`}</label>
                <input type="range" id="ctc" name="ctc" min="0" max="4000000" step="100000" value={filters.ctc} onChange={handleFilterChange} />
            </div>
            <button className="reset-filters-btn" onClick={handleResetFilters}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/><path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/></svg>
                Reset
            </button>
        </div>

        <div className="jobs-grid">
        {sortedAndFilteredJobs.length > 0 ? (
            sortedAndFilteredJobs.map(job => (
                <JobCard 
                    key={job.id} 
                    job={job} 
                    onSelect={onSelectJob} 
                    hasApplied={applications?.some(app => app.jobId === job.id)}
                />
            ))
        ) : (
            <p className="no-jobs-message">No jobs match the current filters.</p>
        )}
        </div>
    </section>
    )
};

const LoginScreen: React.FC<{ onLogin: (role: UserRole) => void }> = ({ onLogin }) => {
    const [role, setRole] = useState<UserRole>('student');
    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <svg className="logo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 9l4 1.5V17a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6.5L23 9l-11-7zm-2 13H8v-2h2v2zm0-4H8v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2z"/></svg>
                    <h2>Placement Portal</h2>
                </div>
                
                <div className="role-toggle">
                    <button className={role === 'student' ? 'active' : ''} onClick={() => setRole('student')}>Student</button>
                    <button className={role === 'admin' ? 'active' : ''} onClick={() => setRole('admin')}>Admin</button>
                </div>

                <p>Login to access your {role} dashboard.</p>
                <form onSubmit={(e) => { e.preventDefault(); onLogin(role); }}>
                    <div className="input-group">
                        <label htmlFor="email">University Email</label>
                        <input type="email" id="email" defaultValue={role === 'student' ? studentUser.email : adminUser.email} required/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" defaultValue="password" required/>
                    </div>
                    <button className="apply-button" type="submit">Login as {role === 'student' ? 'Student' : 'Admin'}</button>
                </form>
            </div>
        </div>
    );
};

const AppHeader: React.FC<{
    currentView: View; 
    onNavClick: (view: View) => void;
    user: Student;
    onLogout: () => void;
    onToggleTheme: () => void;
    isDarkMode: boolean;
}> = ({ currentView, onNavClick, user, onLogout, onToggleTheme, isDarkMode }) => {
    return (
      <header className="header">
        <div className="header-left">
            <svg className="logo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 9l4 1.5V17a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6.5L23 9l-11-7zm-2 13H8v-2h2v2zm0-4H8v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2z"/></svg>
            <h1>Placement Portal</h1>
        </div>
        <nav className="header-nav">
            <button className={currentView === 'jobs' ? 'active' : ''} onClick={() => onNavClick('jobs')}>Jobs</button>
            <button className={currentView === 'applications' ? 'active' : ''} onClick={() => onNavClick('applications')}>My Applications</button>
            <button className={currentView === 'profile' ? 'active' : ''} onClick={() => onNavClick('profile')}>Profile</button>
        </nav>
        <div className="header-right">
            <button onClick={onToggleTheme} className="theme-toggle-button" aria-label="Toggle theme">
                {isDarkMode ? '☀️' : '🌙'}
            </button>
            <div className="profile-menu">
                <img src={user.avatarUrl} alt="User avatar" className="header-avatar" />
                <span>{user.name.split(' ')[0]}</span>
            </div>
            <button onClick={onLogout} className="secondary-button">Logout</button>
        </div>
      </header>
    );
};

const AdminHeader: React.FC<{
    currentView: AdminView; 
    onNavClick: (view: AdminView) => void;
    user: AdminUser;
    onLogout: () => void;
    onToggleTheme: () => void;
    isDarkMode: boolean;
}> = ({ currentView, onNavClick, user, onLogout, onToggleTheme, isDarkMode }) => {
    return (
      <header className="header">
        <div className="header-left">
            <svg className="logo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 9l4 1.5V17a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6.5L23 9l-11-7zm-2 13H8v-2h2v2zm0-4H8v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2z"/></svg>
            <h1>Placement Portal (Admin)</h1>
        </div>
        <nav className="header-nav">
            <button className={currentView === 'dashboard' ? 'active' : ''} onClick={() => onNavClick('dashboard')}>Dashboard</button>
            <button className={currentView === 'students' ? 'active' : ''} onClick={() => onNavClick('students')}>Students</button>
            <button className={currentView === 'jobs' ? 'active' : ''} onClick={() => onNavClick('jobs')}>Jobs</button>
            <button className={currentView === 'stats' ? 'active' : ''} onClick={() => onNavClick('stats')}>Statistics</button>
        </nav>
        <div className="header-right">
            <button onClick={onToggleTheme} className="theme-toggle-button" aria-label="Toggle theme">
                {isDarkMode ? '☀️' : '🌙'}
            </button>
            <div className="profile-menu">
                <img src={user.avatarUrl} alt="Admin avatar" className="header-avatar" />
                <span>{user.name.split(' ')[0]}</span>
            </div>
            <button onClick={onLogout} className="secondary-button">Logout</button>
        </div>
      </header>
    );
};

const ApplicationDetailModal: React.FC<{ application: Application; onClose: () => void; }> = ({ application, onClose }) => {
    const job = jobsData.find(j => j.id === application.jobId);
    if (!job) return null;

    const getTimelineItemClass = (item: ApplicationTimelineEvent) => {
        let className = `timeline-item status-${item.status.toLowerCase()}`;
        if (item.result) {
            className += ` result-${item.result.toLowerCase()}`;
        }
        return className;
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Close dialog">&times;</button>
                <div className="modal-header">
                    <img src={job.logo} alt={`${job.company} logo`} className="company-logo-large" />
                    <div>
                        <h2 className="job-card-title">{job.title}</h2>
                        <p className="job-card-company">{job.company}</p>
                    </div>
                </div>
                <div className="modal-details">
                    <div className="details-grid">
                        <p><strong>Location:</strong> {job.location}</p>
                        <p><strong>Type:</strong> {job.type}</p>
                        <p><strong>Package:</strong> {job.type === 'Internship' ? job.stipend : `₹${(parseInt(job.ctc, 10)/100000).toFixed(1)} LPA`}</p>
                        <p><strong>Applied On:</strong> {new Date(application.appliedOn).toLocaleDateString()}</p>
                    </div>

                    <h4 className="section-title">Application Timeline</h4>
                    <ul className="timeline">
                        {application.timeline.map((item, index) => (
                            <li key={index} className={getTimelineItemClass(item)}>
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <p className="timeline-title">{item.name}</p>
                                    <p className="timeline-date">{new Date(item.date).toLocaleDateString()}</p>
                                    <span className="timeline-status-badge">
                                        {item.status === 'Completed' ? item.result : item.status}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};


// --- ADMIN COMPONENTS ---

const AdminDashboard: React.FC = () => {
    const totalJobs = jobsData.length;
    const totalCompanies = [...new Set(jobsData.map(j => j.company))].length;
    const totalStudents = allStudentsData.length;

    const placedStudents = useMemo(() => {
        const placedStudentIds = new Set(initialApplications.filter(app => app.status === 'Selected').map(app => app.studentId));
        return allStudentsData.filter(student => placedStudentIds.has(student.id));
    }, []);

    const studentsPlacedCount = placedStudents.length;
    const placementPercentage = totalStudents > 0 ? ((studentsPlacedCount / totalStudents) * 100).toFixed(1) : 0;

    const { highestPackage, averagePackage } = useMemo(() => {
        const placedFullTimeApps = initialApplications.filter(app => {
            const job = jobsData.find(j => j.id === app.jobId);
            return app.status === 'Selected' && job?.type === 'Full-time' && job && !isNaN(parseInt(job.ctc));
        });

        if (placedFullTimeApps.length === 0) {
            return { highestPackage: 0, averagePackage: 0 };
        }

        const packages = placedFullTimeApps.map(app => parseInt(jobsData.find(j => j.id === app.jobId)!.ctc));
        const highest = Math.max(...packages);
        const average = packages.reduce((sum, pkg) => sum + pkg, 0) / packages.length;
        
        return { highestPackage: highest, averagePackage: average };
    }, []);

    return (
        <section className="page-content" aria-labelledby="admin-dashboard-heading">
            <h2 id="admin-dashboard-heading" className="page-title">Admin Dashboard</h2>
            <div className="stat-card-grid">
                <div className="stat-card">
                    <h3>Total Job Postings</h3>
                    <p>{totalJobs}</p>
                </div>
                <div className="stat-card">
                    <h3>Companies on Campus</h3>
                    <p>{totalCompanies}</p>
                </div>
                <div className="stat-card">
                    <h3>Students Placed</h3>
                    <p>{studentsPlacedCount} / {totalStudents}</p>
                </div>
                <div className="stat-card">
                    <h3>Placement Rate</h3>
                    <p>{placementPercentage}%</p>
                </div>
                <div className="stat-card">
                    <h3>Highest CTC</h3>
                    <p>₹{(highestPackage / 100000).toFixed(1)} LPA</p>
                </div>
                <div className="stat-card">
                    <h3>Average CTC</h3>
                    <p>₹{(averagePackage / 100000).toFixed(1)} LPA</p>
                </div>
            </div>
        </section>
    );
};

const StudentAnalysisScreen: React.FC<{onSelectStudent: (student: Student) => void;}> = ({ onSelectStudent }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredStudents = useMemo(() => {
        return allStudentsData.filter(student => 
            student.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);
    
    return (
        <section className="page-content" aria-labelledby="student-analysis-heading">
            <div className="page-header">
                <h2 id="student-analysis-heading" className="page-title">Student Analysis</h2>
                <div className="filter-item search-filter" style={{ minWidth: '300px', flexGrow: 0 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="filter-icon" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>
                    <input type="text" placeholder="Search student by name..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>
            </div>
            <div className="applications-table-container">
                <table className="applications-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Branch</th>
                            <th>CGPA</th>
                            <th>Applications</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map(student => (
                            <tr key={student.id} onClick={() => onSelectStudent(student)} title="Click to view details">
                                <td className="company-cell">
                                    <img src={student.avatarUrl} alt={`${student.name} avatar`} className="company-logo-small" style={{borderRadius: '50%'}} />
                                    {student.name}
                                </td>
                                <td>{student.branch}</td>
                                <td>{student.cgpa}</td>
                                <td>{initialApplications.filter(app => app.studentId === student.id).length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

const PlacementStatsScreen: React.FC = () => {
    const branchStats = useMemo(() => {
        const stats: Record<string, { total: number; placed: number; packages: number[] }> = {};
        branches.forEach(branch => {
            stats[branch] = { total: 0, placed: 0, packages: [] };
        });

        allStudentsData.forEach(student => {
            if (stats[student.branch]) {
                stats[student.branch].total++;
                const placedApp = initialApplications.find(app => {
                    const job = jobsData.find(j => j.id === app.jobId);
                    return app.studentId === student.id && app.status === 'Selected' && job?.type === 'Full-time' && job && !isNaN(parseInt(job.ctc));
                });
                if (placedApp) {
                    stats[student.branch].placed++;
                    const job = jobsData.find(j => j.id === placedApp.jobId)!;
                    stats[student.branch].packages.push(parseInt(job.ctc));
                }
            }
        });

        return Object.entries(stats).map(([branch, data]) => {
            const avgPackage = data.packages.length > 0 ? data.packages.reduce((a, b) => a + b, 0) / data.packages.length : 0;
            const highestPackage = data.packages.length > 0 ? Math.max(...data.packages) : 0;
            return {
                branch,
                total: data.total,
                placed: data.placed,
                placementRate: data.total > 0 ? ((data.placed / data.total) * 100).toFixed(1) + '%' : 'N/A',
                avgPackage: `₹${(avgPackage / 100000).toFixed(1)} LPA`,
                highestPackage: `₹${(highestPackage / 100000).toFixed(1)} LPA`,
            };
        });
    }, []);

    return (
        <section className="page-content" aria-labelledby="stats-heading">
            <h2 id="stats-heading" className="page-title">Branch-wise Statistics</h2>
            <div className="applications-table-container">
                <table className="applications-table stats-table">
                    <thead>
                        <tr>
                            <th>Branch</th>
                            <th>Total Students</th>
                            <th>Students Placed</th>
                            <th>Placement %</th>
                            <th>Highest Package</th>
                            <th>Average Package</th>
                        </tr>
                    </thead>
                    <tbody>
                        {branchStats.map(stat => (
                            <tr key={stat.branch}>
                                <td>{stat.branch}</td>
                                <td>{stat.total}</td>
                                <td>{stat.placed}</td>
                                <td>{stat.placementRate}</td>
                                <td>{stat.highestPackage}</td>
                                <td>{stat.avgPackage}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

const StudentDetailModal: React.FC<{ student: Student; onClose: () => void; }> = ({ student, onClose }) => {
    const studentApplications = initialApplications.filter(app => app.studentId === student.id);
    const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

    return (
        <>
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <button className="modal-close" onClick={onClose} aria-label="Close dialog">&times;</button>
                    <div className="profile-card-header" style={{borderBottom: 'none', marginBottom: 0}}>
                        <img src={student.avatarUrl} alt="User avatar" className="profile-avatar"/>
                        <div>
                            <h3>{student.name}</h3>
                            <p>{student.branch} | CGPA: {student.cgpa}</p>
                        </div>
                    </div>
                    <div className="modal-details">
                         <h4 className="section-title">Applications ({studentApplications.length})</h4>
                         <MyApplicationsScreen applications={studentApplications} onSelectApplication={setSelectedApplication} />
                    </div>
                </div>
            </div>
            {selectedApplication && <ApplicationDetailModal application={selectedApplication} onClose={() => setSelectedApplication(null)} />}
        </>
    );
};


const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [currentUser, setCurrentUser] = useState<Student | null>(null);
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);

  const [currentView, setCurrentView] = useState<View>('jobs');
  const [currentAdminView, setAdminCurrentView] = useState<AdminView>('dashboard');

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
      const newIsDarkMode = !isDarkMode;
      setIsDarkMode(newIsDarkMode);
      document.documentElement.setAttribute('data-theme', newIsDarkMode ? 'dark' : 'light');
  };
  
  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    if (role === 'student') {
        setCurrentUser(studentUser);
    } else {
        setCurrentAdmin(adminUser);
    }
  };
  const handleLogout = () => {
      setUserRole(null);
      setCurrentUser(null);
      setCurrentAdmin(null);
      setCurrentView('jobs');
      setAdminCurrentView('dashboard');
  };
  const handleUpdateProfile = (updatedUser: Student) => {
      setCurrentUser(updatedUser);
  };

  const handleApply = (jobId: number) => {
    if (!currentUser || applications.some(app => app.jobId === jobId && app.studentId === currentUser.id)) return;

    const job = jobsData.find(j => j.id === jobId);
    if (!job) return;

    const newApplication: Application = {
      id: `app${applications.length + 1}`,
      jobId: jobId,
      studentId: currentUser.id,
      status: 'Applied',
      currentRound: job.rounds[0]?.name || 'Pending Review',
      appliedOn: new Date().toISOString().split('T')[0],
      timeline: [
        { name: 'Applied', date: new Date().toISOString().split('T')[0], status: 'Completed', result: 'Passed' },
        ...job.rounds.map(round => ({ name: round.name, date: round.date, status: 'Upcoming' as const, result: 'Awaiting' as const }))
      ]
    };
    setApplications(prev => [...prev, newApplication]);
    setSelectedJob(null);
    setShowSuccessAnimation(true);
    setTimeout(() => {
        setShowSuccessAnimation(false);
    }, 2000);
  };

  const renderStudentContent = () => {
    if (!currentUser) return null;
    switch (currentView) {
        case 'profile': return <ProfileScreen user={currentUser} onUpdateProfile={handleUpdateProfile} />;
        case 'applications': return <MyApplicationsScreen applications={applications.filter(a => a.studentId === currentUser.id)} onSelectApplication={setSelectedApplication} />;
        case 'jobs':
        default:
            return <JobListScreen onSelectJob={setSelectedJob} applications={applications.filter(a => a.studentId === currentUser.id)} />;
    }
  };

  const renderAdminContent = () => {
    switch (currentAdminView) {
        case 'students': return <StudentAnalysisScreen onSelectStudent={setSelectedStudent} />;
        case 'jobs': return <JobListScreen onSelectJob={setSelectedJob} />;
        case 'stats': return <PlacementStatsScreen />;
        case 'dashboard':
        default:
            return <AdminDashboard />;
    }
  }

  if (!userRole) {
    return <LoginScreen onLogin={handleLogin} />
  }

  if (userRole === 'admin' && currentAdmin) {
    return (
        <>
            <AdminHeader
                currentView={currentAdminView}
                onNavClick={setAdminCurrentView}
                user={currentAdmin}
                onLogout={handleLogout}
                onToggleTheme={toggleTheme}
                isDarkMode={isDarkMode}
            />
            <main className="container">
                {renderAdminContent()}
            </main>
            {selectedJob && <JobDetailModal
                job={selectedJob}
                onClose={() => setSelectedJob(null)}
                // Admin does not apply, so provide dummy/disabled functions
                user={null as any} onApply={()=>{}} hasApplied={false}
              />}
            {selectedStudent && <StudentDetailModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />}
        </>
    );
  }

  if (userRole === 'student' && currentUser) {
    return (
        <>
        <AppHeader
            currentView={currentView}
            onNavClick={setCurrentView}
            user={currentUser}
            onLogout={handleLogout}
            onToggleTheme={toggleTheme}
            isDarkMode={isDarkMode}
        />
        <main className="container">
            {renderStudentContent()}
        </main>
        {selectedJob && <JobDetailModal 
            job={selectedJob} 
            user={currentUser}
            onClose={() => setSelectedJob(null)} 
            onApply={handleApply}
            hasApplied={applications.some(app => app.jobId === selectedJob.id && app.studentId === currentUser.id)}
            />}
        {selectedApplication && <ApplicationDetailModal
            application={selectedApplication}
            onClose={() => setSelectedApplication(null)}
            />}
        {showSuccessAnimation && <SuccessAnimationOverlay />}
        </>
    );
  }

  return null;
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);