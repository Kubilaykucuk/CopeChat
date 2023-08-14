import React, { useState } from 'react';

const FAQTable = ({ onFAQClick }) => {
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [formVisible, setFormVisible] = useState(true);

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
    onFAQClick(question);
    setFormVisible(false);
  };

  return (
    <div>
      {formVisible && (
          <table className="table-fixed w-full max-w-xs mx-auto bg-purple-500 rounded-lg">
            <thead>
              <tr>
                <th className="w-full text-center">Frequently asked questions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <button
                    type="button"
                    onClick={() => handleQuestionClick('Copetract nedir?')}
                    className="rounded-lg bg-purple-300 px-4 py-2 text-white text-sm"
                  >
                    Copetract nedir?
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <button
                    type="button"
                    onClick={() => handleQuestionClick('Copetract\'tan nasıl sözleşme yaparım?')}
                    className="rounded-lg bg-purple-300 px-4 py-2 text-white text-sm"
                  >
                    Copetract'tan nasıl sözleşme yaparım?
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <button
                    type="button"
                    onClick={() => handleQuestionClick('Cüzdan nasıl açarım?')}
                    className="rounded-lg bg-purple-300 px-4 py-2 text-white text-sm"
                  >
                    Cüzdan nasıl açarım?
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <button
                    type="button"
                    onClick={() => handleQuestionClick('Cüzdan\'a nasıl para aktarırım?')}
                    className="rounded-lg bg-purple-300 px-4 py-2 text-white text-sm"
                  >
                    Cüzdan'a nasıl para aktarırım?
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <button
                    type="button"
                    onClick={() => handleQuestionClick('Copetract güvenli mi?')}
                    className="rounded-lg bg-purple-300 px-4 py-2 text-white text-sm"
                  >
                    Copetract güvenli mi?
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <button
                    type="button"
                    onClick={() => handleQuestionClick('Uluslararası Ticaret Maliyeti Nedir?')}
                    className="rounded-lg bg-purple-300 px-4 py-2 text-white text-sm"
                  >
                    Uluslararası Ticaret Maliyeti Nedir?
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
      )}
    </div>
  );
};

export default FAQTable;
