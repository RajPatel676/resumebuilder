// Simple in-memory store for development when MongoDB is not available

class InMemoryStore {
  constructor() {
    this.users = new Map();
    this.resumes = new Map();
    this.userIdCounter = 1;
    this.resumeIdCounter = 1;
  }

  // User methods
  createUser(userData) {
    const user = {
      ...userData,
      id: `user_${this.userIdCounter++}`,
      createdAt: new Date()
    };
    this.users.set(user.id, user);
    return user;
  }

  findUserByEmail(email) {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  findUserByUsername(username) {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  findUserById(id) {
    return this.users.get(id);
  }

  // Resume methods
  createResume(resumeData) {
    const resume = {
      ...resumeData,
      id: `resume_${this.resumeIdCounter++}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.resumes.set(resume.id, resume);
    return resume;
  }

  findResumesByUserId(userId) {
    return Array.from(this.resumes.values()).filter(resume => resume.userId === userId);
  }

  findResumeById(id) {
    return this.resumes.get(id);
  }

  updateResume(id, updateData) {
    const existing = this.resumes.get(id);
    if (!existing) return undefined;
    
    const updated = {
      ...existing,
      ...updateData,
      updatedAt: new Date()
    };
    this.resumes.set(id, updated);
    return updated;
  }

  deleteResume(id) {
    return this.resumes.delete(id);
  }

  // Utility methods
  clear() {
    this.users.clear();
    this.resumes.clear();
    this.userIdCounter = 1;
    this.resumeIdCounter = 1;
  }

  getStats() {
    return {
      users: this.users.size,
      resumes: this.resumes.size
    };
  }
}

export const inMemoryStore = new InMemoryStore();
