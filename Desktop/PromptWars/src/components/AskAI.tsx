import React, { useState } from 'react';
import { Sparkles, Send, Loader2, AlertCircle, HelpCircle, ShieldCheck } from 'lucide-react';

export const AskAI: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sampleQuestions = [
    'Will my census data be shared with tax authorities or in court?',
    'Do census officials ask for Aadhaar card or bank account details?',
    'How does digital self-enumeration work in Census 2027?'
  ];

  const handleAsk = async (questionToAsk?: string) => {
    const activeQuery = (questionToAsk || query).trim();
    if (!activeQuery || isLoading) return;

    if (questionToAsk) {
      setQuery(questionToAsk);
    }

    setIsLoading(true);
    setError(null);
    setResponse(null);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey || apiKey === 'paste_your_key_here') {
      setIsLoading(false);
      setError('Please set a valid Gemini API key in your .env file (VITE_GEMINI_API_KEY).');
      return;
    }

    const systemPrompt = `You are the official, authoritative AI Assistant for India's Census 2027 Digital Enumeration Guide. 
Answer citizen queries accurately, reassuringly, and concisely based strictly on official Census 2027 facts:
1. Legal confidentiality: Under Section 15 of the Census Act, 1948, all individual records are strictly confidential and inadmissible as evidence in any court of law or tax/police authority.
2. What is collected: Phase 1 collects housing characteristics, amenities, and assets. Phase 2 collects demographic, linguistic, educational, and occupational data.
3. What is NEVER collected: No bank account numbers, passwords, OTPs, credit cards, biometric fingerprints/iris scans, or citizenship papers are ever asked.
4. Self-Enumeration: Citizens can fill out their details online in advance and receive a QR acknowledgment code to show their visiting enumerator.
5. If the user asks something completely unrelated to Census 2027, civics, or data privacy, politely and briefly redirect them to Census 2027 topics.
Format your answer clearly with concise bullet points where appropriate.`;

    const requestBody = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `${systemPrompt}\n\nCitizen Question: ${activeQuery}`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 500
      }
    };

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        }
      );

      if (!res.ok) {
        throw new Error(`API returned status ${res.status}`);
      }

      const data = await res.json();
      const answerText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (answerText) {
        setResponse(answerText);
      } else {
        throw new Error('No answer generated.');
      }
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      setError('Unable to retrieve an answer right now. Please check your internet connection or try again shortly.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-12 bg-[#FDFBF7] rounded-lg p-6 sm:p-8 border border-[#E5DFD5] shadow-xs space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DFD5]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#162A45] text-[#E6C280] flex items-center justify-center shrink-0 border border-[#233854]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#162A45]">
              Ask Census AI Assistant
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-normal">
              Instant, verified answers on privacy, rights, and digital census procedures powered by Gemini.
            </p>
          </div>
        </div>

        <span className="self-start sm:self-center text-xs font-semibold px-3 py-1 rounded bg-[#EBF4EE] text-[#26533A] border border-[#C5DEC8] flex items-center gap-1.5 shrink-0">
          <ShieldCheck className="w-4 h-4" /> Official Knowledge Base
        </span>
      </div>

      {/* Suggested Questions */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-stone-600 uppercase tracking-wide flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-stone-400" />
          Suggested Questions:
        </p>
        <div className="flex flex-wrap gap-2">
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAsk(q)}
              disabled={isLoading}
              className="text-xs bg-[#FAF7F2] hover:bg-[#F2ECE1] border border-[#DCD2C0] text-[#162A45] px-3 py-1.5 rounded-md transition-colors text-left cursor-pointer disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAsk();
        }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask any question about Census 2027 privacy, security, or schedules..."
          disabled={isLoading}
          className="flex-1 px-4 py-2.5 bg-[#FAF7F2] border border-[#DCD2C0] rounded-md text-sm text-[#162A45] placeholder-stone-400 focus:ring-1 focus:ring-[#B83A24] focus:border-[#B83A24] focus:outline-hidden disabled:opacity-60 font-sans"
        />

        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md bg-[#B83A24] hover:bg-[#9C2F1C] text-white text-xs sm:text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-xs cursor-pointer shrink-0"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Ask AI</span>
            </>
          )}
        </button>
      </form>

      {/* Response Box */}
      {response && (
        <div className="p-5 bg-[#FAF7F2] border border-[#E5DFD5] rounded-md space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-xs font-bold text-[#162A45]">
            <Sparkles className="w-4 h-4 text-[#B83A24]" />
            <span>Verified Census Guidance:</span>
          </div>
          <div className="text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line font-normal">
            {response}
          </div>
        </div>
      )}

      {/* Error Notice */}
      {error && (
        <div className="p-4 bg-[#FAF1E4] border border-[#E8D4B8] rounded-md text-xs text-[#784A12] flex items-start gap-2.5 animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 text-[#B36B15] shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Notice</p>
            <p className="mt-0.5">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};
