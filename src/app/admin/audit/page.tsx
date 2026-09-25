import React from 'react';
import { ShieldCheck, Clock, User } from 'lucide-react';
import { storeData } from '@/services/store-data';

export const metadata = {
  title: 'Administrative Audit & Security Log | HS Digital Store Admin',
};

export default function AdminAuditLogPage() {
  const auditLogs = storeData.getAuditLogs();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-navy">Administrative Audit Logs</h1>
        <p className="text-xs text-navy-muted">
          Tamper-evident trail of price changes, product updates, digital entitlement events, and order operations.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-brand card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F2] border-b border-brand text-navy uppercase tracking-wider font-bold">
              <tr>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">Operator</th>
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-4">Target Entity</th>
                <th className="py-3.5 px-4">Metadata</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand/60 text-navy font-mono text-[11px]">
              {auditLogs.map((log: any) => (
                <tr key={log.id} className="hover:bg-cream/40 transition-colors">
                  <td className="py-3 px-4 whitespace-nowrap text-navy-muted font-sans">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-bold text-navy">
                    {log.adminEmail}
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-blue-50 text-blue-800 font-bold px-2 py-0.5 rounded border border-blue-200">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {log.objectType}: {log.objectId}
                  </td>
                  <td className="py-3 px-4 text-navy-secondary font-sans text-xs max-w-xs truncate">
                    {JSON.stringify(log.metadata)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
