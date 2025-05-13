import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, File, FileText, X, Check, Trash2, Loader2 } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';
import { analyzeResume } from '../services/aiService';

const Upload: React.FC = () => {
  const { addResumes } = useResume();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const pdfFiles = acceptedFiles.filter(file => 
      file.type === 'application/pdf' || 
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
    
    if (pdfFiles.length !== acceptedFiles.length) {
      toast.error('Only PDF and DOCX files are accepted');
    }
    
    setFiles(prevFiles => [...prevFiles, ...pdfFiles]);
  }, []);

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error('Please add at least one resume');
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      // Simulate upload progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 100);

      // Simulate file upload time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      clearInterval(interval);
      setProgress(100);
      setUploading(false);
      setAnalyzing(true);

      // Process each resume with AI
      const processedResumes = await Promise.all(
        files.map(async (file, index) => {
          // In a real app, we would extract text from the PDF/DOCX here
          // For this demo, we'll simulate the analysis
          const result = await analyzeResume(file.name);
          return result;
        })
      );

      addResumes(processedResumes);
      setAnalyzing(false);
      toast.success(`${files.length} resume${files.length > 1 ? 's' : ''} processed successfully`);
      navigate('/candidates');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('An error occurred during processing');
      setUploading(false);
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Upload Resumes</h1>
      </div>

      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'} p-6`}>
        {!uploading && !analyzing ? (
          <div 
            className={`border-2 border-dashed ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'} rounded-lg p-12 text-center hover:border-blue-500 transition-colors duration-200 cursor-pointer`}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const droppedFiles = Array.from(e.dataTransfer.files);
              onDrop(droppedFiles);
            }}
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.multiple = true;
              input.accept = '.pdf,.docx';
              input.onchange = (e) => {
                const target = e.target as HTMLInputElement;
                if (target.files) {
                  onDrop(Array.from(target.files));
                }
              };
              input.click();
            }}
          >
            <UploadCloud className="w-12 h-12 mx-auto text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold mb-1">Drag and drop your resumes here</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">or click to browse your files</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">Supports PDF, DOCX (Max 10MB each)</p>
          </div>
        ) : (
          <div className="text-center py-8">
            {uploading && (
              <div className="space-y-4">
                <Loader2 className="w-12 h-12 mx-auto text-blue-500 animate-spin" />
                <h3 className="text-lg font-semibold">Uploading files...</h3>
                <div className="w-full max-w-md mx-auto bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-gray-500 dark:text-gray-400">{progress}% complete</p>
              </div>
            )}
            
            {analyzing && (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="border-4 border-gray-300 dark:border-gray-700 border-t-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                </div>
                <h3 className="text-lg font-semibold">Analyzing resumes with AI...</h3>
                <p className="text-gray-500 dark:text-gray-400">This may take a moment</p>
              </div>
            )}
          </div>
        )}

        {files.length > 0 && !uploading && !analyzing && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Selected Files ({files.length})</h3>
            <ul className="space-y-3">
              {files.map((file, index) => (
                <li 
                  key={index} 
                  className={`flex items-center justify-between p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}
                >
                  <div className="flex items-center space-x-3">
                    {file.type.includes('pdf') ? (
                      <FileText className="w-5 h-5 text-red-500" />
                    ) : (
                      <File className="w-5 h-5 text-blue-500" />
                    )}
                    <span className="truncate max-w-xs">{file.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>
                  <button 
                    onClick={() => removeFile(index)}
                    className={`p-1 rounded-full ${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 flex space-x-4">
              <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2 transition-colors duration-200"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Process Resumes</span>
              </button>
              
              <button
                onClick={() => setFiles([])}
                className={`px-4 py-2 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} rounded-lg flex items-center space-x-2 transition-colors duration-200`}
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;