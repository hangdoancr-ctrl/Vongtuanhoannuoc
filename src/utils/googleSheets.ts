import { GameResultPayload } from '../types';

const WEBHOOK_KEY = 'ai_smart_student_webhook_url';

export function getWebhookUrl(): string {
  return localStorage.getItem(WEBHOOK_KEY) || '';
}

export function setWebhookUrl(url: string): void {
  localStorage.setItem(WEBHOOK_KEY, url.trim());
}

/**
 * Sends student result to configured Google Sheet Webhook URL
 */
export async function sendResultToGoogleSheet(payload: GameResultPayload): Promise<{ success: boolean; message: string }> {
  const url = getWebhookUrl();

  if (!url) {
    return {
      success: false,
      message: 'Chưa cấu hình Google Sheet Webhook. Dữ liệu đã được lưu lại trên máy!'
    };
  }

  try {
    // Send as POST request with JSON
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8', // Prevents CORS preflight issues with Google Apps Script
      },
      body: JSON.stringify(payload),
      mode: 'no-cors' // Google Apps Script Web App standard mode
    });

    return {
      success: true,
      message: 'Gửi kết quả lên Google Sheet thành công!'
    };
  } catch (error) {
    console.error('Error sending result:', error);
    return {
      success: false,
      message: 'Không thể kết nối với Google Sheet. Đã lưu kết quả tại máy!'
    };
  }
}

/**
 * Generated Google Apps Script code for Teachers to copy-paste into Google Sheet
 */
export const GOOGLE_APPS_SCRIPT_CODE = `function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Set headers if sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Thời gian (Timestamp)", 
      "Họ và tên (Name)", 
      "Lớp (ClassName)", 
      "Số câu đúng (Correct)", 
      "Tổng số câu (Total)", 
      "Điểm số (Score)", 
      "Danh sách câu sai (WrongList)", 
      "Cần giáo viên hỗ trợ (NeedSupport)", 
      "Ý kiến / Cảm nghĩ (Comment)"
    ]);
  }
  
  try {
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString("vi-VN"),
      data.name || "",
      data.className || "",
      data.correct || 0,
      data.total || 10,
      data.score || 0,
      data.wrongList || "Không có",
      data.needSupport ? "CÓ" : "Không",
      data.comment || ""
    ]);
    return ContentService.createTextOutput(JSON.stringify({"result": "success"}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({"result": "error", "error": err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;
