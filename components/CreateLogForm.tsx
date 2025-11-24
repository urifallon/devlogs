import React, { useState } from 'react';
import { ProjectContext, Severity, LogEntry } from '../types';
import { TagInput } from './TagInput';
import { AlertCircle, Loader2 } from 'lucide-react';
import { CustomSelect } from './CustomSelect';

interface CreateLogFormProps {
  onSuccess?: () => void;
}

export const CreateLogForm: React.FC<CreateLogFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<LogEntry>({
    title: '',
    project: ProjectContext.MAIN_WEB_APP,
    severity: Severity.MEDIUM,
    tags: ['Bug'],
    description: '',
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleInputChange = (field: keyof LogEntry, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');

    try {
      const response = await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit log');

      setSubmitStatus('success');
      setFormData({
        title: '',
        project: ProjectContext.MAIN_WEB_APP,
        severity: Severity.MEDIUM,
        tags: ['Bug'],
        description: '',
      });

      if (onSuccess) {
        setTimeout(onSuccess, 1000);
      } else {
        setTimeout(() => setSubmitStatus('idle'), 2000);
      }
    } catch (error) {
      console.error('Error submitting log:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">Create New Error Log</h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 space-y-8">

          {/* Title Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Error Summary / Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-900 placeholder-gray-400"
              placeholder="E.g., NullReferenceException in PaymentGateway..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project Context */}
            <CustomSelect
              label="Project Context"
              value={formData.project}
              options={Object.values(ProjectContext).map(ctx => ({ value: ctx, label: ctx }))}
              onChange={(value) => handleInputChange('project', value)}
            />

            {/* Severity Level */}
            <CustomSelect
              label="Severity Level"
              value={formData.severity}
              options={Object.values(Severity).map(sev => ({ value: sev, label: sev }))}
              onChange={(value) => handleInputChange('severity', value)}
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Tags / Category
            </label>
            <TagInput
              tags={formData.tags}
              onChange={(tags) => handleInputChange('tags', tags)}
            />
          </div>

          {/* Stack Trace / Description */}
          <div className="space-y-2 relative group">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-semibold text-gray-700">
                Stack Trace / Detailed Description
              </label>
            </div>

            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full h-48 px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-mono text-sm text-gray-800 placeholder-gray-400 resize-none"
              placeholder="Paste code snippet or stack trace here..."
            />
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <AlertCircle size={16} />
            <span>Logs are retained for 30 days</span>
          </div>
          <button
            type="submit"
            disabled={submitStatus === 'submitting'}
            className={`
              font-semibold py-3 px-8 rounded-lg shadow-md transition-all transform active:scale-95 flex items-center gap-2
              ${submitStatus === 'success'
                ? 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/20'
                : submitStatus === 'error'
                  ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20'
                  : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20'
              }
              ${submitStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}
            `}
          >
            {submitStatus === 'submitting' && <Loader2 size={18} className="animate-spin" />}
            {submitStatus === 'success' ? 'Submitted Successfully!' : submitStatus === 'error' ? 'Failed to Submit' : 'Submit Log to Server'}
          </button>
        </div>
      </form>
    </div>
  );
};
