import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema, insertProjectSchema } from "@shared/schema";
import passport from "passport";
import { requireAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Public routes
  app.get("/api/projects", async (_req, res) => {
    const projects = await storage.getAllProjects();
    res.json(projects);
  });

  app.get("/api/projects/featured", async (_req, res) => {
    const projects = await storage.getFeaturedProjects();
    res.json(projects);
  });

  app.get("/api/projects/:id", async (req, res) => {
    const project = await storage.getProject(parseInt(req.params.id));
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    res.json(project);
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const message = insertMessageSchema.parse(req.body);
      await storage.createMessage(message);
      res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
      res.status(400).json({ message: "Invalid message data" });
    }
  });

  // Auth routes
  app.post("/api/auth/login", passport.authenticate("local"), (req, res) => {
    res.json({ message: "Logged in successfully" });
  });

  app.post("/api/auth/logout", (req, res) => {
    req.logout(() => {
      res.json({ message: "Logged out successfully" });
    });
  });

  // Added route
  app.get("/api/auth/me", (req, res) => {
    if (!req.isAuthenticated()) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }
    res.json(req.user);
  });


  // Protected admin routes
  app.post("/api/admin/projects", requireAuth, async (req, res) => {
    try {
      const project = insertProjectSchema.parse(req.body);
      const created = await storage.createProject(project);
      res.status(201).json(created);
    } catch (error) {
      res.status(400).json({ message: "Invalid project data" });
    }
  });

  app.patch("/api/admin/projects/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertProjectSchema.partial().parse(req.body);
      const updated = await storage.updateProject(id, updates);
      if (!updated) {
        res.status(404).json({ message: "Project not found" });
        return;
      }
      res.json(updated);
    } catch (error) {
      res.status(400).json({ message: "Invalid project data" });
    }
  });

  app.delete("/api/admin/projects/:id", requireAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    const deleted = await storage.deleteProject(id);
    if (!deleted) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    res.json({ message: "Project deleted successfully" });
  });

  const httpServer = createServer(app);
  return httpServer;
}