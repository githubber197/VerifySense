import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, DocumentTextIcon, LinkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

function HomePage() {
  const [inputType, setInputType] = useState('text');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) return setError('Please enter some content to verify');

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/verify', { input_type: inputType, content });
      localStorage.setItem('verifyResults', JSON.stringify(response.data));
      navigate('/results');
    } catch (err) {
      console.error(err);
      setError('An error occurred while verifying the content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setContent(reader.result);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Loader */}
      {isLoading && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-white text-lg">Verifying claims...</p>
          </div>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto px-2 md:px-4 lg:px-6 py-8">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">VerifySense</h1>
          <p className="text-lg text-gray-600">
            AI-powered verification tool for text, URLs, and images.
          </p>
        </div>

        {/* Main Grid: Form on left, Features on right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Form */}
          <div>
            <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-3xl p-8 sm:p-10">
              {/* Input type buttons */}
              <div className="flex space-x-3 mb-5">
                <button
                  type="button"
                  className={`flex-1 py-4 rounded-2xl flex justify-center items-center space-x-2 transition-all ${
                    inputType === 'text'
                      ? 'bg-blue-100 text-blue-700 border border-blue-300'
                      : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                  }`}
                  onClick={() => { setInputType('text'); setImagePreview(''); setContent(''); }}
                >
                  <DocumentTextIcon className="h-6 w-6" /> <span className="font-medium">Text</span>
                </button>
                <button
                  type="button"
                  className={`flex-1 py-4 rounded-2xl flex justify-center items-center space-x-2 transition-all ${
                    inputType === 'url'
                      ? 'bg-blue-100 text-blue-700 border border-blue-300'
                      : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                  }`}
                  onClick={() => { setInputType('url'); setImagePreview(''); setContent(''); }}
                >
                  <LinkIcon className="h-6 w-6" /> <span className="font-medium">URL</span>
                </button>
                <button
                  type="button"
                  className={`flex-1 py-4 rounded-2xl flex justify-center items-center space-x-2 transition-all ${
                    inputType === 'image'
                      ? 'bg-blue-100 text-blue-700 border border-blue-300'
                      : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                  }`}
                  onClick={() => setInputType('image')}
                >
                  <PhotoIcon className="h-6 w-6" /> <span className="font-medium">Image</span>
                </button>
              </div>

              {/* Input fields with smooth animation */}
              <AnimatePresence mode="wait">
                {inputType === 'text' && (
                  <motion.textarea
                    key="text"
                    className="w-full p-5 border border-gray-300 rounded-2xl h-48 resize-none text-lg"
                    placeholder="Paste the text..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                {inputType === 'url' && (
                  <motion.input
                    key="url"
                    type="url"
                    className="w-full p-5 border border-gray-300 rounded-2xl text-lg"
                    placeholder="Enter the URL..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                {inputType === 'image' && (
                  <motion.div
                    key="image"
                    className="flex flex-col items-center border-2 border-dashed border-gray-300 rounded-2xl p-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {imagePreview ? (
                      <div className="flex flex-col items-center">
                        <img src={imagePreview} alt="Preview" className="max-h-48 mb-3 rounded-xl" />
                        <button
                          type="button"
                          className="text-blue-600 hover:text-blue-800 font-medium"
                          onClick={() => { setImagePreview(''); setContent(''); }}
                        >
                          Remove Image
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer text-gray-500 flex flex-col items-center text-lg">
                        <PhotoIcon className="h-16 w-16 mb-3" />
                        <span>Upload an image</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                      </label>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error */}
              {error && <p className="text-red-600 mt-2">{error}</p>}

              {/* Submit */}
              <button
                type="submit"
                className="mt-6 w-full py-4 bg-blue-600 text-white rounded-2xl flex justify-center items-center space-x-2 text-lg disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? 'Verifying...' : (
                  <>
                    <MagnifyingGlassIcon className="h-6 w-6" />
                    <span>Verify Now</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Features on right */}
          <div className="space-y-8">
            {[
              { icon: DocumentTextIcon, title: 'Fact Check', desc: 'Checks claims against trusted databases quickly.' },
              { icon: PhotoIcon, title: 'Evidence Analysis', desc: 'Analyzes sources and provides credibility scores.' },
              { icon: MagnifyingGlassIcon, title: 'Learn to Verify', desc: 'Provides tips and tools to validate information yourself.' }
            ].map((feature, i) => (
              <div key={i} className="flex items-start space-x-6 bg-white p-8 rounded-3xl shadow-lg">
                <div className="p-4 rounded-full bg-blue-100 text-blue-600 flex-shrink-0">
                  <feature.icon className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 mt-2 text-lg">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
