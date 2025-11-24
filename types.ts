export enum Severity {
  CRITICAL = 'Critical',
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
}

export enum ProjectContext {
  MAIN_WEB_APP = 'Main Web App',
  API_SERVICE = 'API Service',
  MOBILE_APP = 'Mobile App',
  DATA_PIPELINE = 'Data Pipeline',
}

export interface LogEntry {
  title: string;
  project: ProjectContext;
  severity: Severity;
  tags: string[];
  description: string;
}

export interface AISuggestionResponse {
  title: string;
  severity: Severity;
  tags: string[];
  summary: string;
}
