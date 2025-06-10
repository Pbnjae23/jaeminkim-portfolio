import { type Project, type InsertProject, type Message, type InsertMessage, type Admin, type InsertAdmin } from "@shared/schema";
import bcrypt from "bcryptjs";

export interface IStorage {
  // Projects
  getAllProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;

  // Messages
  createMessage(message: InsertMessage): Promise<Message>;

  // Admin
  getAdminByUsername(username: string): Promise<Admin | undefined>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;
  createAdminUser(adminData: { username: string; password: string }): Promise<Admin>;
}

export class MemStorage implements IStorage {
  private projects: Map<number, Project>;
  private messages: Map<number, Message>;
  private admins: Map<number, Admin>;
  private projectId: number;
  private messageId: number;
  private adminId: number;

  constructor() {
    this.projects = new Map();
    this.messages = new Map();
    this.admins = new Map();
    this.projectId = 1;
    this.messageId = 1;
    this.adminId = 1;

    // Add some sample projects
    const sampleProjects: InsertProject[] = [
      {
        title: "5G Edge Ecosystem",
        description: "How I designed Verizon's B2B ecosystem to achieve an 18% conversion rate lift through innovative UX strategies and dynamic landing pages.",
        challenge: "While Verizon's cutting-edge 5G edge solutions enable significant production scaling and resource optimization for mid-to-large-sized businesses, there was a crucial gap in monetizing these solutions.",
        solution: "Collaborated with stakeholders to design dynamic landing pages that educate and inspire businesses about 5G Edge solutions benefits.",
        impact: "Achieved 18% lift in conversion rate through strategic UX improvements and clear value proposition communication.",
        image: "https://picsum.photos/800/600?random=0",
        featured: true,
        order: 0,
        caseStudyUrl: "/case-studies/verizon"
      },
      {
        title: "E-commerce Redesign",
        description: "A complete overhaul of an online retail platform",
        challenge: "The existing platform had poor conversion rates and user engagement",
        solution: "Implemented a user-centered design approach with improved navigation",
        impact: "Increased conversion rates by 45% and user engagement by 60%",
        image: "https://picsum.photos/800/600?random=1",
        featured: true,
        order: 1
      },
      {
        title: "Healthcare App",
        description: "Mobile application for patient care management",
        challenge: "Complex medical data needed to be presented in an accessible way",
        solution: "Created an intuitive interface with clear data visualization",
        impact: "Reduced patient data access time by 75%",
        image: "https://picsum.photos/800/600?random=2",
        featured: true,
        order: 2
      },
      {
        title: "Financial Dashboard",
        description: "Real-time financial data visualization platform",
        challenge: "Large amounts of data needed to be displayed effectively",
        solution: "Developed a modular dashboard with customizable widgets",
        impact: "Improved decision-making speed by 40%",
        image: "https://picsum.photos/800/600?random=3",
        featured: false,
        order: 3
      }
    ];

    sampleProjects.forEach(project => {
      const id = this.projectId++;
      this.projects.set(id, { 
        ...project, 
        id, 
        updatedAt: new Date() 
      });
    });
  }

  // Projects
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => a.order - b.order);
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.featured)
      .sort((a, b) => a.order - b.order);
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const id = this.projectId++;
    const newProject: Project = { 
      ...project, 
      id,
      updatedAt: new Date()
    };
    this.projects.set(id, newProject);
    return newProject;
  }

  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined> {
    const existing = this.projects.get(id);
    if (!existing) return undefined;

    const updated: Project = {
      ...existing,
      ...project,
      id,
      updatedAt: new Date()
    };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }

  // Messages
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.messageId++;
    const message: Message = { 
      ...insertMessage, 
      id,
      createdAt: new Date()
    };
    this.messages.set(id, message);
    return message;
  }

  // Admin
  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    return Array.from(this.admins.values()).find(
      (admin) => admin.username === username
    );
  }

  async createAdmin(admin: InsertAdmin): Promise<Admin> {
    const id = this.adminId++;
    const hashedPassword = await bcrypt.hash(admin.password, 10);
    const newAdmin: Admin = {
      ...admin,
      id,
      password: hashedPassword,
      createdAt: new Date()
    };
    this.admins.set(id, newAdmin);
    return newAdmin;
  }

  async createAdminUser(adminData: { username: string; password: string }): Promise<Admin> {
    const existingAdmin = await this.getAdminByUsername(adminData.username);
    if (existingAdmin) {
      throw new Error("Admin user already exists!");
    }
    const id = this.adminId++;
    const hashedPassword = await bcrypt.hash(adminData.password, 10);
    const newAdmin: Admin = {
      username: adminData.username,
      password: hashedPassword,
      id,
      createdAt: new Date()
    };
    this.admins.set(id, newAdmin);
    return newAdmin;
  }
}

export const storage = new MemStorage();