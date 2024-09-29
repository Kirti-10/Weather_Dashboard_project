import React, { useState, useCallback, useEffect } from 'react';
import api from '../api';

const Feedback = () => {
  const [feedbackData, setFeedbackData] = useState({
    user_id: '',
    feedback_text: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Ensure the required fields are filled out
    if (!feedbackData.user_id || !feedbackData.feedback_text) {
      setError('Please fill in all fields');
      return;
    }
  
    setIsLoading(true);  // Set loading to true when submission starts
    setError('');
    setMessage('');
  
    try {
      // Prepare data to send
      const dataToSend = {
        ...feedbackData,
        user_id: parseInt(feedbackData.user_id, 10),
      };
      
      // Log data being sent for debugging
      console.log('Submitting feedback...', dataToSend);
  
      // Send POST request to API
      const response = await api.post('/feedback', dataToSend);
  
      // Log the response to see what you are getting
      console.log('Response:', response);
  
      // Set success message and reset feedback form
      setMessage('Feedback submitted successfully');
      setFeedbackData({ user_id: '', feedback_text: '' });
  
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setError(`Failed to submit feedback: ${err.response?.data?.detail || err.message}`);
    } finally {
      // Set loading to false to stop showing "Submitting..." on the button
      setIsLoading(false);
    }
  }, [feedbackData]);
  

  // Clear message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 p-1">
          <div className="bg-white p-6">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-6">
              Grow With Your Feedback
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">
                  User ID
                </label>
                <input
                  id="user_id"
                  type="number"
                  required
                  name="user_id"
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your User ID"
                  value={feedbackData.user_id}
                  onChange={(e) => setFeedbackData(prev => ({ ...prev, user_id: e.target.value }))}
                  aria-describedby="user-id-error"
                />
              </div>
              <div>
                <label htmlFor="feedback_text" className="block text-sm font-medium text-gray-700">
                  Your Feedback
                </label>
                <textarea
                  id="feedback_text"
                  required
                  rows="4"
                  name="feedback_text"
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="Share your thoughts with us..."
                  value={feedbackData.feedback_text}
                  onChange={(e) => setFeedbackData(prev => ({ ...prev, feedback_text: e.target.value }))}
                  aria-describedby="feedback-text-error"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Submitting...' : ' Your Feedback'}
              </button>
            </form>
          </div>
        </div>
        {message && (
          <div
            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4"
            role="alert"
            aria-live="polite"
            aria-label="Success message"
          >
            <p className="font-bold">Success!</p>
            <p>{message}</p>
          </div>
        )}
        {error && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
            role="alert"
            aria-live="polite"
            aria-label="Error message"
          >
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;