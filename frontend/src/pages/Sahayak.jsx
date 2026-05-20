import React, { useState } from 'react';
import { Button, Card, Alert, Spinner } from '../components/UI';
import Navbar from '../components/Navbar';
import axios from 'axios';

/**
 * Sahayak - Offline AI Calling System
 */
const Sahayak = () => {
  const [status, setStatus] = useState('idle'); // idle, calling, connected, recording
  const [callLog, setCallLog] = useState(null);
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);

  const handleInitiateCall = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/sahayak/incoming', {
        callId: `call_${Date.now()}`,
        phoneNumber: '+91' + Math.floor(Math.random() * 9000000000 + 1000000000),
        language: language,
      });

      if (response.data.success) {
        setCallLog(response.data.data.callLogId);
        setStatus('connected');
        setMessage('Call connected! You can now speak. Say something...');
      }
    } catch (error) {
      setMessage('Failed to initiate call. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleEndCall = async () => {
    if (!callLog) return;

    try {
      await axios.post('http://localhost:5000/api/sahayak/end-call', {
        callLogId: callLog,
      });
      setStatus('idle');
      setCallLog(null);
      setMessage('Call ended successfully');
    } catch (error) {
      console.error('Error ending call:', error);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <section className="max-w-4xl mx-auto px-4 py-12">
          <Card className="mb-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-purple-600 mb-2">☎️ Sahayak</h1>
              <p className="text-lg text-gray-600">
                Your AI Assistant - Available 24/7, Works Offline
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">How It Works:</h2>
              <ol className="space-y-3 text-gray-700">
                <li>
                  <strong>1. Select Language:</strong> Choose your preferred language (English, Hindi, or
                  Kannada)
                </li>
                <li>
                  <strong>2. Initiate Call:</strong> Click the call button or dial our Sahayak number
                </li>
                <li>
                  <strong>3. Speak Naturally:</strong> Ask for homework help, career advice, or skill
                  discovery
                </li>
                <li>
                  <strong>4. Get Instant Response:</strong> Sahayak responds in your preferred language
                </li>
              </ol>
            </div>

            {message && <Alert type="info" message={message} onClose={() => setMessage('')} className="mb-6" />}

            <div className="space-y-6">
              {/* Language Selection */}
              <div>
                <label className="block text-sm font-medium mb-3">Select Language / भाषा चुनें / ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ</label>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { code: 'en', label: 'English 🇬🇧' },
                    { code: 'hi', label: 'Hindi हिंदी 🇮🇳' },
                    { code: 'ka', label: 'Kannada ಕನ್ನಡ' },
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`p-4 rounded-lg font-semibold transition ${
                        language === lang.code
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Call Status */}
              <div className="text-center">
                <div className="mb-6">
                  {status === 'idle' && (
                    <div className="text-6xl animate-pulse">☎️</div>
                  )}
                  {status === 'calling' && (
                    <div className="text-6xl animate-bounce">📞</div>
                  )}
                  {status === 'connected' && (
                    <div className="inline-block">
                      <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center animate-pulse">
                        <span className="text-4xl">✓</span>
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-lg font-semibold text-gray-700 mb-6">
                  {status === 'idle' && 'Ready to call Sahayak'}
                  {status === 'calling' && 'Connecting to Sahayak...'}
                  {status === 'connected' && 'Connected! Listening...'}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center">
                  {status === 'idle' ? (
                    <Button
                      size="lg"
                      onClick={handleInitiateCall}
                      disabled={loading}
                      className={`${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {loading ? 'Initiating...' : 'Call Sahayak Now'}
                    </Button>
                  ) : (
                    <>
                      <Button variant="danger" size="lg" onClick={handleEndCall}>
                        End Call
                      </Button>
                      <Button variant="secondary" size="lg">
                        Transfer to Human Support
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Demo Phone Number */}
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-gray-700 mb-2">Or call directly:</p>
                <p className="text-3xl font-bold text-blue-600">+91 1234 567890</p>
                <p className="text-xs text-gray-500 mt-2">Demo number (Available 24/7)</p>
              </div>

              {/* Features */}
              <div className="border-t pt-6">
                <h3 className="font-bold mb-4">Sahayak Can Help You With:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    '📚 Homework help with hints',
                    '💼 Career guidance advice',
                    '🎯 Skill discovery assessment',
                    '🔍 Resource recommendations',
                    '📖 Subject explanations',
                    '💡 Interview preparation',
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-gray-700">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Offline Info */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800">
                  ✅ <strong>Works Offline:</strong> Sahayak uses local AI models (Ollama, Whisper, Coqui TTS) and works
                  even without internet connection!
                </p>
              </div>
            </div>
          </Card>

          {/* Call History */}
          <Card>
            <h2 className="text-xl font-bold mb-4">📞 Recent Calls</h2>
            <div className="text-center text-gray-600 py-8">
              <p>Your call history will appear here</p>
            </div>
          </Card>
        </section>
      </main>
    </>
  );
};

export default Sahayak;
