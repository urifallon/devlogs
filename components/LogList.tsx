import React, { useEffect, useState } from 'react';
import { LogEntry, Severity } from '../types';
import { AlertCircle, Calendar, Tag, ArrowRight, Server, Smartphone, Globe, Database } from 'lucide-react';

interface LogListProps {
    onSelectLog?: (log: LogEntry) => void;
}

export const LogList: React.FC<LogListProps> = ({ onSelectLog }) => {
    const [logs, setLogs] = useState<(LogEntry & { id: string, timestamp: string })[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchLogs = async () => {
        try {
            const response = await fetch('/api/logs');
            if (!response.ok) throw new Error('Failed to fetch logs');
            const data = await response.json();
            setLogs(data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Could not load logs. Ensure the local server is running.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
        // Poll every 3 seconds for realtime updates
        const interval = setInterval(fetchLogs, 3000);
        return () => clearInterval(interval);
    }, []);

    const getSeverityColor = (severity: Severity) => {
        switch (severity) {
            case Severity.CRITICAL: return 'bg-red-100 text-red-700 border-red-200';
            case Severity.HIGH: return 'bg-orange-100 text-orange-700 border-orange-200';
            case Severity.MEDIUM: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case Severity.LOW: return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getProjectIcon = (project: string) => {
        if (project.includes('Web')) return <Globe size={16} />;
        if (project.includes('API')) return <Server size={16} />;
        if (project.includes('Mobile')) return <Smartphone size={16} />;
        if (project.includes('Data')) return <Database size={16} />;
        return <Globe size={16} />;
    };

    if (loading && logs.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    if (error && logs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center p-8 bg-red-50 rounded-2xl border border-red-100">
                <AlertCircle size={32} className="text-red-500 mb-3" />
                <h3 className="text-lg font-semibold text-red-900 mb-1">Connection Error</h3>
                <p className="text-red-600 text-sm">{error}</p>
                <button
                    onClick={fetchLogs}
                    className="mt-4 px-4 py-2 bg-white border border-red-200 text-red-700 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Log Explorer</h2>
                    <p className="text-gray-500 mt-1">Real-time error tracking and monitoring</p>
                </div>
                <div className="text-sm text-gray-400 font-mono">
                    {logs.length} entries found
                </div>
            </div>

            <div className="space-y-4">
                {logs.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Database size={24} className="text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No logs found</h3>
                        <p className="text-gray-500 mt-1">Create a new log entry to get started.</p>
                    </div>
                ) : (
                    logs.map((log) => (
                        <div
                            key={log.id}
                            className="group bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-orange-200 transition-all cursor-pointer"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getSeverityColor(log.severity)}`}>
                                            {log.severity}
                                        </span>
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                                            {getProjectIcon(log.project)}
                                            <span>{log.project}</span>
                                        </div>
                                        <span className="text-xs text-gray-400 flex items-center gap-1">
                                            <Calendar size={12} />
                                            {new Date(log.timestamp).toLocaleString()}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors truncate">
                                        {log.title}
                                    </h3>

                                    <p className="text-gray-600 text-sm line-clamp-2 mb-3 font-mono bg-gray-50/50 p-2 rounded border border-gray-100/50">
                                        {log.description}
                                    </p>

                                    <div className="flex items-center gap-2 flex-wrap">
                                        {log.tags.map((tag, idx) => (
                                            <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-50 text-gray-600 text-xs font-medium border border-gray-100">
                                                <Tag size={10} className="text-gray-400" />
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-gray-400 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors">
                                    <ArrowRight size={18} />
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
