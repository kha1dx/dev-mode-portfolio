interface QuickQuestionsProps {
  onQuestionClick: (question: string) => void;
  disabled: boolean;
}

export const QuickQuestions = ({
  onQuestionClick,
  disabled,
}: QuickQuestionsProps) => {
  const quickQuestions = [
    "What are Khaled's main skills?",
    "What's his experience with React?",
    "How much do projects typically cost?",
    "What's his development process?",
    "How can I contact him?",
    "Is he available for new projects?",
  ];

  return (
    <div className="border-b border-[#3e3e42] p-4 bg-[#252526] flex-shrink-0">
      <p className="text-xs text-[#cccccc] mb-2">Quick questions:</p>
      <div className="flex flex-wrap gap-2">
        {quickQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(question)}
            className="px-2 py-1 text-xs bg-[#4ec9b0] text-[#1e1e1e] rounded hover:bg-[#3a9b87] transition-colors"
            disabled={disabled}
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};
