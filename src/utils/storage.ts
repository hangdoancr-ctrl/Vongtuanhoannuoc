import { GameResultPayload, StoredResult } from '../types';

const HISTORY_KEY = 'ai_smart_student_history';

export function getHistory(): StoredResult[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveResultToHistory(payload: GameResultPayload): StoredResult {
  const current = getHistory();
  const newEntry: StoredResult = {
    ...payload,
    id: 'res_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6)
  };
  const updated = [newEntry, ...current].slice(0, 50); // Keep last 50 results
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  return newEntry;
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}

export function exportHistoryToCSV(results: StoredResult[]): void {
  if (results.length === 0) return;

  const headers = [
    'Thời gian',
    'Họ và tên',
    'Lớp',
    'Số câu đúng',
    'Tổng số câu',
    'Điểm số',
    'Danh sách câu sai',
    'Cần hỗ trợ',
    'Góp ý/Cảm nghĩ'
  ];

  const rows = results.map(r => [
    `"${r.timestamp}"`,
    `"${r.name}"`,
    `"${r.className}"`,
    r.correct,
    r.total,
    r.score,
    `"${(r.wrongList || '').replace(/"/g, '""')}"`,
    r.needSupport ? 'Có' : 'Không',
    `"${(r.comment || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Ket_qua_Game_AI_Smart_Student_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
