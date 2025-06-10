
import { storage } from "../server/storage";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

async function createAdminUser() {
  const username = "admin";
  const password = "securepassword"; // Change this to your preferred strong password
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    await storage.createAdminUser({
      username,
      password: hashedPassword
    });
    
    console.log("Admin user created successfully!");
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("\nPlease change this password after first login for security reasons.");
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
  
  process.exit(0);
}

createAdminUser();
