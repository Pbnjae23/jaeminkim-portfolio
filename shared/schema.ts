import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  challenge: text("challenge").notNull(),
  solution: text("solution").notNull(),
  impact: text("impact").notNull(),
  image: text("image").notNull(),
  featured: boolean("featured").default(false),
  order: integer("order").notNull(),
  caseStudyUrl: text("case_study_url"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Admin schemas
export const insertAdminSchema = createInsertSchema(admins).extend({
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Project schemas
export const insertProjectSchema = createInsertSchema(projects);
export const insertMessageSchema = createInsertSchema(messages);

// Types
export type Admin = typeof admins.$inferSelect;
export type InsertAdmin = z.infer<typeof insertAdminSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;