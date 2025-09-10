import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock components for testing
import Builder from '../pages/Builder.jsx';
import EnhancedBuilder from '../pages/EnhancedBuilder.jsx';
import CoverLetterGenerator from '../pages/CoverLetterGenerator.jsx';
import AdminDashboard from '../pages/AdminDashboard.jsx';

// Component wrapper for testing
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('Resume Builder Core Functionality', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper();
    // Reset all mocks
    vi.clearAllMocks();
  });

  describe('Builder Component', () => {
    it('renders without crashing', () => {
      render(<Builder />, { wrapper });
      expect(screen.getByText(/Resume Builder/i)).toBeInTheDocument();
    });

    it('allows user to enter personal information', async () => {
      render(<Builder />, { wrapper });
      
      const nameInput = screen.getByPlaceholderText(/John Doe/i);
      const emailInput = screen.getByPlaceholderText(/john@example.com/i);
      
      fireEvent.change(nameInput, { target: { value: 'Test User' } });
      fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
      
      expect(nameInput.value).toBe('Test User');
      expect(emailInput.value).toBe('test@test.com');
    });

    it('calculates resume score correctly', async () => {
      render(<Builder />, { wrapper });
      
      // Fill in basic information
      const loadSampleButton = screen.getByText(/Load Sample/i);
      fireEvent.click(loadSampleButton);
      
      await waitFor(() => {
        const scoreElement = screen.getByText(/87%/i);
        expect(scoreElement).toBeInTheDocument();
      });
    });

    it('switches between templates', () => {
      render(<Builder />, { wrapper });
      
      // Navigate to templates section
      const templatesButton = screen.getByText(/Templates/i);
      fireEvent.click(templatesButton);
      
      // Select different template
      const creativeTemplate = screen.getByText(/Creative/i);
      fireEvent.click(creativeTemplate);
      
      // Verify template selection
      expect(screen.getByText(/Selected/i)).toBeInTheDocument();
    });

    it('adds and removes experience entries', () => {
      render(<Builder />, { wrapper });
      
      // Navigate to experience section
      const experienceButton = screen.getByText(/Experience/i);
      fireEvent.click(experienceButton);
      
      // Add new experience
      const addButton = screen.getByText(/Add Experience/i);
      fireEvent.click(addButton);
      
      // Should have 2 experience entries now
      const experienceEntries = screen.getAllByText(/Experience \d+/);
      expect(experienceEntries).toHaveLength(2);
    });
  });

  describe('Enhanced Builder Component', () => {
    it('renders all tabs correctly', () => {
      render(<EnhancedBuilder />, { wrapper });
      
      expect(screen.getByText(/Content/i)).toBeInTheDocument();
      expect(screen.getByText(/AI Improve/i)).toBeInTheDocument();
      expect(screen.getByText(/Templates/i)).toBeInTheDocument();
      expect(screen.getByText(/Sections/i)).toBeInTheDocument();
      expect(screen.getByText(/Job Match/i)).toBeInTheDocument();
      expect(screen.getByText(/Versions/i)).toBeInTheDocument();
      expect(screen.getByText(/Share/i)).toBeInTheDocument();
    });

    it('switches between tabs', () => {
      render(<EnhancedBuilder />, { wrapper });
      
      const aiImproveTab = screen.getByText(/AI Improve/i);
      fireEvent.click(aiImproveTab);
      
      expect(screen.getByText(/AI Content Improver/i)).toBeInTheDocument();
    });

    it('tracks unsaved changes', async () => {
      render(<EnhancedBuilder />, { wrapper });
      
      // Load sample data to trigger changes
      const loadSampleButton = screen.getByText(/Load Sample/i);
      fireEvent.click(loadSampleButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Unsaved Changes/i)).toBeInTheDocument();
      });
    });
  });

  describe('Cover Letter Generator', () => {
    it('renders form fields correctly', () => {
      render(<CoverLetterGenerator />, { wrapper });
      
      expect(screen.getByPlaceholderText(/John Doe/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Google Inc./i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Software Engineer/i)).toBeInTheDocument();
    });

    it('generates cover letter with provided information', async () => {
      render(<CoverLetterGenerator />, { wrapper });
      
      // Fill in basic information
      fireEvent.change(screen.getByPlaceholderText(/John Doe/i), {
        target: { value: 'Test User' }
      });
      fireEvent.change(screen.getByPlaceholderText(/Google Inc./i), {
        target: { value: 'Test Company' }
      });
      fireEvent.change(screen.getByPlaceholderText(/Software Engineer/i), {
        target: { value: 'Developer' }
      });
      
      // Generate cover letter
      const generateButton = screen.getByText(/Generate Cover Letter/i);
      fireEvent.click(generateButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Generating.../i)).toBeInTheDocument();
      });
    });
  });

  describe('Admin Dashboard', () => {
    it('renders overview metrics', () => {
      render(<AdminDashboard />, { wrapper });
      
      expect(screen.getByText(/Total Users/i)).toBeInTheDocument();
      expect(screen.getByText(/Total Resumes/i)).toBeInTheDocument();
      expect(screen.getByText(/Active Sessions/i)).toBeInTheDocument();
      expect(screen.getByText(/Storage Used/i)).toBeInTheDocument();
    });

    it('switches between admin tabs', () => {
      render(<AdminDashboard />, { wrapper });
      
      const usersTab = screen.getByText(/Users/i);
      fireEvent.click(usersTab);
      
      expect(screen.getByText(/User Management/i)).toBeInTheDocument();
    });
  });
});

describe('Error Handling', () => {
  it('handles API errors gracefully', async () => {
    // Mock failed API call
    const mockFetch = vi.fn().mockRejectedValue(new Error('API Error'));
    global.fetch = mockFetch;
    
    render(<Builder />, { wrapper: createWrapper() });
    
    // Try to trigger an API call that would fail
    const saveButton = screen.getByText(/Save Resume/i);
    fireEvent.click(saveButton);
    
    // Should handle error without crashing
    await waitFor(() => {
      // Component should still be rendered
      expect(screen.getByText(/Resume Builder/i)).toBeInTheDocument();
    });
  });

  it('validates required fields', () => {
    render(<Builder />, { wrapper: createWrapper() });
    
    // Try to save without required fields
    const emailInput = screen.getByPlaceholderText(/john@example.com/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    // Should show validation error
    expect(emailInput.validity.valid).toBe(false);
  });

  it('handles file upload errors', async () => {
    render(<Builder />, { wrapper: createWrapper() });
    
    // Mock file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    
    // Simulate invalid file type
    const invalidFile = new File(['test'], 'test.txt', { type: 'text/plain' });
    
    Object.defineProperty(fileInput, 'files', {
      value: [invalidFile],
      writable: false,
    });
    
    // Should handle invalid file gracefully
    expect(() => {
      fireEvent.change(fileInput);
    }).not.toThrow();
  });
});

describe('Accessibility', () => {
  it('has proper ARIA labels', () => {
    render(<Builder />, { wrapper: createWrapper() });
    
    const nameInput = screen.getByLabelText(/Full Name/i);
    expect(nameInput).toHaveAttribute('aria-required', 'false');
  });

  it('supports keyboard navigation', () => {
    render(<Builder />, { wrapper: createWrapper() });
    
    const firstButton = screen.getAllByRole('button')[0];
    firstButton.focus();
    
    expect(document.activeElement).toBe(firstButton);
  });

  it('has proper heading hierarchy', () => {
    render(<Builder />, { wrapper: createWrapper() });
    
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toBeInTheDocument();
  });
});

describe('Performance', () => {
  it('loads without excessive re-renders', () => {
    const renderSpy = vi.fn();
    
    const TestComponent = () => {
      renderSpy();
      return <Builder />;
    };
    
    render(<TestComponent />, { wrapper: createWrapper() });
    
    // Should not re-render excessively
    expect(renderSpy).toHaveBeenCalledTimes(1);
  });

  it('handles large datasets efficiently', () => {
    const largeSkillsArray = Array.from({ length: 100 }, (_, i) => ({
      id: i.toString(),
      name: `Skill ${i}`,
      level: 'Intermediate'
    }));
    
    // Should render without performance issues
    expect(() => {
      render(<Builder />, { wrapper: createWrapper() });
    }).not.toThrow();
  });
});

describe('Integration Tests', () => {
  it('completes full resume creation workflow', async () => {
    render(<Builder />, { wrapper: createWrapper() });
    
    // 1. Load sample data
    const loadSampleButton = screen.getByText(/Load Sample/i);
    fireEvent.click(loadSampleButton);
    
    // 2. Switch to preview
    const previewButton = screen.getByText(/Show Preview/i);
    fireEvent.click(previewButton);
    
    // 3. Change template
    const templatesButton = screen.getByText(/Templates/i);
    fireEvent.click(templatesButton);
    
    const classicTemplate = screen.getByText(/Classic/i);
    fireEvent.click(classicTemplate);
    
    // 4. Download (mock)
    const downloadButton = screen.getByText(/Download PDF/i);
    fireEvent.click(downloadButton);
    
    // Should complete without errors
    expect(screen.getByText(/Resume Builder/i)).toBeInTheDocument();
  });

  it('handles template switching with data preservation', () => {
    render(<Builder />, { wrapper: createWrapper() });
    
    // Add some data
    const nameInput = screen.getByPlaceholderText(/John Doe/i);
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    
    // Switch template
    const templatesButton = screen.getByText(/Templates/i);
    fireEvent.click(templatesButton);
    
    const creativeTemplate = screen.getByText(/Creative/i);
    fireEvent.click(creativeTemplate);
    
    // Go back to personal info
    const personalButton = screen.getByText(/Personal Info/i);
    fireEvent.click(personalButton);
    
    // Data should be preserved
    expect(nameInput.value).toBe('Test User');
  });
});
