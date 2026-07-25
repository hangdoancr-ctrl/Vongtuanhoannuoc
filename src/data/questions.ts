import { Question } from '../types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    topic: 'water_cycle',
    topicName: 'Vòng tuần hoàn của nước',
    question: 'Nước ở sông, hồ, biển bốc hơi lên không trung nhờ năng lượng của yếu tố nào?',
    options: [
      'Gió thổi mạnh',
      'Ánh nắng Mặt Trời chiếu sáng và sưởi ấm',
      'Sóng biển vỗ bờ',
      'Mưa rào kéo dài'
    ],
    correctIndex: 1,
    explanation: 'Ánh nắng Mặt Trời cung cấp nhiệt lượng làm nước lỏng bốc hơi thành hơi nước bay lên cao.'
  },
  {
    id: 2,
    topic: 'water_cycle',
    topicName: 'Vòng tuần hoàn của nước',
    question: 'Hơi nước bay lên cao gặp lạnh sẽ ngưng tụ thành gì?',
    options: [
      'Những hạt nước nhỏ li ti tạo thành mây',
      'Tuyết rơi ngay lập tức',
      'Cầu phồng đa sắc màu',
      'Khí oxy tinh khiết'
    ],
    correctIndex: 0,
    explanation: 'Khi lên cao gặp không khí lạnh, hơi nước ngưng tụ thành hàng triệu hạt nước nhỏ li ti kết lại thành những đám mây.'
  },
  {
    id: 3,
    topic: 'water_cycle',
    topicName: 'Vòng tuần hoàn của nước',
    question: 'Hiện tượng các hạt nước trong mây nặng dần và rơi xuống mặt đất gọi là gì?',
    options: [
      'Gió mùa',
      'Bốc hơi',
      'Mưa',
      'Sương mù'
    ],
    correctIndex: 2,
    explanation: 'Các hạt nước nhỏ trong đám mây kết hợp lại thành hạt lớn hơn, khi nặng không thể lơ lửng được nữa sẽ rơi xuống tạo thành mưa.'
  },
  {
    id: 4,
    topic: 'water_cycle',
    topicName: 'Vòng tuần hoàn của nước',
    question: 'Nước mưa rơi xuống mặt đất sẽ tiếp tục hành trình như thế nào?',
    options: [
      'Biến mất hoàn toàn không còn dấu vết',
      'Đóng băng ngay lập tức',
      'Thấm vào đất, chảy ra ao, sông, biển rồi lại bốc hơi',
      'Bay thẳng ra ngoài không gian vũ trụ'
    ],
    correctIndex: 2,
    explanation: 'Nước mưa chảy vào sông, biển và thấm xuống đất, sau đó lại bốc hơi tạo thành vòng tuần hoàn liên tục của nước trong tự nhiên.'
  },
  {
    id: 5,
    topic: 'water_cycle',
    topicName: 'Vòng tuần hoàn của nước',
    question: 'Hành động nào sau đây giúp giữ sạch nguồn nước và bảo vệ vòng tuần hoàn của nước?',
    options: [
      'Xả rác thải bừa bãi xuống ao, hồ, sông',
      'Sử dụng tiết kiệm nước và không xả chất bẩn ra nguồn nước',
      'Đổ nước giặt đồ thẳng ra suối',
      'Mở vòi nước chảy tự do khi không dùng'
    ],
    correctIndex: 1,
    explanation: 'Giữ vệ sinh nguồn nước và tiết kiệm nước giúp bảo vệ tài nguyên nước sạch cho con người và sinh vật.'
  },
  {
    id: 6,
    topic: 'ai_ethics',
    topicName: 'Trí tuệ nhân tạo (AI) học tập',
    question: 'Khi sử dụng AI (như Gemini, ChatGPT) hỗ trợ làm bài tập, thái độ nào là TRUNG THỰC?',
    options: [
      'Chép nguyên văn câu trả lời của AI và nộp cho thầy cô',
      'Dùng AI để gợi ý ý tưởng, sau đó tự suy nghĩ và tự viết lại theo lời của mình',
      'Nhờ AI làm hộ 100% rồi nói do mình tự nghĩ ra',
      'Tải bài từ AI về và bảo bạn khác nộp hộ'
    ],
    correctIndex: 1,
    explanation: 'Sử dụng AI thông minh và trung thực nghĩa là dùng AI làm trợ lý gợi ý, còn việc học và viết bài phải do chính bản thân em thực hiện.'
  },
  {
    id: 7,
    topic: 'ai_ethics',
    topicName: 'Trí tuệ nhân tạo (AI) học tập',
    question: 'Điều nào sau đây KHÔNG AN TOÀN khi em trò chuyện hoặc hỏi bài trên các công cụ AI?',
    options: [
      'Nhập họ tên đầy đủ, địa chỉ nhà, mật khẩu hoặc số điện thoại của em',
      'Hỏi AI giải thích khái niệm Khoa học khó hiểu',
      'Yêu cầu AI cho ví dụ về vòng tuần hoàn của nước',
      'Nhờ AI tạo câu hỏi đố vui để ôn tập bài'
    ],
    correctIndex: 0,
    explanation: 'Bảo mật thông tin cá nhân là nguyên tắc an toàn hàng đầu! Tuyệt đối không chia sẻ địa chỉ, số điện thoại, mật khẩu với AI hay trên mạng.'
  },
  {
    id: 8,
    topic: 'ai_ethics',
    topicName: 'Trí tuệ nhân tạo (AI) học tập',
    question: 'Khi AI trả lời một câu hỏi Khoa học, em nên làm gì để đảm bảo thông tin CHÍNH XÁC?',
    options: [
      'Tin tưởng 100% ngay lập tức vì AI luôn đúng',
      'Đối chiếu lại với Sách giáo khoa và hỏi lại thầy cô giáo',
      'So sánh với thông tin trên các trang mạng xã hội không rõ nguồn',
      'Không cần đọc kỹ, nộp ngay bài làm'
    ],
    correctIndex: 1,
    explanation: 'AI có thể đôi khi đưa ra thông tin chưa chính xác. Học sinh thông minh luôn đối chiếu lại với Sách giáo khoa và giáo viên.'
  },
  {
    id: 9,
    topic: 'ai_ethics',
    topicName: 'Trí tuệ nhân tạo (AI) học tập',
    question: 'Bạn An nhờ AI giải hộ toàn bộ bài tập Khoa học rồi nhận là mình tự làm. Việc làm này dẫn đến hậu quả gì?',
    options: [
      'An trở nên thông minh hơn rất nhiều',
      'An đạt điểm cao và nâng cao năng lực tự học',
      'An bị hổng kiến thức, không tự suy nghĩ được khi làm kiểm tra thật',
      'An được thầy cô khen ngợi vì biết sáng tạo'
    ],
    correctIndex: 2,
    explanation: 'Ỷ lại vào AI khiến em mất khả năng tự tư duy và ghi nhớ kiến thức. Khi làm bài kiểm tra trên lớp sẽ không tự làm được.'
  },
  {
    id: 10,
    topic: 'ai_ethics',
    topicName: 'Trí tuệ nhân tạo (AI) học tập',
    question: 'Công cụ Trí tuệ nhân tạo (AI) giúp học sinh lớp 4 học tốt nhất trong trường hợp nào?',
    options: [
      'Làm thay toàn bộ bài tập về nhà',
      'Đóng vai người bạn luyện tập, giải thích khái niệm và kiểm tra kiến thức',
      'Chơi game suốt cả ngày thay cho học bài',
      'Giúp gian lận trong các kỳ thi'
    ],
    correctIndex: 1,
    explanation: 'AI là người bạn đồng hành hỗ trợ học tập đắc lực khi em sử dụng đúng mục đích: giải thích bài, gợi ý và ôn luyện chủ động!'
  }
];
